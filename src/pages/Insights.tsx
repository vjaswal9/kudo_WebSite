// src/pages/Insights.tsx
// ════════════════════════════════════════════════════
// Kudo Advisory, Insights & Articles
// SEO & AI-EO optimised thought leadership hub
// ════════════════════════════════════════════════════
import { useEffect, useState } from "react";
import { Mail, Linkedin, Menu, X, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import kudoLogo from "@/assets/kudo-logo.png";
import { PageMeta } from "@/components/PageMeta";

/* ─── Scroll-animated wrapper (same pattern as Index) ─── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Article data ─────────────────────────────────────
   Add new articles here. Set `coming: true` for
   placeholders, or fill all fields for live articles.
──────────────────────────────────────────────────────── */
const articles = [
  {
    slug: "why-enterprise-ai-pilots-fail",
    category: "AI Strategy",
    title: "Why Enterprise AI Pilots Fail: What to Do About It",
    excerpt:
      "Up to 80% of enterprise AI initiatives never make it past the pilot stage. The cause is rarely the technology. It's the absence of strategic clarity, accountable ownership, and governance built for execution. Here's how to break the cycle.",
    date: "2026-05-19",
    readTime: "8 min read",
    author: "Vijay Jaswal",
    coming: false,
  },
  {
    slug: "ai-governance-middle-east",
    category: "AI Governance",
    title: "AI Governance in the Middle East: What Enterprise Leaders Need to Know in 2026",
    excerpt:
      "The UAE and Saudi Arabia are accelerating their AI regulatory frameworks. What does this mean for CIOs, CDOs, and risk teams? A practical overview of the governance landscape and how to build frameworks that satisfy regulators without stifling innovation.",
    date: "2026-05-12",
    readTime: "10 min read",
    author: "Vijay Jaswal",
    coming: false,
  },
  {
    slug: "ai-operating-model",
    category: "Operating Model",
    title: "The AI Operating Model: Structuring Your Organisation to Scale AI Responsibly",
    excerpt:
      "Most enterprises have pockets of AI. Few have the operating model to scale it. An AI operating model defines how teams, processes, governance, and technology work together, and it's the difference between AI experiments and AI at enterprise scale.",
    date: "2026-05-05",
    readTime: "7 min read",
    author: "Vijay Jaswal",
    coming: false,
  },
  {
    slug: "ciso-cio-ai-collaboration",
    category: "Leadership",
    title: "The CIO and CISO Conversation That Every AI Programme Needs",
    excerpt:
      "AI programmes stall when security and technology leadership operate in silos. The CIO-CISO relationship is the most consequential dynamic in enterprise AI, and fixing it is simpler than most organisations think.",
    date: "2026-04-28",
    readTime: "6 min read",
    author: "Vijay Jaswal",
    coming: false,
  },
  {
    slug: "ai-use-case-prioritisation",
    category: "AI Strategy",
    title: "How to Prioritise AI Use Cases: A Framework for Enterprise Leaders",
    excerpt:
      "Every enterprise has more AI ideas than it can execute. The organisations that get the most from AI don't build the most, they build the right things first. A practical five-dimension prioritisation framework.",
    date: "2026-04-14",
    readTime: "9 min read",
    author: "Vijay Jaswal",
    coming: false,
  },
  {
    slug: "measuring-ai-roi",
    category: "Delivery",
    title: "Measuring AI ROI: Metrics That Actually Matter to Your Board",
    excerpt:
      "Most AI programmes are measured on the wrong things. Boards care about revenue, cost, and risk, not model accuracy. A three-tier measurement framework that speaks the language of the boardroom.",
    date: "2026-03-31",
    readTime: "7 min read",
    author: "Vijay Jaswal",
    coming: false,
  },
];

const categories = ["All", "AI Strategy", "AI Governance", "Operating Model", "Leadership", "Delivery"];

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-AE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const Insights = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/#outcomes", label: "Outcomes" },
    { href: "/#services", label: "Services" },
    { href: "/#how", label: "How We Work" },
    { href: "/#about", label: "About" },
    { href: "/insights", label: "Insights" },
    { href: "/faq", label: "FAQ" },
    { href: "/#contact", label: "Contact" },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <PageMeta
        title="AI Insights & Articles | Kudo Advisory"
        description="Practical perspectives on AI strategy, governance, and delivery from Vijay Jaswal and the Kudo Advisory team. Written for CIOs, CDOs, and transformation leads in the Middle East."
        canonical="https://www.kudoadvisory.com/insights"
      />
      <style>{`
        .kudo-overlay { transition: opacity 220ms ease; }
        .kudo-backdrop { transition: opacity 260ms ease; opacity: 0; }
        .kudo-overlay.is-open .kudo-backdrop { opacity: 1; }
        .kudo-panel {
          will-change: transform, opacity;
          transform: translateY(-10px) scale(.985);
          opacity: 0;
          transition: transform 220ms ease, opacity 160ms ease;
        }
        .kudo-overlay.is-open .kudo-panel {
          animation: kudoSpringIn 520ms cubic-bezier(.16, 1, .3, 1) both;
        }
        .kudo-item {
          will-change: transform, opacity;
          transform: translateY(12px);
          opacity: 0;
          transition: transform 220ms ease, opacity 160ms ease;
        }
        .kudo-overlay.is-open .kudo-item {
          animation: kudoItemSpring 520ms cubic-bezier(.16, 1, .3, 1) both;
        }
        @keyframes kudoSpringIn {
          0%   { transform: translateY(-12px) scale(.985); opacity: 0; }
          62%  { transform: translateY(10px) scale(1.015); opacity: 1; }
          82%  { transform: translateY(-3px) scale(.998); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes kudoItemSpring {
          0%   { transform: translateY(14px); opacity: 0; }
          70%  { transform: translateY(-3px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kudo-overlay, .kudo-panel, .kudo-item, .kudo-backdrop {
            transition: none !important; animation: none !important; transform: none !important;
          }
        }
      `}</style>

      {/* ══ NAV ══ */}
      <nav aria-label="Main navigation" className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3 min-w-0" aria-label="Kudo Advisory home page">
            <img
              src={kudoLogo}
              alt="Kudo Advisory, AI Advisory and Consultancy Dubai"
              className="h-12 sm:h-16 w-auto"
              width="160"
              height="64"
            />
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`hover:text-foreground transition-colors ${item.href === "/insights" ? "text-foreground font-medium" : ""}`}
                aria-current={item.href === "/insights" ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </nav>

      {/* ══ MOBILE MENU ══ */}
      <div
        className={`kudo-overlay fixed inset-0 z-[60] md:hidden ${
          mobileMenuOpen ? "is-open opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <button type="button" aria-label="Close menu" onClick={closeMobileMenu} className="kudo-backdrop absolute inset-0 bg-background/70 backdrop-blur-xl" />
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation" className="relative h-full w-full">
          <div className="kudo-panel h-full">
            <div className="max-w-7xl mx-auto h-full px-6 pb-10 flex flex-col pt-[env(safe-area-inset-top)]">
              <div className="flex items-center justify-between py-4">
                <img src={kudoLogo} alt="Kudo Advisory" className="h-12 w-auto" width="120" height="48" />
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Close menu" onClick={closeMobileMenu}>
                  <X className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="max-w-md">
                <div className="mt-6 kudo-item" style={{ animationDelay: mobileMenuOpen ? "90ms" : "0ms" }}>
                  <a href="/#contact" onClick={closeMobileMenu} className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-5 text-base font-medium text-primary-foreground hover:bg-primary/90">
                    Book a Discovery Call
                  </a>
                </div>
                <nav aria-label="Mobile navigation links" className="mt-7 space-y-2">
                  {navItems.map((item, idx) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
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

        {/* ── PAGE HERO ── */}
        <header className="pt-32 pb-16 px-6 max-w-7xl mx-auto" aria-label="Insights page header">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">Insights</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl leading-tight">
              AI thinking for enterprise leaders
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Practical perspectives on AI strategy, governance, and delivery from Vijay Jaswal and the Kudo Advisory team. Written for CIOs, CDOs, and transformation leads navigating enterprise AI in the Middle East.
            </p>
          </AnimatedSection>
        </header>

        {/* ── CATEGORY FILTER ── */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <AnimatedSection>
            <nav aria-label="Filter articles by category" className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40 bg-card"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </AnimatedSection>
        </div>

        {/* ── ARTICLES GRID ── */}
        <section
          aria-label="Articles and insights"
          className="max-w-7xl mx-auto px-6 pb-24"
        >
          {/* Featured article, first non-coming item */}
          {filtered[0] && !filtered[0].coming && (
            <AnimatedSection className="mb-12">
              <article
                aria-label={`Featured article: ${filtered[0].title}`}
                className="group relative rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => { window.location.href = `/insights/${filtered[0].slug}`; }}
              >
                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      {filtered[0].category}
                    </span>
                    <span className="text-xs text-muted-foreground">Featured</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                    {filtered[0].title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl text-base md:text-lg">
                    {filtered[0].excerpt}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{filtered[0].author}</span>
                      {filtered[0].date && (
                        <>
                          <span aria-hidden="true">·</span>
                          <time dateTime={filtered[0].date}>{formatDate(filtered[0].date)}</time>
                        </>
                      )}
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {filtered[0].readTime}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      Read article <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          )}

          {/* Remaining articles grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(filtered[0] && !filtered[0].coming ? 1 : 0).map((article, i) => (
              <AnimatedSection key={article.slug} delay={i * 80}>
                <article
                  aria-label={article.coming ? `Coming soon: ${article.title}` : `Article: ${article.title}`}
                  className={`group relative rounded-2xl border bg-card transition-all duration-300 overflow-hidden h-full flex flex-col ${
                    article.coming
                      ? "border-border/50 opacity-60"
                      : "border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer"
                  }`}
                  onClick={() => { if (!article.coming) window.location.href = `/insights/${article.slug}`; }}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {article.category}
                      </span>
                      {article.coming && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground border border-border">
                          Coming soon
                        </span>
                      )}
                    </div>

                    <h2 className={`text-lg font-semibold mb-3 leading-snug flex-grow ${!article.coming ? "group-hover:text-primary transition-colors" : ""}`}>
                      {article.title}
                    </h2>

                    {!article.coming && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {article.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {article.date && (
                          <time dateTime={article.date}>{formatDate(article.date)}</time>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {article.readTime}
                        </span>
                      </div>
                      {!article.coming && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-3 h-3" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          aria-labelledby="insights-cta-heading"
          className="bg-secondary/20 border-t border-border py-20 px-6"
        >
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">Work With Us</p>
              <h2 id="insights-cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Ready to turn AI ambition into forward motion?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Kudo Advisory provides AI strategy, governance, and delivery assurance to enterprise organisations across Dubai, the UAE, and the Middle East.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                  <a href="/#contact">Book a Discovery Call</a>
                </Button>
                <Button asChild variant="outline" className="border-border hover:bg-secondary px-8 py-3 text-base">
                  <a href="/#services">View AI Services</a>
                </Button>
              </div>
            </AnimatedSection>
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
          <a href="mailto:info@kudoadvisory.com" className="hover:text-foreground transition-colors">
            info@kudoadvisory.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Insights;
