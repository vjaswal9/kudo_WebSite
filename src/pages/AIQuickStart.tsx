// src/pages/AIQuickStart.tsx
// Productised entry-point engagement: a fixed, fast assessment that gives
// organisations a clear starting point before a full transformation.
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check, Clock, Wallet, Target, Compass, Mail, ChevronRight } from "lucide-react";
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

export default function AIQuickStart() {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const included = [
    { en: "Current state analysis", ar: "تحليل الوضع الحالي" },
    { en: "Tool inventory and spend audit", ar: "جرد الأدوات ومراجعة الإنفاق" },
    { en: "Security and compliance gap assessment", ar: "تقييم فجوات الأمن والامتثال" },
    { en: "Priority recommendations", ar: "توصيات حسب الأولوية" },
    { en: "Phased roadmap with investment options", ar: "خارطة طريق مرحلية مع خيارات الاستثمار" },
  ];

  const facts = [
    { icon: Wallet, label: t("Investment", "الاستثمار"), value: t("Request a quote", "اطلب عرض سعر") },
    { icon: Clock, label: t("Timeline", "المدة"), value: t("1 to 2 weeks", "أسبوع إلى أسبوعين") },
    { icon: Target, label: t("Best for", "الأنسب لـ"), value: t("Organisations wanting to understand their starting point before committing to a full transformation", "المؤسسات التي تريد فهم نقطة انطلاقها قبل الالتزام بتحول كامل") },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <PageMeta
        title="AI Quick-Start Assessment | Kudo Advisory UAE"
        description="A fast, fixed-scope AI Quick-Start Assessment from Kudo Advisory. Current state analysis, tool and spend audit, security and compliance gaps, priority recommendations and a phased roadmap. Know exactly where you stand before committing to a full AI transformation."
        canonical="https://www.kudoadvisory.com/ai-quick-start"
        ogImage="https://www.kudoadvisory.com/og/quickstart.jpg"
      />

      <SiteNav active="/ai-quick-start" />

      <main id="main-content">
        {/* Hero */}
        <section className="pt-36 pb-16 px-6 bg-secondary/10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <Breadcrumbs
                items={[
                  { label: t("Home", "الرئيسية"), href: "/" },
                  { label: t("Services", "الخدمات"), href: "/services" },
                  { label: t("AI Quick-Start Assessment", "تقييم الانطلاق السريع") },
                ]}
              />
            </div>
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.35em] text-primary font-medium mb-4">
                {t("Entry-point engagement", "نقطة انطلاق")}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                {t("AI Quick-Start Assessment", "تقييم الانطلاق السريع للذكاء الاصطناعي")}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
                {t(
                  "A focused, hands-on assessment that maps exactly where you stand and hands you a clear, prioritised action plan, before you commit to a full transformation. Lower commitment, fast turnaround, real clarity.",
                  "تقييم عملي ومركّز يحدد بدقة موقعك الحالي ويمنحك خطة عمل واضحة ومرتبة حسب الأولوية، قبل الالتزام بتحول كامل. التزام أقل، إنجاز سريع، ووضوح حقيقي."
                )}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                  <a href="https://calendly.com/vijayjaswal-kudoadvisory/30min" target="_blank" rel="noopener noreferrer">{t("Book an appointment to discuss", "احجز موعداً للنقاش")}</a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-border px-8 py-3 text-base">
                  <Link to="/ai-readiness-assessment">{t("Try the free 3-minute assessment", "جرّب التقييم المجاني خلال 3 دقائق")}</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* What's included */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("What's included", "ما الذي يشمله")}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("A complete picture in one to two weeks", "صورة كاملة خلال أسبوع إلى أسبوعين")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "We work hands-on with your team to understand where you are today, what you are already spending, where the risks sit, and what to do next. You finish with a plan you can act on, not a slide deck that gathers dust.",
                  "نعمل عن قرب مع فريقك لفهم وضعك اليوم، وما تنفقه بالفعل، وأين تكمن المخاطر، وما الخطوة التالية. تنتهي بخطة قابلة للتنفيذ، لا بعرض تقديمي يجمع الغبار."
                )}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <ul className="space-y-4">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-foreground">{t(item.en, item.ar)}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>

        {/* Facts: investment / timeline / best for */}
        <section className="pb-8 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {facts.map((f, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="h-full p-7 rounded-2xl border border-border bg-card">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">{f.label}</p>
                  <p className="text-foreground leading-relaxed">{f.value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Outcome banner */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-10 flex items-start gap-5">
                <Compass className="w-8 h-8 text-primary shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-2">{t("The outcome", "النتيجة")}</p>
                  <p className="text-2xl md:text-3xl font-bold leading-snug">
                    {t("A clear action plan, and the confidence to proceed.", "خطة عمل واضحة، والثقة للمضي قدماً.")}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* How it relates to the free assessment */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="text-xl font-bold mb-3">{t("Not sure where to start?", "غير متأكد من أين تبدأ؟")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {t(
                    "The free AI Readiness Assessment is a 3-minute, self-serve score across six foundations. The Quick-Start Assessment is the hands-on, paid next step: a deeper, tailored review of your situation with a concrete plan. Many clients start with the free score, then book a Quick-Start.",
                    "تقييم جاهزية الذكاء الاصطناعي المجاني هو درجة ذاتية خلال 3 دقائق عبر ست ركائز. أما تقييم الانطلاق السريع فهو الخطوة التالية العملية المدفوعة: مراجعة أعمق ومخصصة لوضعك مع خطة ملموسة. يبدأ كثير من العملاء بالدرجة المجانية ثم يحجزون الانطلاق السريع."
                  )}
                </p>
                <Link to="/ai-readiness-assessment" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  {t("Take the free assessment first", "ابدأ بالتقييم المجاني")}
                  <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} aria-hidden="true" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-secondary/10">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("Get started", "ابدأ الآن")}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("Ready to find your starting point?", "هل أنت مستعد لتحديد نقطة انطلاقك؟")}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t(
                  "Tell us a little about your organisation and we'll send a quote and a proposed scope for your AI Quick-Start Assessment.",
                  "أخبرنا قليلاً عن مؤسستك وسنرسل لك عرض سعر ونطاقاً مقترحاً لتقييم الانطلاق السريع."
                )}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                  <a href="https://calendly.com/vijayjaswal-kudoadvisory/30min" target="_blank" rel="noopener noreferrer">{t("Book an appointment to discuss", "احجز موعداً للنقاش")}</a>
                </Button>
                <a href="mailto:info@kudoadvisory.com" className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-medium hover:border-primary/40 transition-colors">
                  <Mail className="w-4 h-4" /> info@kudoadvisory.com
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
