// src/components/NewsletterSignup.tsx
// Low-friction email capture for readers who aren't ready for the assessment
// or guide. Adds them to MailerLite (source: newsletter) and fires a GA event.
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { pushToMailerLite } from "@/lib/leads";
import { trackEvent } from "@/lib/analytics";
import { Mail, Check } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgwarpw";

export function NewsletterSignup() {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "done" | "error">(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setSending(true);
    setStatus(null);
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "Insights newsletter" }),
      });
      pushToMailerLite({ email, source: "newsletter" });
      trackEvent("generate_lead", { lead_source: "newsletter" });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section aria-labelledby="newsletter-heading" className="py-16 px-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card p-8 md:p-10 text-center">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">
          {t("Stay in the loop", "ابقَ على اطلاع")}
        </p>
        <h2 id="newsletter-heading" className="text-2xl md:text-3xl font-bold mb-3">
          {t("Practical AI insights, now and then", "رؤى عملية حول الذكاء الاصطناعي، بين الحين والآخر")}
        </h2>
        <p className="text-muted-foreground mb-7 leading-relaxed max-w-xl mx-auto">
          {t(
            "Occasional, no-fluff thinking on AI strategy, governance and delivery for enterprise leaders. No spam, unsubscribe anytime.",
            "أفكار عملية بلا حشو حول استراتيجية الذكاء الاصطناعي وحوكمته وتسليمه لقادة المؤسسات. بلا إزعاج، ويمكنك إلغاء الاشتراك في أي وقت."
          )}
        </p>

        {status === "done" ? (
          <p className="inline-flex items-center gap-2 text-primary font-medium">
            <Check className="w-5 h-5" aria-hidden="true" />
            {t("You're in. Thank you for subscribing.", "تم الاشتراك. شكراً لانضمامك.")}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
            <label htmlFor="newsletter-email" className="sr-only">{t("Email address", "البريد الإلكتروني")}</label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("you@company.com", "you@company.com")}
              className="flex-1 rounded-md border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              dir="ltr"
            />
            <Button type="submit" disabled={sending} className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-sm font-medium whitespace-nowrap">
              {sending ? t("Subscribing...", "جارٍ الاشتراك...") : t("Subscribe", "اشترك")}
            </Button>
          </form>
        )}
        {status === "error" && (
          <p className="text-sm text-destructive mt-3">
            {t("Please enter a valid email address.", "يرجى إدخال بريد إلكتروني صحيح.")}
          </p>
        )}
      </div>
    </section>
  );
}
