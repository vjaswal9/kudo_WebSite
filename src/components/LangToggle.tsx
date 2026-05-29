import { useLanguage } from "@/contexts/LanguageContext";

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
      className={`inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors duration-200 ${className}`}
    >
      <span className="text-sm leading-none">{lang === "en" ? "🌐" : "🌐"}</span>
      <span>{lang === "en" ? "عربي" : "English"}</span>
    </button>
  );
}
