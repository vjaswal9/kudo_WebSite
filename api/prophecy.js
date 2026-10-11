// api/prophecy.js
// Vercel serverless function, stores finished card-game scorecards in a private Vercel Blob store.
// Requires the store's read-write token in BLOB_READ_WRITE_TOKEN (set automatically when a
// Blob store is connected to the project). Without it every call answers 503 "not_configured".
//
//   GET  /api/prophecy                    list saved games (newest first)
//   POST /api/prophecy {action:"save",   game}   save or update a finished game
//   POST /api/prophecy {action:"delete", id}      delete a saved game
//
// There is no password: anyone who can load the page can save or delete games.
// Hardening that remains:
//  - same-origin only (rejects requests not from kudoadvisory.com)
//  - the whole game is validated and the totals are recomputed here, nothing is trusted
//  - payload size capped and the number of stored games capped (30)
//  - private store, so game files are never publicly readable by URL

import { put, get, list, del } from "@vercel/blob";

const ALLOWED_HOSTS = [
  "kudoadvisory.com",
  "www.kudoadvisory.com",
  "kudoadvisory.ae",
  "www.kudoadvisory.ae",
];

const GAMES = "prophecy/games/";
const MAX_ROUNDS = 17;           // 3 players: floor(52 / 3) rounds. Round r deals (rounds - r) cards.
const MAX_BODY = 20000;
const MAX_LIST = 200;
const MAX_GAMES = 30;

function hostFrom(url) {
  try { return new URL(url).host.toLowerCase(); } catch { return ""; }
}

function isAllowedOrigin(req) {
  const origin = req.headers.origin || "";
  const referer = req.headers.referer || "";
  const ok = (h) => ALLOWED_HOSTS.includes(h) || h.endsWith(".vercel.app");
  if (origin) return ok(hostFrom(origin));
  if (referer) return ok(hostFrom(referer));
  return false;
}

// ---------- storage ----------

export const blobStore = {
  configured: () => Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  async readJson(pathname) {
    let r;
    try { r = await get(pathname, { access: "private", useCache: false }); } catch (e) {
      if (e && /not.?found/i.test(String(e.name || e.message))) return null;
      throw e;
    }
    if (!r || r.statusCode !== 200 || !r.stream) return null;
    return JSON.parse(await new Response(r.stream).text());
  },
  async writeJson(pathname, obj) {
    await put(pathname, JSON.stringify(obj), {
      access: "private",
      contentType: "application/json",
      allowOverwrite: true,
      addRandomSuffix: false,
    });
  },
  async listPaths(prefix) {
    const out = [];
    let cursor;
    do {
      const r = await list({ prefix, cursor, limit: 1000 });
      for (const b of r.blobs) out.push(b.pathname);
      cursor = r.hasMore ? r.cursor : undefined;
    } while (cursor && out.length < 2000);
    return out;
  },
  async remove(pathname) { await del(pathname); },
};

// ---------- scoring and validation ----------

function roundScore(p, a) { return p === a ? 10 * p : -10 * Math.abs(p - a); }

function playerTotal(p, a) {
  let t = 0;
  for (let r = 0; r < p.length; r++) t += roundScore(p[r], a[r]);
  return t;
}

function validGame(g) {
  if (!g || typeof g !== "object") return null;
  if (typeof g.id !== "string" || !/^[a-z0-9]{6,24}$/.test(g.id)) return null;
  if (!Array.isArray(g.names) || g.names.length < 2 || g.names.length > 8) return null;
  const names = g.names.map((n) =>
    typeof n === "string" ? n.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 20) : ""
  );
  if (names.some((n) => !n)) return null;
  // Number of rounds comes from the data: the first round deals `rounds` cards, the last deals 1.
  const rounds = Array.isArray(g.p) && Array.isArray(g.p[0]) ? g.p[0].length : 0;
  if (!Number.isInteger(rounds) || rounds < 1 || rounds > MAX_ROUNDS) return null;
  const grid = (m) =>
    Array.isArray(m) && m.length === names.length &&
    m.every((row) => Array.isArray(row) && row.length === rounds &&
      row.every((v, r) => Number.isInteger(v) && v >= 0 && v <= rounds - r));
  if (!grid(g.p) || !grid(g.a)) return null;

  const now = Date.now();
  let finished = Date.parse(g.finishedAt);
  if (!Number.isFinite(finished) || finished > now + 10 * 60 * 1000 || finished < now - 366 * 86400 * 1000) {
    finished = now;
  }
  return { id: g.id, names, p: g.p, a: g.a, finishedAt: new Date(finished).toISOString() };
}

function buildRecord(v) {
  const totals = v.names.map((_, i) => playerTotal(v.p[i], v.a[i]));
  const best = Math.max(...totals);
  return {
    id: v.id,
    finishedAt: v.finishedAt,
    savedAt: new Date().toISOString(),
    names: v.names,
    p: v.p,
    a: v.a,
    totals,
    winners: v.names.filter((_, i) => totals[i] === best),
  };
}

// ---------- handler ----------

export function makeHandler(store) {
  return async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store");
    const reply = (code, body) => res.status(code).json(body);

    if (req.method !== "GET" && req.method !== "POST") return reply(405, { error: "Method not allowed" });
    const sameSite = (req.headers["sec-fetch-site"] || "") === "same-origin";
    if (!isAllowedOrigin(req) && !(req.method === "GET" && sameSite)) return reply(403, { error: "Forbidden" });
    if (!store.configured()) return reply(503, { error: "not_configured" });

    try {
      if (req.method === "GET") {
        const paths = (await store.listPaths(GAMES)).filter((p) => p.endsWith(".json"));
        const games = [];
        for (let i = 0; i < paths.length; i += 10) {
          const chunk = await Promise.all(paths.slice(i, i + 10).map((p) => store.readJson(p).catch(() => null)));
          for (const g of chunk) if (g && g.id && Array.isArray(g.names)) games.push(g);
        }
        games.sort((x, y) => String(y.finishedAt).localeCompare(String(x.finishedAt)));
        return reply(200, { ok: true, games: games.slice(0, MAX_LIST) });
      }

      // POST
      const body = req.body && typeof req.body === "object" ? req.body : null;
      if (!body || JSON.stringify(body).length > MAX_BODY) return reply(400, { error: "Bad request" });

      if (body.action === "save") {
        const v = validGame(body.game);
        if (!v) return reply(400, { error: "invalid_game" });
        const path = `${GAMES}${v.id}.json`;
        const existing = await store.listPaths(GAMES);
        if (!existing.includes(path) && existing.length >= MAX_GAMES) return reply(409, { error: "full" });
        await store.writeJson(path, buildRecord(v));
        return reply(200, { ok: true, id: v.id });
      }

      if (body.action === "delete") {
        if (typeof body.id !== "string" || !/^[a-z0-9]{6,24}$/.test(body.id)) return reply(400, { error: "Bad request" });
        await store.remove(`${GAMES}${body.id}.json`);
        return reply(200, { ok: true });
      }

      return reply(400, { error: "Bad request" });
    } catch (e) {
      console.error("prophecy api error", e && e.message);
      return reply(500, { error: "Server error" });
    }
  };
}

export default makeHandler(blobStore);
