// src/pages/Index.tsx
// ════════════════════════════════════════════════════
// Kudo Advisory - Homepage (improved design + SSR-friendly content)
// Changes from original:
//  • Hero: larger, more cinematic with stat strip
//  • "As Featured In" logos rendered as actual SVG wordmarks
//  • Stats bar between hero and outcomes for instant credibility
//  • Testimonials: larger quote marks, more premium feel
//  • Footer: richer, more informative
//  • All body text rendered in HTML (not JS-only) for crawlability
// ════════════════════════════════════════════════════
import React, {
  Target, Shield, Rocket, BarChart3, Brain, FileCheck,
  Settings, ListChecks, Users, ClipboardCheck, Mail, Linkedin,
  ArrowDown, Menu, X, ChevronRight,
} from "lucide-react";
import { useScrollAnimation, useScrolled, useClassAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import outcomesBg from "@/assets/outcomes-boardroom.jpg";
import servicesBg from "@/assets/services-collaboration.jpg";
import heroBg from "@/assets/hero-abstract.jpg";
import howWeWorkBg from "@/assets/how-we-work.jpg";
import founderBg from "@/assets/vijay-presenting.jpg";
import { useEffect, useState } from "react";
import kudoLogo from "@/assets/kudo-logo.png";
import { PageMeta } from "@/components/PageMeta";

/* ─── Scroll-animated wrapper ─── */
function AnimatedSection({
  children, className = "", delay = 0,
}: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.12);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
/* --- Step number that pops in when scrolled into view --- */
function StepNumber({ num }: { num: string }) {
  const ref = useClassAnimation("step-num-visible", 0.3) as React.RefObject<HTMLSpanElement>;
  return (
    <span
      ref={ref}
      className="step-num text-4xl font-bold text-primary"
      aria-label={`Phase ${num}`}
    >
      {num}
    </span>
  );
}

/* ─── Data ─── */
const stats = [
  { value: "25+", label: "Years enterprise experience" },
  { value: "UAE & GCC", label: "Primary markets" },
  { value: "Vendor-independent", label: "Unbiased advisory" },
  { value: "Board to delivery", label: "Full AI lifecycle" },
];

const outcomes = [
  {
    icon: Target,
    title: "Strategic clarity",
    desc: "A clear AI roadmap tied to business outcomes, not hype. Every recommendation connects to measurable value.",
  },
  {
    icon: Shield,
    title: "Defensible AI governance",
    desc: "AI policies and guardrails your board, regulators, and auditors will trust, built for the UAE and MENA regulatory landscape.",
  },
  {
    icon: Rocket,
    title: "Accelerated delivery",
    desc: "AI initiatives that ship, not stall in committee. We bring execution discipline from day one.",
  },
  {
    icon: BarChart3,
    title: "Measurable ROI",
    desc: "Clear metrics linking AI investment to business value. No vanity metrics, just outcomes that matter to your board.",
  },
];

const services = [
  {
    icon: Brain,
    title: "AI Strategy",
    desc: "Align AI initiatives with business goals and board expectations. Build a prioritised AI roadmap that leadership can own and execute.",
  },
  {
    icon: FileCheck,
    title: "AI Policy & Governance",
    desc: "Build AI governance frameworks that satisfy regulators, protect your organisation, and still enable innovation at pace.",
  },
  {
    icon: Settings,
    title: "AI Operating Model Design",
    desc: "Structure your teams, processes, and technology stack to scale AI responsibly and sustainably across the enterprise.",
  },
  {
    icon: ListChecks,
    title: "AI Use Case Prioritisation",
    desc: "Identify and rank high-impact AI opportunities by feasibility and business value, so you build the right things first.",
  },
  {
    icon: Users,
    title: "Leadership Enablement",
    desc: "Equip your C-suite and senior leadership with practical AI literacy, strategic confidence, and the language to lead AI transformation.",
  },
  {
    icon: ClipboardCheck,
    title: "AI Delivery Assurance",
    desc: "Hands-on programme oversight to keep AI initiatives on track, on budget, and delivering the results you promised your board.",
  },
];

const steps = [
  {
    num: "01",
    title: "Clarify",
    desc: "We assess your AI maturity, align stakeholders, identify the highest-value opportunities, and define a clear, executable AI roadmap.",
  },
  {
    num: "02",
    title: "Govern",
    desc: "We build the policies, guardrails, and governance structures you need; frameworks your board, regulators, and risk teams will trust.",
  },
  {
    num: "03",
    title: "Deliver",
    desc: "We embed with your team to turn plans into measurable progress. No stalls. No slide decks. Just AI that moves.",
  },
];

const testimonials = [
  {
    quote: "Vijay brought exactly the clarity we needed. He cut through the noise, helped us prioritise ruthlessly, and gave our board the governance framework they were asking for. We moved from stalled pilots to a live programme in under three months.",
    name: "Chief Digital Officer",
    org: "Global Financial Services Group, UAE",
  },
  {
    quote: "We had AI initiatives running in silos across five business units. Kudo Advisory helped us build a single operating model, align our leadership team, and define what success actually looks like. That foundation has changed everything.",
    name: "Chief Information Officer",
    org: "Industrial Conglomerate, Saudi Arabia",
  },
  {
    quote: "What sets Vijay apart is that he speaks both languages: the strategic language of the board and the practical language of the delivery team. That is rare, and it made a material difference to how our programme landed.",
    name: "Group Chief Technology Officer",
    org: "Energy Sector Organisation, Middle East",
  },
];

const Index = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#outcomes", label: "Outcomes" },
    { href: "#services", label: "Services" },
    { href: "#how", label: "How We Work" },
    { href: "/about", label: "About" },
    { href: "/insights", label: "Insights" },
    { href: "/faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
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
  const navScrolled = useScrolled(20);

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgwarpw";

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setFormStatus(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, source: "kudoadvisory.com" }),
      });
      if (!res.ok) throw new Error("Formspree request failed");
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <PageMeta
        title="AI Advisory & AI Consultancy Dubai | Kudo Advisory"
        description="Kudo Advisory is Dubai's leading AI advisory and AI consultancy firm. Founded by Vijay Jaswal, we help enterprise leaders across the Middle East turn AI investment into governed, measurable business outcomes. AI strategy, AI governance & delivery assurance."
        canonical="https://www.kudoadvisory.com/"
      />

      {/* ══ NAVIGATION ══ */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60 transition-all duration-300 ${navScrolled ? "nav-scrolled" : ""}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <a href="/" className="flex items-center gap-3 min-w-0" aria-label="Kudo Advisory - home page">
            <img
              src={kudoLogo}
              alt="Kudo Advisory logo"
              className="h-12 sm:h-14 w-auto"
              width="160" height="56"
            />
          </a>

          <div className="hidden md:flex items-center gap-7 text-sm" role="list">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link text-muted-foreground hover:text-foreground transition-colors duration-200"
                role="listitem"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-pulse btn-shimmer ml-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Book a Call <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost" size="icon"
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

      {/* ══ MOBILE OVERLAY MENU ══ */}
      <div
        className={`kudo-overlay fixed inset-0 z-[60] md:hidden ${
          mobileMenuOpen ? "is-open opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className="kudo-backdrop absolute inset-0 bg-background/70 backdrop-blur-xl"
        />
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation" className="relative h-full w-full">
          <div className="kudo-panel h-full">
            <div className="max-w-7xl mx-auto h-full px-6 pb-10 flex flex-col pt-[env(safe-area-inset-top)]">
              <div className="flex items-center justify-between py-4">
                <img src={kudoLogo} alt="Kudo Advisory" className="h-12 w-auto" width="120" height="48" />
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Close navigation menu" onClick={closeMobileMenu}>
                  <X className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="max-w-md">
                <div className="mt-6 kudo-item" style={{ animationDelay: mobileMenuOpen ? "90ms" : "0ms" }}>
                  <a href="#contact" onClick={closeMobileMenu} className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-5 text-base font-medium text-primary-foreground hover:bg-primary/90">
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
                  <Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn - Vijay Jaswal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <main id="main-content">

        {/* ── HERO ── */}
        <header
          className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20"
          aria-label="Kudo Advisory - AI Advisory and Consultancy in Dubai"
        >
          <img
            src={heroBg}
            alt="Abstract AI data visualisation representing artificial intelligence strategy"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
            loading="eager"
            fetchPriority="high"
            width="1920" height="1080"
          />
          {/* Layered gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/55 to-background" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" aria-hidden="true" />

          <div className="relative z-10 max-w-4xl text-center space-y-7">
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-medium label-accent">
              AI Advisory for Enterprise Leaders · Dubai & the Middle East
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] font-semibold leading-[1.05]">
              {["Turn", "AI", "intent", "into"].map((word, i) => (
                <span key={word} className="hero-word" style={{ animationDelay: `${300 + i * 80}ms` }}>{word}{" "}</span>
              ))}
              <em className="not-italic text-gradient-gold hero-word" style={{ animationDelay: "680ms" }}>forward motion</em>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              <strong className="text-foreground/90">Kudo</strong>, Japanese for{" "}
              <em>driving force</em> (駆動). We help enterprise leadership teams across
              Dubai and the Middle East go from AI ambition to governed, measurable
              progress. Without the buzzwords. Without the vendor lock-in.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 px-2">
              <Button asChild className="btn-pulse btn-shimmer bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base rounded-full">
                <a href="#contact">Book a Discovery Call</a>
              </Button>
              <Button asChild variant="outline" className="border-border/70 hover:bg-secondary px-8 py-3 text-base rounded-full">
                <a href="#services">Explore AI Advisory Services</a>
              </Button>
            </div>
          </div>

          {/* Stats strip - rendered in HTML for crawlers */}
          <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 mb-8 px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40">
              {stats.map((s, si) => (
                <div key={s.label} className="stat-item bg-card/70 backdrop-blur-sm px-6 py-5 text-center" style={{ animationDelay: `${800 + si * 120}ms` }}>
                  <p className="text-xl font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── FEATURED IN ── */}
        <section aria-label="Media coverage - AI Advisory publications" className="py-14 border-y border-border/30 bg-secondary/10">
          <div className="max-w-6xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium mb-10">
                As Featured In
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8" role="list" aria-label="Publications featuring Kudo Advisory">

                <a href="https://apnews.com/press-release/ein-presswire-newsmatics/middle-east-enterprises-face-growing-challenge-turning-ai-investment-into-operational-results-ea9c2d6d8d68dccd6485a3c2f7f8cef9" target="_blank" rel="noopener noreferrer" aria-label="AP News - Read Kudo Advisory coverage" role="listitem" className="opacity-45 hover:opacity-90 transition-opacity duration-200">
                  <svg width="80" height="36" viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="0" y="28" fontFamily="Georgia, 'Times New Roman', serif" fontWeight="700" fontSize="30" fill="currentColor" letterSpacing="-1">AP</text><text x="46" y="28" fontFamily="Arial, Helvetica, sans-serif" fontWeight="400" fontSize="13" fill="currentColor" letterSpacing="0.5">News</text></svg>
                </a>

                <a href="https://www.zawya.com/en/press-release/companies-news/kudo-advisory-launched-to-bridge-the-gap-between-ai-investments-and-real-business-outcomes-in-the-middle-east-hbcf7sn4" target="_blank" rel="noopener noreferrer" aria-label="ZAWYA - Read Kudo Advisory launch announcement" role="listitem" className="opacity-45 hover:opacity-90 transition-opacity duration-200">
                  <svg width="105" height="36" viewBox="0 0 105 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="0" y="26" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="22" fill="currentColor" letterSpacing="2">ZAWYA</text></svg>
                </a>

                <a href="https://www.cxoinsightme.com/future/tech/kudo-advisory-launched-to-drive-ai-business-outcomes-in-the-middle-east/" target="_blank" rel="noopener noreferrer" aria-label="CXO Insight Middle East - Read Kudo Advisory feature" role="listitem" className="opacity-45 hover:opacity-90 transition-opacity duration-200">
                  <svg width="120" height="36" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="0" y="22" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="16" fill="currentColor" letterSpacing="0.5">CXO Insight</text><text x="0" y="34" fontFamily="Arial, Helvetica, sans-serif" fontWeight="400" fontSize="10" fill="currentColor" letterSpacing="1">MIDDLE EAST</text></svg>
                </a>

                <a href="https://news.google.com/search?q=kudo%20advisory" target="_blank" rel="noopener noreferrer" aria-label="Google News - Search Kudo Advisory coverage" role="listitem" className="opacity-45 hover:opacity-90 transition-opacity duration-200">
                  <svg width="130" height="36" viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="0" y="26" fontFamily="Arial, Helvetica, sans-serif" fontWeight="400" fontSize="20" fill="currentColor">Google</text><text x="72" y="26" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="20" fill="currentColor">News</text></svg>
                </a>

                <a href="https://menafn.com/1111101705/Kudo-Advisory-Launches-In-The-UAE-Bridging-The-Gap-Between-AI-Investments-And-Real-Business-Outcomes" target="_blank" rel="noopener noreferrer" aria-label="MENAFN - Read Kudo Advisory UAE launch news" role="listitem" className="opacity-45 hover:opacity-90 transition-opacity duration-200">
                  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="0" y="22" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="18" fill="currentColor" letterSpacing="0.5">MENAFN</text><text x="0" y="36" fontFamily="Arial, Helvetica, sans-serif" fontWeight="400" fontSize="9" fill="currentColor" letterSpacing="0.6">MIDDLE EAST FINANCE</text></svg>
                </a>

                <a href="https://intlbm.com/2026/05/14/kudo-advisory-bridges-middle-east-ai-investment-and-business-outcomes/" target="_blank" rel="noopener noreferrer" aria-label="International Business Magazine - Read Kudo Advisory feature" role="listitem" className="opacity-45 hover:opacity-90 transition-opacity duration-200">
                  <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="0" y="20" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="13" fill="currentColor" letterSpacing="0.3">INTERNATIONAL</text><text x="0" y="36" fontFamily="Arial, Helvetica, sans-serif" fontWeight="400" fontSize="13" fill="currentColor" letterSpacing="0.3">BUSINESS MAGAZINE</text></svg>
                </a>

              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── OUTCOMES ── */}
        <section id="outcomes" aria-labelledby="outcomes-heading" className="relative py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">What You Get</p>
              <h2 id="outcomes-heading" className="text-3xl md:text-5xl mb-16">
                Executive-ready AI outcomes
              </h2>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={outcomesBg}
                    alt="Enterprise leadership team in boardroom reviewing AI strategy"
                    className="w-full h-[420px] object-cover"
                    loading="lazy" width="700" height="420"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" aria-hidden="true" />
                  {/* Floating credential badge */}
                  <div className="absolute bottom-6 left-6 right-6 bg-background/80 backdrop-blur-md rounded-xl px-5 py-4 border border-border/60">
                    <p className="text-xs text-primary uppercase tracking-wider font-medium mb-1">Founded by</p>
                    <p className="text-sm font-semibold text-foreground">Vijay Jaswal</p>
                    <p className="text-xs text-muted-foreground">25+ yrs · IFS CTO · Software AG CTO · Top 50 Tech Leaders ME</p>
                  </div>
                </div>
              </AnimatedSection>

              <div className="grid gap-4">
                {outcomes.map((o, i) => (
                  <AnimatedSection key={o.title} delay={i * 110}>
                    <article className="card-hover flex gap-5 p-5 rounded-xl bg-card border border-border group">
                      <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                        <o.icon className="icon-hover w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-foreground">{o.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{o.desc}</p>
                      </div>
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" aria-labelledby="services-heading" className="relative py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" aria-hidden="true" />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">What We Do</p>
              <h2 id="services-heading" className="text-3xl md:text-5xl mb-4">
                AI Advisory Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mb-16 leading-relaxed">
                Six focused services covering the full AI advisory lifecycle, from strategy and governance through to delivery assurance. Serving enterprise organisations in Dubai, the UAE, Saudi Arabia, and across the Middle East.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {services.slice(0, 3).map((s, i) => (
                <AnimatedSection key={s.title} delay={i * 90}>
                  <article className="card-hover card-sweep p-6 rounded-xl bg-card border border-border h-full group">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                      <s.icon className="icon-hover w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </article>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden mb-10 shadow-xl">
                <img
                  src={servicesBg}
                  alt="Enterprise team collaborating around AI dashboards and strategy documents"
                  className="w-full h-52 md:h-64 object-cover"
                  loading="lazy" width="1200" height="256"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-background/70" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-2xl md:text-3xl font-semibold text-foreground/90 text-center px-6">
                    "We exist to make AI move."
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-5">
              {services.slice(3).map((s, i) => (
                <AnimatedSection key={s.title} delay={i * 90}>
                  <article className="card-hover card-sweep p-6 rounded-xl bg-card border border-border h-full group">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                      <s.icon className="icon-hover w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section id="how" aria-labelledby="how-heading" className="relative py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden mb-16 shadow-xl">
                <img src={howWeWorkBg} alt="AI advisory team planning AI strategy and governance frameworks" className="w-full h-52 md:h-64 object-cover" loading="lazy" width="1200" height="256" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" aria-hidden="true" />
              </div>
            </AnimatedSection>
          </div>
          <div className="max-w-4xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">Our Approach</p>
              <h2 id="how-heading" className="text-3xl md:text-5xl mb-4">
                How We Work
              </h2>
              <p className="text-muted-foreground mb-16 leading-relaxed max-w-xl">
                A simple three-phase AI advisory process. No unnecessary complexity. Every engagement moves from clarity to governance to delivery.
              </p>
            </AnimatedSection>

            <ol className="space-y-0" aria-label="AI advisory engagement phases">
              {steps.map((s, i) => (
                <AnimatedSection key={s.num} delay={i * 140}>
                  <li className="flex gap-8 items-start group">
                    <div className="flex flex-col items-center">
                      <StepNumber num={s.num} />
                      {i < steps.length - 1 && (
                        <div className="w-px h-20 bg-border/60 mt-3" aria-hidden="true">
                          <ArrowDown className="w-4 h-4 text-muted-foreground/50 -ml-[7px] mt-16" />
                        </div>
                      )}
                    </div>
                    <div className="pb-12">
                      <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </li>
                </AnimatedSection>
              ))}
            </ol>
          </div>
        </section>

        {/* ── ABOUT / FOUNDER STRIP ── */}
        <section id="about" aria-labelledby="about-heading" className="py-24 md:py-32 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">About Us</p>
              <h2 id="about-heading" className="text-3xl md:text-5xl mb-8">
                Practical AI advisory for enterprise leaders
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <figure className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={founderBg}
                      alt="Vijay Jaswal, Founder and CEO of Kudo Advisory, presenting AI strategy at a conference"
                      className="w-full h-[360px] object-cover object-[50%_30%]"
                      loading="lazy" width="560" height="360"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" aria-hidden="true" />
                    <figcaption className="text-sm text-muted-foreground mt-3 px-1">
                      Vijay Jaswal, Founder &amp; CEO, Kudo Advisory
                    </figcaption>
                  </figure>

                  <div className="flex items-start gap-4">
                    <p className="text-4xl leading-none" aria-label="Kudo in Japanese - driving force">駆動</p>
                    <div>
                      <p className="font-semibold text-foreground">Kudo (駆動)</p>
                      <p className="text-sm text-muted-foreground">Japanese · <em>driving force or propulsion</em></p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    Founded by <strong className="text-foreground">Vijay Jaswal</strong> to bridge the gap between AI ambition and enterprise reality. With over 25 years advising boards and C-suite leaders across Europe, Asia-Pacific, and the Middle East, including senior technology leadership roles at IFS and Software AG. Vijay brings the depth and pragmatism enterprise AI transformation demands.
                  </p>

                  <div className="pt-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium mb-4">Previously at</p>
                    <div className="flex flex-wrap items-start gap-6">
                      {[
                        { name: "IFS", sub: "CTO, APJMEA" },
                        { name: "Software AG", sub: "CTO, Middle East" },
                        { name: "ByteSpark.ai", sub: "Chief Commercial Officer" },
                      ].map((emp) => (
                        <div key={emp.name} className="flex flex-col">
                          <span className="font-semibold text-sm text-foreground">{emp.name}</span>
                          <span className="text-xs text-muted-foreground">{emp.sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a href="/about" className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                    Full profile &amp; press coverage <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>

                <div className="grid gap-4">
                  {[
                    { title: "Outcome-led", desc: "Every AI advisory engagement ties to a measurable business result. We define success before we start." },
                    { title: "Governed", desc: "Responsible AI governance isn't optional; it's built into our approach from day one." },
                    { title: "Delivery-first", desc: "We ship outcomes, not slide decks. Our advisory is designed to drive execution, not perpetuate dependency." },
                    { title: "Vendor-independent", desc: "No software to sell. No implementation partnerships. Just unbiased advice accountable to your outcomes." },
                  ].map((item) => (
                    <div key={item.title} className="p-5 rounded-xl bg-card border border-border">
                      <h3 className="font-semibold mb-1 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section aria-labelledby="testimonials-heading" className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">What Leaders Say</p>
              <h2 id="testimonials-heading" className="text-3xl md:text-5xl mb-16">
                Trusted by enterprise leaders
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <AnimatedSection key={i} delay={i * 90}>
                  <figure className="testimonial-card h-full flex flex-col p-7 rounded-2xl border border-border bg-card">
                    <div className="quote-mark" aria-hidden="true" />
                    <blockquote className="flex-1">
                      <p className="text-muted-foreground leading-relaxed text-sm">{t.quote}</p>
                    </blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-border/50">
                      <p className="font-semibold text-sm text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t.org}</p>
                    </figcaption>
                  </figure>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection delay={280}>
              <p className="text-center text-xs text-muted-foreground mt-8 opacity-60">
                Testimonials are anonymised at client request to respect confidentiality.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" aria-labelledby="contact-heading" className="py-24 md:py-32 bg-secondary/10">
          <div className="max-w-3xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">Get in Touch</p>
              <h2 id="contact-heading" className="text-3xl md:text-5xl mb-4">
                Let's talk about your AI ambitions
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Whether you're just starting your AI journey or need help governing what you've already built, we'd love to hear from you. Kudo Advisory serves enterprise organisations across Dubai, the UAE, Saudi Arabia, and the Middle East.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={80}>
              <address className="flex gap-6 mb-10 flex-wrap not-italic">
                <a href="mailto:info@kudoadvisory.com" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm" aria-label="Email Kudo Advisory">
                  <Mail className="w-4 h-4" aria-hidden="true" /> info@kudoadvisory.com
                </a>
                <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm" aria-label="Connect with Vijay Jaswal on LinkedIn">
                  <Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn - Vijay Jaswal
                </a>
              </address>
            </AnimatedSection>

            {/* Calendly embed */}
            <AnimatedSection delay={130}>
              <div className="mb-12 rounded-2xl border border-border overflow-hidden bg-card">
                <div className="px-6 pt-6 pb-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-1">Book a Discovery Call</p>
                  <p className="text-muted-foreground text-sm">Schedule a 30-minute conversation with Vijay directly.</p>
                </div>
                <iframe
                  src="https://calendly.com/vijayjaswal-kudoadvisory/30min?background_color=1a2332&text_color=e2e8f0&primary_color=d4a853"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  title="Book a discovery call with Vijay Jaswal, Kudo Advisory"
                  loading="lazy"
                  className="w-full"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={180}>
              <p className="text-sm text-muted-foreground mb-6">Prefer to send a message? Use the form below.</p>
              <form
                className="space-y-5"
                onSubmit={handleContactSubmit}
                aria-label="Contact form - send a message to Kudo Advisory"
                noValidate
              >
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                    Name <span aria-hidden="true" className="text-muted-foreground">(required)</span>
                  </label>
                  <input
                    id="contact-name" type="text" name="name" required autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                    Email <span aria-hidden="true" className="text-muted-foreground">(required)</span>
                  </label>
                  <input
                    id="contact-email" type="email" name="email" required autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="contact-message" name="message" rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none text-sm"
                    placeholder="Tell us about your AI challenge or opportunity…"
                  />
                </div>
                <Button
                  type="submit" disabled={isSending}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full disabled:opacity-60"
                  aria-busy={isSending}
                >
                  {isSending ? "Sending…" : "Send Message"}
                </Button>
                {formStatus === "success" && (
                  <p role="status" className="text-sm text-primary mt-2">Thanks - your message has been sent. We'll be in touch shortly.</p>
                )}
                {formStatus === "error" && (
                  <p role="alert" className="text-sm text-destructive mt-2">
                    Sorry, something went wrong. Please email us at{" "}
                    <a className="underline" href="mailto:info@kudoadvisory.com">info@kudoadvisory.com</a>.
                  </p>
                )}
              </form>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-border/60 bg-card/30" aria-label="Site footer">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <img src={kudoLogo} alt="Kudo Advisory" className="h-12 w-auto mb-4" width="120" height="48" />
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Independent AI advisory for enterprise leaders across Dubai, the UAE, and the Middle East. We exist to make AI move.
              </p>
              <div className="flex gap-4 mt-5">
                <a href="mailto:info@kudoadvisory.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email Kudo Advisory">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/vijayjaswal" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn - Vijay Jaswal">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">Services</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["AI Strategy", "AI Governance", "Operating Model", "Use Case Prioritisation", "Leadership Enablement", "Delivery Assurance"].map((s) => (
                  <li key={s}><a href="#services" className="hover:text-primary transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>

            {/* Site */}
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">Company</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  { label: "About", href: "/about" },
                  { label: "Insights", href: "/insights" },
                  { label: "FAQ", href: "/faq" },
                  { label: "Contact", href: "#contact" },
                ].map((l) => (
                  <li key={l.label}><a href={l.href} className="hover:text-primary transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="section-rule mb-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} <a href="/" className="hover:text-foreground transition-colors">Kudo Advisory</a> - AI Advisory &amp; AI Consultancy, Dubai, UAE. All rights reserved.</p>
            <p>
              <a href="mailto:info@kudoadvisory.com" className="hover:text-foreground transition-colors">info@kudoadvisory.com</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
