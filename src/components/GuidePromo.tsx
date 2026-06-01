// src/components/GuidePromo.tsx
// Reusable, bilingual promo for the free PDF lead magnet.
// variant="banner" — horizontal strip (homepage, end of article)
// variant="card"   — vertical card (insights listing)
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, Download, ChevronRight } from "lucide-react";

const GUIDE_URL = "/guides/ai-pilots-fail";

export function GuidePromo({ variant = "banner" }: { variant?: "banner" | "card" }) {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const kicker = t("Free Guide · PDF", "دليل مجاني · PDF");
  const title = t("The 5 Reasons Enterprise AI Pilots Fail", "الأسباب الخمسة لفشل مشاريع الذكاء الاصطناعي التجريبية");
  const desc = t(
    "And what the organisations that succeed do differently. A concise, practical read for enterprise leaders.",
    "وما الذي تفعله المؤسسات الناجحة بشكل مختلف. قراءة موجزة وعملية لقادة المؤسسات."
  );
  const cta = t("Download the free guide", "حمّل الدليل المجاني");

  if (variant === "card") {
    return (
      <Link
        to={GUIDE_URL}
        className="group flex flex-col h-full p-7 rounded-2xl border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wide text-primary">{kicker}</span>
        </div>
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{desc}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          {cta} <ChevronRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
        </span>
      </Link>
    );
  }

  // banner
  return (
    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
      <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
        <FileText className="w-7 h-7 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wide text-primary mb-1">{kicker}</p>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
      </div>
      <Link
        to={GUIDE_URL}
        className="shrink-0 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Download className="w-4 h-4" /> {cta}
      </Link>
    </div>
  );
}
