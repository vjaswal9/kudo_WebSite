// src/pages/UAE.tsx
// Dedicated UAE landing page, targets "AI advisory UAE", "AI consultancy UAE"
// and "AI advisory United Arab Emirates" search queries.
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import leaderBg from "@/assets/about-leader.webp";
import heroBg from "@/assets/hero-abstract.webp";
import { Mail, ChevronRight, Brain, FileCheck, Settings, ListChecks, Users, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/CountUp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React from "react";

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${className}`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(28px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const services = [
  { icon: Brain, en: "AI Strategy", ar: "استراتيجية الذكاء الاصطناعي", desc_en: "A clear, prioritised AI roadmap aligned to UAE business goals and board expectations.", desc_ar: "خارطة طريق واضحة للذكاء الاصطناعي مواءمة لأهداف الأعمال الإماراتية وتوقعات مجلس الإدارة." },
  { icon: FileCheck, en: "AI Policy & Governance", ar: "سياسة وحوكمة الذكاء الاصطناعي", desc_en: "AI governance frameworks built for the UAE regulatory landscape, TDRA, ADGM, DIFC compliant.", desc_ar: "أطر حوكمة مُبنية للبيئة التنظيمية الإماراتية, متوافقة مع هيئة تنظيم الاتصالات وADGM وDIFC." },
  { icon: Settings, en: "AI Operating Model Design", ar: "تصميم نموذج التشغيل", desc_en: "Structure UAE enterprise teams, processes and technology to scale AI responsibly.", desc_ar: "هيكلة فرق ومؤسسات الإمارات لتوسيع الذكاء الاصطناعي بمسؤولية." },
  { icon: ListChecks, en: "AI Use Case Prioritisation", ar: "تحديد أولويات حالات الاستخدام", desc_en: "Rank UAE AI opportunities by business value and feasibility, build the right things first.", desc_ar: "ترتيب فرص الذكاء الاصطناعي في الإمارات حسب القيمة والجدوى." },
  { icon: Users, en: "Leadership Enablement", ar: "تمكين القيادة", desc_en: "Equip UAE C-suite and board with practical AI literacy to lead transformation.", desc_ar: "تجهيز القيادة التنفيذية الإماراتية بمعرفة عملية بالذكاء الاصطناعي." },
  { icon: ClipboardCheck, en: "AI Delivery Assurance", ar: "ضمان التسليم", desc_en: "Hands-on oversight to keep UAE AI programmes on track and delivering board-level results.", desc_ar: "إشراف ميداني لإبقاء برامج الذكاء الاصطناعي في مسارها وتحقيق النتائج." },
];

const emirates = ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah", "Fujairah", "Ajman", "Umm Al Quwain"];

export default function UAE() {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <PageMeta
        title="AI Advisory UAE | AI Consultancy United Arab Emirates | Kudo Advisory"
        description="Kudo Advisory is the UAE's leading independent AI advisory firm. We help CIOs, CDOs and enterprise leaders across Dubai, Abu Dhabi and the UAE turn AI investment into measurable business outcomes. AI strategy, AI governance & delivery assurance across the UAE."
        canonical="https://www.kudoadvisory.com/ai-advisory-uae"
        ogImage="https://www.kudoadvisory.com/og/uae.jpg"
      />

      {/* Nav */}
      <SiteNav active="/ai-advisory-uae" />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden pt-36 pb-20 px-6 bg-secondary/10">
          <img src={heroBg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.35em] text-primary font-medium mb-4">
                {isAr ? "استشارات الذكاء الاصطناعي في الإمارات" : "AI Advisory, United Arab Emirates"}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                {isAr
                  ? "استشارات الذكاء الاصطناعي في الإمارات العربية المتحدة"
                  : "AI Advisory & AI Consultancy across the UAE"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
                {isAr
                  ? "كودو أدفيزوري هي الشركة الاستشارية الرائدة والمستقلة في الذكاء الاصطناعي في الإمارات. نساعد مديري المعلومات والمديرين التنفيذيين عبر دبي وأبوظبي والإمارات على تحويل استثمارات الذكاء الاصطناعي إلى نتائج أعمال محكومة وقابلة للقياس."
                  : "Kudo Advisory is the UAE's leading independent AI advisory firm. We help CIOs, CDOs, CEOs and transformation leaders across Dubai, Abu Dhabi and the UAE turn AI investment into governed, measurable business outcomes. Vendor-independent. Outcome-led. Built for the UAE regulatory landscape."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                  <Link to="/#contact">{isAr ? "احجز مكالمة استكشافية" : "Book a Discovery Call"}</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-border px-8 py-3 text-base">
                  <Link to="/about">{isAr ? "تعرف على فيجاي جسوال" : "About Vijay Jaswal"}</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Why UAE section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">
                {isAr ? "لماذا الإمارات" : "The UAE AI Landscape"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                {isAr ? "الذكاء الاصطناعي في الإمارات: الفرصة والتحدي" : "The UAE AI opportunity, and the execution gap"}
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <AnimatedSection>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>{isAr
                    ? "جعلت الإمارات العربية المتحدة الذكاء الاصطناعي محوراً لرؤيتها الوطنية. استراتيجية الذكاء الاصطناعي الوطنية 2031، وعيّنت أول وزير للذكاء الاصطناعي في العالم، ويتدفق الاستثمار بشكل كبير عبر دبي وأبوظبي والإمارات."
                    : "The UAE has made AI central to its national vision. The UAE National AI Strategy 2031 is ambitious, the country appointed the world's first Minister of AI, and investment is flowing heavily across Dubai, Abu Dhabi and the wider UAE."}</p>
                  <p>{isAr
                    ? "لكن كثيراً من المؤسسات الإماراتية تكافح لتحويل الاستثمار في الذكاء الاصطناعي إلى نتائج تشغيلية. المشاريع التجريبية تتوقف. الحوكمة تتأخر. الهياكل التنظيمية لا تواكب الطموح."
                    : "But many UAE enterprises are struggling to convert AI investment into operational results. Pilots stall. Governance lags. Organisational structures don't keep pace with ambition. The UAE's AI regulatory environment, TDRA, ADGM, DIFC, is developing rapidly, and governance-first organisations are moving faster, not slower."}</p>
                  <p>{isAr
                    ? "كودو أدفيزوري تأسست في الإمارات خصيصاً لسد هذه الفجوة."
                    : "Kudo Advisory was founded in the UAE precisely to close this gap, bringing the strategic clarity, governance frameworks, and execution discipline that UAE enterprises need to make AI actually deliver."}</p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={100}>
                <div className="space-y-5">
                  <figure className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={leaderBg}
                      alt="Enterprise leader overlooking Dubai skyline with Burj Khalifa, AI advisory UAE"
                      className="w-full h-[340px] object-cover object-top"
                      loading="lazy" width="600" height="340"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" aria-hidden="true" />
                  </figure>
                  <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "2031", label: isAr ? "استراتيجية الذكاء الاصطناعي الوطنية الإماراتية" : "UAE National AI Strategy target" },
                    { value: "$320B", label: isAr ? "مساهمة الذكاء الاصطناعي المتوقعة في اقتصاد الشرق الأوسط بحلول 2030" : "Projected AI contribution to ME economy by 2030" },
                    { value: "UAE", label: isAr ? "أول وزير للذكاء الاصطناعي في العالم" : "Home to world's first Minister of AI" },
                    { value: "7", label: isAr ? "إمارات نخدمها" : "Emirates served" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-5 rounded-xl border border-border bg-card">
                      <p className="text-2xl font-bold text-primary"><CountUp value={stat.value} /></p>
                      <p className="text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</p>
                    </div>
                  ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-6 bg-secondary/10">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">
                {isAr ? "خدماتنا في الإمارات" : "AI Advisory Services across the UAE"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-12">
                {isAr ? "ستة مسارات لتحريك الذكاء الاصطناعي في مؤسستك" : "Six ways we make AI move in UAE enterprises"}
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-5">
              {services.map((s, i) => (
                <AnimatedSection key={i} delay={i * 80}>
                  <div className="p-6 rounded-xl bg-card border border-border">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{isAr ? s.ar : s.en}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{isAr ? s.desc_ar : s.desc_en}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Emirates coverage */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">
                {isAr ? "التغطية الجغرافية" : "UAE Coverage"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {isAr ? "نعمل عبر الإمارات السبع" : "Serving enterprise organisations across all seven emirates"}
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed max-w-2xl">
                {isAr
                  ? "يعمل كودو أدفيزوري مع المنظمات المؤسسية في جميع أنحاء الإمارات العربية المتحدة. مقرنا في دبي، ونخدم العملاء في أبوظبي والشارقة ورأس الخيمة وعجمان والفجيرة وأم القيوين."
                  : "Kudo Advisory works with enterprise organisations throughout the UAE. Based in Dubai, we serve clients across Abu Dhabi, Sharjah, Ras Al Khaimah, Fujairah, Ajman and Umm Al Quwain. We also serve organisations headquartered outside the UAE that are establishing or expanding AI operations in the UAE."}
              </p>
              <div className="flex flex-wrap gap-3">
                {emirates.map((e) => (
                  <span key={e} className="px-4 py-2 rounded-full border border-border bg-card text-sm font-medium">{e}</span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-secondary/10">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">
                {isAr ? "ابدأ المحادثة" : "Start the Conversation"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {isAr ? "هل أنت مستعد لتحريك الذكاء الاصطناعي في مؤسستك؟" : "Ready to make AI move in your UAE organisation?"}
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {isAr
                  ? "إذا كنت تضع استراتيجية الذكاء الاصطناعي على مستوى مجلس الإدارة في الإمارات، فيجاي مرحّب بالحوار."
                  : "If you are shaping AI strategy at board or C-suite level across the UAE, Vijay welcomes the conversation. A 30-minute discovery call to understand your situation."}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                  <Link to="/#contact">{isAr ? "احجز مكالمة استكشافية" : "Book a Discovery Call"}</Link>
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
