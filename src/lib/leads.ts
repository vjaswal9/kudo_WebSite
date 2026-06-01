// src/lib/leads.ts
// Fire-and-forget push of a captured lead into MailerLite via the serverless
// proxy at /api/subscribe. Non-blocking: never throws, never blocks the UI.
// Formspree remains the primary capture (for email notifications); this adds
// the lead to the MailerLite automation in parallel.

export function pushToMailerLite(payload: { name?: string; email: string; company?: string; source?: string }) {
  try {
    void fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => { /* non-blocking */ });
  } catch {
    /* non-blocking */
  }
}
