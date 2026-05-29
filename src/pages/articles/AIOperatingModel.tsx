// src/pages/articles/AIOperatingModel.tsx
// ════════════════════════════════════════════════════
// Kudo Advisory, Article Page
// "The AI Operating Model: Structuring Your Organisation
//  to Scale AI Responsibly"
// Author: Vijay Jaswal | SEO & AI-EO Optimised
// ════════════════════════════════════════════════════
import { useEffect, useState } from "react";
import { Mail, Linkedin, Menu, X, ArrowLeft, Clock, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import kudoLogo from "@/assets/kudo-logo.png";
import { PageMeta } from "@/components/PageMeta";

const ARTICLE = {
  title: "The AI Operating Model: Structuring Your Organisation to Scale AI Responsibly",
  description:
    "Most enterprises have pockets of AI. Few have the operating model to scale it. Vijay Jaswal explains what an AI operating model is, why it matters more than the technology itself, and how to build one that actually works across a large organisation.",
  author: "Vijay Jaswal",
  authorTitle: "Founder & CEO, Kudo Advisory",
  date: "2026-05-05",
  dateFormatted: "5 May 2026",
  readTime: "7 min read",
  category: "Operating Model",
  slug: "ai-operating-model",
  url: "https://www.kudoadvisory.com/insights/ai-operating-model",
};

export default function AIOperatingModel() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/#outcomes", label: "Outcomes" },
    { href: "/#services", label: "Services" },
    { href: "/#how", label: "How We Work" },
    { href: "/#about", label: "About" },
    { href: "/insights", label: "Insights" },
    { href: "/#contact", label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setReadProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = prev; };
  }, [mobileMenuOpen]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(ARTICLE.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silently ignore */ }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <PageMeta
        title="The AI Operating Model: Structuring Your Organisation to Scale AI | Kudo Advisory"
        description="Most enterprises have pockets of AI but lack the operating model to scale it. Vijay Jaswal explains the five pillars of an effective AI operating model and the four failure patterns to avoid."
        canonical="https://www.kudoadvisory.com/insights/ai-operating-model"
        articlePublishedTime="2026-05-05T00:00:00+04:00"
        articleModifiedTime="2026-05-05T00:00:00+04:00"
        articleAuthor="Vijay Jaswal"
        articleSection="Operating Model"
        articleWordCount={1900}
        articleKeywords={["AI operating model", "enterprise AI", "AI scaling", "AI transformation", "AI strategy", "AI advisory Middle East", "scaling AI"]}
      />

      {/* Reading progress bar */}
      <div className="fixed top-0 inset-x-0 z-[70] h-[3px] bg-primary/20" aria-hidden="true">
        <div className="h-full bg-primary transition-all duration-100 ease-out" style={{ width: `${readProgress}%` }} />
      </div>

      <style>{`
        .kudo-overlay { transition: opacity 220ms ease; }
        .kudo-backdrop { transition: opacity 260ms ease; opacity: 0; }
        .kudo-overlay.is-open .kudo-backdrop { opacity: 1; }
        .kudo-panel { will-change: transform, opacity; transform: translateY(-10px) scale(.985); opacity: 0; transition: transform 220ms ease, opacity 160ms ease; }
        .kudo-overlay.is-open .kudo-panel { animation: kudoSpringIn 520ms cubic-bezier(.16,1,.3,1) both; }
        .kudo-item { will-change: transform, opacity; transform: translateY(12px); opacity: 0; transition: transform 220ms ease, opacity 160ms ease; }
        .kudo-overlay.is-open .kudo-item { animation: kudoItemSpring 520ms cubic-bezier(.16,1,.3,1) both; }
        @keyframes kudoSpringIn { 0%{transform:translateY(-12px) scale(.985);opacity:0} 62%{transform:translateY(10px) scale(1.015);opacity:1} 82%{transform:translateY(-3px) scale(.998)} 100%{transform:translateY(0) scale(1);opacity:1} }
        @keyframes kudoItemSpring { 0%{transform:translateY(14px);opacity:0} 70%{transform:translateY(-3px);opacity:1} 100%{transform:translateY(0);opacity:1} }
        @media(prefers-reduced-motion:reduce){.kudo-overlay,.kudo-panel,.kudo-item,.kudo-backdrop{transition:none!important;animation:none!important;transform:none!important}}

        .article-body h2 { font-size:1.6rem; font-weight:700; margin-top:2.5rem; margin-bottom:1rem; line-height:1.3; color:hsl(var(--foreground)); }
        .article-body h3 { font-size:1.2rem; font-weight:600; margin-top:2rem; margin-bottom:0.75rem; color:hsl(var(--foreground)); }
        .article-body p { margin-bottom:1.4rem; line-height:1.85; color:hsl(var(--muted-foreground)); font-size:1.05rem; }
        .article-body strong { color:hsl(var(--foreground)); font-weight:600; }
        .article-body em { color:hsl(var(--foreground)); font-style:italic; }
        .article-body ul, .article-body ol { margin-bottom:1.4rem; padding-left:1.5rem; color:hsl(var(--muted-foreground)); }
        .article-body li { margin-bottom:0.6rem; line-height:1.75; font-size:1.05rem; }
        .article-body ul li { list-style-type:disc; }
        .article-body ol li { list-style-type:decimal; }
        .article-body blockquote { border-left:3px solid hsl(var(--primary)); padding:1rem 1.5rem; margin:2rem 0; background:hsl(var(--secondary) / 0.3); border-radius:0 0.5rem 0.5rem 0; }
        .article-body blockquote p { font-size:1.15rem; font-style:italic; color:hsl(var(--foreground)); margin-bottom:0; }
        .article-body hr { border:none; border-top:1px solid hsl(var(--border)); margin:2.5rem 0; }

        .stat-card { background:hsl(var(--card)); border:1px solid hsl(var(--border)); border-radius:0.75rem; padding:1rem 0.75rem; text-align:center; }
        .stat-card .stat-number { font-size:clamp(1.5rem, 4.5vw, 2.5rem); font-weight:800; color:hsl(var(--primary)); display:block; line-height:1; margin-bottom:0.35rem; }
        .stat-card .stat-label { font-size:clamp(0.6rem, 1.8vw, 0.78rem); color:hsl(var(--muted-foreground)); line-height:1.3; }

        .model-pillar { background:hsl(var(--card)); border:1px solid hsl(var(--border)); border-radius:0.75rem; padding:1.5rem; }
        .model-pillar-number { font-size:2rem; font-weight:800; color:hsl(var(--primary) / 0.25); line-height:1; margin-bottom:0.5rem; }
        .model-pillar h4 { font-size:1rem; font-weight:700; color:hsl(var(--foreground)); margin-bottom:0.5rem; }
        .model-pillar p { font-size:0.875rem; color:hsl(var(--muted-foreground)); line-height:1.65; margin-bottom:0; }

        .maturity-row { display:flex; gap:0; border-radius:0.5rem; overflow:hidden; margin-bottom:0.5rem; }
        .maturity-cell { flex:1; padding:0.6rem 0.75rem; font-size:0.75rem; line-height:1.4; }
        .maturity-cell.label { font-weight:600; color:hsl(var(--foreground)); background:hsl(var(--secondary)); flex:0 0 110px; }
        .maturity-cell.l1 { background:hsl(var(--card)); color:hsl(var(--muted-foreground)); }
        .maturity-cell.l2 { background:hsl(var(--primary) / 0.07); color:hsl(var(--muted-foreground)); }
        .maturity-cell.l3 { background:hsl(var(--primary) / 0.15); color:hsl(var(--foreground)); font-weight:500; }
        .maturity-header { font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:hsl(var(--muted-foreground)); }
      `}</style>

      {/* ══ NAV ══ */}
      <nav aria-label="Main navigation" className="fixed top-[3px] inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" aria-label="Kudo Advisory home page">
            <img src={kudoLogo} alt="Kudo Advisory" className="h-12 sm:h-16 w-auto" width="160" height="64" />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}
                className={`hover:text-foreground transition-colors ${item.href === "/insights" ? "text-foreground font-medium" : ""}`}
                aria-current={item.href === "/insights" ? "page" : undefined}
              >{item.label}</a>
            ))}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </nav>

      {/* ══ MOBILE MENU ══ */}
      <div className={`kudo-overlay fixed inset-0 z-[60] md:hidden ${mobileMenuOpen ? "is-open opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} aria-hidden={!mobileMenuOpen}>
        <button type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} className="kudo-backdrop absolute inset-0 bg-background/70 backdrop-blur-xl" />
        <div role="dialog" aria-modal="true" aria-label="Mobile navigation" className="relative h-full w-full">
          <div className="kudo-panel h-full">
            <div className="max-w-7xl mx-auto h-full px-6 pb-10 flex flex-col pt-[env(safe-area-inset-top)]">
              <div className="flex items-center justify-between py-4">
                <img src={kudoLogo} alt="Kudo Advisory" className="h-12 w-auto" width="120" height="48" />
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="max-w-md">
                <div className="mt-6 kudo-item" style={{ animationDelay: mobileMenuOpen ? "90ms" : "0ms" }}>
                  <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-5 text-base font-medium text-primary-foreground hover:bg-primary/90">Book a Discovery Call</a>
                </div>
                <nav aria-label="Mobile nav links" className="mt-7 space-y-2">
                  {navItems.map((item, idx) => (
                    <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                      className="kudo-item flex items-center justify-between rounded-2xl border border-border bg-card/60 px-4 py-4 text-base hover:bg-secondary transition-colors"
                      style={{ animationDelay: mobileMenuOpen ? `${160 + idx * 60}ms` : "0ms" }}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span aria-hidden="true" className="text-muted-foreground">→</span>
                    </a>
                  ))}
                </nav>
              </div>
              <div className="mt-auto pt-10 max-w-md space-y-3">
                <a href="mailto:info@kudoadvisory.com" className="kudo-item flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors" style={{ animationDelay: mobileMenuOpen ? "520ms" : "0ms" }}>
                  <Mail className="w-4 h-4" aria-hidden="true" /> info@kudoadvisory.com
                </a>
                <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="kudo-item flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors" style={{ animationDelay: mobileMenuOpen ? "580ms" : "0ms" }}>
                  <Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn, Vijay Jaswal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MAIN ══ */}
      <main id="main-content">

        {/* ── ARTICLE HEADER ── */}
        <header className="pt-32 pb-12 px-6 max-w-3xl mx-auto">
          <a href="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Insights
          </a>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              {ARTICLE.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{ARTICLE.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{ARTICLE.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm" aria-hidden="true">VJ</div>
              <div>
                <p className="text-sm font-medium">{ARTICLE.author}</p>
                <p className="text-xs text-muted-foreground">{ARTICLE.authorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={ARTICLE.date}>{ARTICLE.dateFormatted}</time>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden="true" />{ARTICLE.readTime}</span>
              <button onClick={handleShare} aria-label="Copy article link to clipboard" className="flex items-center gap-1 hover:text-foreground transition-colors">
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Share2 className="w-4 h-4" aria-hidden="true" />}
                <span className="text-xs">{copied ? "Copied!" : "Share"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── ARTICLE BODY ── */}
        <article className="max-w-3xl mx-auto px-6 pb-20 article-body" aria-label="Article: The AI Operating Model">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 my-10">
            <div className="stat-card">
              <span className="stat-number">74%</span>
              <span className="stat-label">of enterprises report AI value below expectations despite significant investment</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">5×</span>
              <span className="stat-label">more AI initiatives scaled successfully in organisations with a dedicated AI operating model</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">18mo</span>
              <span className="stat-label">average time lost to operating model gaps before organisations course-correct</span>
            </div>
          </div>

          <p>
            This is a scenario I encounter regularly. An enterprise has invested meaningfully in AI. They have data scientists. They have cloud infrastructure. They have run several pilots, some of which produced genuinely promising results. And yet the value from AI is consistently below what was promised, what was budgeted for, and what leadership expected.
          </p>

          <p>
            When I dig into why, the technology is almost never the problem. The models are fine. The data is usable. The individual talent is often excellent. What's missing is the connective tissue: the structure that turns isolated AI capability into organisation-wide AI performance.
          </p>

          <p>
            That connective tissue has a name. The AI operating model.
          </p>

          <p>
            There is a useful parallel in how the automotive industry adopted lean manufacturing. Toyota didn't just install new machinery. They redesigned the entire system around the machinery: the supplier relationships, the quality inspection points, the roles of floor workers, the escalation paths when something went wrong. The technology was only as effective as the operating model built to use it. Every AI programme faces the same challenge.
          </p>

          <p>
            An AI operating model defines how an organisation structures its people, processes, governance, and technology to build, deploy, and sustain AI at scale. It is the difference between having AI and being an AI-capable organisation. In my experience, it is the most underinvested dimension of enterprise AI programmes.
          </p>

          <hr />

          <h2>Why the operating model question matters more than the technology question</h2>

          <p>
            The technology choices in enterprise AI have become progressively easier. Foundation models from major providers have reduced the barrier to building capable AI systems dramatically. Cloud infrastructure is accessible and scalable. Open-source tooling is mature. The hard problems are not primarily technical.
          </p>

          <p>
            The hard problems are organisational. Who owns AI across the enterprise: and how does that ownership interact with existing business unit structures? How do you prevent duplication of effort when five different teams are all building AI capabilities independently? How do you ensure that the governance framework developed by the risk function is actually applied by the teams building products? How do you build and retain AI talent in a market where that talent is fiercely competed for?
          </p>

          <p>
            These are operating model questions. They cannot be answered by buying better technology or hiring more data scientists. They require deliberate organisational design.
          </p>

          <blockquote>
            <p>For most enterprises the question is no longer whether they can build AI. They can. The question is whether they are structured to scale it. Most are not.</p>
          </blockquote>

          <hr />

          <h2>The five pillars of an effective AI operating model</h2>

          <p>
            Through my work with enterprise organisations across the Middle East, Europe, and Asia-Pacific, I've come to think of the AI operating model as having five distinct pillars. Each one has to be designed deliberately. None of them can simply be assumed to follow from the others.
          </p>

          {/* Pillars grid */}
          <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
            <div className="model-pillar">
              <div className="model-pillar-number">01</div>
              <h4>Structure &amp; Ownership</h4>
              <p>How AI capability is organised, centralised, federated, or hybrid, and how accountability for AI outcomes is distributed across the enterprise. This is the most politically sensitive pillar, and the one that most directly determines whether AI can scale.</p>
            </div>
            <div className="model-pillar">
              <div className="model-pillar-number">02</div>
              <h4>Talent &amp; Capability</h4>
              <p>The skills, roles, and learning infrastructure required to build and sustain AI at scale. Covers both specialist AI roles and the broader AI literacy that non-technical leaders and teams need to work effectively alongside AI systems.</p>
            </div>
            <div className="model-pillar">
              <div className="model-pillar-number">03</div>
              <h4>Process &amp; Workflow Integration</h4>
              <p>How AI systems are embedded into operational processes and decision workflows. Not just deployed alongside them. This is where most of the value either crystallises or evaporates: in the daily routines of the people working with AI outputs.</p>
            </div>
            <div className="model-pillar">
              <div className="model-pillar-number">04</div>
              <h4>Governance &amp; Risk</h4>
              <p>The policies, controls, and accountability structures that ensure AI is deployed responsibly and in compliance with regulatory requirements. The operating model must specify how governance is embedded into development and deployment processes. Not appended at the end.</p>
            </div>
            <div className="model-pillar sm:col-span-2">
              <div className="model-pillar-number">05</div>
              <h4>Technology &amp; Data Infrastructure</h4>
              <p>The platforms, tools, and data architecture that enable AI teams to build, test, deploy, and monitor AI systems efficiently. This includes MLOps infrastructure, data pipelines, and the standards that prevent every team from rebuilding the same foundations independently.</p>
            </div>
          </div>

          <p>
            Most AI programmes have something in each of these pillars. What distinguishes organisations that scale AI from those that don't is whether the pillars are designed to work together: whether they form a coherent system rather than a collection of independent initiatives.
          </p>

          <hr />

          <h2>The structure question: centralised, federated, or hybrid?</h2>

          <p>
            Of the five pillars, the structure and ownership question generates the most debate and the most organisational friction. There is no single right answer. But there are clear trade-offs, and understanding them is essential to making a deliberate choice.
          </p>

          <h3>Centralised: one AI function owns everything</h3>

          <p>
            In a centralised model, a single AI function, typically sitting within technology, data, or a standalone AI Centre of Excellence, is responsible for building and deploying AI across the organisation. Business units make requests; the central function delivers.
          </p>

          <p>
            The advantage is consistency: consistent standards, consistent governance, consistent tooling, and efficient reuse of capabilities. The disadvantage is distance: central AI teams often lack the deep domain knowledge of the business units they serve, and business units often feel that the central function doesn't understand their specific needs or move fast enough to meet them.
          </p>

          <h3>Federated: AI capability lives in the business units</h3>

          <p>
            In a federated model, AI capability is built and owned within individual business units, which have the autonomy to hire their own AI talent, choose their own tools, and build their own systems.
          </p>

          <p>
            The advantage is speed: teams close to the business problem build solutions faster and with better domain fit. The disadvantage is fragmentation: duplicated effort, inconsistent standards, governance gaps, and significant challenges in sharing capabilities or data across the organisation.
          </p>

          <h3>Hybrid: the model that most mature organisations converge on</h3>

          <p>
            Most enterprises that have been through the full cycle, centralised then federated or vice versa, converge on a hybrid model. A central AI function owns the shared infrastructure, the governance framework, the talent standards, and the reusable platform capabilities. Business units own the domain-specific AI applications and have embedded AI talent that works closely with business stakeholders.
          </p>

          <p>
            The hybrid model is harder to design and govern, but it captures the advantages of both approaches. The central function enables. The business units build. Neither group tries to do everything.
          </p>

          <hr />

          <h2>Where operating models break down: the four failure patterns</h2>

          <p>
            Having seen AI operating models succeed and fail across a wide range of organisations and sectors, I've identified four recurring failure patterns. They are worth naming explicitly because they are often not visible until significant damage has been done.
          </p>

          <h3>The capability island</h3>

          <p>
            AI capability builds up in one part of the organisation, typically a data science team or a Centre of Excellence, but fails to connect meaningfully with the business units it is supposed to serve. The central team builds impressive things that nobody uses, or does not use at full potential. The business units, frustrated by the distance, start building their own shadow AI capabilities. Over time, the organisation ends up with both a costly central function and a fragmented set of business-unit initiatives: the worst of both worlds.
          </p>

          <p>
            The fix is structural: embed AI talent in business units, even if it's funded and governed centrally. Proximity to the business problem is not optional.
          </p>

          <p>
            A telecommunications operator in the region ran into this pattern with their network optimisation programme. The central AI team built a genuinely capable model for dynamic spectrum allocation. But the network operations team, who would actually use it, had been given no visibility into the project and no involvement in its design. When the model was handed over, the operations team didn't trust it. They kept running manual allocations. The model ran in parallel, largely ignored, for eight months before someone finally sat the two teams down in the same room to design a workflow they could both own.
          </p>

          <h3>The process bypass</h3>

          <p>
            An AI system is deployed, but the operational processes around it do not change. People receive AI outputs, recommendations, predictions, flags, but their workflows haven't been redesigned to act on them effectively. The AI sits alongside the existing process rather than being embedded within it.
          </p>

          <p>
            This is one of the most common and most expensive operating model failures. An AI system that improves decision accuracy by 30% delivers zero value if the decision-making process has not been redesigned to use that improved accuracy. Process redesign is not a technology workstream. It belongs to operations and change management: and it needs to be planned from the start.
          </p>

          <h3>The governance bypass</h3>

          <p>
            Governance frameworks are developed by the risk or compliance function but never meaningfully integrated into the AI development process. Developers and data scientists learn that governance engagement slows things down, so they engage as late as possible. By the time they do, at deployment, changes are expensive. The governance function becomes reactive and adversarial rather than proactive and enabling.
          </p>

          <p>
            The operating model needs to specify exactly when and how governance is engaged in the AI development lifecycle: and governance teams need to be resourced and incentivised to engage early, when their input can genuinely shape outcomes.
          </p>

          <h3>The talent ceiling</h3>

          <p>
            The organisation builds AI capability in a narrow cohort of specialists but fails to build AI literacy in the broader workforce. Leaders do not understand AI well enough to make good decisions about it. Middle managers don't trust AI outputs enough to act on them. Frontline staff resist AI tools because nobody has invested in helping them understand how to work with them effectively.
          </p>

          <p>
            AI talent strategy cannot be limited to hiring data scientists and ML engineers. It must include a serious investment in AI literacy across the organisation: from board level down to the teams working with AI systems daily.
          </p>

          <hr />

          <h2>A maturity model for AI operating model design</h2>

          <p>
            Organisations do not build AI operating models in a single step. They evolve through stages of maturity, and understanding where you are is the starting point for designing where you need to get to.
          </p>

          {/* Maturity table */}
          <div className="my-8 not-prose overflow-x-auto rounded-xl border border-border">
            <div className="min-w-[520px]">
              <div className="maturity-row bg-secondary/50">
                <div className="maturity-cell label maturity-header">Dimension</div>
                <div className="maturity-cell maturity-header">Stage 1: Ad hoc</div>
                <div className="maturity-cell maturity-header">Stage 2: Structured</div>
                <div className="maturity-cell maturity-header">Stage 3: Scaled</div>
              </div>
              {[
                ["Structure", "AI sits in IT or isolated team", "CoE established, some BU coverage", "Hybrid model, embedded talent"],
                ["Talent", "A few specialists, no broader literacy", "Growing specialist team, some upskilling", "Enterprise-wide AI literacy programme"],
                ["Process", "AI sits beside workflows", "Some workflows redesigned for AI", "AI integral to core decision processes"],
                ["Governance", "Ad hoc, bolted on", "Framework exists, inconsistently applied", "Governance embedded in dev lifecycle"],
                ["Technology", "Fragmented tools, no shared platform", "Shared platform emerging, some standards", "Enterprise MLOps, reusable components"],
              ].map(([label, l1, l2, l3]) => (
                <div key={label} className="maturity-row border-t border-border">
                  <div className="maturity-cell label">{label}</div>
                  <div className="maturity-cell l1">{l1}</div>
                  <div className="maturity-cell l2">{l2}</div>
                  <div className="maturity-cell l3">{l3}</div>
                </div>
              ))}
            </div>
          </div>

          <p>
            Most large enterprises in the Middle East sit between Stage 1 and Stage 2. The goal is not to jump immediately to Stage 3: that is a multi-year journey. The goal is to have a clear picture of where you are, where you need to get to, and what the priority moves are to close the gap.
          </p>

          <hr />

          <h2>Where to start: the operating model assessment</h2>

          <p>
            The most useful first step for any enterprise that wants to improve its AI operating model is a structured assessment. An honest picture of where you currently stand across each of the five pillars, where the most critical gaps are, and what the highest-use interventions would be.
          </p>

          <p>
            This assessment doesn't need to be lengthy. In my experience, a focused two-to-three week diagnostic with the right stakeholders, covering the C-suite, technology leadership, data and AI teams, and a representative set of business units, produces a clear enough picture to prioritise action.
          </p>

          <p>
            What you're looking for is not perfection across all five pillars simultaneously. You're looking for the one or two structural changes that will unlock the most value from the AI investment you've already made. Often it is the same answer: get the structure right, get governance embedded earlier, and invest in the process redesign that makes AI outputs actually usable by the people working with them.
          </p>

          <blockquote>
            <p>You do not need a perfect operating model to start scaling AI. You need a clear-eyed view of where the model is breaking down, and the will to fix it.</p>
          </blockquote>

          <hr />

          <h2>The operating model as competitive infrastructure</h2>

          <p>
            I want to close with a framing that I think changes how enterprise leaders approach this question. The AI operating model is not a back-office concern. It is competitive infrastructure.
          </p>

          <p>
            Organisations that build strong AI operating models compound their advantage over time. Every AI system deployed in a well-structured operating model teaches the organisation something: about how to work with AI, about what data is valuable, about where the governance friction is, about what talent and skills are needed next. That institutional learning accumulates.
          </p>

          <p>
            Organisations without a coherent operating model don't compound. They cycle: building capability, losing it, rebuilding it elsewhere, never quite getting traction. The investment is real but the returns are inconsistent.
          </p>

          <p>
            In a region where AI ambition is exceptionally high and the window for competitive differentiation is open right now, the organisations that build the operating model foundations will be the ones that are still ahead five years from now. Not because they had better models or more data. Because they built the structure that allowed them to use both effectively.
          </p>

          <hr />

          <p className="text-sm text-muted-foreground">
            <strong>Vijay Jaswal</strong> is Founder and CEO of Kudo Advisory, an independent AI advisory firm based in Dubai. He has over 25 years of experience advising boards and C-suite leaders on enterprise technology and AI transformation across Europe, Asia-Pacific, and the Middle East. He can be reached at{" "}
            <a href="mailto:info@kudoadvisory.com" className="text-primary hover:text-primary/80 transition-colors">info@kudoadvisory.com</a>
            {" "}or on{" "}
            <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">LinkedIn</a>.
          </p>

        </article>

        {/* ── CTA ── */}
        <section aria-labelledby="article-cta-heading" className="bg-secondary/20 border-t border-border py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">Work With Us</p>
            <h2 id="article-cta-heading" className="text-2xl md:text-3xl font-bold mb-4">
              Ready to build an AI operating model that scales?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Kudo Advisory helps enterprise leaders across Dubai and the Middle East design the structures, processes, and governance frameworks that turn AI investment into sustained competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                <a href="/#contact">Book a Discovery Call</a>
              </Button>
              <Button asChild variant="outline" className="border-border hover:bg-secondary px-8 py-3 text-base">
                <a href="/insights">More Insights</a>
              </Button>
            </div>
          </div>
        </section>

      </main>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground" aria-label="Site footer">
        <p>
          © {new Date().getFullYear()}{" "}
          <a href="/" className="hover:text-foreground transition-colors">Kudo Advisory</a>
          {" "}- AI Advisory &amp; AI Consultancy, Dubai, UAE. We exist to make AI move. All rights reserved.
        </p>
        <p className="mt-2">
          <a href="mailto:info@kudoadvisory.com" className="hover:text-foreground transition-colors">info@kudoadvisory.com</a>
        </p>
      </footer>
    </div>
  );
}
