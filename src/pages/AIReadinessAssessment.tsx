// src/pages/AIReadinessAssessment.tsx
// Interactive AI Readiness Assessment, lead-capture scorecard.
// 10 questions → email gate → instant score + tailored recommendations.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LangToggle } from "@/components/LangToggle";
import { PageMeta } from "@/components/PageMeta";
import kudoLogo from "@/assets/kudo-logo.png";
import { ChevronRight, ChevronLeft, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgwarpw";

interface Option { en: string; ar: string; score: number; }
interface Question { id: string; en_q: string; ar_q: string; options: Option[]; }

const QUESTIONS: Question[] = [
  {
    id: "strategy",
    en_q: "Does your organisation have a documented, board-approved AI strategy?",
    ar_q: "هل لدى مؤسستك استراتيجية ذكاء اصطناعي موثقة ومعتمدة من مجلس الإدارة؟",
    options: [
      { en: "No strategy, we're exploring AI ad hoc", ar: "لا توجد استراتيجية، نستكشف الذكاء الاصطناعي عشوائياً", score: 0 },
      { en: "Some initiatives, but no overarching strategy", ar: "بعض المبادرات، لكن دون استراتيجية شاملة", score: 1 },
      { en: "A strategy exists but isn't board-aligned", ar: "توجد استراتيجية لكنها غير متوائمة مع مجلس الإدارة", score: 2 },
      { en: "Yes, documented, board-approved, and reviewed regularly", ar: "نعم، موثقة ومعتمدة وتُراجع بانتظام", score: 3 },
    ],
  },
  {
    id: "prioritisation",
    en_q: "How do you decide which AI use cases to pursue?",
    ar_q: "كيف تقرر حالات استخدام الذكاء الاصطناعي التي تسعى خلفها؟",
    options: [
      { en: "Whatever sounds most exciting or the vendor suggests", ar: "ما يبدو الأكثر إثارة أو ما يقترحه المورد", score: 0 },
      { en: "Based on which team pushes hardest", ar: "بناءً على الفريق الأكثر إلحاحاً", score: 1 },
      { en: "Informal assessment of value and feasibility", ar: "تقييم غير رسمي للقيمة والجدوى", score: 2 },
      { en: "A structured framework scoring value, feasibility & risk", ar: "إطار منظم يقيّم القيمة والجدوى والمخاطر", score: 3 },
    ],
  },
  {
    id: "governance",
    en_q: "Do you have AI governance policies and accountability structures?",
    ar_q: "هل لديك سياسات حوكمة للذكاء الاصطناعي وهياكل مساءلة؟",
    options: [
      { en: "None in place", ar: "لا يوجد أي منها", score: 0 },
      { en: "We're aware we need them but haven't started", ar: "ندرك أننا بحاجة إليها لكن لم نبدأ", score: 1 },
      { en: "Some policies, but no clear ownership", ar: "بعض السياسات، لكن دون ملكية واضحة", score: 2 },
      { en: "Robust governance with named accountable owners", ar: "حوكمة راسخة مع مالكين مسؤولين مُسمَّين", score: 3 },
    ],
  },
  {
    id: "operating-model",
    en_q: "How is AI capability structured across your organisation?",
    ar_q: "كيف تُهيكل قدرة الذكاء الاصطناعي عبر مؤسستك؟",
    options: [
      { en: "It isn't, AI sits with whoever experiments", ar: "غير مهيكلة، الذكاء الاصطناعي مع من يجرّب", score: 0 },
      { en: "Siloed in one team (usually IT or data)", ar: "محصورة في فريق واحد (عادةً تقنية المعلومات أو البيانات)", score: 1 },
      { en: "Coordinated but not formally structured", ar: "منسّقة لكن غير مهيكلة رسمياً", score: 2 },
      { en: "A defined operating model spanning the enterprise", ar: "نموذج تشغيل محدد يشمل المؤسسة بأكملها", score: 3 },
    ],
  },
  {
    id: "data",
    en_q: "How ready is your data for AI?",
    ar_q: "ما مدى جاهزية بياناتك للذكاء الاصطناعي؟",
    options: [
      { en: "Fragmented, siloed, quality unknown", ar: "مجزأة ومعزولة وجودتها غير معروفة", score: 0 },
      { en: "Accessible but quality is inconsistent", ar: "متاحة لكن جودتها غير متسقة", score: 1 },
      { en: "Reasonably governed with some gaps", ar: "محكومة بشكل معقول مع بعض الثغرات", score: 2 },
      { en: "Well-governed, accessible, AI-ready", ar: "محكومة جيداً ومتاحة وجاهزة للذكاء الاصطناعي", score: 3 },
    ],
  },
  {
    id: "talent",
    en_q: "Do you have the talent and skills to deliver AI?",
    ar_q: "هل لديك المواهب والمهارات لتنفيذ الذكاء الاصطناعي؟",
    options: [
      { en: "No internal AI capability", ar: "لا توجد قدرة داخلية في الذكاء الاصطناعي", score: 0 },
      { en: "A few individuals, no formal team", ar: "أفراد قليلون، دون فريق رسمي", score: 1 },
      { en: "A capable team but limited broader literacy", ar: "فريق قادر لكن محو الأمية الأوسع محدود", score: 2 },
      { en: "Strong team plus broad organisational AI literacy", ar: "فريق قوي مع محو أمية واسع في المؤسسة", score: 3 },
    ],
  },
  {
    id: "leadership",
    en_q: "Is your leadership equipped to drive AI, not just sponsor it?",
    ar_q: "هل قيادتك مجهّزة لقيادة الذكاء الاصطناعي، لا مجرد رعايته؟",
    options: [
      { en: "Leadership is largely unfamiliar with AI", ar: "القيادة غير ملمّة إلى حد كبير بالذكاء الاصطناعي", score: 0 },
      { en: "Interested but lacks depth to drive execution", ar: "مهتمة لكن تفتقر للعمق لدفع التنفيذ", score: 1 },
      { en: "Engaged and reasonably knowledgeable", ar: "منخرطة وذات معرفة معقولة", score: 2 },
      { en: "Actively driving AI with deep understanding", ar: "تقود الذكاء الاصطناعي بفهم عميق", score: 3 },
    ],
  },
  {
    id: "measurement",
    en_q: "Do you measure AI ROI in business terms?",
    ar_q: "هل تقيس عائد استثمار الذكاء الاصطناعي بمصطلحات الأعمال؟",
    options: [
      { en: "We don't measure AI outcomes", ar: "لا نقيس نتائج الذكاء الاصطناعي", score: 0 },
      { en: "We track technical metrics only (e.g. accuracy)", ar: "نتتبع المقاييس التقنية فقط (مثل الدقة)", score: 1 },
      { en: "Some business metrics, inconsistently", ar: "بعض مقاييس الأعمال، بشكل غير متسق", score: 2 },
      { en: "Clear business KPIs tied to every initiative", ar: "مؤشرات أعمال واضحة مرتبطة بكل مبادرة", score: 3 },
    ],
  },
  {
    id: "delivery",
    en_q: "Have your AI pilots scaled into production?",
    ar_q: "هل توسّعت مشاريعك التجريبية للذكاء الاصطناعي إلى الإنتاج؟",
    options: [
      { en: "No, pilots stall or get abandoned", ar: "لا، المشاريع التجريبية تتعثر أو تُهجر", score: 0 },
      { en: "Rarely, most don't make it past pilot", ar: "نادراً، معظمها لا يتجاوز التجربة", score: 1 },
      { en: "Some have scaled successfully", ar: "بعضها توسّع بنجاح", score: 2 },
      { en: "We reliably move AI from pilot to production", ar: "ننقل الذكاء الاصطناعي من التجربة إلى الإنتاج بموثوقية", score: 3 },
    ],
  },
  {
    id: "regulatory",
    en_q: "Are you prepared for the UAE's evolving AI regulation?",
    ar_q: "هل أنت مستعد للوائح الذكاء الاصطناعي المتطورة في الإمارات؟",
    options: [
      { en: "Not aware of the regulatory landscape", ar: "غير مدرك للمشهد التنظيمي", score: 0 },
      { en: "Aware but not actively preparing", ar: "مدرك لكن لا نستعد بنشاط", score: 1 },
      { en: "Beginning to align with TDRA/ADGM/DIFC guidance", ar: "نبدأ التوافق مع توجيهات TDRA/ADGM/DIFC", score: 2 },
      { en: "Fully aligned and monitoring regulatory change", ar: "متوافق تماماً ونراقب التغيير التنظيمي", score: 3 },
    ],
  },
];

type Stage = "intro" | "questions" | "capture" | "results";

export default function AIReadinessAssessment() {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const [stage, setStage] = useState<Stage>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = QUESTIONS.length * 3;
  const pct = Math.round((totalScore / maxScore) * 100);

  const tier =
    totalScore <= 10
      ? { key: "early", en: "Exploring", ar: "مرحلة الاستكشاف", color: "text-amber-500" }
      : totalScore <= 20
      ? { key: "developing", en: "Developing", ar: "مرحلة التطوير", color: "text-blue-400" }
      : { key: "advanced", en: "Scaling", ar: "مرحلة التوسع", color: "text-primary" };

  const tierIntro = {
    early: {
      en: "Your organisation is in the early stages of its AI journey. The biggest risk right now is investing in AI without the strategic clarity and governance to convert it into measurable outcomes. The good news: getting the foundations right now will save significant cost and friction later.",
      ar: "مؤسستك في المراحل المبكرة من رحلة الذكاء الاصطناعي. أكبر خطر الآن هو الاستثمار في الذكاء الاصطناعي دون الوضوح الاستراتيجي والحوكمة لتحويله إلى نتائج قابلة للقياس. الخبر الجيد: إرساء الأسس الصحيحة الآن سيوفر تكلفة واحتكاكاً كبيرين لاحقاً.",
    },
    developing: {
      en: "Your organisation has real AI momentum but faces the classic scaling challenge: turning isolated initiatives into enterprise-wide capability. The priority now is governance, operating model and execution discipline, so your pilots become production value, not stalled experiments.",
      ar: "لدى مؤسستك زخم حقيقي في الذكاء الاصطناعي لكنها تواجه تحدي التوسع الكلاسيكي: تحويل المبادرات المعزولة إلى قدرة على مستوى المؤسسة. الأولوية الآن هي الحوكمة ونموذج التشغيل وانضباط التنفيذ، حتى تصبح مشاريعك التجريبية قيمة إنتاجية لا تجارب متعثرة.",
    },
    advanced: {
      en: "Your organisation is among the more mature in the region. The focus now shifts to optimisation: deepening governance ahead of regulation, measuring ROI rigorously at board level, and ensuring delivery assurance keeps your programmes on track as they scale. Even strong programmes benefit from independent challenge.",
      ar: "مؤسستك من بين الأكثر نضجاً في المنطقة. ينتقل التركيز الآن إلى التحسين: تعميق الحوكمة قبل التنظيم، وقياس العائد بدقة على مستوى مجلس الإدارة، وضمان التسليم لإبقاء برامجك على المسار مع توسعها. حتى البرامج القوية تستفيد من التحدي المستقل.",
    },
  }[tier.key];

  const handleAnswer = (score: number) => {
    setAnswers((prev) => ({ ...prev, [QUESTIONS[current].id]: score }));
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setStage("capture");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSubmitError(false);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          source: "AI Readiness Assessment",
          score: `${totalScore}/${maxScore} (${pct}%)`,
          tier: tier.en,
          answers: QUESTIONS.map((q) => `${q.en_q}: ${answers[q.id] ?? 0}/3`).join(" | "),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStage("results");
    } catch {
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <PageMeta
        title="Free AI Readiness Assessment UAE | Kudo Advisory"
        description="Take Kudo Advisory's free AI Readiness Assessment. 10 questions, instant score and a tailored report for enterprise leaders across the UAE and Middle East. Discover how ready your organisation is to scale AI."
        canonical="https://www.kudoadvisory.com/ai-readiness-assessment"
      />

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" aria-label="Kudo Advisory home">
            <img src={kudoLogo} alt="Kudo Advisory" className="h-12 sm:h-14 w-auto" width="160" height="56" />
          </Link>
          <div className="flex items-center gap-4">
            <LangToggle />
            <Link to="/services" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("Services", "الخدمات")}
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          {/* ── INTRO ── */}
          {stage === "intro" && (
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-primary font-medium mb-4">
                {t("Free Assessment · 3 minutes", "تقييم مجاني · 3 دقائق")}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {t("How ready is your organisation to scale AI?", "ما مدى جاهزية مؤسستك لتوسيع الذكاء الاصطناعي؟")}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t(
                  "Answer 10 questions and get an instant readiness score plus a tailored report, covering strategy, governance, operating model, data, talent and delivery. Built for CIOs, CDOs and enterprise leaders across the UAE and Middle East.",
                  "أجب عن 10 أسئلة واحصل على درجة جاهزية فورية مع تقرير مخصص، يغطي الاستراتيجية والحوكمة ونموذج التشغيل والبيانات والمواهب والتسليم. مُصمم لمديري المعلومات والبيانات وقادة المؤسسات في الإمارات والشرق الأوسط."
                )}
              </p>
              <Button onClick={() => setStage("questions")} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base">
                {t("Start the Assessment", "ابدأ التقييم")} <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </Button>
              <p className="text-xs text-muted-foreground mt-6">
                {t("No cost. No obligation. Your results are private.", "بلا تكلفة. بلا التزام. نتائجك خاصة.")}
              </p>
            </div>
          )}

          {/* ── QUESTIONS ── */}
          {stage === "questions" && (
            <div>
              <div className="mb-8">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>{t(`Question ${current + 1} of ${QUESTIONS.length}`, `السؤال ${current + 1} من ${QUESTIONS.length}`)}</span>
                  <span>{Math.round(((current) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(current / QUESTIONS.length) * 100}%` }} />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-snug">
                {t(QUESTIONS[current].en_q, QUESTIONS[current].ar_q)}
              </h2>

              <div className="space-y-3">
                {QUESTIONS[current].options.map((opt, i) => {
                  const selected = answers[QUESTIONS[current].id] === opt.score;
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt.score)}
                      className={`w-full text-start p-5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 group ${
                        selected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40 hover:bg-secondary/40"
                      }`}
                    >
                      <span className="text-sm md:text-base">{t(opt.en, opt.ar)}</span>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 ${isRTL ? "rotate-180" : ""}`} />
                    </button>
                  );
                })}
              </div>

              {current > 0 && (
                <button onClick={() => setCurrent(current - 1)} className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} /> {t("Back", "رجوع")}
                </button>
              )}
            </div>
          )}

          {/* ── EMAIL CAPTURE ── */}
          {stage === "capture" && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-3">{t("Your assessment is complete", "اكتمل تقييمك")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "Enter your details to reveal your readiness score and personalised report.",
                    "أدخل بياناتك للكشف عن درجة جاهزيتك وتقريرك المخصص."
                  )}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="ra-name" className="block text-sm font-medium mb-2">{t("Name", "الاسم")}</label>
                  <input id="ra-name" type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm" />
                </div>
                <div>
                  <label htmlFor="ra-email" className="block text-sm font-medium mb-2">{t("Work email", "البريد الإلكتروني للعمل")}</label>
                  <input id="ra-email" type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm" />
                </div>
                <div>
                  <label htmlFor="ra-company" className="block text-sm font-medium mb-2">{t("Organisation", "المؤسسة")}</label>
                  <input id="ra-company" type="text" value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm" />
                </div>
                <Button type="submit" disabled={sending} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base disabled:opacity-60">
                  {sending ? t("Revealing your score…", "جارٍ الكشف عن درجتك…") : t("Reveal My Score", "اكشف درجتي")}
                </Button>
                {submitError && (
                  <p className="text-sm text-destructive text-center">
                    {t("Something went wrong. Please email us at ", "حدث خطأ ما. يرجى مراسلتنا على ")}
                    <a className="underline" href="mailto:info@kudoadvisory.com">info@kudoadvisory.com</a>
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-center">
                  {t("We'll never share your details. You'll also receive Vijay's AI insights.", "لن نشارك بياناتك أبداً. ستتلقى أيضاً رؤى فيجاي في الذكاء الاصطناعي.")}
                </p>
              </form>
            </div>
          )}

          {/* ── RESULTS ── */}
          {stage === "results" && (
            <div>
              <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium mb-4">
                  {t("Your AI Readiness Score", "درجة جاهزيتك للذكاء الاصطناعي")}
                </p>
                <div className="relative inline-flex items-center justify-center mb-4">
                  <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
                    <circle cx="90" cy="90" r="80" fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
                    <circle cx="90" cy="90" r="80" fill="none" stroke="hsl(var(--primary))" strokeWidth="12" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 80}`} strokeDashoffset={`${2 * Math.PI * 80 * (1 - pct / 100)}`}
                      style={{ transition: "stroke-dashoffset 1s ease" }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">{pct}%</span>
                    <span className="text-xs text-muted-foreground">{totalScore}/{maxScore}</span>
                  </div>
                </div>
                <h2 className={`text-2xl font-bold ${tier.color}`}>
                  {t("Stage: ", "المرحلة: ")}{t(tier.en, tier.ar)}
                </h2>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card mb-8">
                <p className="text-muted-foreground leading-relaxed">{t(tierIntro.en, tierIntro.ar)}</p>
              </div>

              <h3 className="font-semibold text-lg mb-4">{t("Recommended next steps", "الخطوات التالية الموصى بها")}</h3>
              <div className="space-y-3 mb-10">
                {(isAr ? recommendationsFor(tier.key).ar : recommendationsFor(tier.key).en).map((rec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground leading-relaxed">{rec}</span>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-2xl bg-secondary/30 border border-border text-center">
                <h3 className="text-2xl font-bold mb-3">
                  {t("Want to discuss your results?", "هل تريد مناقشة نتائجك؟")}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t(
                    "Book a free 30-minute discovery call with Vijay Jaswal to walk through your score and what it means for your organisation.",
                    "احجز مكالمة استكشافية مجانية مدتها 30 دقيقة مع فيجاي جسوال لمراجعة درجتك وما تعنيه لمؤسستك."
                  )}
                </p>
                <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base">
                  <a href="/#contact">{t("Book a Discovery Call", "احجز مكالمة استكشافية")}</a>
                </Button>
              </div>

              <div className="text-center mt-8">
                <Link to="/services" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  {t("Explore our services", "استكشف خدماتنا")} <ChevronRight className={`inline w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} <Link to="/" className="hover:text-foreground transition-colors">Kudo Advisory</Link>, {t("AI Advisory UAE, Dubai & Middle East.", "استشارات الذكاء الاصطناعي في الإمارات ودبي والشرق الأوسط.")}</p>
        <p className="mt-2"><a href="mailto:info@kudoadvisory.com" className="hover:text-foreground transition-colors">info@kudoadvisory.com</a></p>
      </footer>
    </div>
  );
}

function recommendationsFor(tierKey: string): { en: string[]; ar: string[] } {
  if (tierKey === "early") {
    return {
      en: [
        "Start with an AI Strategy engagement to define where AI creates real value for your organisation.",
        "Establish a basic AI governance framework before you deploy, it's far cheaper than retrofitting it.",
        "Run a use case prioritisation workshop to focus resources on the highest-value, most feasible opportunities.",
        "Invest in leadership enablement so your executives can drive AI, not just sponsor it.",
      ],
      ar: [
        "ابدأ بمشاركة استراتيجية الذكاء الاصطناعي لتحديد أين يخلق الذكاء الاصطناعي قيمة حقيقية لمؤسستك.",
        "أرسِ إطار حوكمة أساسي للذكاء الاصطناعي قبل النشر، فهو أرخص بكثير من تعديله لاحقاً.",
        "نفّذ ورشة لتحديد أولويات حالات الاستخدام لتركيز الموارد على الفرص الأعلى قيمة والأكثر جدوى.",
        "استثمر في تمكين القيادة حتى يقود مديروك التنفيذيون الذكاء الاصطناعي لا مجرد رعايته.",
      ],
    };
  }
  if (tierKey === "developing") {
    return {
      en: [
        "Design an AI operating model so capability scales beyond a single team into the enterprise.",
        "Mature your governance ahead of UAE regulation, TDRA, ADGM and DIFC expectations are tightening.",
        "Introduce delivery assurance to convert stalled pilots into production value.",
        "Build a board-level ROI measurement framework so you can demonstrate AI's business impact.",
      ],
      ar: [
        "صمّم نموذج تشغيل للذكاء الاصطناعي حتى تتوسع القدرة من فريق واحد إلى المؤسسة بأكملها.",
        "طوّر حوكمتك قبل التنظيم الإماراتي، فتوقعات TDRA وADGM وDIFC تتشدد.",
        "أدخِل ضمان التسليم لتحويل المشاريع التجريبية المتعثرة إلى قيمة إنتاجية.",
        "ابنِ إطار قياس عائد على مستوى مجلس الإدارة لتتمكن من إثبات الأثر التجاري للذكاء الاصطناعي.",
      ],
    };
  }
  return {
    en: [
      "Deepen your AI governance to stay ahead of evolving UAE and GCC regulation.",
      "Strengthen delivery assurance to keep scaling programmes on track and on budget.",
      "Refine board-level ROI reporting to sustain investment and demonstrate competitive advantage.",
      "Consider an independent review, even mature programmes benefit from outside challenge.",
    ],
    ar: [
      "عمّق حوكمة الذكاء الاصطناعي للبقاء في طليعة التنظيم المتطور في الإمارات ودول الخليج.",
      "عزّز ضمان التسليم لإبقاء البرامج المتوسعة على المسار وضمن الميزانية.",
      "حسّن تقارير العائد على مستوى مجلس الإدارة للحفاظ على الاستثمار وإثبات الميزة التنافسية.",
      "فكّر في مراجعة مستقلة، فحتى البرامج الناضجة تستفيد من التحدي الخارجي.",
    ],
  };
}
