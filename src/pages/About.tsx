// src/pages/About.tsx
import { useEffect } from "react";
import { Mail, Linkedin, Award, Mic, BookOpen, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import founderBg from "@/assets/VJ_Biz_Image_2026.webp";
import { PageMeta } from "@/components/PageMeta";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number; }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${className}`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const recognitionData = {
  en: [
    { icon: Award, title: "Top 50 Technology Leaders in the Middle East", source: "Engati", desc: "Named among the 50 most influential technology leaders across the Middle East region." },
    { icon: BookOpen, title: "A 30-Year Journey in the Technology Industry", source: "The CIO World", desc: "Featured interview covering Vijay's career, leadership philosophy, and perspective on enterprise AI." },
    { icon: Mic, title: "International Speaker", source: "Enterprise AI & Governance", desc: "Regular speaker at regional and international events on enterprise AI, AI governance, and operational intelligence." },
    { icon: Building2, title: "University of Bradford", source: "Education", desc: "Studied at the University of Bradford, UK." },
  ],
  ar: [
    { icon: Award, title: "أحد أبرز 50 قائداً تقنياً في الشرق الأوسط", source: "إنغاتي", desc: "صُنِّف ضمن أكثر 50 قائداً تقنياً تأثيراً في منطقة الشرق الأوسط." },
    { icon: BookOpen, title: "رحلة 30 عاماً في صناعة التقنية", source: "The CIO World", desc: "مقابلة مميزة تغطي مسيرة فيجاي المهنية وفلسفته القيادية ووجهة نظره في الذكاء الاصطناعي المؤسسي." },
    { icon: Mic, title: "متحدث دولي", source: "الذكاء الاصطناعي المؤسسي والحوكمة", desc: "متحدث منتظم في الفعاليات الإقليمية والدولية حول الذكاء الاصطناعي المؤسسي وحوكمته والذكاء التشغيلي." },
    { icon: Building2, title: "جامعة برادفورد", source: "التعليم", desc: "درس في جامعة برادفورد، المملكة المتحدة." },
  ],
};

const press = [
  { publication: "AP News", headline: "Middle East Enterprises Face Growing Challenge Turning AI Investment Into Operational Results", url: "https://apnews.com/press-release/ein-presswire-newsmatics/middle-east-enterprises-face-growing-challenge-turning-ai-investment-into-operational-results-ea9c2d6d8d68dccd6485a3c2f7f8cef9" },
  { publication: "CXO Insight Middle East", headline: "Kudo Advisory Launched to Drive AI Business Outcomes in the Middle East", url: "https://www.cxoinsightme.com/future/tech/kudo-advisory-launched-to-drive-ai-business-outcomes-in-the-middle-east/" },
  { publication: "ZAWYA", headline: "Kudo Advisory Launched to Bridge the Gap Between AI Investments and Real Business Outcomes", url: "https://www.zawya.com/en/press-release/companies-news/kudo-advisory-launched-to-bridge-the-gap-between-ai-investments-and-real-business-outcomes-in-the-middle-east-hbcf7sn4" },
  { publication: "International Business Magazine", headline: "Kudo Advisory Bridges Middle East AI Investment and Business Outcomes", url: "https://intlbm.com/2026/05/14/kudo-advisory-bridges-middle-east-ai-investment-and-business-outcomes/" },
  { publication: "TechDogs", headline: "Vijay Jaswal on Scaling Asset Intelligence, AI and Business Agility", url: "https://www.techdogs.com/inspire/discover-dialogues/vijay-jaswal-on-scaling-asset-intelligence-ai-and-business-agility" },
  { publication: "Channel Post MEA", headline: "Kudo Advisory Opens UAE Office to Drive Real AI Business Impact", url: "https://channelpostmea.com/2026/05/14/kudo-advisory-opens-uae-office-to-drive-real-ai-business-impact/" },
  { publication: "Business News This Week", headline: "Kudo Advisory Launches to Drive AI-Led Business Growth in Middle East", url: "https://businessnewsthisweek.com/business/kudo-advisory-launches-to-drive-ai-led-business-growth-in-middle-east/" },
  { publication: "TradingView (ZAWYA)", headline: "Kudo Advisory Launched to Bridge the Gap Between AI Investments and Real Business Outcomes", url: "https://www.tradingview.com/news/reuters.com,2026-05-14:newsml_Zaw8VhzLy:0-zawya-kudo-advisory-launched-to-bridge-the-gap-between-ai-investments-and-real-business-outcomes-in-the-middle-east/" },
  { publication: "Dubai City Guide", headline: "Kudo Advisory Launches in the UAE, Bridging AI Investments and Real Business Outcomes", url: "https://www.dubaicityguide.com/site/features/12924/kudo-advisory-launches-in-the-uae-bridging-the-gap-between-ai-investments-and-real-business-outcomes" },
  { publication: "The Source Code", headline: "Kudo Advisory: Why Most Enterprise AI Pilots Fail to Scale", url: "https://www.the-sourcecode.com/business-tech/kudo-advisory-enterprise-ai-pilots-fail-scale" },
];

export default function About() {
  const { t, isRTL, lang } = useLanguage();
  const recognition = recognitionData[lang];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <PageMeta
        title="About Kudo Advisory | AI Advisory Firm Dubai, UAE | Vijay Jaswal"
        description="Kudo Advisory is an independent AI advisory firm founded in Dubai, UAE by Vijay Jaswal. We help CIOs, CDOs and enterprise leaders across the UAE, Saudi Arabia and Middle East turn AI investment into governed, measurable business outcomes. Learn about our mission, founder and approach."
        canonical="https://www.kudoadvisory.com/about"
        ogImage="https://www.kudoadvisory.com/og/about.jpg"
      />

      <SiteNav active="/about" />

      <main id="main-content">

        <section className="pt-40 pb-16 px-6 bg-secondary/20">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("about_page_label")}</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("about_page_h1")}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">{t("about_page_body")}</p>
            </AnimatedSection>
          </div>
        </section>

        <section aria-labelledby="firm-heading" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <AnimatedSection>
                <h2 id="firm-heading" className="text-2xl font-bold mb-6">{t("about_mission_h2")}</h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>{t("about_mission_p1")}</p>
                  <p>{t("about_mission_p2")}</p>
                  <p>{t("about_mission_p3")}</p>
                  <p>{t("about_mission_p4")}</p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={100}>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "2026", labelKey: "about_stat_founded" as const },
                      { value: "Dubai", labelKey: "about_stat_hq" as const },
                      { value: "UAE + GCC", labelKey: "about_stat_markets" as const },
                      { value: lang === "ar" ? "مستقل" : "Independent", labelKey: "about_stat_vendor" as const },
                    ].map((stat) => (
                      <div key={stat.label} className="p-5 rounded-xl border border-border bg-card">
                        <p className="text-xl font-bold text-primary">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t(stat.labelKey)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 rounded-2xl border border-border bg-card">
                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-primary">{t("about_what_we_do")}</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {([0,1,2,3,4,5] as const).map((i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                          {t(`services_${i}_title` as const)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="pt-20 pb-0 px-6 bg-secondary/20">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-2">{t("about_founder_label")}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-0">Vijay Jaswal</h2>
            </AnimatedSection>
          </div>
        </section>

        <section aria-labelledby="bio-heading" className="py-20 px-6 bg-secondary/20">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <AnimatedSection>
                <figure className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src={founderBg} alt="Vijay Jaswal - Founder of Kudo Advisory" className="w-full h-[480px] object-cover object-[50%_20%]" width="600" height="480" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" aria-hidden="true" />
                  <figcaption className="absolute bottom-4 left-4 text-sm text-foreground/80">Vijay Jaswal - Founder of Kudo Advisory</figcaption>
                </figure>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { value: "25+", labelKey: "about_stat_exp" as const },
                    { value: "17+", labelKey: "about_stat_softag" as const },
                    { value: "5", labelKey: "about_stat_regions" as const },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 rounded-xl border border-border bg-card">
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t(stat.labelKey)}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
              <AnimatedSection delay={100}>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>{t("about_bio_p1")}</p>
                  <p>{t("about_bio_p2")}</p>
                  <p>{t("about_bio_p3")}</p>
                  <p>{t("about_bio_p4")}</p>
                  <p>{t("about_bio_p5")}</p>
                </div>
                <div className="flex gap-4 mt-8">
                  <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"><Linkedin className="w-4 h-4" /> LinkedIn</a>
                  <a href="mailto:info@kudoadvisory.com" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"><Mail className="w-4 h-4" /> info@kudoadvisory.com</a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section aria-labelledby="recognition-heading" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-2">{t("about_recognition_label")}</p>
              <h2 id="recognition-heading" className="text-3xl md:text-4xl font-bold mb-12">{t("about_recognition_h2")}</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-5">
              {recognition.map((item, i) => (
                <AnimatedSection key={i} delay={i * 80}>
                  <div className="flex gap-5 p-6 rounded-2xl border border-border bg-card">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-primary mb-2">{item.source}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="press-heading" className="py-20 px-6 bg-secondary/20">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-2">{t("about_press_label")}</p>
              <h2 id="press-heading" className="text-3xl md:text-4xl font-bold mb-12">{t("about_press_h2")}</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-5">
              {press.map((item, i) => (
                <AnimatedSection key={i} delay={i * 60}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-secondary/20 transition-all duration-200 group">
                    <p className="text-xs text-primary font-medium uppercase tracking-wide mb-2">{item.publication}</p>
                    <p className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors">{item.headline}</p>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Watch & Listen ── */}
        <section aria-labelledby="watch-heading" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-2">{isRTL ? "شاهد واستمع" : "Watch & Listen"}</p>
              <h2 id="watch-heading" className="text-3xl md:text-4xl font-bold mb-12">{isRTL ? "فيجاي في وسائل الإعلام" : "Vijay in the media"}</h2>
            </AnimatedSection>

            {/* Fast Company pull-quote */}
            <AnimatedSection>
              <figure className="mb-12 p-8 md:p-10 rounded-2xl border border-border bg-card">
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-foreground">
                  {isRTL
                    ? "«يساعد الذكاء الاصطناعي المُصمَّم خصيصاً على تعظيم أداء الأصول والمواءمة مع الأهداف الاستراتيجية الوطنية.»"
                    : "“Tailored AI helps maximize asset performance and align with national strategic goals.”"}
                </blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">
                  {isRTL ? "فيجاي جسوال، كما نُقل في " : "Vijay Jaswal, as quoted in "}
                  <a href="https://fastcompanyme.com/technology/the-middle-east-is-all-set-to-adopt-industrial-ai-but-its-fraught-with-challenges/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fast Company Middle East</a>
                </figcaption>
              </figure>
            </AnimatedSection>

            {/* Video thumbnails (open YouTube in a new tab) */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { thumb: "/media/techdogs.jpg", title: isRTL ? "توسيع ذكاء الأصول والذكاء الاصطناعي ورشاقة الأعمال" : "Scaling Asset Intelligence, AI & Business Agility", source: "TechDogs · Discover Dialogues", url: "https://www.youtube.com/shorts/SfhDywUmd4g" },
                { thumb: "/media/leap22.jpg", title: isRTL ? "مقابلة LEAP حول الذكاء الاصطناعي المؤسسي" : "Exhibitor interview on enterprise AI", source: "LEAP · Riyadh", url: "https://www.youtube.com/watch?v=98s-ZgwezHs" },
              ].map((v, i) => (
                <AnimatedSection key={i} delay={i * 80}>
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all">
                    <div className="relative">
                      <img src={v.thumb} alt={v.title} width={1280} height={720} loading="lazy" className="w-full aspect-video object-cover" />
                      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                        <span className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        </span>
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-primary font-medium uppercase tracking-wide mb-2">{v.source}</p>
                      <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">{v.title}</p>
                    </div>
                  </a>
                </AnimatedSection>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-5">
              {isRTL ? "تُفتح مقاطع الفيديو على يوتيوب في نافذة جديدة." : "Videos open on YouTube in a new tab."}
            </p>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("about_cta_label")}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about_cta_h2")}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">{t("about_cta_body")}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/#contact" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">{t("nav_book_full")}</Link>
                <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 justify-center rounded-full border border-border px-8 py-3 text-sm font-medium hover:border-primary/40 transition-colors"><Linkedin className="w-4 h-4" /> {t("about_cta_linkedin")}</a>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
