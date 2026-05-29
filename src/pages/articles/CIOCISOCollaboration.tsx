// src/pages/articles/CIOCISOCollaboration.tsx
// ════════════════════════════════════════════════════
// Kudo Advisory, Article Page
// "The CIO and CISO Conversation That Every AI
//  Programme Needs"
// Author: Vijay Jaswal | SEO & AI-EO Optimised
// ════════════════════════════════════════════════════
import { useEffect, useState } from "react";
import { Mail, Linkedin, Menu, X, ArrowLeft, Clock, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import kudoLogo from "@/assets/kudo-logo.png";
import { PageMeta } from "@/components/PageMeta";

const ARTICLE = {
  title: "The CIO and CISO Conversation That Every AI Programme Needs",
  description:
    "AI programmes stall when security and technology leadership operate in silos. Vijay Jaswal explains why the CIO-CISO relationship is the most consequential dynamic in enterprise AI: and what it looks like when it works.",
  author: "Vijay Jaswal",
  authorTitle: "Founder & CEO, Kudo Advisory",
  date: "2026-04-28",
  dateFormatted: "28 April 2026",
  readTime: "6 min read",
  category: "Leadership",
  slug: "ciso-cio-ai-collaboration",
  url: "https://www.kudoadvisory.com/insights/ciso-cio-ai-collaboration",
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
  .tension-card { border-radius:0.75rem; padding:1.25rem 1.5rem; margin-bottom:0.75rem; }
  .tension-card h4 { font-size:0.95rem; font-weight:700; margin-bottom:0.4rem; }
  .tension-card p { font-size:0.875rem; line-height:1.65; margin-bottom:0; color:hsl(var(--muted-foreground)); }
`;

export default function CIOCISOCollaboration() {
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
        title="The CIO and CISO Conversation That Every AI Programme Needs | Kudo Advisory"
        description="AI programmes stall when security and technology leadership operate in silos. Vijay Jaswal explains why the CIO-CISO relationship is the most consequential dynamic in enterprise AI."
        canonical="https://www.kudoadvisory.com/insights/ciso-cio-ai-collaboration"
        articlePublishedTime="2026-04-28T00:00:00+04:00"
        articleModifiedTime="2026-04-28T00:00:00+04:00"
        articleAuthor="Vijay Jaswal"
        articleSection="Leadership"
        articleWordCount={1500}
        articleKeywords={["CIO CISO collaboration", "AI security", "AI governance", "enterprise AI leadership", "AI programme management", "AI advisory", "technology leadership"]}
      />
      <div className="fixed top-0 inset-x-0 z-[70] h-[3px] bg-primary/20" aria-hidden="true">
        <div className="h-full bg-primary transition-all duration-100 ease-out" style={{ width: `${readProgress}%` }} />
      </div>
      <style>{SHARED_STYLES}</style>

      {/* ══ NAV ══ */}
      <nav aria-label="Main navigation" className="fixed top-[3px] inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" aria-label="Kudo Advisory home page">
            <img src={kudoLogo} alt="Kudo Advisory" className="h-12 sm:h-16 w-auto" width="160" height="64" />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className={`hover:text-foreground transition-colors ${item.href === "/insights" ? "text-foreground font-medium" : ""}`} aria-current={item.href === "/insights" ? "page" : undefined}>{item.label}</a>
            ))}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
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
                  {NAV.map((item, idx) => (
                    <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                      className="kudo-item flex items-center justify-between rounded-2xl border border-border bg-card/60 px-4 py-4 text-base hover:bg-secondary transition-colors"
                      style={{ animationDelay: mobileMenuOpen ? `${160 + idx * 60}ms` : "0ms" }}>
                      <span className="font-medium">{item.label}</span><span className="text-muted-foreground" aria-hidden="true">→</span>
                    </a>
                  ))}
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
        {/* ── HEADER ── */}
        <header className="pt-32 pb-12 px-6 max-w-3xl mx-auto">
          <a href="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Insights</a>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">{ARTICLE.category}</span>
          </div>
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

        {/* ── BODY ── */}
        <article className="max-w-3xl mx-auto px-6 pb-20 article-body">

          <div className="grid grid-cols-3 gap-2 sm:gap-4 my-10">
            <div className="stat-card"><span className="stat-number">58%</span><span className="stat-label">of AI security incidents trace back to misaligned CIO-CISO priorities during deployment</span></div>
            <div className="stat-card"><span className="stat-number">40%</span><span className="stat-label">longer average time-to-deployment when security is engaged after development begins</span></div>
            <div className="stat-card"><span className="stat-number">2×</span><span className="stat-label">more likely to achieve AI programme objectives when CIO and CISO co-own the AI risk framework</span></div>
          </div>

          <p>In most large enterprises, the CIO and CISO occupy adjacent but distinctly separate worlds. The CIO is oriented towards velocity, building capability, delivering systems, enabling the business to move. The CISO is oriented towards caution, identifying risk, enforcing controls, ensuring that what gets built doesn't expose the organisation to harm.</p>

          <p>For most of the history of enterprise technology, this tension was productive. The CIO pushed forward; the CISO held the line. The friction between them, properly managed, produced technology deployments that were both capable and reasonably secure.</p>

          <p>AI changes this dynamic. The tension between velocity and caution does not disappear. But AI creates risks that neither the CIO nor the CISO can manage alone, and those risks get significantly worse when the two functions work at cross-purposes.</p>

          <p>In my work with enterprise organisations across the Middle East, the quality of the CIO-CISO relationship is one of the strongest predictors of AI programme success I've encountered. Where it works well, AI moves fast and safely. Where it breaks down, AI programmes accumulate hidden risk, stall in security review cycles, or get deployed with security gaps that nobody is responsible for closing.</p>

          <hr />

          <h2>Why AI specifically strains this relationship</h2>

          <p>Traditional enterprise software has predictable risk profiles. A new ERP system, a CRM platform, a data warehouse: these introduce complexity and require careful security design, but the risk categories are well understood. The CISO knows what to look for and where to look for it.</p>

          <p>AI is different in several ways that matter to security.</p>

          <h3>AI systems have opaque decision logic</h3>
          <p>A conventional software system does what it is programmed to do. An AI system learns patterns from data and applies them in ways that can be difficult to predict or explain: including ways that the developers didn't intend and that the security team didn't anticipate. This opacity makes traditional security review processes poorly suited to AI risk assessment.</p>

          <h3>AI expands the attack surface in novel ways</h3>
          <p>Prompt injection, adversarial inputs, model inversion attacks, data poisoning: these threat vectors did not exist in the pre-AI security landscape. Most CISOs are still building the capability to assess them. Most CIOs are still learning what they mean for the systems they're deploying. When both parties are learning simultaneously and separately, the gaps between them widen.</p>

          <p>
            A defence contractor I spoke with had been thinking carefully about adversarial inputs to their AI-assisted logistics system: an AI that helped optimise maintenance scheduling for complex equipment. Their security team had correctly identified that a sophisticated adversary could, in theory, craft inputs designed to bias the scheduling recommendations in ways that would degrade operational readiness without any obvious fingerprint. The CIO had never considered this threat model. The CISO had never been in the room when the system was designed. The gap between them was the gap where the risk lived.
          </p>

          <h3>AI creates new categories of data risk</h3>
          <p>AI systems, particularly large language models and generative AI tools, interact with data in ways that create novel exposure. Sensitive information fed into AI prompts. Training data that contains personal or confidential information. Model outputs that inadvertently reconstruct sensitive inputs. These risks require a level of collaboration between CIO and CISO that most organisations haven't yet developed.</p>

          <h3>The pace of AI deployment outstrips security review capacity</h3>
          <p>The pressure on CIOs to deploy AI capabilities, from the board, from the business, from competitive dynamics, is intense and immediate. Security review processes were not designed for this pace. When CISOs try to apply traditional review timelines to AI deployments the friction becomes acute, and the temptation to bypass security engagement grows.</p>

          <blockquote>
            <p>The CIO-CISO relationship wasn't built for AI. The organisations that recognise this and deliberately redesign the relationship will have a significant advantage over those that don't.</p>
          </blockquote>

          <hr />

          <h2>The four fault lines</h2>

          <p>In organisations where the CIO-CISO dynamic is breaking down around AI, I consistently see the same fault lines. Understanding them is the first step to closing them.</p>

          <div className="my-8 space-y-3 not-prose">
            <div className="tension-card bg-card border border-border">
              <h4 className="text-foreground">Security engaged too late</h4>
              <p>The AI team builds and tests a system, often over months, before the CISO's function is meaningfully involved. By the time security review begins, the architecture is fixed, the data pipelines are built, and making the changes security requires is expensive and disruptive. Security ends up as the enemy of delivery rather than a design partner.</p>
            </div>
            <div className="tension-card bg-card border border-border">
              <h4 className="text-foreground">Separate AI risk frameworks</h4>
              <p>The CIO's organisation develops an AI governance framework. The CISO's organisation develops an AI security framework. They overlap, contradict each other in places, and impose duplicate review burdens on the teams trying to build things. Nobody is sure which framework governs which situation.</p>
            </div>
            <div className="tension-card bg-card border border-border">
              <h4 className="text-foreground">Shadow AI deployments</h4>
              <p>Business units, frustrated by the friction of formal AI security review, deploy AI tools. Often SaaS-based generative AI products: outside of IT and security governance entirely. The CIO doesn't know about them. The CISO certainly doesn't. The organisation accumulates unmanaged AI risk in the gaps between functions.</p>
            </div>
            <div className="tension-card bg-card border border-border">
              <h4 className="text-foreground">Misaligned incentives</h4>
              <p>The CIO is measured on delivery, shipping capability, enabling the business, hitting programme milestones. The CISO is measured on risk avoidance, preventing incidents, maintaining compliance, keeping the board comfortable. These incentive structures, if not consciously aligned around AI, pull the two functions in opposite directions.</p>
            </div>
          </div>

          <hr />

          <h2>What good CIO-CISO collaboration on AI looks like</h2>

          <p>The organisations that have successfully aligned their CIO and CISO functions around AI share a set of common practices. None of them are complicated. All of them require deliberate intent.</p>

          <h3>A shared AI risk appetite, agreed at board level</h3>
          <p>The most effective starting point is a board or ExCo-level conversation that defines the organisation's risk appetite for AI. What categories of AI deployment are acceptable with minimal security review? What requires structured review? What requires board-level sign-off? When the CIO and CISO are working from the same risk appetite statement, the majority of their subsequent interactions become easier and faster.</p>

          <h3>Security as a design requirement, not a gate</h3>
          <p>The shift from security-as-gate to security-as-design-requirement is the most consequential change a CIO and CISO can make together. It means embedding security requirements, data handling, access controls, model risk assessment, adversarial threat modelling, into the AI development process from the first sprint, not the last. It means CISO representation in AI programme design discussions, not just AI programme review meetings.</p>

          <h3>A joint AI security and governance framework</h3>
          <p>Rather than parallel frameworks that impose duplicate burdens, effective organisations build a single integrated AI security and governance framework, jointly owned by the CIO and CISO functions. This framework covers data provenance and handling, model risk assessment, deployment controls, monitoring requirements, and incident response. It is built once and applied consistently across the enterprise.</p>

          <h3>Regular joint reviews of the AI risk landscape</h3>
          <p>The AI threat landscape is evolving faster than any other domain in enterprise technology. New attack vectors emerge. New regulatory requirements take effect. New classes of AI system create new risk categories. CIOs and CISOs who schedule regular joint reviews of the AI risk landscape, quarterly is a reasonable cadence, stay ahead of this evolution rather than reacting to it.</p>

          <h3>A shared position on shadow AI</h3>
          <p>Shadow AI, the use of AI tools outside of formal IT and security governance, is one of the fastest-growing risk categories in enterprise technology. CIOs and CISOs who tackle this together, developing a clear and communicated policy on approved AI tools and a pragmatic process for evaluating new tools quickly, dramatically reduce the risk exposure from shadow deployments.</p>

          <hr />

          <h2>A note on the human dimension</h2>

          <p>I want to say something that doesn't always make it into frameworks and playbooks: the quality of the CIO-CISO relationship is fundamentally a human dynamic, and it cannot be solved entirely by process design.</p>

          <p>CIOs and CISOs who trust each other, understand each other's pressures and incentives, and are willing to have honest conversations about where their interests diverge as well as align, navigate AI governance far more effectively than pairs who operate formally but without a genuine working relationship.</p>

          <p>If I'm working with an organisation where the CIO and CISO don't have a strong working relationship, my first recommendation is almost always to invest in building that relationship before designing the governance structures around it. Governance that sits on top of a broken relationship will be gamed, bypassed, or ignored.</p>

          <blockquote>
            <p>The best AI security posture I have seen in enterprise organisations was not the product of the best framework. It was the product of two people who trusted each other enough to have difficult conversations early.</p>
          </blockquote>

          <hr />

          <h2>The conversation to have this quarter</h2>

          <p>If you are a CIO reading this, the most useful thing you can do this quarter is invite your CISO into your AI programme planning. Not your AI programme review: at the earliest stage of your next significant initiative. Not to approve it, but to co-design the security and risk architecture from the start.</p>

          <p>If you are a CISO reading this, the most useful thing you can do is develop a practical, risk-tiered position on AI that gives your CIO clear lanes: here is what can move fast, here is what needs structured review, here is what requires escalation. A security function that communicates in clear lanes creates speed for the business. One that communicates only in caution creates friction.</p>

          <p>And if you are a CEO or board member reading this: the quality of the CIO-CISO relationship on AI is worth asking about directly. It is a leading indicator of your organisation's ability to capture AI opportunity without accumulating AI risk: and it is entirely within your power to influence.</p>

          <hr />

          <p className="text-sm text-muted-foreground"><strong>Vijay Jaswal</strong> is Founder and CEO of Kudo Advisory, an independent AI advisory firm based in Dubai. He has over 25 years of experience advising boards and C-suite leaders on enterprise technology and AI transformation across Europe, Asia-Pacific, and the Middle East. He can be reached at <a href="mailto:info@kudoadvisory.com" className="text-primary hover:text-primary/80 transition-colors">info@kudoadvisory.com</a> or on <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">LinkedIn</a>.</p>

        </article>

        {/* ── CTA ── */}
        <section aria-labelledby="cta-heading" className="bg-secondary/20 border-t border-border py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">Work With Us</p>
            <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-4">Need to align your CIO and CISO on AI?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-xl">Kudo Advisory helps enterprise leadership teams build the governance structures and working relationships that allow AI to move at pace, safely. Start with a discovery call.</p>
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
