// src/pages/articles/TheAIMeeting.tsx
import { PageMeta } from "@/components/PageMeta";
import { ArticleLayout } from "@/components/ArticleLayout";
import { GuidePromo } from "@/components/GuidePromo";

const META = {
  title: "The AI Meeting Every Leadership Team Has Had (And Nobody Admits To)",
  titleAr: "اجتماع الذكاء الاصطناعي الذي مرّ به كل فريق قيادي (ولا أحد يعترف به)",
  description: "Someone asks what the AI strategy is. Everyone nods. Someone mentions the ChatGPT licences. The meeting moves on. If that scene is familiar, you are not alone, and it is more fixable than it feels.",
  descriptionAr: "يسأل أحدهم عن استراتيجية الذكاء الاصطناعي. يومئ الجميع بالموافقة. يذكر أحدهم تراخيص ChatGPT. ينتقل الاجتماع لموضوع آخر. إن كان هذا المشهد مألوفاً، فأنت لست وحدك، والأمر قابل للإصلاح أكثر مما يبدو.",
  author: "Vijay Jaswal",
  authorTitle: "Founder & CEO, Kudo Advisory",
  authorTitleAr: "المؤسس والرئيس التنفيذي، كودو أدفيزوري",
  date: "2026-08-09",
  dateFormatted: "9 August 2026",
  dateFormattedAr: "9 أغسطس 2026",
  readTime: "7 min read",
  readTimeAr: "7 دقائق قراءة",
  category: "AI Strategy",
  categoryAr: "استراتيجية الذكاء الاصطناعي",
  url: "https://www.kudoadvisory.com/insights/the-ai-meeting-nobody-admits-to",
};

function EnglishBody() {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 sm:gap-4 my-10">
        <div className="stat-card"><span className="stat-number">1</span><span className="stat-label">meeting most leadership teams have had, almost word for word</span></div>
        <div className="stat-card"><span className="stat-number">0</span><span className="stat-label">times anyone in the room actually says "we don't have one"</span></div>
        <div className="stat-card"><span className="stat-number">3</span><span className="stat-label">questions that separate a real AI strategy from a good meeting</span></div>
      </div>

      <p>You know this meeting. You have probably sat in a version of it this year.</p>
      <p>Someone on the leadership team, often the CFO, sometimes a board member, asks: "So what's our AI strategy?" There is a brief pause. Someone mentions the ChatGPT Enterprise licences that finance signed off on. Someone else mentions the pilot marketing ran with a chatbot. The CIO says something about "exploring use cases." Everyone nods. The meeting moves on to the next agenda item.</p>
      <p>Nobody lied. Nobody in that room was incompetent. And yet the honest answer, the one nobody said out loud, was closer to: "We don't really have one. We have activity."</p>
      <p>I have watched this exact scene play out in enterprises across four regions, in industries as different as banking and mining. It is not a failure of intelligence or effort. It is what happens when a genuinely hard question gets asked in a room where admitting "I don't know" feels more dangerous than nodding along.</p>
      <hr />
      <h2>Why the nodding happens</h2>
      <p>Nobody wants to be the one who says "we don't have a strategy" in front of the board. So the room does what rooms do: it reaches for evidence of activity and presents it as evidence of direction. Licences purchased. A pilot running somewhere. A slide with the word "AI" on it from last quarter's town hall.</p>
      <p>Activity feels like progress. It photographs well in a board pack. But activity and strategy are different things, and the gap between them is exactly where AI budgets quietly disappear, initiatives stall without anyone deciding to stop them, and, eighteen months later, the same question gets asked again in almost the same words.</p>
      <blockquote><p>Activity is what you can point to. Strategy is what you can be held accountable for. Most organisations have plenty of the first and very little of the second.</p></blockquote>
      <h2>The three questions that actually separate strategy from theatre</h2>
      <p>You do not need a hundred-page AI strategy document to have a real answer. You need honest answers to three questions. In my experience, almost no leadership team can answer all three cleanly on the first attempt, and that is precisely the point: it is diagnostic, not a test you are expected to pass.</p>
      <h3>1. What business outcome are we actually trying to move?</h3>
      <p>Not "we want to use AI more." A specific, measurable result: reduce time-to-decision in underwriting by a third, cut manual data entry in finance operations by half, shorten customer response time from days to hours. If the honest answer is "we're not entirely sure yet," that is fine, it is also the first thing to fix, before another licence gets purchased or another pilot gets greenlit.</p>
      <h3>2. Who is accountable if this doesn't work?</h3>
      <p>Not a committee. Not "IT and the business together." One name. In most of the rooms I sit in, this question produces the longest silence of the meeting, because the honest answer is that accountability is genuinely diffuse. Everyone has a stake. Nobody owns the outcome. That diffusion is not a personality problem, it is a structural one, and it is entirely fixable once someone decides to fix it.</p>
      <h3>3. What happens when this goes wrong?</h3>
      <p>Every AI initiative eventually produces an error, an edge case, a decision someone questions. The organisations that handle this well decided, in advance, who gets told, what the escalation path is, and what "wrong" even means for this particular system. The organisations that handle it badly find out the process in real time, under pressure, usually in front of the board.</p>
      <h2>What changes when you can actually answer them</h2>
      <p>Nothing about this requires slowing down. In fact, the opposite is true. Leadership teams that can answer these three questions clearly move faster afterward, not slower, because they stop relitigating the same uncertainty in every subsequent meeting. The ambiguity that felt like flexibility was actually friction, and removing it is what lets initiatives that deserve momentum finally get it.</p>
      <p>The next time someone in your leadership team asks "what's our AI strategy," you do not need a polished answer. You need the courage to treat it as a real question rather than a rhetorical one, and thirty honest minutes to work through the three questions above. Most organisations have never spent those thirty minutes. That is usually the entire gap.</p>
      <p className="rounded-xl border border-primary/30 bg-card px-6 py-5 my-8">
        Want an outside view on your own answers to these three questions?{" "}
        <a href="/services/ai-strategy" className="text-primary font-semibold hover:text-primary/80 transition-colors">
          See our AI Strategy Advisory service
        </a>.
      </p>
    </>
  );
}

function ArabicBody() {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 sm:gap-4 my-10">
        <div className="stat-card"><span className="stat-number">1</span><span className="stat-label">اجتماع مرّت به معظم الفرق القيادية, بصياغة شبه متطابقة</span></div>
        <div className="stat-card"><span className="stat-number">0</span><span className="stat-label">مرات يقول فيها أحدهم فعلياً "ليس لدينا واحدة"</span></div>
        <div className="stat-card"><span className="stat-number">3</span><span className="stat-label">أسئلة تفصل بين استراتيجية حقيقية للذكاء الاصطناعي واجتماع جيد فقط</span></div>
      </div>

      <p>أنت تعرف هذا الاجتماع. على الأرجح مررت بنسخة منه هذا العام.</p>
      <p>يسأل أحد أعضاء الفريق القيادي, غالباً المدير المالي, وأحياناً عضو من مجلس الإدارة: "إذن ما هي استراتيجيتنا في الذكاء الاصطناعي؟" هناك صمت قصير. يذكر أحدهم تراخيص ChatGPT Enterprise التي وافقت عليها الإدارة المالية. يذكر آخر تجربة أطلقها فريق التسويق مع روبوت محادثة. يقول مدير المعلومات شيئاً عن "استكشاف حالات الاستخدام". يومئ الجميع بالموافقة. ينتقل الاجتماع إلى البند التالي في جدول الأعمال.</p>
      <p>لم يكذب أحد. لم يكن أحد في تلك الغرفة غير كفؤ. ومع ذلك, كانت الإجابة الصادقة, التي لم يقلها أحد بصوت عالٍ, أقرب إلى: "ليس لدينا استراتيجية حقيقية. لدينا نشاط."</p>
      <p>شاهدت هذا المشهد بالضبط يتكرر في مؤسسات عبر أربع مناطق, في قطاعات مختلفة تماماً كالمصرفية والتعدين. هذا ليس فشلاً في الذكاء أو الجهد. إنه ما يحدث عندما يُطرح سؤال صعب حقاً في غرفة يشعر فيها الاعتراف بـ"لا أعرف" بأنه أخطر من الإيماء بالموافقة.</p>
      <hr />
      <h2>لماذا يحدث الإيماء بالموافقة</h2>
      <p>لا أحد يريد أن يكون الشخص الذي يقول "ليس لدينا استراتيجية" أمام مجلس الإدارة. فتفعل الغرفة ما تفعله الغرف عادة: تبحث عن دليل على النشاط وتقدمه كدليل على الاتجاه. تراخيص تم شراؤها. تجربة تعمل في مكان ما. شريحة عرض تحمل كلمة "ذكاء اصطناعي" من اجتماع الربع الماضي.</p>
      <p>النشاط يبدو كأنه تقدم. يبدو جيداً في تقرير مجلس الإدارة. لكن النشاط والاستراتيجية أمران مختلفان, والفجوة بينهما هي بالضبط حيث تختفي ميزانيات الذكاء الاصطناعي بهدوء, وتتوقف المبادرات دون أن يقرر أحد إيقافها, وبعد ثمانية عشر شهراً, يُطرح السؤال نفسه مرة أخرى بصياغة شبه متطابقة.</p>
      <blockquote><p>النشاط هو ما يمكنك الإشارة إليه. الاستراتيجية هي ما يمكن مساءلتك عنه. تملك معظم المؤسسات الكثير من الأول والقليل جداً من الثاني.</p></blockquote>
      <h2>الأسئلة الثلاثة التي تفصل فعلياً بين الاستراتيجية والمسرحية</h2>
      <p>لست بحاجة إلى وثيقة استراتيجية ذكاء اصطناعي من مئة صفحة لتملك إجابة حقيقية. أنت بحاجة إلى إجابات صادقة على ثلاثة أسئلة. في تجربتي, لا يكاد فريق قيادي يستطيع الإجابة على الأسئلة الثلاثة بوضوح من المحاولة الأولى, وهذه بالضبط هي النقطة: إنه تشخيص, لا اختبار يُتوقع منك اجتيازه.</p>
      <h3>1. ما هي نتيجة الأعمال التي نحاول فعلياً تحريكها؟</h3>
      <p>ليس "نريد استخدام الذكاء الاصطناعي أكثر". بل نتيجة محددة وقابلة للقياس: تقليل زمن اتخاذ القرار في الاكتتاب بمقدار الثلث, خفض إدخال البيانات اليدوي في العمليات المالية إلى النصف, تقصير زمن استجابة العملاء من أيام إلى ساعات. إذا كانت الإجابة الصادقة "لسنا متأكدين تماماً بعد", فهذا مقبول, وهو أيضاً أول شيء يجب إصلاحه, قبل شراء ترخيص آخر أو الموافقة على تجربة أخرى.</p>
      <h3>2. من المسؤول إذا لم ينجح هذا؟</h3>
      <p>ليست لجنة. ليس "تقنية المعلومات والأعمال معاً". اسم واحد. في معظم الغرف التي أجلس فيها, ينتج عن هذا السؤال أطول صمت في الاجتماع, لأن الإجابة الصادقة هي أن المساءلة مشتتة فعلياً. للجميع مصلحة. لا أحد يملك النتيجة. هذا التشتت ليس مشكلة شخصية, بل مشكلة هيكلية, وهو قابل للإصلاح تماماً بمجرد أن يقرر أحدهم إصلاحه.</p>
      <h3>3. ماذا يحدث عندما يسوء الأمر؟</h3>
      <p>كل مبادرة ذكاء اصطناعي تنتج في النهاية خطأً, أو حالة استثنائية, أو قراراً يشكك فيه أحدهم. المؤسسات التي تتعامل مع هذا بشكل جيد قررت مسبقاً من يُبلَّغ, وما هو مسار التصعيد, وما الذي يعنيه "الخطأ" أصلاً لهذا النظام بالتحديد. المؤسسات التي تتعامل معه بشكل سيئ تكتشف العملية في الوقت الفعلي, تحت الضغط, وعادة أمام مجلس الإدارة.</p>
      <h2>ما الذي يتغير عندما تستطيع فعلياً الإجابة عليها</h2>
      <p>لا شيء في هذا يتطلب التباطؤ. في الواقع, العكس هو الصحيح. الفرق القيادية القادرة على الإجابة على هذه الأسئلة الثلاثة بوضوح تتحرك بشكل أسرع بعد ذلك, لا أبطأ, لأنها تتوقف عن إعادة النقاش حول عدم اليقين نفسه في كل اجتماع لاحق. الغموض الذي بدا وكأنه مرونة كان في الواقع احتكاكاً, وإزالته هي ما يتيح للمبادرات التي تستحق الزخم أن تحصل عليه أخيراً.</p>
      <p>في المرة القادمة التي يسأل فيها أحد في فريقك القيادي "ما هي استراتيجيتنا في الذكاء الاصطناعي", لست بحاجة إلى إجابة مصقولة. أنت بحاجة إلى الشجاعة لتعامل السؤال كسؤال حقيقي لا بلاغي, وثلاثين دقيقة صادقة للعمل على الأسئلة الثلاثة أعلاه. لم تقضِ معظم المؤسسات هذه الدقائق الثلاثين أبداً. هذه عادة هي الفجوة بأكملها.</p>
      <p className="rounded-xl border border-primary/30 bg-card px-6 py-5 my-8">
        هل تريد رأياً مستقلاً حول إجاباتك الخاصة على هذه الأسئلة الثلاثة؟{" "}
        <a href="/services/ai-strategy" className="text-primary font-semibold hover:text-primary/80 transition-colors">
          تعرّف على خدمة استشارات استراتيجية الذكاء الاصطناعي لدينا
        </a>.
      </p>
    </>
  );
}

export default function TheAIMeeting() {
  return (
    <>
      <PageMeta
        title="The AI Meeting Every Leadership Team Has Had | Kudo Advisory"
        description="Someone asks what the AI strategy is. Everyone nods. The meeting moves on. Vijay Jaswal on why this happens, and the three honest questions that separate real AI strategy from activity."
        canonical="https://www.kudoadvisory.com/insights/the-ai-meeting-nobody-admits-to"
        ogImage="https://www.kudoadvisory.com/og/the-ai-meeting-nobody-admits-to.jpg"
        articlePublishedTime="2026-08-09T00:00:00+04:00"
        articleModifiedTime="2026-08-09T00:00:00+04:00"
        articleAuthor="Vijay Jaswal"
        articleSection="AI Strategy"
        articleWordCount={1200}
        articleKeywords={["AI strategy", "enterprise AI", "AI leadership", "AI advisory Dubai", "AI accountability", "AI governance", "board AI strategy"]}
      />
      <ArticleLayout
        meta={META}
        childrenAr={<ArabicBody />}
        promo={<GuidePromo variant="banner" />}
        ctaHeading="Ready to answer the three questions properly?"
        ctaHeadingAr="مستعد للإجابة على الأسئلة الثلاثة بشكل صحيح؟"
        ctaBody="Kudo Advisory helps enterprise leaders across Dubai and the Middle East turn AI activity into AI strategy, with clear ownership, measurable outcomes, and governance built for execution."
        ctaBodyAr="تساعد كودو أدفيزوري قادة المؤسسات في دبي والشرق الأوسط على تحويل نشاط الذكاء الاصطناعي إلى استراتيجية ذكاء اصطناعي, بملكية واضحة ونتائج قابلة للقياس وحوكمة مُصممة للتنفيذ."
      >
        <EnglishBody />
      </ArticleLayout>
    </>
  );
}
