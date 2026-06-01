// src/pages/FAQ.tsx
// ════════════════════════════════════════════════════
// Kudo Advisory, Frequently Asked Questions
// SEO & AI-EO optimised, structured for AI citation,
// Google AI Overviews, Perplexity, FAQPage schema
// ════════════════════════════════════════════════════
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageMeta } from "@/components/PageMeta";
import { useLanguage } from "@/contexts/LanguageContext";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { faqData } from "@/lib/faqData";

// Legacy constant kept for JSON-LD schema (English only)
const FAQS_EN = [
  {
    category: "About Kudo Advisory",
    questions: [
      {
        q: "What does Kudo Advisory do?",
        a: "Kudo Advisory helps organisations turn AI ambition into measurable business outcomes. We provide AI strategy, AI governance, use case prioritisation, operating model design and delivery assurance to enterprise organisations across Dubai and the Middle East. We work with leadership teams to define where AI can create real value, build the governance structures to deploy it responsibly, and put in place the execution discipline to make it stick.",
      },
      {
        q: "Who does Kudo Advisory work with?",
        a: "We work with CEOs, CIOs, CDOs and senior leadership teams who are navigating one of three situations: they are unsure where to start with AI and need a clear, prioritised strategy; they have run pilots but are struggling to scale them into the business; or they have fragmented AI initiatives and need governance, structure and accountability. Our clients are typically mid-to-large enterprises operating in the UAE, Saudi Arabia and across the Middle East.",
      },
      {
        q: "Where is Kudo Advisory based?",
        a: "Kudo Advisory is based in Dubai, UAE and registered as Kudo Advisory FZ-LLC at the Sharjah Publishing City Free Zone. We work with organisations across the UAE, Saudi Arabia and the wider Middle East and MENA region.",
      },
      {
        q: "Who founded Kudo Advisory?",
        a: "Kudo Advisory was founded by Vijay Jaswal, a technology executive with over 25 years of experience advising boards and C-suite leaders across Europe, Asia-Pacific, the Middle East and Africa. Vijay was previously CTO for Asia-Pacific, Japan, Middle East and Africa at IFS, and spent over 17 years at Software AG in senior technology leadership roles including CTO for Middle East and Turkey. He has been named one of the Top 50 Technology Leaders in the Middle East.",
      },
      {
        q: "What does the name Kudo mean?",
        a: "Kudo comes from the Japanese word 駆動, which means driving force or propulsion. It captures the firm's core mission: turning AI intent into forward motion. We exist to make AI move.",
      },
      {
        q: "What makes Kudo Advisory different from other AI consultancies?",
        a: "Kudo Advisory focuses on practical execution, governance and measurable business value rather than hype-driven AI adoption. We are independent, which means we have no vendor relationships to protect and no incentive to recommend technology for its own sake. Our engagements are outcome-led from the start: we define what success looks like before we begin, and we measure ourselves against it. We also bring direct C-suite and board-level experience from leading enterprise AI programmes across multiple industries and geographies.",
      },
    ],
  },
  {
    category: "AI Advisory Services",
    questions: [
      {
        q: "What AI advisory services does Kudo Advisory offer?",
        a: "Kudo Advisory offers six core services: AI Strategy, which aligns AI initiatives with business goals and delivers a clear, prioritised roadmap; AI Policy and Governance, which builds the frameworks, controls and accountability structures for responsible AI; AI Operating Model Design, which structures teams, processes and technology to scale AI across the enterprise; AI Use Case Prioritisation, which identifies and ranks high-impact AI opportunities by feasibility and business value; Leadership Enablement, which builds C-suite AI literacy and confidence; and AI Delivery Assurance, which provides hands-on programme oversight to keep AI initiatives on track and delivering results.",
      },
      {
        q: "What is AI strategy and why does my organisation need one?",
        a: "An AI strategy defines where AI can create genuine business value in your organisation, how to prioritise the opportunities, what capabilities you need to build, and how to sequence the work. Without one, most organisations end up with scattered pilots that fail to scale, duplicated effort across business units, and AI investments that cannot be clearly tied to business outcomes. An AI strategy gives leadership a shared view of the destination and a credible plan to get there.",
      },
      {
        q: "What is AI governance and why does it matter?",
        a: "AI governance refers to the policies, frameworks, controls and accountability structures that ensure AI systems are deployed responsibly, ethically and in compliance with regulations. It covers areas including data provenance, model explainability, bias assessment, human oversight, access controls and regulatory alignment. Robust AI governance is critical for boards, regulators and stakeholders, and in the Middle East it is increasingly a regulatory requirement as the UAE and Saudi Arabia develop their AI legislative frameworks.",
      },
      {
        q: "What is an AI operating model?",
        a: "An AI operating model defines how an organisation structures its teams, processes, governance, data practices and technology to scale AI responsibly and sustainably across the enterprise. It is the bridge between AI strategy and real-world execution. Without an effective operating model, AI capability tends to remain siloed in one part of the organisation and fails to deliver value at scale.",
      },
      {
        q: "Does Kudo Advisory implement AI systems?",
        a: "Kudo Advisory is an advisory firm, not an implementation firm. We focus on strategy, governance, operating model design and delivery assurance. This means we help you decide what to build, how to govern it and how to make sure it gets delivered. We work alongside your internal teams and technology partners rather than replacing them. This independence is deliberate: it means our advice is always in your interest, not shaped by an implementation contract.",
      },
      {
        q: "Can Kudo Advisory help if we have already started an AI programme?",
        a: "Yes. Many of our engagements begin mid-programme. Common entry points include helping organisations diagnose why a pilot has stalled, introducing governance to a programme that has been moving without it, restructuring a fragmented AI portfolio around clear priorities, or providing delivery assurance on an existing initiative that is not hitting its targets.",
      },
    ],
  },
  {
    category: "AI in the Middle East",
    questions: [
      {
        q: "What is the AI landscape like in the UAE and Middle East?",
        a: "The UAE and Saudi Arabia have made AI central to their national development strategies. The UAE National AI Strategy 2031 and Saudi Arabia's Vision 2030 both set ambitious targets for AI's contribution to the economy. PwC estimates AI could contribute up to USD 320 billion to the Middle East economy by 2030. Enterprise AI investment across the region is significant and growing, but many organisations are still struggling to convert that investment into measurable operational outcomes.",
      },
      {
        q: "Why do so many enterprise AI pilots fail in the Middle East?",
        a: "The reasons are consistent across the region and consistent with global patterns. Most AI pilots fail not because the technology does not work but because the strategy is unclear, accountability is fragmented, governance is absent or too late, operating models have not been redesigned, and leadership has not been equipped to drive execution rather than just sponsor it. Kudo Advisory was founded specifically to address these gaps.",
      },
      {
        q: "What AI regulations apply to businesses in the UAE?",
        a: "The UAE regulatory landscape for AI is developing rapidly. Key frameworks include the UAE National AI Strategy 2031, the TDRA AI Ethics Principles and Guidelines, sector-specific AI guidance from ADGM and DIFC for financial services, and a dedicated UAE AI Law currently in development that is expected to introduce binding obligations including mandatory impact assessments for high-risk AI applications. Organisations operating in regulated sectors should also be aware of their existing sectoral obligations as they apply to AI systems.",
      },
      {
        q: "Does Kudo Advisory work with organisations outside the UAE?",
        a: "Yes. While our primary focus is the UAE and Middle East, we work with organisations across the MENA region including Saudi Arabia, Qatar, Bahrain, Kuwait, Oman and Egypt. We also support organisations headquartered outside the region that are establishing or expanding AI operations in the Middle East.",
      },
    ],
  },
  {
    category: "Working With Us",
    questions: [
      {
        q: "How do we start working with Kudo Advisory?",
        a: "The best starting point is a discovery call. This is a 30-minute conversation to understand your situation, your AI ambitions, and where you are currently running into challenges. From there we can propose the engagement approach that makes most sense, whether that is a focused strategy sprint, a governance assessment, a use case prioritisation workshop or an ongoing advisory relationship.",
      },
      {
        q: "How long does a typical Kudo Advisory engagement last?",
        a: "Engagements vary significantly depending on what is needed. A focused AI strategy or governance assessment typically runs four to eight weeks. An ongoing advisory relationship or delivery assurance engagement typically runs three to twelve months. We design engagements to fit the client's situation rather than applying a standard model.",
      },
      {
        q: "What industries does Kudo Advisory specialise in?",
        a: "Kudo Advisory works across industries, drawing on Vijay Jaswal's background leading enterprise AI across sectors including energy, utilities, mining, manufacturing, financial services, telecommunications and enterprise services. We bring both sector-specific perspective and cross-industry pattern recognition, which is often where the most useful insights come from.",
      },
      {
        q: "How do we contact Kudo Advisory?",
        a: "You can reach us by email at info@kudoadvisory.com, through the contact form on our website at kudoadvisory.com, or by connecting with Vijay Jaswal directly on LinkedIn at linkedin.com/in/vijayjaswal.",
      },
    ],
  },
];

export default function FAQ() {
  const { t, isRTL, lang } = useLanguage();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const FAQS = faqData[lang];

  const toggle = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Build FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS_EN.flatMap(cat =>
      cat.questions.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        },
      }))
    ),
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <PageMeta
        title="AI Advisory FAQ | Kudo Advisory Dubai, UAE"
        description="Common questions about Kudo Advisory's AI advisory services in the UAE, Dubai and Middle East. Answers on AI strategy, AI governance, enterprise AI delivery and working with enterprise clients across the UAE and Saudi Arabia."
        canonical="https://www.kudoadvisory.com/faq"
      />

      {/* Inline FAQPage schema, crawlers read this directly */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <style>{`
        .kudo-overlay { transition: opacity 220ms ease; }
        .kudo-backdrop { transition: opacity 260ms ease; opacity: 0; }
        .kudo-overlay.is-open .kudo-backdrop { opacity: 1; }
        .kudo-panel { will-change: transform, opacity; transform: translateY(-10px) scale(.985); opacity: 0; transition: transform 220ms ease, opacity 160ms ease; }
        .kudo-overlay.is-open .kudo-panel { animation: kudoSpringIn 520ms cubic-bezier(.16,1,.3,1) both; }
        .kudo-item { will-change: transform, opacity; transform: translateY(12px); opacity: 0; }
        .kudo-overlay.is-open .kudo-item { animation: kudoItemSpring 520ms cubic-bezier(.16,1,.3,1) both; }
        @keyframes kudoSpringIn { 0%{transform:translateY(-12px) scale(.985);opacity:0} 62%{transform:translateY(10px) scale(1.015);opacity:1} 82%{transform:translateY(-3px) scale(.998)} 100%{transform:translateY(0) scale(1);opacity:1} }
        @keyframes kudoItemSpring { 0%{transform:translateY(14px);opacity:0} 70%{transform:translateY(-3px);opacity:1} 100%{transform:translateY(0);opacity:1} }
        @media(prefers-reduced-motion:reduce){.kudo-overlay,.kudo-panel,.kudo-item,.kudo-backdrop{transition:none!important;animation:none!important;transform:none!important}}
        .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.35s ease, opacity 0.25s ease; opacity: 0; }
        .faq-answer.open { max-height: 600px; opacity: 1; }
        .faq-chevron { transition: transform 0.25s ease; }
        .faq-chevron.open { transform: rotate(180deg); }
      `}</style>

      {/* ══ NAV ══ */}
      <SiteNav active="/faq" />

      {/* ══ MAIN ══ */}
      <main id="main-content">

        {/* ── HEADER ── */}
        <header className="pt-32 pb-14 px-6 max-w-4xl mx-auto" aria-labelledby="faq-heading">
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("faq_label")}</p>
          <h1 id="faq-heading" className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{t("faq_h1")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">{t("faq_body")}</p>
        </header>

        {/* ── FAQ SECTIONS ── */}
        <section aria-label="Frequently asked questions" className="max-w-4xl mx-auto px-6 pb-24">
          {FAQS.map((cat, catIdx) => (
            <div key={cat.category} className={catIdx > 0 ? "mt-14" : ""}>
              <h2 className="text-xl font-semibold mb-6 text-foreground pb-3 border-b border-border">
                {cat.category}
              </h2>
              <div className="space-y-2" role="list">
                {cat.questions.map((faq, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isOpen = !!openItems[key];
                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-border bg-card overflow-hidden"
                      role="listitem"
                    >
                      <button
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${key}`}
                        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-secondary/40 transition-colors"
                      >
                        <h3 className="text-base font-medium text-foreground leading-snug">
                          {faq.q}
                        </h3>
                        <ChevronDown
                          className={`faq-chevron w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 ${isOpen ? "open" : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        id={`faq-answer-${key}`}
                        className={`faq-answer ${isOpen ? "open" : ""}`}
                        role="region"
                        aria-labelledby={`faq-q-${key}`}
                      >
                        <p className="px-6 pb-5 text-muted-foreground leading-relaxed text-sm">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* ── CTA ── */}
        <section aria-labelledby="faq-cta-heading" className="bg-secondary/20 border-t border-border py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">{t("contact_label")}</p>
            <h2 id="faq-cta-heading" className="text-3xl md:text-4xl font-bold mb-4">{t("faq_cta_h2")}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto">{t("faq_cta_body")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                <a href="/#contact">{t("faq_cta_book")}</a>
              </Button>
              <Button asChild variant="outline" className="border-border hover:bg-secondary px-8 py-3 text-base">
                <a href="mailto:info@kudoadvisory.com">{t("faq_cta_email")}</a>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
