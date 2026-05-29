// src/lib/faqData.ts
// Bilingual FAQ content — English and Arabic

export interface FaqItem { q: string; a: string; }
export interface FaqCategory { category: string; questions: FaqItem[]; }

export const faqData: Record<"en" | "ar", FaqCategory[]> = {
  en: [
    {
      category: "About Kudo Advisory",
      questions: [
        {
          q: "What does Kudo Advisory do?",
          a: "Kudo Advisory helps organisations turn AI ambition into measurable business outcomes. We provide AI strategy, AI governance, use case prioritisation, operating model design and delivery assurance to enterprise organisations across Dubai and the Middle East. We work with leadership teams to define where AI can create real value, build the governance structures to deploy it responsibly, and put in place the execution discipline to make it stick.",
        },
        {
          q: "Who does Kudo Advisory work with?",
          a: "We work with CEOs, CIOs, CDOs and senior leadership teams who are navigating one of three situations: they are unsure where to start with AI and need a clear, prioritised strategy; they have run pilots but are struggling to scale them into the business; or they have fragmented AI initiatives and need governance, structure and accountability. Our clients are typically mid-to-large enterprises operating in the UAE, Saudi Arabia and across the Middle East.",
        },
        {
          q: "Where is Kudo Advisory based?",
          a: "Kudo Advisory is based in Dubai, UAE and registered as Kudo Advisory FZ-LLC at the Sharjah Publishing City Free Zone. We work with organisations across the UAE, Saudi Arabia and the wider Middle East and MENA region.",
        },
        {
          q: "Who founded Kudo Advisory?",
          a: "Kudo Advisory was founded by Vijay Jaswal, a technology executive with over 25 years of experience advising boards and C-suite leaders across Europe, Asia-Pacific, the Middle East and Africa. Vijay was previously CTO for Asia-Pacific, Japan, Middle East and Africa at IFS, and spent over 17 years at Software AG in senior technology leadership roles including CTO for Middle East and Turkey. He has been named one of the Top 50 Technology Leaders in the Middle East.",
        },
        {
          q: "What does the name Kudo mean?",
          a: "Kudo comes from the Japanese word 駆動, which means driving force or propulsion. It captures the firm's core mission: turning AI intent into forward motion. We exist to make AI move.",
        },
        {
          q: "What makes Kudo Advisory different from other AI consultancies?",
          a: "Kudo Advisory focuses on practical execution, governance and measurable business value rather than hype-driven AI adoption. We are independent, which means we have no vendor relationships to protect and no incentive to recommend technology for its own sake. Our engagements are outcome-led from the start: we define what success looks like before we begin, and we measure ourselves against it. We also bring direct C-suite and board-level experience from leading enterprise AI programmes across multiple industries and geographies.",
        },
      ],
    },
    {
      category: "AI Advisory Services",
      questions: [
        {
          q: "What AI advisory services does Kudo Advisory offer?",
          a: "Kudo Advisory offers six core services: AI Strategy, which aligns AI initiatives with business goals and delivers a clear, prioritised roadmap; AI Policy and Governance, which builds the frameworks, controls and accountability structures for responsible AI; AI Operating Model Design, which structures teams, processes and technology to scale AI across the enterprise; AI Use Case Prioritisation, which identifies and ranks high-impact AI opportunities by feasibility and business value; Leadership Enablement, which builds C-suite AI literacy and confidence; and AI Delivery Assurance, which provides hands-on programme oversight to keep AI initiatives on track and delivering results.",
        },
        {
          q: "What is AI strategy and why does my organisation need one?",
          a: "An AI strategy defines where AI can create genuine business value in your organisation, how to prioritise the opportunities, what capabilities you need to build, and how to sequence the work. Without one, most organisations end up with scattered pilots that fail to scale, duplicated effort across business units, and AI investments that cannot be clearly tied to business outcomes. An AI strategy gives leadership a shared view of the destination and a credible plan to get there.",
        },
        {
          q: "What is AI governance and why does it matter?",
          a: "AI governance refers to the policies, frameworks, controls and accountability structures that ensure AI systems are deployed responsibly, ethically and in compliance with regulations. It covers areas including data provenance, model explainability, bias assessment, human oversight, access controls and regulatory alignment. Robust AI governance is critical for boards, regulators and stakeholders, and in the Middle East it is increasingly a regulatory requirement.",
        },
        {
          q: "What is an AI operating model?",
          a: "An AI operating model defines how an organisation structures its teams, processes, governance, data practices and technology to scale AI responsibly and sustainably across the enterprise. It is the bridge between AI strategy and real-world execution. Without an effective operating model, AI capability tends to remain siloed in one part of the organisation and fails to deliver value at scale.",
        },
        {
          q: "Does Kudo Advisory implement AI systems?",
          a: "Kudo Advisory is an advisory firm, not an implementation firm. We focus on strategy, governance, operating model design and delivery assurance. This means we help you decide what to build, how to govern it and how to make sure it gets delivered. We work alongside your internal teams and technology partners rather than replacing them.",
        },
        {
          q: "Can Kudo Advisory help if we have already started an AI programme?",
          a: "Yes. Many of our engagements begin mid-programme. Common entry points include helping organisations diagnose why a pilot has stalled, introducing governance to a programme that has been moving without it, restructuring a fragmented AI portfolio around clear priorities, or providing delivery assurance on an existing initiative that is not hitting its targets.",
        },
      ],
    },
    {
      category: "AI in the Middle East",
      questions: [
        {
          q: "What is the AI landscape like in the UAE and Middle East?",
          a: "The UAE and Saudi Arabia have made AI central to their national development strategies. The UAE National AI Strategy 2031 and Saudi Arabia's Vision 2030 both set ambitious targets for AI's contribution to the economy. PwC estimates AI could contribute up to USD 320 billion to the Middle East economy by 2030. Enterprise AI investment across the region is significant and growing, but many organisations are still struggling to convert that investment into measurable operational outcomes.",
        },
        {
          q: "Why do so many enterprise AI pilots fail in the Middle East?",
          a: "The reasons are consistent across the region and consistent with global patterns. Most AI pilots fail not because the technology does not work but because the strategy is unclear, accountability is fragmented, governance is absent or too late, operating models have not been redesigned, and leadership has not been equipped to drive execution rather than just sponsor it. Kudo Advisory was founded specifically to address these gaps.",
        },
        {
          q: "What AI regulations apply to businesses in the UAE?",
          a: "The UAE regulatory landscape for AI is developing rapidly. Key frameworks include the UAE National AI Strategy 2031, the TDRA AI Ethics Principles and Guidelines, sector-specific AI guidance from ADGM and DIFC for financial services, and a dedicated UAE AI Law currently in development that is expected to introduce binding obligations including mandatory impact assessments for high-risk AI applications.",
        },
        {
          q: "Does Kudo Advisory work with organisations outside the UAE?",
          a: "Yes. While our primary focus is the UAE and Middle East, we work with organisations across the MENA region including Saudi Arabia, Qatar, Bahrain, Kuwait, Oman and Egypt. We also support organisations headquartered outside the region that are establishing or expanding AI operations in the Middle East.",
        },
      ],
    },
    {
      category: "Working With Us",
      questions: [
        {
          q: "How do we start working with Kudo Advisory?",
          a: "The best starting point is a discovery call. This is a 30-minute conversation to understand your situation, your AI ambitions, and where you are currently running into challenges. From there we can propose the engagement approach that makes most sense, whether that is a focused strategy sprint, a governance assessment, a use case prioritisation workshop or an ongoing advisory relationship.",
        },
        {
          q: "How long does a typical Kudo Advisory engagement last?",
          a: "Engagements vary significantly depending on what is needed. A focused AI strategy or governance assessment typically runs four to eight weeks. An ongoing advisory relationship or delivery assurance engagement typically runs three to twelve months. We design engagements to fit the client's situation rather than applying a standard model.",
        },
        {
          q: "What industries does Kudo Advisory specialise in?",
          a: "Kudo Advisory works across industries, drawing on Vijay Jaswal's background leading enterprise AI across sectors including energy, utilities, mining, manufacturing, financial services, telecommunications and enterprise services. We bring both sector-specific perspective and cross-industry pattern recognition, which is often where the most useful insights come from.",
        },
        {
          q: "How do we contact Kudo Advisory?",
          a: "You can reach us by email at info@kudoadvisory.com, through the contact form on our website at kudoadvisory.com, or by connecting with Vijay Jaswal directly on LinkedIn at linkedin.com/in/vijayjaswal.",
        },
      ],
    },
  ],

  ar: [
    {
      category: "عن كودو أدفيزوري",
      questions: [
        {
          q: "ماذا تفعل كودو أدفيزوري؟",
          a: "تساعد كودو أدفيزوري المنظمات على تحويل طموحاتها في الذكاء الاصطناعي إلى نتائج أعمال قابلة للقياس. نقدم استراتيجية الذكاء الاصطناعي وحوكمته وتحديد أولويات حالات الاستخدام وتصميم نماذج التشغيل وضمان التسليم للمؤسسات عبر دبي والشرق الأوسط. نعمل مع فرق القيادة لتحديد الأماكن التي يمكن للذكاء الاصطناعي أن يخلق فيها قيمة حقيقية، وبناء هياكل الحوكمة لنشره بمسؤولية، ووضع انضباط التنفيذ اللازم لإنجاحه.",
        },
        {
          q: "مع من تعمل كودو أدفيزوري؟",
          a: "نعمل مع الرؤساء التنفيذيين ومديري المعلومات ومديري البيانات والفرق القيادية العليا التي تواجه إحدى ثلاث حالات: إما أنها غير متأكدة من أين تبدأ مع الذكاء الاصطناعي وتحتاج إلى استراتيجية واضحة ذات أولويات، أو أنها أجرت تجارب تجريبية لكنها تكافح لتوسيع نطاقها، أو لديها مبادرات ذكاء اصطناعي متشعبة تحتاج إلى حوكمة وهيكلة ومساءلة. عملاؤنا في الغالب مؤسسات متوسطة إلى كبيرة الحجم في الإمارات والمملكة العربية السعودية والشرق الأوسط.",
        },
        {
          q: "أين يقع مقر كودو أدفيزوري؟",
          a: "يقع مقر كودو أدفيزوري في دبي، الإمارات العربية المتحدة، وهي مسجلة بوصفها Kudo Advisory FZ-LLC في المنطقة الحرة لمدينة الشارقة للنشر. نعمل مع منظمات في الإمارات والمملكة العربية السعودية ومنطقة الشرق الأوسط وشمال أفريقيا الأشمل.",
        },
        {
          q: "من أسس كودو أدفيزوري؟",
          a: "أسس كودو أدفيزوري فيجاي جسوال، المدير التنفيذي للتقنية ذو الخبرة التي تمتد لأكثر من 25 عاماً في تقديم المشورة لمجالس الإدارة وكبار المديرين التنفيذيين في أوروبا وآسيا والمحيط الهادئ والشرق الأوسط وأفريقيا. شغل فيجاي سابقاً منصب الرئيس التنفيذي للتقنية لمنطقة آسيا والمحيط الهادئ واليابان والشرق الأوسط وأفريقيا في IFS، وقضى أكثر من 17 عاماً في Software AG في أدوار قيادية عليا من بينها الرئيس التنفيذي للتقنية لمنطقة الشرق الأوسط وتركيا. وقد صُنِّف أحد أبرز 50 قائداً تقنياً في الشرق الأوسط.",
        },
        {
          q: "ماذا يعني اسم كودو؟",
          a: "يأتي اسم كودو من الكلمة اليابانية 駆動، التي تعني القوة الدافعة أو الدفع. يجسّد هذا الاسم المهمة الجوهرية للشركة: تحويل نية الذكاء الاصطناعي إلى حركة للأمام. نحن هنا لتحريك الذكاء الاصطناعي.",
        },
        {
          q: "ما الذي يميز كودو أدفيزوري عن شركات استشارات الذكاء الاصطناعي الأخرى؟",
          a: "تركز كودو أدفيزوري على التنفيذ العملي والحوكمة والقيمة التجارية القابلة للقياس بدلاً من تبني الذكاء الاصطناعي المدفوع بالضجيج. نحن مستقلون، مما يعني أنه لا توجد علاقات بموردين نحميها ولا حافز للتوصية بتقنية لذاتها. مشاركاتنا تركز على النتائج منذ البداية: نحدد معنى النجاح قبل أن نبدأ ونقيس أنفسنا بموجبه.",
        },
      ],
    },
    {
      category: "خدمات استشارات الذكاء الاصطناعي",
      questions: [
        {
          q: "ما الخدمات الاستشارية التي تقدمها كودو أدفيزوري للذكاء الاصطناعي؟",
          a: "تقدم كودو أدفيزوري ستة خدمات رئيسية: استراتيجية الذكاء الاصطناعي التي توائم المبادرات مع أهداف الأعمال وتوصل إلى خارطة طريق واضحة؛ وسياسة وحوكمة الذكاء الاصطناعي التي تبني الأطر والضوابط وهياكل المساءلة؛ وتصميم نموذج التشغيل الذي يهيكل الفرق والعمليات والتقنية لتوسيع الذكاء الاصطناعي؛ وتحديد أولويات حالات الاستخدام لتحديد الفرص عالية الأثر؛ وتمكين القيادة لبناء محو الأمية في الذكاء الاصطناعي لدى كبار المديرين؛ وضمان التسليم لمتابعة البرامج والتأكد من تحقيق النتائج.",
        },
        {
          q: "ما هي استراتيجية الذكاء الاصطناعي ولماذا تحتاجها مؤسستي؟",
          a: "تحدد استراتيجية الذكاء الاصطناعي الأماكن التي يمكن للذكاء الاصطناعي أن يخلق فيها قيمة تجارية حقيقية في مؤسستك، وكيفية تحديد أولويات الفرص، والقدرات التي تحتاج إلى بنائها، وكيفية تسلسل العمل. بدونها، تنتهي معظم المؤسسات بتجارب تجريبية متناثرة تفشل في التوسع، وجهد مكرر عبر وحدات الأعمال، واستثمارات في الذكاء الاصطناعي لا يمكن ربطها بوضوح بنتائج الأعمال.",
        },
        {
          q: "ما هي حوكمة الذكاء الاصطناعي ولماذا تهم؟",
          a: "تشير حوكمة الذكاء الاصطناعي إلى السياسات والأطر والضوابط وهياكل المساءلة التي تضمن نشر أنظمة الذكاء الاصطناعي بمسؤولية وأخلاقية وامتثال للوائح. تغطي مجالات منها مصدر البيانات وقابلية تفسير النماذج وتقييم التحيز والإشراف البشري وضوابط الوصول والامتثال التنظيمي.",
        },
        {
          q: "ما هو نموذج تشغيل الذكاء الاصطناعي؟",
          a: "يحدد نموذج تشغيل الذكاء الاصطناعي كيفية هيكلة المؤسسة لفرقها وعملياتها وحوكمتها وممارسات البيانات والتقنية لتوسيع الذكاء الاصطناعي بمسؤولية واستدامة عبر المؤسسة. إنه الجسر بين استراتيجية الذكاء الاصطناعي والتنفيذ الفعلي.",
        },
        {
          q: "هل تنفذ كودو أدفيزوري أنظمة الذكاء الاصطناعي؟",
          a: "كودو أدفيزوري شركة استشارات لا شركة تنفيذ. نركز على الاستراتيجية والحوكمة وتصميم نماذج التشغيل وضمان التسليم. هذا يعني أننا نساعدك في تحديد ما تبنيه وكيف تحكمه وكيف تتأكد من تسليمه. نعمل إلى جانب فرقك الداخلية وشركاء التقنية لا بديلاً عنهم.",
        },
        {
          q: "هل تستطيع كودو أدفيزوري المساعدة إذا كنا قد بدأنا برنامج ذكاء اصطناعي بالفعل؟",
          a: "نعم. كثير من مشاركاتنا تبدأ في منتصف البرنامج. نقاط الدخول الشائعة تشمل مساعدة المؤسسات في تشخيص سبب توقف تجربة تجريبية، أو إدخال الحوكمة على برنامج يتقدم بدونها، أو إعادة هيكلة محفظة ذكاء اصطناعي متشعبة حول أولويات واضحة.",
        },
      ],
    },
    {
      category: "الذكاء الاصطناعي في الشرق الأوسط",
      questions: [
        {
          q: "كيف يبدو مشهد الذكاء الاصطناعي في الإمارات والشرق الأوسط؟",
          a: "جعلت الإمارات والمملكة العربية السعودية الذكاء الاصطناعي محوراً لاستراتيجياتهما الوطنية للتنمية. تضع استراتيجية الذكاء الاصطناعي الوطنية الإماراتية 2031 ورؤية المملكة 2030 أهدافاً طموحة لمساهمة الذكاء الاصطناعي في الاقتصاد. تقدر PwC أن الذكاء الاصطناعي يمكنه المساهمة بما يصل إلى 320 مليار دولار في اقتصاد الشرق الأوسط بحلول عام 2030.",
        },
        {
          q: "لماذا تفشل كثير من مشاريع الذكاء الاصطناعي التجريبية في المؤسسات بالشرق الأوسط؟",
          a: "الأسباب متسقة في المنطقة ومتسقة مع الأنماط العالمية. معظم مشاريع الذكاء الاصطناعي التجريبية لا تفشل لأن التقنية لا تعمل، بل لأن الاستراتيجية غير واضحة، والمساءلة مجزأة، والحوكمة غائبة أو متأخرة، ولم تُعاد هندسة نماذج التشغيل، ولم يُجهَّز القادة لقيادة التنفيذ. تأسست كودو أدفيزوري تحديداً لمعالجة هذه الثغرات.",
        },
        {
          q: "ما اللوائح المتعلقة بالذكاء الاصطناعي التي تنطبق على الشركات في الإمارات؟",
          a: "المشهد التنظيمي للذكاء الاصطناعي في الإمارات يتطور بسرعة. الأطر الرئيسية تشمل استراتيجية الذكاء الاصطناعي الوطنية 2031، ومبادئ وإرشادات أخلاقيات الذكاء الاصطناعي الصادرة عن هيئة تنظيم الاتصالات والحكومة الرقمية، والتوجيهات القطاعية من ADGM وDIFC، وقانون مخصص للذكاء الاصطناعي في الإمارات قيد الإعداد.",
        },
        {
          q: "هل تعمل كودو أدفيزوري مع منظمات خارج الإمارات؟",
          a: "نعم. بينما تركيزنا الأساسي على الإمارات والشرق الأوسط، نعمل مع منظمات عبر منطقة الشرق الأوسط وشمال أفريقيا بما تشمل المملكة العربية السعودية وقطر والبحرين والكويت وعُمان ومصر. كما ندعم المنظمات المقرة خارج المنطقة التي تؤسس أو توسع عملياتها في الذكاء الاصطناعي بالشرق الأوسط.",
        },
      ],
    },
    {
      category: "العمل معنا",
      questions: [
        {
          q: "كيف نبدأ العمل مع كودو أدفيزوري؟",
          a: "أفضل نقطة بداية هي مكالمة استكشافية. هذه محادثة مدتها 30 دقيقة لفهم وضعك وطموحاتك في الذكاء الاصطناعي وأين تواجه تحديات حالياً. ومن هناك يمكننا اقتراح نهج المشاركة الأنسب، سواء كان جلسة استراتيجية مركزة أو تقييماً للحوكمة أو ورشة عمل لتحديد أولويات حالات الاستخدام أو علاقة استشارية مستمرة.",
        },
        {
          q: "كم تستغرق مشاركة كودو أدفيزوري النموذجية؟",
          a: "تتفاوت المشاركات تفاوتاً كبيراً بحسب الاحتياج. يستغرق تقييم مركز للاستراتيجية أو الحوكمة عادةً من أربعة إلى ثمانية أسابيع. تستمر علاقة الاستشارة المستمرة أو مشاركة ضمان التسليم عادةً من ثلاثة إلى اثني عشر شهراً. نصمم المشاركات لتناسب وضع العميل لا لتطبيق نموذج قياسي.",
        },
        {
          q: "ما القطاعات التي تتخصص فيها كودو أدفيزوري؟",
          a: "تعمل كودو أدفيزوري عبر القطاعات، مستفيدةً من خلفية فيجاي جسوال في قيادة الذكاء الاصطناعي المؤسسي في قطاعات الطاقة والمرافق والتعدين والتصنيع والخدمات المالية والاتصالات وخدمات المؤسسات. نجمع المنظور القطاعي المحدد وإدراك الأنماط عبر الصناعات.",
        },
        {
          q: "كيف نتواصل مع كودو أدفيزوري؟",
          a: "يمكنكم الوصول إلينا عبر البريد الإلكتروني info@kudoadvisory.com، أو من خلال نموذج التواصل على موقعنا kudoadvisory.com، أو بالتواصل مع فيجاي جسوال مباشرةً على لينكدإن linkedin.com/in/vijayjaswal.",
        },
      ],
    },
  ],
};
