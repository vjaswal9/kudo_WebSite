// src/components/RelatedInsights.tsx
// Cross-links to other insight articles. Improves internal linking (SEO)
// and keeps readers on-site. Picks same-category articles first, then fills.
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ARTICLES } from "@/lib/articles";

export function RelatedInsights({ currentSlug }: { currentSlug: string }) {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";

  const current = ARTICLES.find((a) => a.slug === currentSlug);
  const others = ARTICLES.filter((a) => a.slug !== currentSlug);
  // same category first, then the rest, capped at 3
  const ranked = [
    ...others.filter((a) => current && a.category === current.category),
    ...others.filter((a) => !current || a.category !== current.category),
  ].slice(0, 3);

  if (ranked.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="border-t border-border py-14 px-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-5xl mx-auto">
        <h2 id="related-heading" className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-8">
          {isAr ? "مقالات ذات صلة" : "Related insights"}
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {ranked.map((a) => (
            <a
              key={a.slug}
              href={`/insights/${a.slug}`}
              className="group flex flex-col h-full p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors"
            >
              <span className="text-xs uppercase tracking-wider text-primary mb-3">
                {isAr ? a.categoryAr : a.category}
              </span>
              <h3 className="text-base font-semibold leading-snug mb-4 group-hover:text-primary transition-colors flex-1">
                {isAr ? a.titleAr : a.title}
              </h3>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {isAr ? a.readTimeAr : a.readTime}
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
