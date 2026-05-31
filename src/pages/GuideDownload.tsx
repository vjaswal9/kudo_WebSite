// src/pages/GuideDownload.tsx
// Gated lead-magnet download, captures email via Formspree, then serves the PDF guide.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LangToggle } from "@/components/LangToggle";
import { PageMeta } from "@/components/PageMeta";
import kudoLogo from "@/assets/kudo-logo.png";
import { Check, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgwarpw";
const PDF_PATH = "/guides/5-reasons-enterprise-ai-pilots-fail.pdf";

export default function GuideDownload() {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, source: "Guide: 5 Reasons Enterprise AI Pilots Fail" }),
      });
      if (!res.ok) throw new Error("failed");
      setDone(true);
      // trigger download
      const a = document.createElement("a");
      a.href = PDF_PATH;
      a.download = "5-Reasons-Enterprise-AI-Pilots-Fail-Kudo-Advisory.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const benefits = [
    { en: "The 5 root causes of enterprise AI pilot failure", ar: "الأسباب الجذرية الخمسة لفشل مشاريع الذكاء الاصطناعي التجريبية" },
    { en: "A practical 'what to do' fix for each one", ar: "حل عملي 'ما الذي يجب فعله' لكل سبب" },
    { en: "What organisations that succeed do differently", ar: "ما الذي تفعله المؤسسات الناجحة بشكل مختلف" },
    { en: "Tailored for the UAE & Middle East regulatory context", ar: "مُصمم للسياق التنظيمي في الإمارات والشرق الأوسط" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <PageMeta
        title="Free Guide: The 5 Reasons Enterprise AI Pilots Fail | Kudo Advisory"
        description="Download Kudo Advisory's free guide: The 5 Reasons Enterprise AI Pilots Fail, and what the organisations that succeed do differently. Written by Vijay Jaswal for enterprise leaders across the UAE and Middle East."
        canonical="https://www.kudoadvisory.com/guides/ai-pilots-fail"
      />

      <nav className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" aria-label="Kudo Advisory home">
            <img src={kudoLogo} alt="Kudo Advisory" className="h-12 sm:h-14 w-auto" width="160" height="56" />
          </Link>
          <div className="flex items-center gap-4">
            <LangToggle />
            <Link to="/services" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("Services", "الخدمات")}
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left, pitch */}
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-medium mb-4">
              {t("Free Guide · PDF", "دليل مجاني · PDF")}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
              {t("The 5 Reasons Enterprise AI Pilots Fail", "الأسباب الخمسة لفشل مشاريع الذكاء الاصطناعي التجريبية في المؤسسات")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-7">
              {t(
                "Up to 80% of enterprise AI initiatives never scale beyond pilot. The cause is rarely the technology. This concise guide sets out the five root causes, and the practical fix for each.",
                "ما يصل إلى 80% من مبادرات الذكاء الاصطناعي المؤسسية لا تتجاوز المرحلة التجريبية. السبب نادراً ما يكون التقنية. يحدد هذا الدليل الموجز الأسباب الجذرية الخمسة، والحل العملي لكل منها."
              )}
            </p>
            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{t(b.en, b.ar)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right, form / success */}
          <div className="p-8 rounded-2xl border border-border bg-card shadow-xl">
            {!done ? (
              <>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{t("Get the free guide", "احصل على الدليل المجاني")}</p>
                    <p className="text-xs text-muted-foreground">{t("Instant PDF download", "تنزيل PDF فوري")}</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="g-name" className="block text-sm font-medium mb-2">{t("Name", "الاسم")}</label>
                    <input id="g-name" type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label htmlFor="g-email" className="block text-sm font-medium mb-2">{t("Work email", "البريد الإلكتروني للعمل")}</label>
                    <input id="g-email" type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label htmlFor="g-company" className="block text-sm font-medium mb-2">{t("Organisation", "المؤسسة")}</label>
                    <input id="g-company" type="text" value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm" />
                  </div>
                  <Button type="submit" disabled={sending} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base disabled:opacity-60">
                    {sending ? t("Preparing your download…", "جارٍ تجهيز التنزيل…") : (
                      <span className="inline-flex items-center gap-2"><Download className="w-4 h-4" /> {t("Download the Guide", "حمّل الدليل")}</span>
                    )}
                  </Button>
                  {error && (
                    <p className="text-sm text-destructive text-center">
                      {t("Something went wrong. Email us at ", "حدث خطأ ما. راسلنا على ")}
                      <a className="underline" href="mailto:info@kudoadvisory.com">info@kudoadvisory.com</a>
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground text-center">
                    {t("We respect your inbox. You'll also receive Vijay's occasional AI insights.", "نحترم بريدك. ستتلقى أيضاً رؤى فيجاي العرضية في الذكاء الاصطناعي.")}
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">{t("Your guide is downloading", "جارٍ تنزيل دليلك")}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t(
                    "If it didn't start automatically, use the button below. Thank you, we hope it's useful.",
                    "إذا لم يبدأ تلقائياً، استخدم الزر أدناه. شكراً لك، نأمل أن يكون مفيداً."
                  )}
                </p>
                <a href={PDF_PATH} download className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Download className="w-4 h-4" /> {t("Download again", "تنزيل مرة أخرى")}
                </a>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("Ready to discuss your AI programme?", "هل أنت مستعد لمناقشة برنامج الذكاء الاصطناعي الخاص بك؟")}
                  </p>
                  <a href="/#contact" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    {t("Book a free discovery call →", "احجز مكالمة استكشافية مجانية ←")}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} <Link to="/" className="hover:text-foreground transition-colors">Kudo Advisory</Link>, {t("AI Advisory UAE, Dubai & Middle East.", "استشارات الذكاء الاصطناعي في الإمارات ودبي والشرق الأوسط.")}</p>
      </footer>
    </div>
  );
}
