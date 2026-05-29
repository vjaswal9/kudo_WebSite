// src/pages/Index.tsx
import React, {
  Target, Shield, Rocket, BarChart3, Brain, FileCheck,
  Settings, ListChecks, Users, ClipboardCheck, Mail, Linkedin,
  ArrowDown, Menu, X, ChevronRight,
} from "lucide-react";
import { useScrollAnimation, useScrolled, useClassAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import outcomesBg from "@/assets/outcomes-boardroom.jpg";
import servicesBg from "@/assets/services-collaboration.jpg";
import heroBg from "@/assets/hero-abstract.jpg";
import howWeWorkBg from "@/assets/how-we-work.jpg";
import founderBg from "@/assets/vijay-presenting.jpg";
import leaderBg from "@/assets/about-leader.jpg";
import { useEffect, useState } from "react";
import kudoLogo from "@/assets/kudo-logo.png";
import { PageMeta } from "@/components/PageMeta";
import { useLanguage } from "@/contexts/LanguageContext";
import { LangToggle } from "@/components/LangToggle";

/* ─── Scroll-animated wrapper ─── */
function AnimatedSection({
  children, className = "", delay = 0,
}: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.12);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function StepNumber({ num }: { num: string }) {
  const ref = useClassAnimation("step-num-visible", 0.3) as React.RefObject<HTMLSpanElement>;
  return (
    <span ref={ref} className="step-num text-4xl font-bold text-primary" aria-label={`Phase ${num}`}>
      {num}
    </span>
  );
}

const outcomeIcons = [Target, Shield, Rocket, BarChart3];
const serviceIcons = [Brain, FileCheck, Settings, ListChecks, Users, ClipboardCheck];

const Index = () => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#outcomes", labelKey: "nav_outcomes" as const },
    { href: "/services", labelKey: "nav_services" as const },
    { href: "#how", labelKey: "nav_how" as const },
    { href: "/ai-advisory-uae", labelKey: "nav_home" as const, fixedLabel: "UAE" },
    { href: "/about", labelKey: "nav_about" as const },
    { href: "/insights", labelKey: "nav_insights" as const },
    { href: "/faq", labelKey: "nav_faq" as const },
    { href: "#contact", labelKey: "nav_contact" as const },
  ];

  const stats = [
    { valueKey: "stat_0_value" as const, labelKey: "stat_0_label" as const },
    { valueKey: "stat_1_value" as const, labelKey: "stat_1_label" as const },
    { valueKey: "stat_2_value" as const, labelKey: "stat_2_label" as const },
    { valueKey: "stat_3_value" as const, labelKey: "stat_3_label" as const },
  ];

  const outcomes = [0, 1, 2, 3].map((i) => ({
    icon: outcomeIcons[i],
    titleKey: `outcomes_${i}_title` as const,
    descKey: `outcomes_${i}_desc` as const,
  }));

  const serviceHrefs = [
    "/services/ai-strategy",
    "/services/ai-governance",
    "/services/ai-operating-model",
    "/services/ai-use-case-prioritisation",
    "/services/leadership-enablement",
    "/services/ai-delivery-assurance",
  ];

  const services = [0, 1, 2, 3, 4, 5].map((i) => ({
    icon: serviceIcons[i],
    titleKey: `services_${i}_title` as const,
    descKey: `services_${i}_desc` as const,
    href: serviceHrefs[i],
  }));

  const steps = [0, 1, 2].map((i) => ({
    numKey: `how_${i}_num` as const,
    titleKey: `how_${i}_title` as const,
    descKey: `how_${i}_desc` as const,
  }));

  const testimonials = [0, 1, 2].map((i) => ({
    quoteKey: `testimonial_${i}_quote` as const,
    nameKey: `testimonial_${i}_name` as const,
    orgKey: `testimonial_${i}_org` as const,
  }));

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = prevOverflow; };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const navScrolled = useScrolled(20);
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgwarpw";

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setFormStatus(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, source: "kudoadvisory.com" }),
      });
      if (!res.ok) throw new Error("Formspree request failed");
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <PageMeta
        title="AI Advisory Dubai & UAE | AI Consultancy Middle East | Kudo Advisory"
        description="Kudo Advisory is the UAE's leading independent AI advisory firm. Based in Dubai, we help CIOs, CDOs and enterprise leaders across the UAE, Abu Dhabi and Middle East turn AI investment into governed, measurable outcomes. AI strategy, AI governance & delivery assurance."
        canonical="https://www.kudoadvisory.com/"
      />

      {/* ══ NAVIGATION ══ */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60 transition-all duration-300 ${navScrolled ? "nav-scrolled" : ""}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <a href="/" className="flex items-center gap-3 min-w-0" aria-label="Kudo Advisory - home page">
            <img src={kudoLogo} alt="Kudo Advisory logo" className="h-12 sm:h-14 w-auto" width="160" height="56" />
          </a>

          <div className="hidden md:flex items-center gap-7 text-sm" role="list">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link text-muted-foreground hover:text-foreground transition-colors duration-200" role="listitem">
                {'fixedLabel' in item ? (item as any).fixedLabel : t(item.labelKey)}
              </a>
            ))}
            <LangToggle />
            <a href="#contact" className="btn-pulse btn-shimmer ml-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              {t("nav_book")} <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? "rtl-flip" : ""}`} aria-hidden="true" />
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LangToggle />
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open navigation menu" aria-expanded={mobileMenuOpen} aria-controls="mobile-menu" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </nav>

      {/* ══ MOBILE OVERLAY MENU ══ */}
      <div
        className={`kudo-overlay fixed inset-0 z-[60] md:hidden ${mobileMenuOpen ? "is-open opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!mobileMenuOpen}
      >
        <button type="button" aria-label="Close navigation menu" onClick={closeMobileMenu} className="kudo-backdrop absolute inset-0 bg-background/70 backdrop-blur-xl" />
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation" className="relative h-full w-full">
          <div className="kudo-panel h-full">
            <div className="max-w-7xl mx-auto h-full px-6 pb-10 flex flex-col pt-[env(safe-area-inset-top)]">
              <div className="flex items-center justify-between py-4">
                <img src={kudoLogo} alt="Kudo Advisory" className="h-12 w-auto" width="120" height="48" />
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Close navigation menu" onClick={closeMobileMenu}>
                  <X className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="max-w-md">
                <div className="mt-6 kudo-item" style={{ animationDelay: mobileMenuOpen ? "90ms" : "0ms" }}>
                  <a href="#contact" onClick={closeMobileMenu} className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-5 text-base font-medium text-primary-foreground hover:bg-primary/90">
                    {t("nav_book_full")}
                  </a>
                </div>
                <nav aria-label="Mobile navigation links" className="mt-7 space-y-2">
                  {navItems.map((item, idx) => (
                    <a key={item.href} href={item.href} onClick={closeMobileMenu}
                      className="kudo-item flex items-center justify-between rounded-2xl border border-border bg-card/60 px-4 py-4 text-base hover:bg-secondary transition-colors"
                      style={{ animationDelay: mobileMenuOpen ? `${160 + idx * 60}ms` : "0ms" }}>
                      <span className="font-medium">{t(item.labelKey)}</span>
                      <span aria-hidden="true" className={`text-muted-foreground ${isRTL ? "rotate-180" : ""}`}>→</span>
                    </a>
                  ))}
                </nav>
              </div>
              <div className="mt-auto pt-10 max-w-md space-y-3">
                <a href="mailto:info@kudoadvisory.com" className="kudo-item flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors" style={{ animationDelay: mobileMenuOpen ? "520ms" : "0ms" }}>
                  <Mail className="w-4 h-4" aria-hidden="true" /> info@kudoadvisory.com
                </a>
                <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="kudo-item flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors" style={{ animationDelay: mobileMenuOpen ? "580ms" : "0ms" }}>
                  <Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn - Vijay Jaswal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <main id="main-content">

        {/* ── HERO ── */}
        <header className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20" aria-label="Kudo Advisory - AI Advisory and Consultancy in Dubai">
          <img src={heroBg} alt="Abstract AI data visualisation" className="absolute inset-0 w-full h-full object-cover opacity-35" loading="eager" fetchPriority="high" width="1920" height="1080" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/55 to-background" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" aria-hidden="true" />

          <div className="relative z-10 max-w-4xl text-center space-y-7">
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-medium label-accent">
              {t("hero_label")}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] font-semibold leading-[1.05]">
              <span className="hero-word" style={{ animationDelay: "300ms" }}>{t("hero_h1_prefix")}{" "}</span>
              <em className="not-italic text-gradient-gold hero-word" style={{ animationDelay: "500ms" }}>{t("hero_h1_em")}</em>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              {t("hero_body")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 px-2">
              <Button asChild className="btn-pulse btn-shimmer bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base rounded-full">
                <a href="#contact">{t("hero_cta_primary")}</a>
              </Button>
              <Button asChild variant="outline" className="border-border/70 hover:bg-secondary px-8 py-3 text-base rounded-full">
                <a href="/services">{t("hero_cta_secondary")}</a>
              </Button>
            </div>
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 mb-8 px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40">
              {stats.map((s, si) => (
                <div key={si} className="stat-item bg-card/70 backdrop-blur-sm px-6 py-5 text-center" style={{ animationDelay: `${800 + si * 120}ms` }}>
                  <p className="text-xl font-bold text-primary">{t(s.valueKey)}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{t(s.labelKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── FEATURED IN ── */}
        <section aria-label="Media coverage" className="py-14 border-y border-border/30 bg-secondary/10">
          <div className="max-w-6xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium mb-10">
                {t("featured_label")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8" role="list" aria-label="Publications featuring Kudo Advisory">
                <a href="https://apnews.com/press-release/ein-presswire-newsmatics/middle-east-enterprises-face-growing-challenge-turning-ai-investment-into-operational-results-ea9c2d6d8d68dccd6485a3c2f7f8cef9" target="_blank" rel="noopener noreferrer" role="listitem" className="opacity-45 hover:opacity-90 transition-opacity duration-200">
                  <svg width="80" height="36" viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="0" y="28" fontFamily="Georgia, 'Times New Roman', serif" fontWeight="700" fontSize="30" fill="currentColor" letterSpacing="-1">AP</text><text x="46" y="28" fontFamily="Arial, Helvetica, sans-serif" fontWeight="400" fontSize="13" fill="currentColor" letterSpacing="0.5">News</text></svg>
                </a>
                <a href="https://www.zawya.com/en/press-release/companies-news/kudo-advisory-launched-to-bridge-the-gap-between-ai-investments-and-real-business-outcomes-in-the-middle-east-hbcf7sn4" target="_blank" rel="noopener noreferrer" role="listitem" className="opacity-45 hover:opacity-90 transition-opacity duration-200">
                  <svg width="105" height="36" viewBox="0 0 105 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="0" y="26" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="22" fill="currentColor" letterSpacing="2">ZAWYA</text></svg>
                </a>
                <a href="https://www.cxoinsightme.com/future/tech/kudo-advisory-launched-to-drive-ai-business-outcomes-in-the-middle-east/" target="_blank" rel="noopener noreferrer" role="listitem" className="opacity-45 hover:opacity-90 transition-opacity duration-200">
                  <svg width="120" height="36" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="0" y="22" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="16" fill="currentColor" letterSpacing="0.5">CXO Insight</text><text x="0" y="34" fontFamily="Arial, Helvetica, sans-serif" fontWeight="400" fontSize="10" fill="currentColor" letterSpacing="1">MIDDLE EAST</text></svg>
                </a>
                <a href="https://news.google.com/search?q=kudo%20advisory" target="_blank" rel="noopener noreferrer" role="listitem" className="opacity-45 hover:opacity-90 transition-opacity duration-200">
                  <svg width="130" height="36" viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="0" y="26" fontFamily="Arial, Helvetica, sans-serif" fontWeight="400" fontSize="20" fill="currentColor">Google</text><text x="72" y="26" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="20" fill="currentColor">News</text></svg>
                </a>
                <a href="https://menafn.com/1111101705/Kudo-Advisory-Launches-In-The-UAE-Bridging-The-Gap-Between-AI-Investments-And-Real-Business-Outcomes" target="_blank" rel="noopener noreferrer" role="listitem" className="opacity-45 hover:opacity-90 transition-opacity duration-200">
                  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="0" y="22" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="18" fill="currentColor" letterSpacing="0.5">MENAFN</text><text x="0" y="36" fontFamily="Arial, Helvetica, sans-serif" fontWeight="400" fontSize="9" fill="currentColor" letterSpacing="0.6">MIDDLE EAST FINANCE</text></svg>
                </a>
                <a href="https://intlbm.com/2026/05/14/kudo-advisory-bridges-middle-east-ai-investment-and-business-outcomes/" target="_blank" rel="noopener noreferrer" role="listitem" className="opacity-45 hover:opacity-90 transition-opacity duration-200">
                  <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="0" y="20" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="13" fill="currentColor" letterSpacing="0.3">INTERNATIONAL</text><text x="0" y="36" fontFamily="Arial, Helvetica, sans-serif" fontWeight="400" fontSize="13" fill="currentColor" letterSpacing="0.3">BUSINESS MAGAZINE</text></svg>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── OUTCOMES ── */}
        <section id="outcomes" aria-labelledby="outcomes-heading" className="relative py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("outcomes_label")}</p>
              <h2 id="outcomes-heading" className="text-3xl md:text-5xl mb-16">{t("outcomes_h2")}</h2>
            </AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src={outcomesBg} alt="Enterprise leadership team in boardroom reviewing AI strategy" className="w-full h-[420px] object-cover" loading="lazy" width="700" height="420" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" aria-hidden="true" />
                </div>
              </AnimatedSection>
              <div className="grid gap-4">
                {outcomes.map((o, i) => (
                  <AnimatedSection key={i} delay={i * 110}>
                    <article className="card-hover flex gap-5 p-5 rounded-xl bg-card border border-border group">
                      <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                        <o.icon className="icon-hover w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-foreground">{t(o.titleKey)}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{t(o.descKey)}</p>
                      </div>
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" aria-labelledby="services-heading" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" aria-hidden="true" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("services_label")}</p>
              <h2 id="services-heading" className="text-3xl md:text-5xl mb-4">{t("services_h2")}</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {services.slice(0, 3).map((s, i) => (
                <AnimatedSection key={i} delay={i * 90}>
                  <a href={s.href} className="card-hover card-sweep p-6 rounded-xl bg-card border border-border h-full group flex flex-col">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                      <s.icon className="icon-hover w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{t(s.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{t(s.descKey)}</p>
                    <p className="text-primary text-xs font-medium mt-3 flex items-center gap-1">
                      {isRTL ? "اعرف المزيد" : "Learn more"} <ChevronRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
                    </p>
                  </a>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden mb-10 shadow-xl">
                <img src={servicesBg} alt="Enterprise team collaborating on AI strategy" className="w-full h-52 md:h-64 object-cover" loading="lazy" width="1200" height="256" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-background/70" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-2xl md:text-3xl font-semibold text-foreground/90 text-center px-6">
                    "{t("footer_tagline")}"
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-5">
              {services.slice(3).map((s, i) => (
                <AnimatedSection key={i} delay={i * 90}>
                  <a href={s.href} className="card-hover card-sweep p-6 rounded-xl bg-card border border-border h-full group flex flex-col">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                      <s.icon className="icon-hover w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{t(s.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{t(s.descKey)}</p>
                    <p className="text-primary text-xs font-medium mt-3 flex items-center gap-1">
                      {isRTL ? "اعرف المزيد" : "Learn more"} <ChevronRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
                    </p>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section id="how" aria-labelledby="how-heading" className="relative py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden mb-16 shadow-xl">
                <img src={howWeWorkBg} alt="AI advisory team planning strategy and governance" className="w-full h-52 md:h-64 object-cover" loading="lazy" width="1200" height="256" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" aria-hidden="true" />
              </div>
            </AnimatedSection>
          </div>
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("how_label")}</p>
              <h2 id="how-heading" className="text-3xl md:text-5xl mb-4">{t("how_h2")}</h2>
            </AnimatedSection>
            <ol className="space-y-0 mt-16" aria-label="AI advisory engagement phases">
              {steps.map((s, i) => (
                <AnimatedSection key={i} delay={i * 140}>
                  <li className="flex gap-8 items-start group">
                    <div className="flex flex-col items-center">
                      <StepNumber num={t(s.numKey)} />
                      {i < steps.length - 1 && (
                        <div className="w-px h-20 bg-border/60 mt-3" aria-hidden="true">
                          <ArrowDown className="w-4 h-4 text-muted-foreground/50 -ml-[7px] mt-16" />
                        </div>
                      )}
                    </div>
                    <div className="pb-12">
                      <h3 className="text-xl font-semibold mb-2">{t(s.titleKey)}</h3>
                      <p className="text-muted-foreground leading-relaxed">{t(s.descKey)}</p>
                    </div>
                  </li>
                </AnimatedSection>
              ))}
            </ol>
          </div>
        </section>

        {/* ── ABOUT / FOUNDER STRIP ── */}
        <section id="about" aria-labelledby="about-heading" className="py-24 md:py-32 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("founder_label")}</p>
              <h2 id="about-heading" className="text-3xl md:text-5xl mb-8">{t("founder_h2")}</h2>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <figure className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={founderBg}
                      alt="Vijay Jaswal, Founder and CEO of Kudo Advisory, presenting AI strategy at a conference"
                      className="w-full h-[360px] object-cover object-[50%_20%]"
                      loading="lazy" width="560" height="360"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" aria-hidden="true" />
                    <figcaption className="text-sm text-muted-foreground mt-3 px-1">
                      Vijay Jaswal, Founder &amp; CEO, Kudo Advisory
                    </figcaption>
                  </figure>

                  <div className="flex items-start gap-4">
                    <p className="text-4xl leading-none" aria-label="Kudo in Japanese - driving force">駆動</p>
                    <div>
                      <p className="font-semibold text-foreground">Kudo (駆動)</p>
                      <p className="text-sm text-muted-foreground">
                        {isRTL ? "يابانية · القوة الدافعة أو الدفع" : "Japanese · driving force or propulsion"}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {t("founder_body")}
                  </p>

                  <div className="pt-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium mb-4">
                      {isRTL ? "سبق أن عمل في" : "Previously at"}
                    </p>
                    <div className="flex flex-wrap items-start gap-6">
                      {[
                        { name: "IFS", sub: "CTO, APJMEA" },
                        { name: "Software AG", sub: "CTO, Middle East" },
                        { name: "ByteSpark.ai", sub: "Chief Commercial Officer" },
                      ].map((emp) => (
                        <div key={emp.name} className="flex flex-col">
                          <span className="font-semibold text-sm text-foreground">{emp.name}</span>
                          <span className="text-xs text-muted-foreground">{emp.sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a href="/about" className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                    {t("founder_cta")} <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} aria-hidden="true" />
                  </a>
                </div>

                <div className="grid gap-4">
                  {[
                    {
                      en_title: "Outcome-led",
                      ar_title: "يركز على النتائج",
                      en_desc: "Every AI advisory engagement ties to a measurable business result. We define success before we start.",
                      ar_desc: "كل مشاركة استشارية في الذكاء الاصطناعي مرتبطة بنتيجة أعمال قابلة للقياس. نحدد معنى النجاح قبل أن نبدأ.",
                    },
                    {
                      en_title: "Governed",
                      ar_title: "محكوم",
                      en_desc: "Responsible AI governance is built into our approach from day one, not added at the end.",
                      ar_desc: "حوكمة الذكاء الاصطناعي المسؤولة مدمجة في نهجنا من اليوم الأول، لا تُضاف في النهاية.",
                    },
                    {
                      en_title: "Delivery-first",
                      ar_title: "التسليم أولاً",
                      en_desc: "We ship outcomes, not slide decks. Our advisory is designed to drive execution, not perpetuate dependency.",
                      ar_desc: "نُسلّم نتائج لا عروضاً تقديمية. استشاراتنا مصممة لدفع التنفيذ، لا لإدامة الاعتماد.",
                    },
                    {
                      en_title: "Vendor-independent",
                      ar_title: "مستقل عن الموردين",
                      en_desc: "No software to sell. No implementation partnerships. Just unbiased advice accountable to your outcomes.",
                      ar_desc: "لا برمجيات لبيعها. لا شراكات تنفيذ. فقط نصيحة محايدة مسؤولة أمام نتائجك.",
                    },
                  ].map((item) => (
                    <div key={item.en_title} className="p-5 rounded-xl bg-card border border-border">
                      <h3 className="font-semibold mb-1 text-foreground">{isRTL ? item.ar_title : item.en_title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{isRTL ? item.ar_desc : item.en_desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section aria-labelledby="testimonials-heading" className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("testimonials_label")}</p>
              <h2 id="testimonials-heading" className="text-3xl md:text-5xl mb-16">{t("testimonials_h2")}</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((item, i) => (
                <AnimatedSection key={i} delay={i * 90}>
                  <figure className="testimonial-card h-full flex flex-col p-7 rounded-2xl border border-border bg-card">
                    <div className="quote-mark" aria-hidden="true" />
                    <blockquote className="flex-1">
                      <p className="text-muted-foreground leading-relaxed text-sm">{t(item.quoteKey)}</p>
                    </blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-border/50">
                      <p className="font-semibold text-sm text-foreground">{t(item.nameKey)}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t(item.orgKey)}</p>
                    </figcaption>
                  </figure>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── UAE LEADER VISUAL STRIP ── */}
        <section aria-label="Enterprise AI advisory across the UAE and Middle East" className="relative h-[420px] overflow-hidden">
          <img
            src={leaderBg}
            alt="Enterprise leader with Dubai skyline and Burj Khalifa — AI advisory across the UAE"
            className="w-full h-full object-cover object-top"
            loading="lazy" width="1400" height="420"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/20" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">
                {isRTL ? "الإمارات والشرق الأوسط" : "UAE & Middle East"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 max-w-xl">
                {isRTL
                  ? "نخدم قادة المؤسسات عبر الإمارات والشرق الأوسط"
                  : "Serving enterprise leaders across the UAE and Middle East"}
              </h2>
              <p className="text-muted-foreground max-w-md leading-relaxed mb-6">
                {isRTL
                  ? "دبي · أبوظبي · الشارقة · المملكة العربية السعودية · قطر · البحرين · الكويت · عُمان"
                  : "Dubai · Abu Dhabi · Sharjah · Saudi Arabia · Qatar · Bahrain · Kuwait · Oman"}
              </p>
              <a href="/ai-advisory-uae" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                {isRTL ? "استشارات الذكاء الاصطناعي في الإمارات" : "AI Advisory UAE"} <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </a>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" aria-labelledby="contact-heading" className="py-24 md:py-32 bg-secondary/10">
          <div className="max-w-3xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("contact_label")}</p>
              <h2 id="contact-heading" className="text-3xl md:text-5xl mb-4">{t("contact_h2")}</h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">{t("contact_body")}</p>
            </AnimatedSection>

            <AnimatedSection delay={80}>
              <address className="flex gap-6 mb-10 flex-wrap not-italic">
                <a href="mailto:info@kudoadvisory.com" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm">
                  <Mail className="w-4 h-4" aria-hidden="true" /> info@kudoadvisory.com
                </a>
                <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm">
                  <Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn - Vijay Jaswal
                </a>
              </address>
            </AnimatedSection>

            <AnimatedSection delay={130}>
              <div className="mb-12 rounded-2xl border border-border overflow-hidden bg-card">
                <div className="px-6 pt-6 pb-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-1">{t("contact_calendly_h3")}</p>
                  <p className="text-muted-foreground text-sm">{t("contact_calendly_body")}</p>
                </div>
                <iframe
                  src="https://calendly.com/vijayjaswal-kudoadvisory/30min?background_color=1a2332&text_color=e2e8f0&primary_color=d4a853"
                  width="100%" height="400" frameBorder="0"
                  title="Book a discovery call with Vijay Jaswal, Kudo Advisory"
                  loading="lazy" className="w-full"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={180}>
              <p className="text-sm text-muted-foreground mb-6">{t("contact_or")}</p>
              <form className="space-y-5" onSubmit={handleContactSubmit} aria-label="Contact form" noValidate>
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-2">{t("contact_name")}</label>
                  <input id="contact-name" type="text" name="name" required autoComplete="name"
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-2">{t("contact_email")}</label>
                  <input id="contact-email" type="email" name="email" required autoComplete="email"
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-2">{t("contact_message")}</label>
                  <textarea id="contact-message" name="message" rows={5}
                    value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t("contact_message_placeholder")}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none text-sm" />
                </div>
                <Button type="submit" disabled={isSending} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full disabled:opacity-60" aria-busy={isSending}>
                  {isSending ? t("contact_sending") : t("contact_send")}
                </Button>
                {formStatus === "success" && <p role="status" className="text-sm text-primary mt-2">{t("contact_success")}</p>}
                {formStatus === "error" && (
                  <p role="alert" className="text-sm text-destructive mt-2">
                    {t("contact_error")}{" "}
                    <a className="underline" href="mailto:info@kudoadvisory.com">info@kudoadvisory.com</a>
                  </p>
                )}
              </form>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-border/60 bg-card/30" aria-label="Site footer">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <img src={kudoLogo} alt="Kudo Advisory" className="h-12 w-auto mb-4" width="120" height="48" />
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{t("footer_description")}</p>
              <div className="flex gap-4 mt-5">
                <a href="mailto:info@kudoadvisory.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email Kudo Advisory"><Mail className="w-5 h-5" /></a>
                <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">{t("footer_services")}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {([0,1,2,3,4,5] as const).map((i) => (
                  <li key={i}><a href={serviceHrefs[i]} className="hover:text-primary transition-colors">{t(`services_${i}_title` as const)}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">{t("footer_company")}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  { href: "/about", label: t("nav_about") },
                  { href: "/insights", label: t("nav_insights") },
                  { href: "/faq", label: t("nav_faq") },
                  { href: "#contact", label: t("nav_contact") },
                  { href: "/ai-advisory-uae", label: isRTL ? "استشارات الذكاء الاصطناعي في الإمارات" : "AI Advisory UAE" },
                ].map((l) => (
                  <li key={l.href}><a href={l.href} className="hover:text-primary transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <hr className="section-rule mb-8" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} <a href="/" className="hover:text-foreground transition-colors">Kudo Advisory</a>, {t("footer_tagline")} {t("footer_rights")}</p>
            <p><a href="mailto:info@kudoadvisory.com" className="hover:text-foreground transition-colors">info@kudoadvisory.com</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
