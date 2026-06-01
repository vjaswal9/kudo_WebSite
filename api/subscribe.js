// api/subscribe.js
// Vercel serverless function — forwards a lead into MailerLite.
// Secrets are read from environment variables (never exposed to the browser):
//   MAILERLITE_API_KEY              — your MailerLite API token
//   MAILERLITE_GROUP_ID             — default group (guide download, contact form)
//   MAILERLITE_ASSESSMENT_GROUP_ID  — (optional) group for AI Readiness Assessment leads
//
// Leads include a "source" so assessment-takers can be routed to their own
// group (and their own automation with a relevant first email).
//
// The function is graceful: if the API key isn't configured yet, it returns
// a harmless "skipped" response so the website forms never break.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const defaultGroup = process.env.MAILERLITE_GROUP_ID;
  const assessmentGroup = process.env.MAILERLITE_ASSESSMENT_GROUP_ID;

  // If MailerLite isn't configured yet, don't error — just skip silently.
  if (!apiKey) {
    res.status(200).json({ ok: false, skipped: "MAILERLITE_API_KEY not set" });
    return;
  }

  const { name, email, company, source } = req.body || {};
  if (!email) {
    res.status(400).json({ error: "email is required" });
    return;
  }

  // Route assessment leads to their own group if configured; otherwise default.
  const isAssessment = typeof source === "string" && source.toLowerCase().includes("assessment");
  const groupId = isAssessment && assessmentGroup ? assessmentGroup : defaultGroup;

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
