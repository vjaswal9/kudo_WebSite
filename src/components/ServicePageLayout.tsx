// src/components/ServicePageLayout.tsx
// Shared layout for all 6 service pages — bilingual, SEO-optimised, UAE-focused.

import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LangToggle } from "@/components/LangToggle";
import { PageMeta } from "@/components/PageMeta";
import kudoLogo from "@/assets/kudo-logo.png";
import { Mail, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React from "react";

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${className}`}
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(24px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export interface ServiceFaq { q: string; a: string; q_ar: string; a_ar: string; }

export interface ServicePageProps {
  // SEO
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  schemaServiceName: string;
  schemaServiceDescription: string;
  // Content — English
  categoryLabel: string;
  heading: string;
  subheading: string;
  intro: string;
  deliverables: string[];
  audience: string[];
  processSteps: { num: string; title: string; desc: string }[];
  uaeContext: string;
  faqs: ServiceFaq[];
  ctaHeading: string;
  ctaBody: string;
  // Content — Arabic
  categoryLabel_ar: string;
  heading_ar: string;
  subheading_ar: string;
  intro_ar: string;
  deliverables_ar: string[];
  audience_ar: string[];
  processSteps_ar: { num: string; title: string; desc: string }[];
  uaeContext_ar: string;
  ctaHeading_ar: string;
  ctaBody_ar: string;
}

const NAV_ITEMS = [
  { href: "/", en: "Home", ar: "الرئيسية" },
  { href: "/services", en: "Services", ar: "الخدمات" },
  { href: "/about", en: "About", ar: "من نحن" },
  { href: "/insights", en: "Insights", ar: "المقالات" },
  { href: "/faq", en: "FAQ", ar: "الأسئلة الشائعة" },
  { href: "/#contact", en: "Contact", ar: "تواصل معنا" },
];

const ALL_SERVICES = [
  { href: "/services/ai-strategy", en: "AI Strategy", ar: "استراتيجية الذكاء الاصطناعي" },
  { href: "/services/ai-governance", en: "AI Governance", ar: "حوكمة الذكاء الاصطناعي" },
  { href: "/services/ai-operating-model", en: "AI Operating Model", ar: "نموذج التشغيل" },
  { href: "/services/ai-use-case-prioritisation", en: "Use Case Prioritisation", ar: "تحديد الأولويات" },
  { href: "/services/leadership-enablement", en: "Leadership Enablement", ar: "تمكين القيادة" },
  { href: "/services/ai-delivery-assurance", en: "Delivery Assurance", ar: "ضمان التسليم" },
];

export function ServicePageLayout(props: ServicePageProps) {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";

  const t = <E, A>(en: E, ar: A): E | A => isAr ? ar : en;

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <PageMeta
        title={props.metaTitle}
        description={props.metaDescription}
        canonical={props.canonical}
      />

      {/* Service schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": props.schemaServiceName,
        "description": props.schemaServiceDescription,
        "provider": {
          "@type": "Organization",
          "@id": "https://www.kudoadvisory.com/#organization",
          "name": "Kudo Advisory",
          "url": "https://www.kudoadvisory.com"
        },
        "areaServed": ["UAE", "Dubai", "Abu Dhabi", "Saudi Arabia", "Middle East"],
        "url": props.canonical,
        "serviceType": "AI Advisory",
        "inLanguage": ["en", "ar"]
      })}} />

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" aria-label="Kudo Advisory home">
            <img src={kudoLogo} alt="Kudo Advisory" className="h-12 sm:h-14 w-auto" width="160" height="56" />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} to={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {t(item.en, item.ar)}
              </Link>
            ))}
            <LangToggle />
            <Link to="/#contact" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              {t("Book a Call", "احجز مكالمة")} <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </div>
          <div className="md:hidden"><LangToggle /></div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="pt-36 pb-16 px-6 bg-secondary/10">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.35em] text-primary font-medium mb-4">
                {t(props.categoryLabel, props.categoryLabel_ar)}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                {t(props.heading, props.heading_ar)}
              </h1>
              <p className="text-xl text-primary/80 font-medium mb-6">
                {t(props.subheading, props.subheading_ar)}
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-8">
                {t(props.intro, props.intro_ar)}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                  <Link to="/#contact">{t("Book a Discovery Call", "احجز مكالمة استكشافية")}</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-border px-8 py-3 text-base">
                  <Link to="/services">{t("All Services", "جميع الخدمات")}</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <AnimatedSection>
                <h2 className="text-2xl font-bold mb-6">{t("What we deliver", "ما الذي نقدمه")}</h2>
                <ul className="space-y-3">
                  {(isAr ? props.deliverables_ar : props.deliverables).map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
              <AnimatedSection delay={100}>
                <h2 className="text-2xl font-bold mb-6">{t("Who this is for", "لمن هذه الخدمة")}</h2>
                <ul className="space-y-3">
                  {(isAr ? props.audience_ar : props.audience).map((a, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                      <span className="text-muted-foreground leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-6 bg-secondary/10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-2xl font-bold mb-12">{t("How we work", "كيف نعمل")}</h2>
            </AnimatedSection>
            <div className="space-y-6">
              {(isAr ? props.processSteps_ar : props.processSteps).map((step, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="flex gap-6 p-6 rounded-2xl bg-card border border-border">
                    <span className="text-3xl font-bold text-primary/30 shrink-0">{step.num}</span>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* UAE Context */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">
                {t("UAE & Middle East Context", "السياق الإماراتي والشرق أوسطي")}
              </p>
              <h2 className="text-2xl font-bold mb-6">
                {t("Why this matters in the UAE", "لماذا هذا مهم في الإمارات")}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t(props.uaeContext, props.uaeContext_ar)}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* FAQs */}
        {props.faqs.length > 0 && (
          <section className="py-20 px-6 bg-secondary/10">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 className="text-2xl font-bold mb-10">{t("Frequently asked questions", "الأسئلة الشائعة")}</h2>
              </AnimatedSection>
              <div className="space-y-5">
                {props.faqs.map((faq, i) => (
                  <AnimatedSection key={i} delay={i * 80}>
                    <div className="p-6 rounded-2xl bg-card border border-border">
                      <h3 className="font-semibold mb-2">{t(faq.q, faq.q_ar)}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{t(faq.a, faq.a_ar)}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other services */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4">{t("Also from Kudo Advisory", "أيضاً من كودو أدفيزوري")}</p>
              <div className="flex flex-wrap gap-3">
                {ALL_SERVICES.filter(s => s.href !== props.canonical.replace("https://www.kudoadvisory.com", "")).map((s) => (
                  <Link key={s.href} to={s.href} className="px-4 py-2 rounded-full border border-border bg-card text-sm hover:border-primary/40 hover:text-primary transition-colors">
                    {t(s.en, s.ar)}
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-secondary/10">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("Start the Conversation", "ابدأ المحادثة")}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t(props.ctaHeading, props.ctaHeading_ar)}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">{t(props.ctaBody, props.ctaBody_ar)}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                  <Link to="/#contact">{t("Book a Discovery Call", "احجز مكالمة استكشافية")}</Link>
                </Button>
                <a href="mailto:info@kudoadvisory.com" className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-medium hover:border-primary/40 transition-colors">
                  <Mail className="w-4 h-4" /> info@kudoadvisory.com
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} <Link to="/" className="hover:text-foreground transition-colors">Kudo Advisory</Link> — {t("AI Advisory UAE, Dubai & Middle East.", "استشارات الذكاء الاصطناعي في الإمارات ودبي والشرق الأوسط.")} {t("All rights reserved.", "جميع الحقوق محفوظة.")}</p>
      </footer>
    </div>
  );
}
