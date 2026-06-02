// src/components/Breadcrumbs.tsx
// Visible breadcrumb trail for inner pages. Complements the BreadcrumbList
// schema already emitted by PageMeta. Aids orientation (UX) and is a known
// SEO signal.
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface Crumb {
  label: string;
  href?: string; // omit href for the current (last) page
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { isRTL } = useLanguage();
  return (
    <nav aria-label="Breadcrumb" dir={isRTL ? "rtl" : "ltr"}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <a href={c.href} className="hover:text-foreground transition-colors">{c.label}</a>
              ) : (
                <span className="text-foreground/80" aria-current={last ? "page" : undefined}>{c.label}</span>
              )}
              {!last && (
                <ChevronRight className={`w-3 h-3 opacity-60 ${isRTL ? "rotate-180" : ""}`} aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
