// src/components/SkipLink.tsx
// Accessibility: lets keyboard and screen-reader users jump straight to the
// main content, skipping the nav. Visually hidden until focused.
import { useLanguage } from "@/contexts/LanguageContext";

export function SkipLink() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
    >
      {isAr ? "تخطَّ إلى المحتوى" : "Skip to content"}
    </a>
  );
}
