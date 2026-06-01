// src/components/SiteNav.tsx
// Single shared navigation used across every page, consistent menu,
// language toggle, and a working mobile hamburger menu.
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LangToggle } from "@/components/LangToggle";
import kudoLogo from "@/assets/kudo-logo.png";
import { Menu, X, ChevronRight, Mail, Linkedin } from "lucide-react";

// One canonical menu for the whole site.
const NAV_ITEMS = [
  { href: "/services", en: "Services", ar: "الخدمات" },
  { href: "/ai-advisory-uae", en: "UAE", ar: "الإمارات" },
  { href: "/about", en: "About", ar: "من نحن" },
  { href: "/case-studies", en: "Case Studies", ar: "قصص العملاء" },
  { href: "/insights", en: "Insights", ar: "المقالات" },
  { href: "/faq", en: "FAQ", ar: "الأسئلة الشائعة" },
];

export function SiteNav({ active }: { active?: string }) {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      <nav aria-label="Main navigation" className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <a href="/" aria-label="Kudo Advisory home">
            <img src={kudoLogo} alt="Kudo Advisory" className="h-12 sm:h-14 w-auto" width="160" height="56" />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}
                className={`transition-colors ${active === item.href ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                aria-current={active === item.href ? "page" : undefined}>
                {t(item.en, item.ar)}
              </a>
            ))}
            <LangToggle />
            <a href="/#contact" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              {t("Book a Call", "احجز مكالمة")} <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} aria-hidden="true" />
            </a>
          </div>

          {/* Mobile trigger */}
          <div className="md:hidden flex items-center gap-2">
            <LangToggle />
            <button onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}
              className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} aria-hidden={!open}>
        <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-background/70 backdrop-blur-xl" />
        <div role="dialog" aria-modal="true" aria-label="Mobile navigation" className="relative h-full w-full">
          <div className="max-w-7xl mx-auto h-full px-6 pb-10 flex flex-col pt-[env(safe-area-inset-top)]">
            <div className="flex items-center justify-between py-4">
              <img src={kudoLogo} alt="Kudo Advisory" className="h-12 w-auto" width="120" height="48" />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded-full hover:bg-secondary transition-colors">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="max-w-md">
              <a href="/#contact" onClick={() => setOpen(false)} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-5 text-base font-medium text-primary-foreground hover:bg-primary/90">
                {t("Book a Discovery Call", "احجز مكالمة استكشافية")}
              </a>
              <nav aria-label="Mobile navigation links" className="mt-7 space-y-2">
                <a href="/" onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl border border-border bg-card/60 px-4 py-4 text-base hover:bg-secondary transition-colors">
                  <span className="font-medium">{t("Home", "الرئيسية")}</span>
                  <span aria-hidden="true" className={`text-muted-foreground ${isRTL ? "rotate-180" : ""}`}>→</span>
                </a>
                {NAV_ITEMS.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-border bg-card/60 px-4 py-4 text-base hover:bg-secondary transition-colors">
                    <span className="font-medium">{t(item.en, item.ar)}</span>
                    <span aria-hidden="true" className={`text-muted-foreground ${isRTL ? "rotate-180" : ""}`}>→</span>
                  </a>
                ))}
              </nav>
            </div>
            <div className="mt-auto pt-10 max-w-md space-y-3">
              <a href="mailto:info@kudoadvisory.com" className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" /> info@kudoadvisory.com
              </a>
              <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors">
                <Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn, Vijay Jaswal
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
