// src/pages/Privacy.tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { PageMeta } from "@/components/PageMeta";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export default function Privacy() {
  const { isRTL, lang } = useLanguage();
  const isAr = lang === "ar";
  const updated = isAr ? "آخر تحديث: يونيو 2026" : "Last updated: June 2026";

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <PageMeta
        title="Privacy Policy | Kudo Advisory"
        description="How Kudo Advisory collects, uses and protects your personal data, including our use of forms, analytics and cookies."
        canonical="https://www.kudoadvisory.com/privacy"
      />
      <SiteNav />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto legal-body">
          {isAr ? <ArabicPrivacy /> : <EnglishPrivacy />}
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

function EnglishPrivacy() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p>Kudo Advisory FZ-LLC ("Kudo Advisory", "we", "us") is committed to protecting your privacy. This policy explains what personal data we collect, why, and how we handle it. It is written to align with the UAE Personal Data Protection Law (PDPL) and the EU GDPR where applicable.</p>

      <h2>Who we are</h2>
      <p>Kudo Advisory is an independent AI advisory firm registered as Kudo Advisory FZ-LLC at the Sharjah Publishing City Free Zone, UAE. For any privacy question, contact us at <a href="mailto:info@kudoadvisory.com">info@kudoadvisory.com</a>.</p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Information you give us</strong> through our contact form, AI Readiness Assessment, or guide download: your name, email address, organisation, and any message or assessment answers you provide.</li>
        <li><strong>Usage data</strong> collected automatically through analytics: pages visited, approximate location, device and browser type, and how you reached the site. This is collected via cookies (see below).</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and arrange a discovery call.</li>
        <li>To send you the resource you requested (such as our guide).</li>
        <li>To send you relevant AI insights and updates by email, where you have opted in. You can unsubscribe at any time using the link in every email.</li>
        <li>To understand how our website is used and improve it.</li>
      </ul>

      <h2>Legal basis</h2>
      <p>We process your data on the basis of your consent (which you give by submitting a form or accepting cookies) and our legitimate interest in operating and improving our business. You can withdraw consent at any time.</p>

      <h2>Who we share it with</h2>
      <p>We do not sell your data. We share it only with trusted service providers who help us operate, specifically: <strong>MailerLite</strong> (email delivery), <strong>Formspree</strong> (form handling), <strong>Google Analytics</strong> (website analytics), and <strong>Vercel</strong> (hosting). Each processes data under its own privacy terms.</p>

      <h2>Cookies</h2>
      <p>We use cookies for analytics (Google Analytics) to understand how the site is used. We do not use advertising cookies. When you first visit, you can accept or decline analytics cookies via our cookie banner. Declining does not affect your ability to use the site. You can also clear or block cookies in your browser settings.</p>

      <h2>How long we keep it</h2>
      <p>We keep enquiry and lead data for as long as needed to respond to you and maintain our business relationship, and analytics data in line with Google Analytics retention settings. You can ask us to delete your data at any time.</p>

      <h2>Your rights</h2>
      <p>You have the right to access, correct, or delete your personal data, to withdraw consent, and to object to or restrict processing. To exercise any of these, email <a href="mailto:info@kudoadvisory.com">info@kudoadvisory.com</a> and we will respond promptly.</p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time. The latest version will always be on this page.</p>
    </>
  );
}

function ArabicPrivacy() {
  return (
    <>
      <h1>سياسة الخصوصية</h1>
      <p>تلتزم كودو أدفيزوري (Kudo Advisory FZ-LLC) بحماية خصوصيتك. توضح هذه السياسة البيانات الشخصية التي نجمعها ولماذا وكيف نتعامل معها. وهي مكتوبة بما يتوافق مع قانون حماية البيانات الشخصية في الإمارات (PDPL) ولائحة GDPR الأوروبية عند الاقتضاء.</p>

      <h2>من نحن</h2>
      <p>كودو أدفيزوري شركة استشارات ذكاء اصطناعي مستقلة مسجلة بوصفها Kudo Advisory FZ-LLC في المنطقة الحرة لمدينة الشارقة للنشر، الإمارات. لأي سؤال يتعلق بالخصوصية، تواصل معنا على <a href="mailto:info@kudoadvisory.com">info@kudoadvisory.com</a>.</p>

      <h2>ما الذي نجمعه</h2>
      <ul>
        <li><strong>المعلومات التي تقدمها لنا</strong> عبر نموذج التواصل أو تقييم جاهزية الذكاء الاصطناعي أو تنزيل الدليل: اسمك وبريدك الإلكتروني ومؤسستك وأي رسالة أو إجابات تقييم تقدمها.</li>
        <li><strong>بيانات الاستخدام</strong> التي تُجمع تلقائياً عبر التحليلات: الصفحات التي تزورها، وموقعك التقريبي، ونوع الجهاز والمتصفح، وكيفية وصولك إلى الموقع. تُجمع هذه عبر ملفات تعريف الارتباط (انظر أدناه).</li>
      </ul>

      <h2>كيف نستخدمها</h2>
      <ul>
        <li>للرد على استفسارك وترتيب مكالمة استكشافية.</li>
        <li>لإرسال المورد الذي طلبته (مثل دليلنا).</li>
        <li>لإرسال رؤى وتحديثات الذكاء الاصطناعي ذات الصلة عبر البريد الإلكتروني، حيثما وافقت على ذلك. يمكنك إلغاء الاشتراك في أي وقت عبر الرابط في كل بريد.</li>
        <li>لفهم كيفية استخدام موقعنا وتحسينه.</li>
      </ul>

      <h2>الأساس القانوني</h2>
      <p>نعالج بياناتك بناءً على موافقتك (التي تمنحها بإرسال نموذج أو قبول ملفات تعريف الارتباط) ومصلحتنا المشروعة في تشغيل أعمالنا وتحسينها. يمكنك سحب الموافقة في أي وقت.</p>

      <h2>مع من نشاركها</h2>
      <p>نحن لا نبيع بياناتك. نشاركها فقط مع مزودي خدمات موثوقين يساعدوننا في التشغيل، تحديداً: <strong>MailerLite</strong> (إرسال البريد)، و<strong>Formspree</strong> (معالجة النماذج)، و<strong>Google Analytics</strong> (تحليلات الموقع)، و<strong>Vercel</strong> (الاستضافة).</p>

      <h2>ملفات تعريف الارتباط</h2>
      <p>نستخدم ملفات تعريف الارتباط للتحليلات (Google Analytics) لفهم كيفية استخدام الموقع. لا نستخدم ملفات تعريف ارتباط إعلانية. عند زيارتك الأولى، يمكنك قبول أو رفض ملفات تعريف ارتباط التحليلات عبر شريط ملفات تعريف الارتباط. الرفض لا يؤثر على قدرتك على استخدام الموقع.</p>

      <h2>مدة الاحتفاظ</h2>
      <p>نحتفظ ببيانات الاستفسارات والعملاء المحتملين للمدة اللازمة للرد عليك والحفاظ على علاقتنا، وببيانات التحليلات وفقاً لإعدادات الاحتفاظ في Google Analytics. يمكنك أن تطلب منا حذف بياناتك في أي وقت.</p>

      <h2>حقوقك</h2>
      <p>لك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها، وسحب الموافقة، والاعتراض على المعالجة أو تقييدها. لممارسة أي من ذلك، راسل <a href="mailto:info@kudoadvisory.com">info@kudoadvisory.com</a> وسنرد فوراً.</p>

      <h2>التغييرات</h2>
      <p>قد نحدّث هذه السياسة من حين لآخر. ستكون أحدث نسخة دائماً على هذه الصفحة.</p>
    </>
  );
}
