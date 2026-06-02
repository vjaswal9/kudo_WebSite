// src/pages/services/ServicesIndex.tsx
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Brain, FileCheck, Settings, ListChecks, Users, ClipboardCheck, ChevronRight, Mail } from "lucide-react";
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

const SERVICES = [
  {
    icon: Brain,
    href: "/services/ai-strategy",
    en_title: "AI Strategy",
    ar_title: "استراتيجية الذكاء الاصطناعي",
    en_desc: "A clear, prioritised AI roadmap tied to your board's priorities and measurable business outcomes. Vendor-independent.",
    ar_desc: "خارطة طريق واضحة للذكاء الاصطناعي ذات أولويات مرتبطة بأولويات مجلس إدارتك ونتائج أعمال قابلة للقياس.",
    en_for: "CIOs, CDOs, CEOs, Strategy teams",
    ar_for: "مديرو المعلومات، مديرو البيانات، الرؤساء التنفيذيون، فرق الاستراتيجية",
    en_time: "6-10 weeks",
    ar_time: "6-10 أسابيع",
  },
  {
    icon: FileCheck,
    href: "/services/ai-governance",
    en_title: "AI Policy & Governance",
    ar_title: "سياسة وحوكمة الذكاء الاصطناعي",
    en_desc: "AI governance frameworks built for the UAE regulatory landscape, TDRA, ADGM and DIFC-aligned. Enables innovation, not obstructs it.",
    ar_desc: "أطر حوكمة ذكاء اصطناعي مبنية للبيئة التنظيمية الإماراتية, متوافقة مع هيئة تنظيم الاتصالات وADGM وDIFC.",
    en_for: "CIOs, CDOs, CROs, Legal, Compliance, Boards",
    ar_for: "مديرو المعلومات، مديرو المخاطر، الشؤون القانونية، الامتثال، مجالس الإدارة",
    en_time: "8-12 weeks",
    ar_time: "8-12 أسبوعاً",
  },
  {
    icon: Settings,
    href: "/services/ai-operating-model",
    en_title: "AI Operating Model Design",
    ar_title: "تصميم نموذج تشغيل الذكاء الاصطناعي",
    en_desc: "Structure your teams, processes and technology to scale AI across the enterprise, not just in one team.",
    ar_desc: "هيكلة فرقك وعملياتك وتقنيتك لتوسيع الذكاء الاصطناعي عبر المؤسسة, لا في فريق واحد فقط.",
    en_for: "CIOs, CDOs, COOs, Transformation leaders",
    ar_for: "مديرو المعلومات، مديرو البيانات، المديرون التشغيليون، قادة التحول",
    en_time: "8-16 weeks",
    ar_time: "8-16 أسبوعاً",
  },
  {
    icon: ListChecks,
    href: "/services/ai-use-case-prioritisation",
    en_title: "AI Use Case Prioritisation",
    ar_title: "تحديد أولويات حالات استخدام الذكاء الاصطناعي",
    en_desc: "Score and sequence your AI opportunities by strategic alignment, business value, feasibility and time to value. Build the right things first.",
    ar_desc: "تقييم فرص الذكاء الاصطناعي وترتيبها حسب التوافق الاستراتيجي والقيمة التجارية والجدوى. ابنِ الأشياء الصحيحة أولاً.",
    en_for: "CEOs, Boards, CIOs, CDOs, Strategy teams",
    ar_for: "الرؤساء التنفيذيون، مجالس الإدارة، مديرو المعلومات، فرق الاستراتيجية",
    en_time: "3-6 weeks",
    ar_time: "3-6 أسابيع",
  },
  {
    icon: Users,
    href: "/services/leadership-enablement",
    en_title: "Leadership Enablement",
    ar_title: "تمكين القيادة",
    en_desc: "Build the AI literacy and strategic confidence your C-suite needs to lead AI transformation, not just sponsor it.",
    ar_desc: "بناء محو الأمية في الذكاء الاصطناعي والثقة الاستراتيجية التي تحتاجها إدارتك العليا لقيادة تحول الذكاء الاصطناعي.",
    en_for: "CEOs, Boards, C-suite, Business unit leaders",
    ar_for: "الرؤساء التنفيذيون، مجالس الإدارة، الإدارة العليا، قادة وحدات الأعمال",
    en_time: "2-4 weeks",
    ar_time: "2-4 أسابيع",
  },
  {
    icon: ClipboardCheck,
    href: "/services/ai-delivery-assurance",
    en_title: "AI Delivery Assurance",
    ar_title: "ضمان تسليم الذكاء الاصطناعي",
    en_desc: "Independent oversight to keep your AI programme on track, on budget, and delivering the results you promised your board.",
    ar_desc: "إشراف مستقل للحفاظ على مسار برنامج الذكاء الاصطناعي ضمن الميزانية وتحقيق النتائج الموعودة لمجلس الإدارة.",
    en_for: "CEOs, Boards, CIOs, CDOs, Programme sponsors",
    ar_for: "الرؤساء التنفيذيون، مجالس الإدارة، مديرو المعلومات، رعاة البرامج",
    en_time: "3-12 months",
    ar_time: "3-12 شهراً",
  },
];

export default function ServicesIndex() {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <PageMeta
        title="AI Advisory Services UAE & Dubai | Kudo Advisory"
        description="Six independent AI advisory services for enterprise leaders across the UAE, Dubai, Abu Dhabi and Middle East, AI strategy, AI governance, operating model design, use case prioritisation, leadership enablement and delivery assurance."
        canonical="https://www.kudoadvisory.com/services"
        ogImage="https://www.kudoadvisory.com/og/services.jpg"
      />

      {/* Nav */}
      <SiteNav active="/services" />

      <main id="main-content">
        {/* Hero */}
        <section className="pt-36 pb-16 px-6 bg-secondary/10">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.35em] text-primary font-medium mb-4">
                {isAr ? "خدمات استشارات الذكاء الاصطناعي · الإمارات والشرق الأوسط" : "AI Advisory Services · UAE & Middle East"}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                {isAr ? "ستة مسارات لتحريك الذكاء الاصطناعي" : "Six ways we make AI move"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {isAr
                  ? "كودو أدفيزوري تقدم ست خدمات استشارية مستقلة تغطي دورة الذكاء الاصطناعي الكاملة, من الاستراتيجية والحوكمة إلى ضمان التسليم. نخدم قادة المؤسسات في الإمارات ودبي وأبوظبي والمملكة العربية السعودية والشرق الأوسط."
                  : "Kudo Advisory provides six independent AI advisory services covering the full AI lifecycle, from strategy and governance through to delivery assurance. Serving enterprise leaders across the UAE, Dubai, Abu Dhabi, Saudi Arabia and the Middle East."}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <AnimatedSection key={s.href} delay={i * 80}>
                  <Link to={s.href} className="group flex flex-col h-full p-7 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {isAr ? s.ar_title : s.en_title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                      {isAr ? s.ar_desc : s.en_desc}
                    </p>
                    <div className="space-y-2 pt-4 border-t border-border/50">
                      <div className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/70 shrink-0">{isAr ? "لمن:" : "For:"}</span>
                        <span>{isAr ? s.ar_for : s.en_for}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/70">{isAr ? "المدة:" : "Typical duration:"}</span>
                        <span>{isAr ? s.ar_time : s.en_time}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
                      {isAr ? "اعرف المزيد" : "Learn more"}
                      <ChevronRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Independence statement */}
        <section className="py-16 px-6 bg-secondary/10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">
                {isAr ? "مستقل. يركز على النتائج. محايد تجاه الموردين." : "Independent. Outcome-led. Vendor-neutral."}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isAr ? "لا موردين. لا تنفيذ. فقط المشورة التي تحتاجها." : "No vendors. No implementation. Just the advice you need."}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {isAr
                  ? "كودو أدفيزوري ليس لديها علاقات تجارية مع موردي التقنية وليس لها عائدات من التنفيذ وليس لها حافز للتوصية بالتقنية لذاتها. كل توصية مدفوعة بسياق أعمالك وحده."
                  : "Kudo Advisory has no commercial relationships with technology vendors, no implementation revenue, and no incentive to recommend technology for its own sake. Every recommendation is driven entirely by your business context, not by our commercial interests."}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">
                {isAr ? "ابدأ المحادثة" : "Start the Conversation"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {isAr ? "غير متأكد من أين تبدأ؟" : "Not sure which service is right for you?"}
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {isAr
                  ? "احجز مكالمة استكشافية مدتها 30 دقيقة. سنناقش وضعك ونقترح النهج الأكثر منطقية."
                  : "Book a 30-minute discovery call. We'll discuss your situation and recommend the engagement approach that makes most sense, whether that's one service or a combination."}
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
