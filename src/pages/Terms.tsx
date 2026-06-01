// src/pages/Terms.tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export default function Terms() {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";
  const updated = isAr ? "آخر تحديث: يونيو 2026" : "Last updated: June 2026";

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <PageMeta
        title="Terms of Use | Kudo Advisory"
        description="The terms governing your use of the Kudo Advisory website and resources."
        canonical="https://www.kudoadvisory.com/terms"
      />
      <SiteNav />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto legal-body">
          {isAr ? <ArabicTerms /> : <EnglishTerms />}
          <p className="text-sm text-muted-foreground mt-10">{updated}</p>
        </div>
      </main>
      <SiteFooter />
      <style>{`
        .legal-body h1 { font-size:2.25rem; font-weight:700; margin-bottom:1.5rem; line-height:1.2; }
        .legal-body h2 { font-size:1.3rem; font-weight:700; margin-top:2.25rem; margin-bottom:0.75rem; }
        .legal-body p, .legal-body li { color:hsl(var(--muted-foreground)); line-height:1.8; margin-bottom:0.85rem; }
        .legal-body ul { padding-left:1.5rem; margin-bottom:1rem; }
        [dir="rtl"] .legal-body ul { padding-left:0; padding-right:1.5rem; }
        .legal-body li { list-style:disc; margin-bottom:0.4rem; }
        .legal-body a { color:hsl(var(--primary)); }
        .legal-body strong { color:hsl(var(--foreground)); }
      `}</style>
    </div>
  );
}

function EnglishTerms() {
  return (
    <>
      <h1>Terms of Use</h1>
      <p>These terms govern your use of the Kudo Advisory website (kudoadvisory.com) and any resources we make available through it. By using the site, you agree to these terms.</p>

      <h2>About us</h2>
      <p>This website is operated by Kudo Advisory FZ-LLC, an independent AI advisory firm registered in the UAE.</p>

      <h2>Use of the site</h2>
      <p>You may use this site for lawful purposes only. You agree not to misuse it, attempt to gain unauthorised access, interfere with its operation, or use automated means to extract data without our permission.</p>

      <h2>Our content</h2>
      <p>All content on this site, including text, guides, assessments, graphics, and the Kudo Advisory name and logo, is owned by or licensed to Kudo Advisory and protected by intellectual property laws. You may read and share our published articles and free resources for personal or internal business use, but you may not republish, resell, or pass them off as your own.</p>

      <h2>No professional advice</h2>
      <p>The content, guides, and AI Readiness Assessment on this site are provided for general information. They are not a substitute for tailored professional advice. Any decision you make based on this material is your own responsibility. For advice specific to your organisation, engage us directly.</p>

      <h2>The AI Readiness Assessment</h2>
      <p>The assessment provides an indicative score and general recommendations based on the answers you give. It is a guide, not a formal audit or guarantee of any outcome.</p>

      <h2>External links</h2>
      <p>Our site may link to third party websites. We are not responsible for their content or practices.</p>

      <h2>Liability</h2>
      <p>We work to keep the site accurate and available, but we provide it "as is" without warranties. To the extent permitted by law, Kudo Advisory is not liable for any loss arising from your use of, or reliance on, this site or its content.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the United Arab Emirates, and the UAE courts have jurisdiction over any dispute.</p>

      <h2>Contact</h2>
      <p>Questions about these terms? Email <a href="mailto:info@kudoadvisory.com">info@kudoadvisory.com</a>.</p>
    </>
  );
}

function ArabicTerms() {
  return (
    <>
      <h1>شروط الاستخدام</h1>
      <p>تحكم هذه الشروط استخدامك لموقع كودو أدفيزوري (kudoadvisory.com) وأي موارد نتيحها من خلاله. باستخدامك للموقع، فإنك توافق على هذه الشروط.</p>

      <h2>من نحن</h2>
      <p>يُدار هذا الموقع من قبل Kudo Advisory FZ-LLC، وهي شركة استشارات ذكاء اصطناعي مستقلة مسجلة في الإمارات.</p>

      <h2>استخدام الموقع</h2>
      <p>يمكنك استخدام هذا الموقع للأغراض المشروعة فقط. توافق على عدم إساءة استخدامه أو محاولة الوصول غير المصرح به أو التدخل في تشغيله أو استخدام وسائل آلية لاستخراج البيانات دون إذننا.</p>

      <h2>المحتوى</h2>
      <p>جميع المحتويات على هذا الموقع، بما في ذلك النصوص والأدلة والتقييمات والرسوم واسم وشعار كودو أدفيزوري، مملوكة أو مرخصة لكودو أدفيزوري ومحمية بقوانين الملكية الفكرية. يمكنك قراءة ومشاركة مقالاتنا ومواردنا المجانية للاستخدام الشخصي أو التجاري الداخلي، لكن لا يجوز إعادة نشرها أو بيعها أو نسبتها لنفسك.</p>

      <h2>ليست استشارة مهنية</h2>
      <p>يُقدَّم المحتوى والأدلة وتقييم جاهزية الذكاء الاصطناعي على هذا الموقع لأغراض المعلومات العامة. وهي ليست بديلاً عن استشارة مهنية مخصصة. أي قرار تتخذه بناءً على هذه المواد هو مسؤوليتك. للحصول على استشارة خاصة بمؤسستك، تواصل معنا مباشرة.</p>

      <h2>تقييم جاهزية الذكاء الاصطناعي</h2>
      <p>يقدّم التقييم درجة استرشادية وتوصيات عامة بناءً على إجاباتك. وهو دليل وليس تدقيقاً رسمياً أو ضماناً لأي نتيجة.</p>

      <h2>الروابط الخارجية</h2>
      <p>قد يحتوي موقعنا على روابط لمواقع طرف ثالث. نحن غير مسؤولين عن محتواها أو ممارساتها.</p>

      <h2>المسؤولية</h2>
      <p>نعمل على إبقاء الموقع دقيقاً ومتاحاً، لكننا نقدمه "كما هو" دون ضمانات. إلى الحد الذي يسمح به القانون، لا تتحمل كودو أدفيزوري المسؤولية عن أي خسارة تنشأ عن استخدامك للموقع أو محتواه أو اعتمادك عليه.</p>

      <h2>القانون الحاكم</h2>
      <p>تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة، وتختص محاكم الإمارات بأي نزاع.</p>

      <h2>تواصل</h2>
      <p>أسئلة حول هذه الشروط؟ راسل <a href="mailto:info@kudoadvisory.com">info@kudoadvisory.com</a>.</p>
    </>
  );
}
