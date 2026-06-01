// src/components/ArticleLayout.tsx
// Shared layout wrapper for all article pages — handles nav, mobile menu,
// reading progress, header, CTA, footer, and RTL switching.

import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

interface ArticleMeta {
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  author: string;
  authorTitle: string;
  authorTitleAr?: string;
  date: string;
  dateFormatted: string;
  dateFormattedAr?: string;
  readTime: string;
  readTimeAr?: string;
  category: string;
  categoryAr?: string;
  url: string;
}

interface ArticleLayoutProps {
  meta: ArticleMeta;
  children: React.ReactNode;         // English body
  childrenAr?: React.ReactNode;      // Arabic body (optional)
  promo?: React.ReactNode;           // optional promo block shown after the body
  ctaHeading?: string;
  ctaHeadingAr?: string;
  ctaBody?: string;
  ctaBodyAr?: string;
}

export function ArticleLayout({
  meta,
  children,
  childrenAr,
  ctaHeading,
  ctaHeadingAr,
  ctaBody,
  ctaBodyAr,
  promo,
}: ArticleLayoutProps) {
  const { lang, isRTL } = useLanguage();
  const isAr = lang === "ar";

  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

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

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(meta.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  };

  const displayTitle = isAr && meta.titleAr ? meta.titleAr : meta.title;
  const displayDesc = isAr && meta.descriptionAr ? meta.descriptionAr : meta.description;
  const displayAuthorTitle = isAr && meta.authorTitleAr ? meta.authorTitleAr : meta.authorTitle;
  const displayDate = isAr && meta.dateFormattedAr ? meta.dateFormattedAr : meta.dateFormatted;
  const displayReadTime = isAr && meta.readTimeAr ? meta.readTimeAr : meta.readTime;
  const displayCategory = isAr && meta.categoryAr ? meta.categoryAr : meta.category;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
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
        .article-body h2 { font-size:1.6rem;font-weight:700;margin-top:2.5rem;margin-bottom:1rem;line-height:1.3;color:hsl(var(--foreground)); }
        .article-body h3 { font-size:1.2rem;font-weight:600;margin-top:2rem;margin-bottom:0.75rem;color:hsl(var(--foreground)); }
        .article-body p { margin-bottom:1.4rem;line-height:1.85;color:hsl(var(--muted-foreground));font-size:1.05rem; }
        .article-body strong { color:hsl(var(--foreground));font-weight:600; }
        .article-body em { color:hsl(var(--foreground));font-style:italic; }
        .article-body ul,.article-body ol { margin-bottom:1.4rem;padding-left:1.5rem;color:hsl(var(--muted-foreground)); }
        [dir="rtl"] .article-body ul,[dir="rtl"] .article-body ol { padding-left:0;padding-right:1.5rem; }
        .article-body li { margin-bottom:0.5rem;line-height:1.75;font-size:1.05rem; }
        .article-body ul li { list-style-type:disc; }
        .article-body ol li { list-style-type:decimal; }
        .article-body blockquote { border-left:3px solid hsl(var(--primary));padding:1rem 1.5rem;margin:2rem 0;background:hsl(var(--secondary)/0.3);border-radius:0 0.5rem 0.5rem 0; }
        [dir="rtl"] .article-body blockquote { border-left:none;border-right:3px solid hsl(var(--primary));border-radius:0.5rem 0 0 0.5rem; }
        .article-body blockquote p { font-size:1.15rem;font-style:italic;color:hsl(var(--foreground));margin-bottom:0; }
        .article-body hr { border:none;border-top:1px solid hsl(var(--border));margin:2.5rem 0; }
        .stat-card { background:hsl(var(--card));border:1px solid hsl(var(--border));border-radius:0.75rem;padding:1rem 0.75rem;text-align:center; }
        .stat-card .stat-number { font-size:clamp(1.5rem,4.5vw,2.5rem);font-weight:800;color:hsl(var(--primary));display:block;line-height:1;margin-bottom:0.35rem; }
        .stat-card .stat-label { font-size:clamp(0.6rem,1.8vw,0.78rem);color:hsl(var(--muted-foreground));line-height:1.3; }
      `}</style>

      {/* ══ NAV ══ */}
      <SiteNav active="/insights" />

      {/* ══ MAIN ══ */}
      <main id="main-content">

        {/* ── ARTICLE HEADER ── */}
        <header className="pt-32 pb-12 px-6 max-w-3xl mx-auto">
          <a href="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} aria-hidden="true" />
            {isAr ? "العودة إلى المقالات" : "Back to Insights"}
          </a>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              {displayCategory}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{displayTitle}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{displayDesc}</p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm" aria-hidden="true">VJ</div>
              <div>
                <p className="text-sm font-medium">{meta.author}</p>
                <p className="text-xs text-muted-foreground">{displayAuthorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={meta.date}>{displayDate}</time>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {displayReadTime}
              </span>
              <button onClick={handleShare} aria-label="Copy article link" className="flex items-center gap-1 hover:text-foreground transition-colors">
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Share2 className="w-4 h-4" aria-hidden="true" />}
                <span className="text-xs">{copied ? (isAr ? "تم النسخ!" : "Copied!") : (isAr ? "نسخ الرابط" : "Share")}</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── ARTICLE BODY ── */}
        <article className="max-w-3xl mx-auto px-6 pb-12 article-body">
          {isAr && childrenAr ? childrenAr : children}
        </article>

        {/* ── OPTIONAL PROMO (e.g. guide download) ── */}
        {promo && (
          <div className="max-w-3xl mx-auto px-6 pb-12">
            {promo}
          </div>
        )}

        {/* ── CTA ── */}
        <section aria-labelledby="article-cta-heading" className="bg-secondary/20 border-t border-border py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">
              {isAr ? "اعمل معنا" : "Work With Us"}
            </p>
            <h2 id="article-cta-heading" className="text-2xl md:text-3xl font-bold mb-4">
              {isAr ? (ctaHeadingAr ?? "هل أنت مستعد للتصرف؟") : (ctaHeading ?? "Ready to act on this?")}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-xl">
              {isAr
                ? (ctaBodyAr ?? "احجز مكالمة استكشافية لمناقشة كيفية تطبيق هذه المبادئ على مؤسستك.")
                : (ctaBody ?? "Book a discovery call to discuss how these principles apply to your organisation.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                <a href="/#contact">{isAr ? "احجز مكالمة استكشافية" : "Book a Discovery Call"}</a>
              </Button>
              <Button asChild variant="outline" className="border-border hover:bg-secondary px-8 py-3 text-base">
                <a href="/insights">{isAr ? "المزيد من المقالات" : "More Insights"}</a>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
