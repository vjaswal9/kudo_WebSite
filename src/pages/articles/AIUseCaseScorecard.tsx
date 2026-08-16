// src/pages/articles/AIUseCaseScorecard.tsx
import { PageMeta } from "@/components/PageMeta";
import { ArticleLayout } from "@/components/ArticleLayout";
import { GuidePromo } from "@/components/GuidePromo";

const META = {
  title: "An AI Use Case Scorecard: A Worked Example",
  titleAr: "بطاقة تقييم حالات استخدام الذكاء الاصطناعي: مثال تطبيقي",
  description: "A concrete, filled-in scorecard matrix applying the five-dimension prioritisation framework to six illustrative AI use cases, so you can see exactly how the scoring and ranking works.",
  descriptionAr: "مصفوفة تقييم مُطبّقة فعلياً على إطار الأبعاد الخمسة لتحديد الأولويات، على ست حالات استخدام توضيحية للذكاء الاصطناعي، لترى بالضبط كيف يعمل التقييم والترتيب.",
  author: "Vijay Jaswal",
  authorTitle: "Founder & CEO, Kudo Advisory",
  authorTitleAr: "المؤسس والرئيس التنفيذي، كودو أدفيزوري",
  date: "2026-08-14",
  dateFormatted: "14 August 2026",
  dateFormattedAr: "14 أغسطس 2026",
  readTime: "7 min read",
  readTimeAr: "7 دقائق قراءة",
  category: "AI Strategy",
  categoryAr: "استراتيجية الذكاء الاصطناعي",
  url: "https://www.kudoadvisory.com/insights/ai-use-case-scorecard",
};

const ROWS = [
  { name: "AI-assisted invoice processing", strategic: 3, value: 4, feasibility: 5, timeToValue: 5, riskFav: 4, total: 21 },
  { name: "Internal knowledge-base search assistant", strategic: 3, value: 3, feasibility: 5, timeToValue: 5, riskFav: 5, total: 21 },
  { name: "Automated marketing content generation", strategic: 2, value: 3, feasibility: 5, timeToValue: 5, riskFav: 4, total: 19 },
  { name: "Customer service chatbot", strategic: 4, value: 4, feasibility: 3, timeToValue: 3, riskFav: 3, total: 17 },
  { name: "Predictive maintenance for equipment", strategic: 4, value: 4, feasibility: 3, timeToValue: 2, riskFav: 4, total: 17 },
  { name: "AI-powered credit risk scoring", strategic: 5, value: 5, feasibility: 2, timeToValue: 2, riskFav: 1, total: 15 },
].sort((a, b) => b.total - a.total);

const ROWS_AR = [
  { name: "معالجة الفواتير بمساعدة الذكاء الاصطناعي", strategic: 3, value: 4, feasibility: 5, timeToValue: 5, riskFav: 4, total: 21 },
  { name: "مساعد بحث في قاعدة المعرفة الداخلية", strategic: 3, value: 3, feasibility: 5, timeToValue: 5, riskFav: 5, total: 21 },
  { name: "توليد محتوى تسويقي آلي", strategic: 2, value: 3, feasibility: 5, timeToValue: 5, riskFav: 4, total: 19 },
  { name: "روبوت محادثة لخدمة العملاء", strategic: 4, value: 4, feasibility: 3, timeToValue: 3, riskFav: 3, total: 17 },
  { name: "الصيانة التنبؤية للمعدات", strategic: 4, value: 4, feasibility: 3, timeToValue: 2, riskFav: 4, total: 17 },
  { name: "تقييم مخاطر الائتمان بالذكاء الاصطناعي", strategic: 5, value: 5, feasibility: 2, timeToValue: 2, riskFav: 1, total: 15 },
].sort((a, b) => b.total - a.total);

function ScoreTable({ rows, headers }: { rows: typeof ROWS; headers: string[] }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className={i > 0 ? "num" : undefined}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td><strong>{r.name}</strong></td>
              <td className="num">{r.strategic}</td>
              <td className="num">{r.value}</td>
              <td className="num">{r.feasibility}</td>
              <td className="num">{r.timeToValue}</td>
              <td className="num">{r.riskFav}</td>
              <td className="num"><strong>{r.total}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EnglishBody() {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 sm:gap-4 my-10">
        <div className="stat-card"><span className="stat-number">5</span><span className="stat-label">scoring dimensions, the same five from our prioritisation framework</span></div>
        <div className="stat-card"><span className="stat-number">1-5</span><span className="stat-label">simple scale per dimension, no complicated maths required</span></div>
        <div className="stat-card"><span className="stat-number">20 min</span><span className="stat-label">to score one use case properly, with the right people in the room</span></div>
      </div>

      <p>We've written before about the five-dimension framework for prioritising AI use cases. Frameworks are easy to describe and harder to apply. This article is the applied version: an actual scorecard, filled in, with six illustrative use cases scored and ranked, so you can see exactly how the mechanic works before you run it on your own list.</p>
      <hr />
      <h2>The five dimensions, recapped</h2>
      <ul>
        <li><strong>Strategic alignment:</strong> how directly this supports a stated strategic priority</li>
        <li><strong>Business value:</strong> the realistic business impact if executed well</li>
        <li><strong>Feasibility:</strong> how achievable it is given current data, infrastructure, talent, and change capacity</li>
        <li><strong>Time to value:</strong> how long before it delivers meaningful results</li>
        <li><strong>Risk and governance complexity, scored as favourability:</strong> a 5 means low risk and light governance overhead, a 1 means high risk and heavy governance overhead. Scoring it this way keeps every column pointing the same direction, so a higher number is always better and the totals stay simple to read.</li>
      </ul>
      <p>Score each dimension from 1 to 5. Add them up. The total is out of 25. That's the entire mechanic. Weighting the dimensions differently is a legitimate refinement once you trust the basic version, but don't start there, start with the simple sum.</p>
      <hr />
      <h2>A worked example scorecard</h2>
      <p>Six illustrative use cases, scored across the five dimensions, ranked by total.</p>
      <ScoreTable
        rows={ROWS}
        headers={["Use case", "Strategic", "Value", "Feasibility", "Time to value", "Risk favourability", "Total /25"]}
      />
      <hr />
      <h2>What the matrix tells you</h2>
      <p>Look at where AI-powered credit risk scoring lands. It has the highest strategic alignment and business value scores on the entire list, a 5 and a 5. It ranks last. This is precisely the failure mode we've written about before: prioritising by enthusiasm and headline value rather than evidence. The regulatory weight, data maturity requirements, and governance overhead of a high-risk, regulated use case make it genuinely harder and slower to do well, and the scorecard makes that visible instead of letting ambition hide it.</p>
      <p>Compare that to the tie at the top: invoice processing and the internal knowledge-search assistant. Neither is glamorous. Both score modestly on strategic alignment. But both are highly feasible, fast to value, and low risk, which is exactly the profile of a use case that builds credibility early and funds the appetite for harder problems later.</p>
      <p>The credit risk scoring use case isn't wrong to pursue. It's wrong to pursue first. A balanced portfolio still has room for it, once the organisation has the governance maturity and delivery credibility that the quicker wins help build.</p>
      <blockquote><p>The exact scores matter less than the conversation the scoring forces you to have. If two people in the room score the same use case a 5 and a 2, that gap is more valuable than any number in the total column.</p></blockquote>
      <hr />
      <h2>How to run this with your own use cases</h2>
      <ol>
        <li>List your candidate use cases, ideally no more than fifteen to twenty at a time</li>
        <li>Get the right people in the room: a business owner, a technical lead, and someone who can speak to risk and governance, not just one person's opinion</li>
        <li>Score independently first, then compare, don't average away disagreement silently, discuss it out loud, disagreement is diagnostic information about where the real uncertainty sits</li>
        <li>Rank by total, then sanity-check the ranking against portfolio balance across time horizons and business functions</li>
        <li>Revisit quarterly, scores change as data maturity, regulation, and business priorities shift</li>
      </ol>
      <p>Before any use case that clears this scorecard moves to build, it should also clear a governance check specific to the UAE regulatory environment, not just this generic risk score.</p>
      <p className="rounded-xl border border-primary/30 bg-card px-6 py-5 my-8">
        Run it through the checklist first:{" "}
        <a href="/insights/ai-governance-checklist-uae" className="text-primary font-semibold hover:text-primary/80 transition-colors">
          The AI Governance Checklist for the UAE
        </a>
        {" "}or read the full framework:{" "}
        <a href="/insights/ai-use-case-prioritisation" className="text-primary font-semibold hover:text-primary/80 transition-colors">
          How to Prioritise AI Use Cases
        </a>
        , or talk to us about{" "}
        <a href="/services/ai-use-case-prioritisation" className="text-primary font-semibold hover:text-primary/80 transition-colors">
          running this with your own list
        </a>.
      </p>
    </>
  );
}

function ArabicBody() {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 sm:gap-4 my-10">
        <div className="stat-card"><span className="stat-number">5</span><span className="stat-label">أبعاد تقييم، الأبعاد الخمسة نفسها من إطار تحديد الأولويات لدينا</span></div>
        <div className="stat-card"><span className="stat-number">1-5</span><span className="stat-label">مقياس بسيط لكل بُعد، دون أي حسابات معقدة</span></div>
        <div className="stat-card"><span className="stat-number">20 دقيقة</span><span className="stat-label">لتقييم حالة استخدام واحدة بشكل صحيح، مع الأشخاص المناسبين في الغرفة</span></div>
      </div>

      <p>كتبنا سابقاً عن إطار الأبعاد الخمسة لتحديد أولويات حالات استخدام الذكاء الاصطناعي. الأطر سهلة الوصف وأصعب في التطبيق. هذا المقال هو النسخة التطبيقية: بطاقة تقييم فعلية، مُعبّأة، بست حالات استخدام توضيحية مُقيّمة ومرتبة، لترى بالضبط كيف تعمل الآلية قبل تطبيقها على قائمتك الخاصة.</p>
      <hr />
      <h2>الأبعاد الخمسة، باختصار</h2>
      <ul>
        <li><strong>التوافق الاستراتيجي:</strong> مدى دعم هذا الأمر بشكل مباشر لأولوية استراتيجية معلنة</li>
        <li><strong>قيمة الأعمال:</strong> الأثر الواقعي على الأعمال إذا نُفّذ بشكل جيد</li>
        <li><strong>الجدوى:</strong> مدى إمكانية تحقيقه بالنظر إلى البيانات والبنية التحتية والكفاءات والقدرة على التغيير حالياً</li>
        <li><strong>الوقت للوصول إلى القيمة:</strong> المدة اللازمة قبل تحقيق نتائج ملموسة</li>
        <li><strong>المخاطر وتعقيد الحوكمة، مُقيّمة كمعامل تفضيل:</strong> الدرجة 5 تعني مخاطر منخفضة وعبء حوكمة خفيف، والدرجة 1 تعني مخاطر عالية وعبء حوكمة ثقيل. تقييمها بهذا الاتجاه يجعل كل عمود يشير إلى الاتجاه نفسه، بحيث يكون الرقم الأعلى دائماً أفضل ويبقى المجموع سهل القراءة</li>
      </ul>
      <p>قيّم كل بُعد من 1 إلى 5. اجمعها. المجموع من 25. هذه هي الآلية بأكملها. ترجيح الأبعاد بشكل مختلف تحسين مشروع بمجرد أن تثق بالنسخة الأساسية، لكن لا تبدأ بذلك، ابدأ بالمجموع البسيط.</p>
      <hr />
      <h2>مثال تطبيقي لبطاقة التقييم</h2>
      <p>ست حالات استخدام توضيحية، مُقيّمة عبر الأبعاد الخمسة، مرتبة حسب المجموع.</p>
      <ScoreTable
        rows={ROWS_AR as unknown as typeof ROWS}
        headers={["حالة الاستخدام", "استراتيجي", "القيمة", "الجدوى", "الوقت للقيمة", "تفضيل المخاطر", "المجموع /25"]}
      />
      <hr />
      <h2>ما تخبرك به المصفوفة</h2>
      <p>انظر إلى موقع تقييم مخاطر الائتمان بالذكاء الاصطناعي. يحمل أعلى درجات التوافق الاستراتيجي وقيمة الأعمال في القائمة بأكملها، 5 و5. ويأتي في المرتبة الأخيرة. هذا بالضبط نمط الفشل الذي كتبنا عنه سابقاً: تحديد الأولويات حسب الحماس والقيمة الظاهرة بدلاً من الأدلة. الثقل التنظيمي ومتطلبات نضج البيانات وعبء الحوكمة لحالة استخدام عالية المخاطر ومُنظّمة تجعلها أصعب وأبطأ فعلياً لتنفيذها بشكل جيد، وتُظهر بطاقة التقييم ذلك بوضوح بدلاً من ترك الطموح يخفيه.</p>
      <p>قارن ذلك بالتعادل في الصدارة: معالجة الفواتير ومساعد البحث في قاعدة المعرفة الداخلية. لا شيء منهما لافت. كلاهما يحصل على درجات متواضعة في التوافق الاستراتيجي. لكن كلاهما قابل للتحقيق بشكل كبير وسريع الوصول إلى القيمة ومنخفض المخاطر، وهو بالضبط ملف حالة الاستخدام التي تبني المصداقية مبكراً وتموّل الرغبة في مواجهة مشكلات أصعب لاحقاً.</p>
      <p>حالة استخدام تقييم مخاطر الائتمان ليست خاطئة كهدف. إنها خاطئة كبداية. لا تزال المحفظة المتوازنة تحتاج مكاناً لها، بمجرد أن تمتلك المؤسسة نضج الحوكمة ومصداقية التنفيذ التي تساعد المكاسب السريعة في بنائها.</p>
      <blockquote><p>الدرجات الدقيقة أقل أهمية من المحادثة التي يفرضها التقييم. إذا قيّم شخصان في الغرفة نفس حالة الاستخدام بـ5 و2، فتلك الفجوة أكثر قيمة من أي رقم في عمود المجموع.</p></blockquote>
      <hr />
      <h2>كيفية تطبيقها على حالات الاستخدام الخاصة بك</h2>
      <ol>
        <li>ضع قائمة بحالات الاستخدام المرشحة، يُفضّل ألا تتجاوز خمس عشرة إلى عشرين حالة في المرة الواحدة</li>
        <li>أحضر الأشخاص المناسبين إلى الغرفة: مالك أعمال، وقائد تقني، ومن يستطيع الحديث عن المخاطر والحوكمة، لا رأي شخص واحد فقط</li>
        <li>قيّموا بشكل مستقل أولاً، ثم قارنوا، لا تُذيبوا الخلاف بالمتوسط بصمت، ناقشوه بصوت عالٍ، فالخلاف معلومة تشخيصية عن مكان عدم اليقين الحقيقي</li>
        <li>رتّب حسب المجموع، ثم تحقق من منطقية الترتيب مقابل توازن المحفظة عبر الآفاق الزمنية والوظائف التجارية</li>
        <li>راجع كل ربع سنة، الدرجات تتغير مع تغيّر نضج البيانات والتنظيم وأولويات الأعمال</li>
      </ol>
      <p>قبل أن تنتقل أي حالة استخدام تجتاز بطاقة التقييم هذه إلى التنفيذ، يجب أيضاً أن تجتاز فحص حوكمة خاصاً بالبيئة التنظيمية الإماراتية، لا درجة المخاطر العامة هذه فقط.</p>
      <p className="rounded-xl border border-primary/30 bg-card px-6 py-5 my-8">
        طبّقها عبر القائمة أولاً:{" "}
        <a href="/insights/ai-governance-checklist-uae" className="text-primary font-semibold hover:text-primary/80 transition-colors">
          قائمة تحقق حوكمة الذكاء الاصطناعي للإمارات
        </a>
        {" "}أو اقرأ الإطار الكامل:{" "}
        <a href="/insights/ai-use-case-prioritisation" className="text-primary font-semibold hover:text-primary/80 transition-colors">
          كيف تحدد أولويات حالات استخدام الذكاء الاصطناعي
        </a>
        ، أو تواصل معنا بخصوص{" "}
        <a href="/services/ai-use-case-prioritisation" className="text-primary font-semibold hover:text-primary/80 transition-colors">
          تطبيق هذا على قائمتك الخاصة
        </a>.
      </p>
    </>
  );
}

export default function AIUseCaseScorecard() {
  return (
    <>
      <PageMeta
        title="AI Use Case Scorecard: A Worked Example | Kudo Advisory"
        description="A worked example AI use case scorecard, applying the five-dimension framework to six illustrative use cases so you can copy the method directly."
        canonical="https://www.kudoadvisory.com/insights/ai-use-case-scorecard"
        ogImage="https://www.kudoadvisory.com/og/ai-use-case-scorecard.jpg"
        articlePublishedTime="2026-08-14T00:00:00+04:00"
        articleModifiedTime="2026-08-14T00:00:00+04:00"
        articleAuthor="Vijay Jaswal"
        articleSection="AI Strategy"
        articleWordCount={1050}
        articleKeywords={["AI use case scorecard", "AI prioritisation matrix", "AI use case ranking", "AI advisory UAE", "AI use case framework", "AI portfolio prioritisation"]}
      />
      <ArticleLayout
        meta={META}
        childrenAr={<ArabicBody />}
        promo={<GuidePromo variant="banner" />}
        ctaHeading="Want this run properly on your own use case list?"
        ctaHeadingAr="هل تريد تطبيق هذا بشكل صحيح على قائمة حالات الاستخدام الخاصة بك؟"
        ctaBody="Kudo Advisory facilitates the scoring session, brings the governance lens, and turns the output into a portfolio your board can actually follow."
        ctaBodyAr="تُيسّر كودو أدفيزوري جلسة التقييم، وتضيف منظور الحوكمة، وتحوّل المخرجات إلى محفظة يستطيع مجلس إدارتكم متابعتها فعلياً."
      >
        <EnglishBody />
      </ArticleLayout>
    </>
  );
}
