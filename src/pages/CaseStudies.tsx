// src/pages/CaseStudies.tsx
// Anonymised client stories (industry named, never the company) as social proof.
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail } from "lucide-react";
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

interface Story {
  banner: string;
  en_industry: string;
  ar_industry: string;
  en_title: string;
  ar_title: string;
  en_challenge: string;
  ar_challenge: string;
  en_work: string;
  ar_work: string;
  en_outcome: string;
  ar_outcome: string;
  en_link?: { label: string; href: string };
  ar_link?: { label: string; href: string };
}

const STORIES: Story[] = [
  {
    banner: "telecom",
    en_industry: "Telecommunications",
    ar_industry: "الاتصالات",
    en_title: "A brilliant model nobody could fund",
    ar_title: "نموذج رائع لم يستطع أحد تمويله",
    en_challenge:
      "A regional telco had built a genuinely impressive churn prediction model. The accuracy was there and the boardroom demo earned a standing ovation. But when it came time to fund the rollout, one question stopped the room: who owns the business outcome this is meant to move, and by how much? Nobody had defined whether success meant fewer cancellations, higher retention revenue, or better save-desk efficiency. The model sat in a dashboard nobody acted on.",
    ar_challenge:
      "بنت شركة اتصالات إقليمية نموذجاً مثيراً للإعجاب للتنبؤ بفقدان العملاء. كانت الدقة عالية وحظي العرض في مجلس الإدارة بإشادة كبيرة. لكن عند وقت تمويل الإطلاق، توقف الجميع عند سؤال واحد: من يملك نتيجة العمل التي يُفترض أن يحركها هذا النموذج، وبأي قدر؟ لم يحدد أحد ما إذا كان النجاح يعني عمليات إلغاء أقل أو إيرادات احتفاظ أعلى. بقي النموذج في لوحة بيانات لا يتصرف أحد بناءً عليها.",
    en_work:
      "We worked backwards from the business outcome. We defined a single measurable target, named one accountable owner, and rebuilt the case around retention revenue rather than model accuracy. We then mapped the save-desk process changes needed to actually act on a prediction.",
    ar_work:
      "عملنا بشكل عكسي انطلاقاً من نتيجة العمل. حددنا هدفاً واحداً قابلاً للقياس، وعيّنّا مالكاً واحداً مسؤولاً، وأعدنا بناء الحالة حول إيرادات الاحتفاظ بدلاً من دقة النموذج، ثم رسمنا تغييرات العملية اللازمة للتصرف فعلياً بناءً على التنبؤ.",
    en_outcome:
      "The initiative got funded because, for the first time, it had a business case the board could point to. The lesson held: the technology was never the bottleneck. The accountability was.",
    ar_outcome:
      "تم تمويل المبادرة لأنها امتلكت لأول مرة حالة عمل يمكن لمجلس الإدارة الإشارة إليها. ظل الدرس قائماً: لم تكن التقنية يوماً هي العائق، بل المساءلة.",
    en_link: { label: "Related: AI Use Case Prioritisation", href: "/services/ai-use-case-prioritisation" },
    ar_link: { label: "ذات صلة: تحديد أولويات حالات الاستخدام", href: "/services/ai-use-case-prioritisation" },
  },
  {
    banner: "utilities",
    en_industry: "Utilities",
    ar_industry: "المرافق",
    en_title: "Governance that sped them up, not down",
    ar_title: "حوكمة سرّعتهم بدلاً من إبطائهم",
    en_challenge:
      "A common belief gets in the way of AI: governance will slow us down. A Gulf utilities company was under pressure to ship models fast, and the data team was not thrilled about doing the governance groundwork first.",
    ar_challenge:
      "اعتقاد شائع يعرقل الذكاء الاصطناعي: الحوكمة ستبطئنا. كانت شركة مرافق خليجية تحت ضغط لإطلاق النماذج بسرعة، ولم يكن فريق البيانات متحمساً للقيام بأعمال الحوكمة أولاً.",
    en_work:
      "Before a single production model went live, we helped them build the governance first. Data provenance, explainability, and clear accountability, the lot. It felt slow at the time.",
    ar_work:
      "قبل إطلاق أي نموذج إنتاجي واحد، ساعدناهم على بناء الحوكمة أولاً: مصدر البيانات، وقابلية التفسير، والمساءلة الواضحة، كل ذلك. بدا الأمر بطيئاً في حينه.",
    en_outcome:
      "Their first AI application, a demand forecasting model for load balancing, sailed through regulatory review in three weeks. A competitor running a comparable model with no governance documentation spent seven months going back and forth with the same regulator. By the time the competitor was approved, our client had already captured most of the opportunity. Governance was not the brakes. It was the thing that let them move with confidence.",
    ar_outcome:
      "اجتاز أول تطبيق ذكاء اصطناعي لديهم، نموذج للتنبؤ بالطلب لموازنة الأحمال، المراجعة التنظيمية في ثلاثة أسابيع. أما منافس يشغّل نموذجاً مماثلاً دون توثيق حوكمة فقد أمضى سبعة أشهر في مراجعات متكررة مع الجهة التنظيمية نفسها. وبحلول موافقة المنافس، كان عميلنا قد استحوذ بالفعل على معظم الفرصة. لم تكن الحوكمة المكابح، بل ما سمح لهم بالتحرك بثقة.",
    en_link: { label: "Related: AI Policy & Governance", href: "/services/ai-governance" },
    ar_link: { label: "ذات صلة: سياسة وحوكمة الذكاء الاصطناعي", href: "/services/ai-governance" },
  },
  {
    banner: "healthcare",
    en_industry: "Healthcare",
    ar_industry: "الرعاية الصحية",
    en_title: "From scattered pilots to one clear sequence",
    ar_title: "من مشاريع متفرقة إلى تسلسل واحد واضح",
    en_challenge:
      "A healthcare provider had tried AI in several places at once: a triage assistant here, a scheduling tool there, a documentation pilot in another department. Each looked promising in isolation, but none had scaled, budgets were spread thin, and leadership could not say which one actually mattered most.",
    ar_challenge:
      "جرّبت مؤسسة رعاية صحية الذكاء الاصطناعي في عدة أماكن دفعة واحدة: مساعد فرز هنا، وأداة جدولة هناك، ومشروع توثيق تجريبي في قسم آخر. بدا كل منها واعداً بمفرده، لكن لم يتوسع أي منها، وتشتتت الميزانيات، ولم تستطع القيادة تحديد أيها يهم فعلاً أكثر من غيره.",
    en_work:
      "We ran a structured prioritisation. Every opportunity was scored on strategic alignment, business value, feasibility, and time to value, then sequenced. We were honest about which pilots to stop, not just which to back.",
    ar_work:
      "أجرينا عملية تحديد أولويات منظمة. قُيّمت كل فرصة على أساس التوافق الاستراتيجي والقيمة التجارية والجدوى والوقت حتى تحقيق القيمة، ثم رُتّبت بالتسلسل. كنا صريحين بشأن المشاريع التي يجب إيقافها، وليس فقط تلك التي يجب دعمها.",
    en_outcome:
      "Instead of six half-funded experiments, they backed two with a clear owner and a real business case each. Focus did what scattered effort could not: the first reached production and freed up clinician time that everyone could measure.",
    ar_outcome:
      "بدلاً من ست تجارب ممولة جزئياً، دعموا اثنتين لكل منهما مالك واضح وحالة عمل حقيقية. حقق التركيز ما عجز عنه الجهد المشتت: وصل الأول إلى الإنتاج وحرّر وقت الأطباء بشكل يمكن للجميع قياسه.",
    en_link: { label: "Related: AI Use Case Prioritisation", href: "/services/ai-use-case-prioritisation" },
    ar_link: { label: "ذات صلة: تحديد أولويات حالات الاستخدام", href: "/services/ai-use-case-prioritisation" },
  },
  {
    banner: "property",
    en_industry: "Property Development",
    ar_industry: "التطوير العقاري",
    en_title: "Leaders who could lead AI, not just fund it",
    ar_title: "قادة يقودون الذكاء الاصطناعي لا يموّلونه فقط",
    en_challenge:
      "A property developer's leadership team had bought the AI vision. They had approved the budget and attended the conferences. What they were less equipped for was the unglamorous part: the difficult prioritisation calls, clearing organisational blockers, and holding people accountable to timelines. The programme kept stalling between sponsorship and delivery.",
    ar_challenge:
      "كان فريق قيادة أحد المطورين العقاريين قد تبنّى رؤية الذكاء الاصطناعي. اعتمدوا الميزانية وحضروا المؤتمرات. لكنهم كانوا أقل استعداداً للجزء غير البراق: قرارات تحديد الأولويات الصعبة، وإزالة العوائق التنظيمية، ومحاسبة الأشخاص على المواعيد. ظل البرنامج يتعثر بين الرعاية والتسليم.",
    en_work:
      "We built the AI literacy and strategic confidence the C-suite needed to lead, not just sponsor. Working sessions, plain-language framing of the real trade-offs, and a shared language for governance and risk so the board could make decisions without waiting on a translator.",
    ar_work:
      "بنينا محو الأمية في الذكاء الاصطناعي والثقة الاستراتيجية التي تحتاجها الإدارة العليا للقيادة لا للرعاية فقط: جلسات عمل، وصياغة واضحة للمفاضلات الحقيقية، ولغة مشتركة للحوكمة والمخاطر حتى يتمكن مجلس الإدارة من اتخاذ القرارات دون انتظار وسيط.",
    en_outcome:
      "Decisions that used to take months started taking weeks. AI transformation is led, not just sponsored, and the organisations that pull ahead are the ones whose leaders understand it deeply enough to drive it.",
    ar_outcome:
      "القرارات التي كانت تستغرق أشهراً بدأت تستغرق أسابيع. تحول الذكاء الاصطناعي يُقاد ولا يُرعى فقط، والمؤسسات التي تتقدم هي تلك التي يفهمه قادتها بعمق كافٍ لقيادته.",
    en_link: { label: "Related: Leadership Enablement", href: "/services/leadership-enablement" },
    ar_link: { label: "ذات صلة: تمكين القيادة", href: "/services/leadership-enablement" },
  },
];

export default function CaseStudies() {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <PageMeta
        title="AI Advisory Case Studies UAE | Client Stories | Kudo Advisory"
        description="Anonymised client stories from Kudo Advisory's AI advisory work across telecoms, utilities, healthcare and property development in the UAE and Middle East. How enterprises turned stalled AI into governed, measurable outcomes."
        canonical="https://www.kudoadvisory.com/case-studies"
        ogImage="https://www.kudoadvisory.com/og/case-studies.jpg"
      />

      <SiteNav active="/case-studies" />

      <main id="main-content">
        {/* Hero */}
        <section className="pt-36 pb-16 px-6 bg-secondary/10">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.35em] text-primary font-medium mb-4">
                {isAr ? "قصص العملاء · الإمارات والشرق الأوسط" : "Client Stories · UAE & Middle East"}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                {isAr ? "ما يبدو عليه تحريك الذكاء الاصطناعي" : "What making AI move looks like"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {isAr
                  ? "قصص حقيقية من عملنا الاستشاري، مجهّلة الهوية حفاظاً على ثقة العملاء. نذكر القطاع لا الشركة. في كل حالة لم تكن التقنية هي العائق، بل البنية حولها."
                  : "Real stories from our advisory work, anonymised to protect client confidentiality. We name the industry, never the company. In every case, the technology was not the bottleneck. The structure around it was."}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Stories */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-10">
            {STORIES.map((s, i) => (
              <AnimatedSection key={s.en_title} delay={i * 60}>
                <article className="rounded-2xl bg-card border border-border overflow-hidden">
                  <img
                    src={`/case-studies/${s.banner}.jpg`}
                    alt={`${isAr ? s.ar_industry : s.en_industry} ${isAr ? "قصة عميل" : "case study"}`}
                    width={1200}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto block border-b border-border"
                  />
                  <div className="p-8 md:p-10">
                  <span className="block text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">
                    {isAr ? s.ar_industry : s.en_industry}
                  </span>

                  <h2 className="text-2xl md:text-3xl font-bold mb-6">{isAr ? s.ar_title : s.en_title}</h2>

                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                        {isAr ? "التحدي" : "The challenge"}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{isAr ? s.ar_challenge : s.en_challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                        {isAr ? "ما فعلناه" : "What we did"}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{isAr ? s.ar_work : s.en_work}</p>
                    </div>
                    <div className="border-l-2 border-primary pl-4" style={isRTL ? { borderLeft: "none", borderRight: "2px solid hsl(var(--primary))", paddingLeft: 0, paddingRight: "1rem" } : undefined}>
                      <h3 className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                        {isAr ? "النتيجة" : "The outcome"}
                      </h3>
                      <p className="text-foreground leading-relaxed">{isAr ? s.ar_outcome : s.en_outcome}</p>
                    </div>
                  </div>

                  {(isAr ? s.ar_link : s.en_link) && (
                    <Link to={(isAr ? s.ar_link! : s.en_link!).href} className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-primary hover:underline">
                      {(isAr ? s.ar_link! : s.en_link!).label}
                    </Link>
                  )}
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Confidentiality note */}
        <section className="pb-8 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground text-center italic">
              {isAr
                ? "نحترم سرية عملائنا. تُروى جميع القصص دون ذكر الأسماء، مع تغيير التفاصيل التعريفية مع الحفاظ على جوهر الدرس."
                : "We respect our clients' confidentiality. All stories are told without names, with identifying details changed while keeping the substance of the lesson intact."}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-secondary/10">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">
                {isAr ? "قصتك التالية" : "Your story next"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {isAr ? "أين تقف مؤسستك؟" : "Where does your organisation stand?"}
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {isAr
                  ? "ابدأ بتقييم جاهزية الذكاء الاصطناعي المجاني لمدة ثلاث دقائق، أو احجز مكالمة استكشافية لمناقشة وضعك."
                  : "Start with the free three-minute AI Readiness Assessment, or book a discovery call to talk through your situation."}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                  <Link to="/ai-readiness-assessment">{isAr ? "ابدأ التقييم المجاني" : "Take the Free Assessment"}</Link>
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
