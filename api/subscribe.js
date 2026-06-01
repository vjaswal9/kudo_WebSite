// api/subscribe.js
// Vercel serverless function, forwards a lead into MailerLite.
// Secrets are read from environment variables (never exposed to the browser):
//   MAILERLITE_API_KEY              the MailerLite API token
//   MAILERLITE_GROUP_ID             default group (guide download, contact form)
//   MAILERLITE_ASSESSMENT_GROUP_ID  (optional) group for AI Readiness Assessment leads
//
// Hardening:
//  - same-origin only (rejects requests not from kudoadvisory.com)
//  - email format validation + field length caps
//  - never echoes MailerLite's response back to the client (no info disclosure)
//  - graceful no-op if the API key isn't configured yet

const ALLOWED_HOSTS = [
  "kudoadvisory.com",
  "www.kudoadvisory.com",
  "kudoadvisory.ae",
  "www.kudoadvisory.ae",
];

function hostFrom(url) {
  try { return new URL(url).host.toLowerCase(); } catch { return ""; }
}

function isAllowedOrigin(req) {
  const origin = req.headers.origin || "";
  const referer = req.headers.referer || "";
  // Allow Vercel preview deployments and the production hosts.
  const ok = (h) => ALLOWED_HOSTS.includes(h) || h.endsWith(".vercel.app");
  if (origin) return ok(hostFrom(origin));
  if (referer) return ok(hostFrom(referer));
  return false; // no origin/referer (e.g. curl/bots) is rejected
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v, n) => (typeof v === "string" ? v.slice(0, n) : undefined);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!isAllowedOrigin(req)) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const defaultGroup = process.env.MAILERLITE_GROUP_ID;
  const assessmentGroup = process.env.MAILERLITE_ASSESSMENT_GROUP_ID;

  // If MailerLite isn't configured yet, don't error, just skip silently.
  if (!apiKey) {
    res.status(200).json({ ok: false });
    return;
  }

  const { name, email, company, source } = req.body || {};

  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 254) {
    res.status(400).json({ error: "A valid email is required" });
    return;
  }

  // Route assessment leads to their own group if configured; otherwise default.
  const isAssessment = typeof source === "string" && source.toLowerCase().includes("assessment");
  const groupId = isAssessment && assessmentGroup ? assessmentGroup : defaultGroup;

  const body = { email: email.trim().toLowerCase(), fields: {} };
  const cleanName = clip(name, 100);
  const cleanCompany = clip(company, 150);
  if (cleanName) body.fields.name = cleanName;
  if (cleanCompany) body.fields.company = cleanCompany;
  if (groupId) body.groups = [String(groupId)];

  try {
    const r = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    // Never echo MailerLite's response to the client. Just report success/failure.
    res.status(r.ok ? 200 : 502).json({ ok: r.ok });
  } catch {
    res.status(502).json({ ok: false });
  }
}
