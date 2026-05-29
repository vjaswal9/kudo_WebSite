// src/pages/articles/WhyAIPilotsFail.tsx
// ════════════════════════════════════════════════════
// Kudo Advisory, Article Page
// "Why Enterprise AI Pilots Fail: What to Do About It"
// Author: Vijay Jaswal | SEO & AI-EO Optimised
// ════════════════════════════════════════════════════
import { useEffect, useState } from "react";
import { Mail, Linkedin, Menu, X, ArrowLeft, Clock, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import kudoLogo from "@/assets/kudo-logo.png";
import { PageMeta } from "@/components/PageMeta";

const ARTICLE = {
  title: "Why Enterprise AI Pilots Fail: What to Do About It",
  description:
    "Up to 80% of enterprise AI initiatives never scale beyond the pilot stage. The cause is rarely the technology. It's the absence of strategic clarity, accountable ownership, and governance built for execution. Vijay Jaswal explains why, and how to break the cycle.",
  author: "Vijay Jaswal",
  authorTitle: "Founder & CEO, Kudo Advisory",
  date: "2026-05-19",
  dateFormatted: "19 May 2026",
  readTime: "8 min read",
  category: "AI Strategy",
  slug: "why-enterprise-ai-pilots-fail",
  url: "https://www.kudoadvisory.com/insights/why-enterprise-ai-pilots-fail",
};

export default function WhyAIPilotsFail() {
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

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setReadProgress(total > 0 ? (scrolled / total) * 100 : 0);
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
    } catch {
      // fallback, silently ignore
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <PageMeta
        title="Why Enterprise AI Pilots Fail: What to Do About It | Kudo Advisory"
        description="Up to 80% of enterprise AI initiatives never scale beyond pilot stage. Vijay Jaswal explains the five root causes of AI pilot failure, and what successful organisations do differently."
        canonical="https://www.kudoadvisory.com/insights/why-enterprise-ai-pilots-fail"
        articlePublishedTime="2026-05-19T00:00:00+04:00"
        articleModifiedTime="2026-05-19T00:00:00+04:00"
        articleAuthor="Vijay Jaswal"
        articleSection="AI Strategy"
        articleWordCount={1800}
        articleKeywords={["enterprise AI", "AI pilots", "AI strategy", "AI governance", "AI advisory Dubai", "why AI fails", "AI execution"]}
      />

      {/* Reading progress bar */}
      <div
        className="fixed top-0 inset-x-0 z-[70] h-[3px] bg-primary/20"
        aria-hidden="true"
      >
        <div
          className="h-full bg-primary transition-all duration-100 ease-out"
          style={{ width: `${readProgress}%` }}
        />
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

        /* Article typography */
        .article-body h2 {
          font-size: 1.6rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
          color: hsl(var(--foreground));
        }
        .article-body h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: hsl(var(--foreground));
        }
        .article-body p {
          margin-bottom: 1.4rem;
          line-height: 1.85;
          color: hsl(var(--muted-foreground));
          font-size: 1.05rem;
        }
        .article-body strong {
          color: hsl(var(--foreground));
          font-weight: 600;
        }
        .article-body em {
          color: hsl(var(--foreground));
          font-style: italic;
        }
        .article-body ul, .article-body ol {
          margin-bottom: 1.4rem;
          padding-left: 1.5rem;
          color: hsl(var(--muted-foreground));
        }
        .article-body li {
          margin-bottom: 0.5rem;
          line-height: 1.75;
          font-size: 1.05rem;
        }
        .article-body ul li { list-style-type: disc; }
        .article-body ol li { list-style-type: decimal; }
        .article-body blockquote {
          border-left: 3px solid hsl(var(--primary));
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          background: hsl(var(--secondary) / 0.3);
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .article-body blockquote p {
          font-size: 1.15rem;
          font-style: italic;
          color: hsl(var(--foreground));
          margin-bottom: 0;
        }
        .article-body hr {
          border: none;
          border-top: 1px solid hsl(var(--border));
          margin: 2.5rem 0;
        }
        .stat-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 0.75rem;
          padding: 1rem 0.75rem;
          text-align: center;
        }
        .stat-card .stat-number {
          font-size: clamp(1.5rem, 4.5vw, 2.5rem);
          font-weight: 800;
          color: hsl(var(--primary));
          display: block;
          line-height: 1;
          margin-bottom: 0.35rem;
        }
        .stat-card .stat-label {
          font-size: clamp(0.6rem, 1.8vw, 0.78rem);
          color: hsl(var(--muted-foreground));
          line-height: 1.3;
        }
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

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            {ARTICLE.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {ARTICLE.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm" aria-hidden="true">
                VJ
              </div>
              <div>
                <p className="text-sm font-medium">{ARTICLE.author}</p>
                <p className="text-xs text-muted-foreground">{ARTICLE.authorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={ARTICLE.date}>{ARTICLE.dateFormatted}</time>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {ARTICLE.readTime}
              </span>
              <button
                onClick={handleShare}
                aria-label="Copy article link to clipboard"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Share2 className="w-4 h-4" aria-hidden="true" />}
                <span className="text-xs">{copied ? "Copied!" : "Share"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── ARTICLE BODY ── */}
        <article
          className="max-w-3xl mx-auto px-6 pb-20 article-body"
          aria-label="Article: Why Enterprise AI Pilots Fail"
        >

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 my-10 not-article-body">
            <div className="stat-card">
              <span className="stat-number">80%</span>
              <span className="stat-label">of AI pilots fail to scale beyond proof of concept</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">3×</span>
              <span className="stat-label">more AI budget wasted on initiatives without clear ownership</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">72%</span>
              <span className="stat-label">of executives cite governance gaps as their top AI barrier</span>
            </div>
          </div>

          <p>
            I've spent the better part of three decades sitting across the table from CIOs, CDOs, and boards who are making significant bets on technology. In recent years, that technology is almost always AI. And in those conversations, I hear a version of the same story again and again.
          </p>

          <p>
            The pilot was impressive. The vendor demo was compelling. The proof of concept showed real promise. And then nothing. The initiative stalled, the budget was quietly reallocated, and the organisation moved on to the next thing, carrying the unspoken sense that perhaps AI just wasn't ready for them yet.
          </p>

          <p>
            This isn't a Middle East problem. It's a global one. But it's felt acutely here, where enterprise ambitions are high, investment is significant, and the pressure on leadership to show results is intense. When I founded Kudo Advisory, closing this gap between AI ambition and enterprise reality was the entire reason for the firm's existence.
          </p>

          <p>
            So why do AI pilots fail? And more importantly, what do you do about it?
          </p>

          <hr />

          <h2>The real causes are almost never technical</h2>

          <p>
            The first thing to understand is that when an AI pilot fails, it is almost never because the model wasn't good enough. The models available today: from large language models to computer vision to predictive analytics, are extraordinary. The technology is not the bottleneck.
          </p>

          <p>
            What kills AI initiatives is almost always organisational. In my experience, there are five root causes that account for the vast majority of failures. They tend to compound each other, which is why failing initiatives often feel like they collapsed from multiple directions at once.
          </p>

          <h2>1. The pilot was never connected to a business outcome</h2>

          <p>
            This is the most common failure mode, and the most preventable. Teams get excited about what AI can do: summarise documents, generate code, analyse sentiment, predict churn. And they build a pilot around the capability rather than the outcome.
          </p>

          <p>
            The result is a technically successful pilot that leadership doesn't know how to value. "It works" is not a business case. "It reduces time-to-decision in our credit approval process by 40%" is. The difference between these two is the difference between a pilot that gets extended and one that gets archived.
          </p>

          <p>
            I saw this recently with a large utilities company in the Gulf. Their data team had built a genuinely impressive anomaly detection model for grid fault prediction. It worked. The accuracy was there. But nobody had defined upfront what "success" meant in operational terms, whether that was fewer unplanned outages, reduced engineer callouts, or lower maintenance costs per kilometre of network. When the CIO asked for the business case to scale it, the team had no answer. The pilot was shelved. The model gathered dust. Six months later, a competitor deployed something similar and started talking about it publicly.
          </p>

          <blockquote>
            <p>Every AI initiative needs to start with one question: what measurable business result are we trying to move? If you can't answer that in a single sentence, you are not ready to build a pilot.</p>
          </blockquote>

          <p>
            This sounds obvious. It is not practised nearly enough. I regularly see organisations that have built sophisticated AI capabilities with no clear owner, no success metric, and no line of sight to the P&amp;L. These pilots are already failing before they're finished.
          </p>

          <h2>2. No single accountable owner</h2>

          <p>
            AI initiatives in enterprises typically involve IT, data science, the business unit, legal, compliance, procurement, and sometimes the board. Everyone has a stake. Very few have accountability.
          </p>

          <p>
            When something goes wrong, and in any complex initiative something always does, the absence of a single accountable owner means that decisions slow to a crawl. Escalations bounce between functions. The vendor waits. The timeline slips. Momentum dies.
          </p>

          <p>
            The fix is simple enough to state: name one person who owns the outcome, who has the authority to make decisions, and who is measured on delivery. This person does not need to be the most senior executive in the room. They need to be empowered and accountable. In practice, this is a harder organisational conversation than it sounds: particularly in hierarchical enterprises where ownership tends to be diffuse by design.
          </p>

          <p>
            Think of it like an oil and gas platform turnaround. You wouldn't run a planned shutdown without a single Turnaround Manager who owns the schedule, the budget, and every decision that affects both. Nobody questions that model because the consequences of diffuse accountability are obvious: cost overruns, safety incidents, missed windows. AI programmes deserve the same discipline. The consequences of nobody owning them are just as real, even if they unfold more slowly.
          </p>

          <h2>3. Governance added at the end, not built from the start</h2>

          <p>
            The governance conversation in most AI pilots goes roughly like this: the team builds something, it starts to look promising, and then legal or compliance or the CISO's office asks what controls are in place. The answer is usually "not many." And then the initiative stalls while the organisation works out what responsible deployment actually looks like.
          </p>

          <p>
            This problem is avoidable. AI governance, covering data provenance, model explainability, bias assessment, access controls, human oversight, and regulatory alignment, should be designed into the initiative from day one. Not bolted on at the end.
          </p>

          <p>
            In the UAE and Saudi Arabia specifically, the regulatory environment around AI is evolving rapidly. Organisations that have built governance-first AI programmes are finding that they move faster, not slower, because they've eliminated the late-stage blockers that kill momentum in governance-last organisations.
          </p>

          <h2>4. The operating model wasn't ready</h2>

          <p>
            A successful AI pilot that delivers real value still fails to scale if the organisation isn't structured to absorb it. I've seen this repeatedly: a model is deployed, it works, and then the operational processes, team structures, and workflows that surround it haven't changed to take advantage of what the model provides.
          </p>

          <p>
            AI doesn't drop into organisations like a new piece of software. It changes how decisions get made, where human judgment is required, and what skills teams need. If the operating model hasn't been redesigned to work with AI rather than alongside it, the initiative delivers a fraction of its potential and eventually gets treated as a cost centre rather than a value driver.
          </p>

          <p>
            A mining company I worked with deployed a predictive maintenance model for their heavy equipment fleet. The model was solid. It flagged potential failures 48 to 72 hours before they happened, which should have been transformative for scheduling. But the maintenance crews still ran their shifts on the old weekly planning cycle, and the procurement team still ordered parts on the old reactive basis. The AI output sat in a dashboard that nobody's workflow was structured to act on. A year in, equipment downtime had barely moved. The model wasn't the problem. The organisation around it was.
          </p>

          <h2>5. Leadership bought the vision but not the execution</h2>

          <p>
            Senior leaders are often genuinely excited about AI. They attend conferences, they follow the discourse, they approve the budget. What they are sometimes less equipped for is the hard, unglamorous work of driving execution: making the difficult prioritisation decisions, clearing organisational blockers, holding people accountable to timelines, and communicating clearly to their organisations about what this change means and why it matters.
          </p>

          <p>
            This is not a criticism of leadership. AI transformation is genuinely hard to lead because it cuts across every function and requires a combination of technical literacy, change management capability, and sustained attention that most organisations are still developing. Leadership enablement, helping the C-suite understand AI deeply enough to drive it rather than just sponsor it, is one of the most underinvested areas in enterprise AI programmes.
          </p>

          <hr />

          <h2>What the organisations that succeed do differently</h2>

          <p>
            Having worked with enterprises across Europe, Asia-Pacific, and the Middle East on exactly these challenges, I've observed a consistent set of practices in the organisations that successfully scale AI beyond pilot stage.
          </p>

          <h3>They start with a portfolio, not a single bet</h3>
          <p>
            Successful organisations don't bet everything on one flagship AI initiative. They run a prioritised portfolio of use cases, typically three to five, with different risk profiles, time horizons, and business owners. This creates multiple chances to learn, distributes risk, and builds organisational AI capability across functions simultaneously.
          </p>

          <h3>They instrument for value from the start</h3>
          <p>
            Before a line of code is written or a model is trained, they define the metrics that will determine success. These metrics are tied to business outcomes: revenue, cost, time, quality. Not technical proxies like model accuracy. Everyone involved knows what they're trying to move, and the initiative is structured to move it.
          </p>

          <h3>They treat governance as an enabler</h3>
          <p>
            The best AI organisations have realised that governance is competitive advantage, not compliance overhead. When your AI systems are explainable, auditable, and aligned with regulatory requirements, you can deploy faster and with more confidence. You spend less time in legal review cycles and more time delivering value.
          </p>

          <h3>They embed, rather than deploy</h3>
          <p>
            They redesign the workflows, roles, and decision structures that surround the AI system. They invest in change management. They train the people who will work alongside the AI, not just the people who built it. And they monitor not just technical performance but business adoption.
          </p>

          <h3>They hold leadership accountable for outcomes</h3>
          <p>
            In organisations that scale AI successfully, AI outcomes appear in executive performance frameworks. Leaders are measured on them. This is the single most powerful signal an organisation can send about how seriously it takes AI delivery, and it changes behaviour at every level below.
          </p>

          <p>
            A telecommunications operator in the region did exactly this. Their Chief Digital Officer had AI-related KPIs in her annual review: specific targets for network fault prediction accuracy, for customer churn reduction attributable to AI-driven interventions, and for the number of use cases moved from pilot to production. Within two quarters of that change, the pace of AI delivery across the organisation visibly accelerated. Not because the technology changed. Because accountability did.
          </p>

          <hr />

          <h2>A note on the Middle East context</h2>

          <p>
            Enterprises in the UAE and Saudi Arabia face a specific version of this challenge. Ambition here is real: national AI strategies, significant government investment, and forward-thinking leadership are creating an environment where the pressure to move fast is intense.
          </p>

          <p>
            But speed without structure produces exactly the failure modes I've described above. The organisations I see succeeding in this region are those that have taken the time to build the foundations: the strategy, the governance, the operating model. Then they accelerate. They move fast because they've removed the blockers, not because they've ignored them.
          </p>

          <p>
            The AI opportunity in the Middle East is significant and real. Capturing it requires the same discipline that any serious enterprise programme requires: clarity of purpose, accountable ownership, and governance built to enable rather than obstruct.
          </p>

          <blockquote>
            <p>AI doesn't fail because it isn't good enough. It fails because organisations aren't yet built to make it succeed.</p>
          </blockquote>

          <p>
            That is a solvable problem. And it's precisely the problem that Kudo Advisory exists to solve.
          </p>

          <hr />

          <p className="text-sm text-muted-foreground">
            <strong>Vijay Jaswal</strong> is Founder and CEO of Kudo Advisory, an independent AI advisory firm based in Dubai. He has over 25 years of experience advising boards and C-suite leaders on enterprise technology and AI transformation across Europe, Asia-Pacific, and the Middle East. He was previously CTO for APAC, Japan, Middle East and Africa at IFS, and has been named one of the Top 50 Technology Leaders in the Middle East. He can be reached at{" "}
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
              Dealing with stalled AI initiatives?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Kudo Advisory helps enterprise leaders across Dubai and the Middle East fix the foundations, strategy, governance, operating model, so AI actually delivers. Start with a no-obligation discovery call.
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
