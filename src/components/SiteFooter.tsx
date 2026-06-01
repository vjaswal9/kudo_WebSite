// src/components/SiteFooter.tsx
// Single shared footer used across every page, consistent links + branding.
import { useLanguage } from "@/contexts/LanguageContext";
import kudoLogo from "@/assets/kudo-logo.png";
import { Mail, Linkedin } from "lucide-react";

const SERVICES = [
  { href: "/services/ai-strategy", en: "AI Strategy", ar: "استراتيجية الذكاء الاصطناعي" },
  { href: "/services/ai-governance", en: "AI Governance", ar: "حوكمة الذكاء الاصطناعي" },
  { href: "/services/ai-operating-model", en: "Operating Model", ar: "نموذج التشغيل" },
  { href: "/services/ai-use-case-prioritisation", en: "Use Case Prioritisation", ar: "تحديد الأولويات" },
  { href: "/services/leadership-enablement", en: "Leadership Enablement", ar: "تمكين القيادة" },
  { href: "/services/ai-delivery-assurance", en: "Delivery Assurance", ar: "ضمان التسليم" },
];

const COMPANY = [
  { href: "/about", en: "About", ar: "من نحن" },
  { href: "/ai-advisory-uae", en: "AI Advisory UAE", ar: "استشارات الذكاء الاصطناعي في الإمارات" },
  { href: "/case-studies", en: "Case Studies", ar: "قصص العملاء" },
  { href: "/insights", en: "Insights", ar: "المقالات" },
  { href: "/faq", en: "FAQ", ar: "الأسئلة الشائعة" },
  { href: "/#contact", en: "Contact", ar: "تواصل معنا" },
];

const RESOURCES = [
  { href: "/ai-readiness-assessment", en: "AI Readiness Assessment", ar: "تقييم جاهزية الذكاء الاصطناعي" },
  { href: "/guides/ai-pilots-fail", en: "Free Guide: Why AI Pilots Fail", ar: "دليل مجاني: لماذا تفشل المشاريع التجريبية" },
];

export function SiteFooter() {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <footer className="border-t border-border/60 bg-card/30" aria-label="Site footer" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="/" aria-label="Kudo Advisory home">
              <img src={kudoLogo} alt="Kudo Advisory" className="h-12 w-auto mb-4" width="120" height="48" />
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t(
                "Independent AI advisory for enterprise leaders across the UAE, Dubai, Abu Dhabi, Saudi Arabia and the Middle East.",
                "استشارات ذكاء اصطناعي مستقلة لقادة المؤسسات في الإمارات ودبي وأبوظبي والمملكة العربية السعودية والشرق الأوسط."
              )}
            </p>
            <div className="flex gap-4 mt-5">
              <a href="mailto:info@kudoadvisory.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email Kudo Advisory"><Mail className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">{t("Services", "الخدمات")}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {SERVICES.map((s) => (
                <li key={s.href}><a href={s.href} className="hover:text-primary transition-colors">{t(s.en, s.ar)}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">{t("Company", "الشركة")}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {COMPANY.map((c) => (
                <li key={c.href}><a href={c.href} className="hover:text-primary transition-colors">{t(c.en, c.ar)}</a></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">{t("Free Resources", "موارد مجانية")}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {RESOURCES.map((r) => (
                <li key={r.href}><a href={r.href} className="hover:text-primary transition-colors">{t(r.en, r.ar)}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="section-rule mb-8 border-border/60" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} <a href="/" className="hover:text-foreground transition-colors">Kudo Advisory</a>, {t("AI Advisory UAE, Dubai & Middle East. We exist to make AI move.", "استشارات الذكاء الاصطناعي في الإمارات ودبي والشرق الأوسط. نحن هنا لتحريك الذكاء الاصطناعي.")} {t("All rights reserved.", "جميع الحقوق محفوظة.")}</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-foreground transition-colors">{t("Privacy", "الخصوصية")}</a>
            <a href="/terms" className="hover:text-foreground transition-colors">{t("Terms", "الشروط")}</a>
            <a href="mailto:info@kudoadvisory.com" className="hover:text-foreground transition-colors">info@kudoadvisory.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
