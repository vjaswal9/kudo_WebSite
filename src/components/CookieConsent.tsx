// src/components/CookieConsent.tsx
// Lightweight, accessible cookie-consent banner. Shows once until the visitor
// accepts or declines; their choice drives Google Consent Mode (analytics
// cookies are only set after Accept). Bilingual + RTL aware.
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getConsent, setConsent } from "@/lib/analytics";

export function CookieConsent() {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if no choice has been made yet.
    if (getConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (accepted: boolean) => {
    setConsent(accepted);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={isAr ? "إشعار ملفات تعريف الارتباط" : "Cookie notice"}
      dir={isRTL ? "rtl" : "ltr"}
      className="fixed bottom-0 inset-x-0 z-[80] p-4 sm:p-5"
    >
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {isAr
            ? "نستخدم ملفات تعريف الارتباط للتحليلات لفهم كيفية استخدام موقعنا وتحسينه. لا نستخدم ملفات تعريف ارتباط إعلانية. "
            : "We use analytics cookies to understand how our site is used and improve it. We do not use advertising cookies. "}
          <a href="/privacy" className="text-primary hover:underline">
            {isAr ? "اعرف المزيد" : "Learn more"}
          </a>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => choose(false)}
            className="px-4 py-2 text-sm rounded-md border border-border text-foreground hover:bg-secondary transition-colors"
          >
            {isAr ? "رفض" : "Decline"}
          </button>
          <button
            onClick={() => choose(true)}
            className="px-5 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            {isAr ? "قبول" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
