// src/pages/articles/AIUseCasePrioritisation.tsx
// ════════════════════════════════════════════════════
// Kudo Advisory, Article Page
// "How to Prioritise AI Use Cases: A Framework for
//  Enterprise Leaders"
// Author: Vijay Jaswal | SEO & AI-EO Optimised
// ════════════════════════════════════════════════════
import { useEffect, useState } from "react";
import { Mail, Linkedin, Menu, X, ArrowLeft, Clock, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import kudoLogo from "@/assets/kudo-logo.png";
import { PageMeta } from "@/components/PageMeta";

const ARTICLE = {
  title: "How to Prioritise AI Use Cases: A Framework for Enterprise Leaders",
  description:
    "Every enterprise has more AI ideas than it can execute. The organisations that get the most from AI don't build the most: they build the right things first. Vijay Jaswal shares a practical prioritisation framework for enterprise leaders navigating a crowded AI opportunity landscape.",
  author: "Vijay Jaswal",
  authorTitle: "Founder & CEO, Kudo Advisory",
  date: "2026-04-14",
  dateFormatted: "14 April 2026",
  readTime: "9 min read",
  category: "AI Strategy",
  slug: "ai-use-case-prioritisation",
  url: "https://www.kudoadvisory.com/insights/ai-use-case-prioritisation",
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/#outcomes", label: "Outcomes" },
  { href: "/#services", label: "Services" },
  { href: "/#how", label: "How We Work" },
  { href: "/#about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

const SHARED_STYLES = `
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
  .criterion-card { background:hsl(var(--card)); border:1px solid hsl(var(--border)); border-radius:0.75rem; padding:1.25rem 1.5rem; }
  .criterion-card .criterion-num { font-size:1.75rem; font-weight:800; color:hsl(var(--primary) / 0.3); line-height:1; margin-bottom:0.3rem; }
  .criterion-card h4 { font-size:1rem; font-weight:700; color:hsl(var(--foreground)); margin-bottom:0.4rem; }
  .criterion-card p { font-size:0.875rem; color:hsl(var(--muted-foreground)); line-height:1.65; margin-bottom:0; }
  .quadrant-grid { display:grid; grid-template-columns:1fr 1fr; gap:0; border:1px solid hsl(var(--border)); border-radius:0.75rem; overflow:hidden; }
  .quadrant-cell { padding:1.25rem; border:1px solid hsl(var(--border) / 0.5); }
  .quadrant-cell h4 { font-size:0.875rem; font-weight:700; margin-bottom:0.4rem; }
  .quadrant-cell p { font-size:0.8rem; color:hsl(var(--muted-foreground)); line-height:1.5; margin:0; }
  .quadrant-cell.q1 { background:hsl(var(--primary) / 0.12); }
  .quadrant-cell.q2 { background:hsl(var(--card)); }
  .quadrant-cell.q3 { background:hsl(var(--secondary) / 0.4); }
  .quadrant-cell.q4 { background:hsl(var(--card)); }
  .axis-label { font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:hsl(var(--muted-foreground)); }
`;

export default function AIUseCasePrioritisation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

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
    try { await navigator.clipboard.writeText(ARTICLE.url); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { /* ignore */ }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <PageMeta
        title="How to Prioritise AI Use Cases: A Framework for Enterprise Leaders | Kudo Advisory"
        description="Every enterprise has more AI ideas than it can execute. Vijay Jaswal shares a five-dimension prioritisation framework and value-vs-feasibility matrix to build the right AI portfolio."
        canonical="https://www.kudoadvisory.com/insights/ai-use-case-prioritisation"
        articlePublishedTime="2026-04-14T00:00:00+04:00"
        articleModifiedTime="2026-04-14T00:00:00+04:00"
        articleAuthor="Vijay Jaswal"
        articleSection="AI Strategy"
        articleWordCount={1700}
        articleKeywords={["AI use case prioritisation", "AI portfolio", "enterprise AI strategy", "AI value", "AI feasibility", "AI advisory", "AI ROI"]}
      />
      <div className="fixed top-0 inset-x-0 z-[70] h-[3px] bg-primary/20" aria-hidden="true">
        <div className="h-full bg-primary transition-all duration-100 ease-out" style={{ width: `${readProgress}%` }} />
      </div>
      <style>{SHARED_STYLES}</style>

      {/* ══ NAV ══ */}
      <nav aria-label="Main navigation" className="fixed top-[3px] inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" aria-label="Kudo Advisory home page"><img src={kudoLogo} alt="Kudo Advisory" className="h-12 sm:h-16 w-auto" width="160" height="64" /></a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {NAV.map((item) => (<a key={item.href} href={item.href} className={`hover:text-foreground transition-colors ${item.href === "/insights" ? "text-foreground font-medium" : ""}`} aria-current={item.href === "/insights" ? "page" : undefined}>{item.label}</a>))}
          </div>
          <div className="md:hidden"><Button variant="ghost" size="icon" className="rounded-full" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}><Menu className="h-5 w-5" aria-hidden="true" /></Button></div>
        </div>
      </nav>

      {/* ══ MOBILE MENU ══ */}
      <div className={`kudo-overlay fixed inset-0 z-[60] md:hidden ${mobileMenuOpen ? "is-open opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} aria-hidden={!mobileMenuOpen}>
        <button type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} className="kudo-backdrop absolute inset-0 bg-background/70 backdrop-blur-xl" />
        <div role="dialog" aria-modal="true" className="relative h-full w-full">
          <div className="kudo-panel h-full">
            <div className="max-w-7xl mx-auto h-full px-6 pb-10 flex flex-col pt-[env(safe-area-inset-top)]">
              <div className="flex items-center justify-between py-4">
                <img src={kudoLogo} alt="Kudo Advisory" className="h-12 w-auto" />
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}><X className="h-5 w-5" /></Button>
              </div>
              <div className="max-w-md">
                <div className="mt-6 kudo-item" style={{ animationDelay: mobileMenuOpen ? "90ms" : "0ms" }}>
                  <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-5 text-base font-medium text-primary-foreground hover:bg-primary/90">Book a Discovery Call</a>
                </div>
                <nav className="mt-7 space-y-2">
                  {NAV.map((item, idx) => (<a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="kudo-item flex items-center justify-between rounded-2xl border border-border bg-card/60 px-4 py-4 text-base hover:bg-secondary transition-colors" style={{ animationDelay: mobileMenuOpen ? `${160 + idx * 60}ms` : "0ms" }}><span className="font-medium">{item.label}</span><span className="text-muted-foreground" aria-hidden="true">→</span></a>))}
                </nav>
              </div>
              <div className="mt-auto pt-10 max-w-md space-y-3">
                <a href="mailto:info@kudoadvisory.com" className="kudo-item flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm hover:bg-secondary transition-colors" style={{ animationDelay: mobileMenuOpen ? "520ms" : "0ms" }}><Mail className="w-4 h-4" aria-hidden="true" /> info@kudoadvisory.com</a>
                <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="kudo-item flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm hover:bg-secondary transition-colors" style={{ animationDelay: mobileMenuOpen ? "580ms" : "0ms" }}><Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn, Vijay Jaswal</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main id="main-content">
        <header className="pt-32 pb-12 px-6 max-w-3xl mx-auto">
          <a href="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Insights</a>
          <div className="flex flex-wrap items-center gap-3 mb-6"><span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">{ARTICLE.category}</span></div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{ARTICLE.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{ARTICLE.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm" aria-hidden="true">VJ</div>
              <div><p className="text-sm font-medium">{ARTICLE.author}</p><p className="text-xs text-muted-foreground">{ARTICLE.authorTitle}</p></div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={ARTICLE.date}>{ARTICLE.dateFormatted}</time>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden="true" />{ARTICLE.readTime}</span>
              <button onClick={handleShare} aria-label="Copy link" className="flex items-center gap-1 hover:text-foreground transition-colors">
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Share2 className="w-4 h-4" aria-hidden="true" />}
                <span className="text-xs">{copied ? "Copied!" : "Share"}</span>
              </button>
            </div>
          </div>
        </header>

        <article className="max-w-3xl mx-auto px-6 pb-20 article-body">

          <div className="grid grid-cols-3 gap-2 sm:gap-4 my-10">
            <div className="stat-card"><span className="stat-number">12×</span><span className="stat-label">more AI use cases generated than any single enterprise can execute in a year</span></div>
            <div className="stat-card"><span className="stat-number">67%</span><span className="stat-label">of AI budgets spent on the wrong use cases: high effort, low strategic return</span></div>
            <div className="stat-card"><span className="stat-number">4×</span><span className="stat-label">higher ROI in organisations that use a structured use case prioritisation framework</span></div>
          </div>

          <p>Every AI strategy engagement I lead starts the same way. I ask the senior leadership team to write down the AI use cases they believe the organisation should be pursuing. In a large enterprise, this typically produces somewhere between twenty and sixty distinct ideas within the first hour: process automation opportunities, customer-facing AI applications, data analytics enhancements, generative AI tools, predictive models, and more.</p>

          <p>The ideas are almost always genuinely interesting. Many of them are technically feasible. A handful of them, if executed well, could deliver significant business value. And the organisation has the resource to pursue perhaps four to six of them meaningfully in any given year.</p>

          <p>The question is which four to six. And answering that question well is the difference between an AI programme that builds momentum and one that dissipates energy across too many fronts simultaneously.</p>

          <p>This article sets out the prioritisation framework I use with enterprise clients. It is designed to be practical enough to apply in a workshop setting, rigorous enough to produce defensible decisions, and flexible enough to work across different industries and organisational contexts.</p>

          <hr />

          <h2>Why most organisations prioritise AI use cases badly</h2>

          <p>Before the framework, it is worth understanding why AI use case prioritisation tends to go wrong. The failure modes are consistent enough that naming them is useful.</p>

          <h3>Prioritising by enthusiasm rather than evidence</h3>
          <p>The loudest voice in the room, often a senior executive who has seen an impressive AI demo or read about a competitor's initiative, drives use case selection. This produces a portfolio biased towards whatever excites leadership rather than whatever creates value for the business.</p>

          <p>
            I worked with a manufacturing company whose head of digital had become genuinely enthusiastic about generative AI after seeing a competitor's customer-facing chatbot. Within weeks, there was a budget request on the table for a similar product. The initiative had bypassed the normal prioritisation process entirely. Eighteen months later, the chatbot was live, handling a relatively small volume of low-complexity customer queries. Meanwhile, a predictive quality inspection model that the operations team had been requesting for two years, one with a clear cost reduction case tied to scrap rates worth tens of millions, was still waiting for funding. The loudest idea had won at the expense of the best one.
          </p>

          <h3>Prioritising what's easiest to build rather than what's most valuable</h3>
          <p>Data science teams, understandably, gravitate towards problems that are technically interesting and data-rich. These problems are not always the ones that matter most strategically. A well-prioritised AI portfolio will sometimes include technically difficult problems precisely because the business value is exceptional.</p>

          <h3>Failing to account for feasibility</h3>
          <p>High-value use cases are sometimes pursued without an honest assessment of whether the organisation has the data quality, technical infrastructure, and change management capability to execute them successfully. Overestimating feasibility is one of the leading causes of AI programme failure.</p>

          <h3>Ignoring portfolio balance</h3>
          <p>A portfolio of all high-risk, long-horizon bets will struggle to maintain organisational support. A portfolio that is all quick wins will underinvest in the transformative AI applications that create durable competitive advantage. Balance, across time horizons, risk profiles, and business functions, is a design criterion, not an afterthought.</p>

          <blockquote>
            <p>The use cases you choose not to pursue are as important as those you build. A disciplined no to ten mediocre opportunities creates the capacity to build one exceptional one.</p>
          </blockquote>

          <hr />

          <h2>The five-dimension prioritisation framework</h2>

          <p>The framework I use evaluates each AI use case against five dimensions. Each dimension is scored on a simple 1-5 scale during a structured workshop with the relevant stakeholders. The scores are not meant to produce a mechanically definitive ranking: they are meant to make trade-offs visible and discussable.</p>

          <div className="my-8 grid sm:grid-cols-2 gap-4 not-prose">
            {[
              { num: "01", title: "Strategic alignment", desc: "How directly does this use case support a stated strategic priority? Use cases that address a top-three board objective score highest. Use cases that are interesting but peripheral to the core strategy score lowest." },
              { num: "02", title: "Business value", desc: "What is the realistic business impact if this use case is executed well? Score against quantifiable outcomes: revenue impact, cost reduction, time saving, risk reduction, or customer experience improvement. Require a specific estimate, not a directional claim." },
              { num: "03", title: "Feasibility", desc: "How achievable is this use case given the organisation's current data quality, technical infrastructure, talent, and change management capacity? This dimension should be scored honestly: overestimating feasibility is one of the most common and most costly mistakes in AI portfolio planning." },
              { num: "04", title: "Time to value", desc: "How long before this use case delivers meaningful business results? Use cases that can show value within six months score highest. Use cases with an 18-month or longer horizon score lower. Not because they're less important, but because the portfolio needs a mix of horizons to maintain momentum and organisational support." },
              { num: "05", title: "Risk and governance complexity", desc: "How significant are the data privacy, regulatory, ethical, and security risks associated with this use case? How complex is the governance requirement? High-risk use cases aren't necessarily deprioritised: but the resource and time cost of managing their governance must be factored in." },
            ].map((c) => (
              <div key={c.num} className="criterion-card">
                <div className="criterion-num">{c.num}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          <p>In practice I run this scoring in a structured two-hour workshop with cross-functional representation: strategy, technology, data, business units, and risk. The goal is not consensus on every score, but a shared understanding of where perspectives diverge and why. Those divergences are often the most valuable part of the exercise.</p>

          <hr />

          <h2>The prioritisation matrix: turning scores into decisions</h2>

          <p>Once use cases are scored, the most useful visualisation is a two-dimensional matrix plotting business value against feasibility. This is sometimes called the value-effort matrix, and it produces four distinct quadrants that correspond to four distinct strategic postures.</p>

          {/* Quadrant matrix */}
          <div className="my-8 not-prose">
            <div className="flex justify-between mb-1 px-1">
              <span className="axis-label">← Lower feasibility</span>
              <span className="axis-label">Higher feasibility →</span>
            </div>
            <div className="quadrant-grid">
              <div className="quadrant-cell q2">
                <h4 className="text-foreground">Strategic bets</h4>
                <p>High value, lower feasibility. Invest in building the capability to pursue these: improve data quality, upskill teams, or phase the initiative to reduce initial complexity. Don't abandon them; plan the path to feasibility.</p>
              </div>
              <div className="quadrant-cell q1">
                <h4 className="text-primary">Priority build</h4>
                <p>High value, high feasibility. These are your primary investments. They should represent 50-60% of your AI programme capacity. Move fast, instrument for value, and use these to build organisational AI confidence.</p>
              </div>
              <div className="quadrant-cell q4">
                <h4 className="text-foreground">Deprioritise</h4>
                <p>Low value, lower feasibility. Set aside unless strategic context changes significantly. Don't let enthusiasm for the technology override the absence of a compelling business case.</p>
              </div>
              <div className="quadrant-cell q3">
                <h4 className="text-foreground">Quick wins</h4>
                <p>Lower value but highly feasible. Valuable for building organisational capability and AI literacy. Allocate 20-30% of capacity here: enough to generate visible results without crowding out higher-value work.</p>
              </div>
            </div>
            <div className="flex justify-end mt-1 px-1 flex-col items-end gap-0.5">
              <span className="axis-label">Higher value ↑</span>
              <span className="axis-label">↓ Lower value</span>
            </div>
          </div>

          <p>The matrix makes trade-offs visible in a way that a ranked list doesn't. Leaders can see immediately why certain use cases are prioritised and others aren't, which makes the resulting portfolio easier to defend to stakeholders and easier to course-correct as circumstances change.</p>

          <hr />

          <h2>Building a balanced portfolio</h2>

          <p>The matrix is necessary but not sufficient. A portfolio of four Priority Build initiatives might score well on the matrix but still be unbalanced in ways that create problems: too concentrated in one business function, too uniform in time horizon, or too similar in risk profile to generate the organisational learning that a diverse portfolio produces.</p>

          <p>When I review a prioritised AI portfolio with clients, I apply four additional balance tests.</p>

          <h3>Time horizon balance</h3>
          <p>A healthy portfolio has initiatives across at least two time horizons: near-term (value within six months) and medium-term (value within twelve to eighteen months). A portfolio dominated by long-horizon initiatives will lose organisational momentum. A portfolio dominated by quick wins will underinvest in the transformative applications that create durable advantage.</p>

          <h3>Business function coverage</h3>
          <p>AI programmes that live entirely within one business function, typically IT or operations, struggle to build the cross-functional ownership and advocacy they need to scale. A portfolio with representation across at least three business functions creates broader organisational investment in the programme's success.</p>

          <h3>Risk diversity</h3>
          <p>Not all initiatives should carry the same risk profile. A mix of lower-risk, well-understood applications alongside higher-risk ones allows the organisation to build capability and confidence while taking calibrated bets where the upside is worth it.</p>

          <h3>Data readiness spread</h3>
          <p>If every initiative in the portfolio depends on the same data assets, particularly data assets that have known quality or accessibility issues, the portfolio is exposed to a single point of failure. Spreading across different data domains reduces this concentration risk.</p>

          <hr />

          <h2>The governance check: one question before you commit</h2>

          <p>Before any AI use case moves from prioritised to funded, I recommend one final governance check. It is one question, but worth asking explicitly rather than assuming the answer.</p>

          <p><em>Can we deploy this use case responsibly, meeting our data privacy obligations, our regulatory requirements, and our ethical standards, within the timeline and budget we've allocated?</em></p>

          <p>If the honest answer is no, or not yet, the use case should be sent back to the planning stage rather than funded on the assumption that governance will figure itself out. It rarely does. And the cost of deploying an AI system that turns out to be non-compliant or ethically problematic is almost always higher than the cost of getting the governance right before deployment.</p>

          <hr />

          <h2>Prioritisation as an ongoing discipline</h2>

          <p>A final note: AI use case prioritisation is not a one-time exercise. The technology evolves, the business environment changes, and early initiatives produce learnings that reshape subsequent decisions.</p>

          <p>The organisations I see getting the most from AI treat prioritisation as a quarterly discipline: revisiting the portfolio, incorporating new learnings, adjusting allocations based on what's working and what isn't, and making explicit decisions about what to continue, what to accelerate, and what to stop.</p>

          <p>That quarterly rhythm is what turns a one-time prioritisation exercise into a genuine portfolio management capability: and it is what separates the organisations that sustain AI momentum from those that peak early and plateau.</p>

          <hr />

          <p className="text-sm text-muted-foreground"><strong>Vijay Jaswal</strong> is Founder and CEO of Kudo Advisory, an independent AI advisory firm based in Dubai. He has over 25 years of experience advising boards and C-suite leaders on enterprise technology and AI transformation across Europe, Asia-Pacific, and the Middle East. He can be reached at <a href="mailto:info@kudoadvisory.com" className="text-primary hover:text-primary/80 transition-colors">info@kudoadvisory.com</a> or on <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">LinkedIn</a>.</p>

        </article>

        <section aria-labelledby="cta-heading" className="bg-secondary/20 border-t border-border py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">Work With Us</p>
            <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-4">Need help prioritising your AI portfolio?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-xl">Kudo Advisory runs structured AI use case prioritisation workshops for enterprise leadership teams across Dubai and the Middle East, turning a backlog of ideas into a focused, fundable AI portfolio.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base"><a href="/#contact">Book a Discovery Call</a></Button>
              <Button asChild variant="outline" className="border-border hover:bg-secondary px-8 py-3 text-base"><a href="/insights">More Insights</a></Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} <a href="/" className="hover:text-foreground transition-colors">Kudo Advisory</a> - AI Advisory &amp; AI Consultancy, Dubai, UAE. We exist to make AI move. All rights reserved.</p>
        <p className="mt-2"><a href="mailto:info@kudoadvisory.com" className="hover:text-foreground transition-colors">info@kudoadvisory.com</a></p>
      </footer>
    </div>
  );
}
