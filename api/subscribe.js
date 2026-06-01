// api/subscribe.js
// Vercel serverless function — forwards a lead into MailerLite.
// Secrets are read from environment variables (never exposed to the browser):
//   MAILERLITE_API_KEY   — your MailerLite API token
//   MAILERLITE_GROUP_ID  — (optional) the group new subscribers are added to
//
// The function is graceful: if the API key isn't configured yet, it returns
// a harmless "skipped" response so the website forms never break.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  // If MailerLite isn't configured yet, don't error — just skip silently.
  if (!apiKey) {
    res.status(200).json({ ok: false, skipped: "MAILERLITE_API_KEY not set" });
    return;
  }

  const { name, email, company } = req.body || {};
  if (!email) {
    res.status(400).json({ error: "email is required" });
    return;
  }

  const body = { email, fields: {} };
  if (name) body.fields.name = name;
  if (company) body.fields.company = company;
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
    const data = await r.json().catch(() => ({}));
    res.status(r.ok ? 200 : 502).json({ ok: r.ok, data });
  } catch (e) {
    res.status(502).json({ ok: false, error: String(e) });
  }
}
