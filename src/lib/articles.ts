// src/lib/articles.ts
// Lightweight registry of all insight articles, used for related-article
// cross-linking. Keep in sync when adding a new article.
export interface ArticleEntry {
  slug: string;            // path under /insights/
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  readTime: string;
  readTimeAr: string;
}

export const ARTICLES: ArticleEntry[] = [
  {
    slug: "ai-governance-framework-uae",
    title: "Building an AI Governance Framework for UAE Enterprises: A Practical Guide",
    titleAr: "بناء إطار لحوكمة الذكاء الاصطناعي لمؤسسات الإمارات: دليل عملي",
    category: "AI Governance",
    categoryAr: "حوكمة الذكاء الاصطناعي",
    readTime: "9 min read",
    readTimeAr: "9 دقائق قراءة",
  },
  {
    slug: "why-enterprise-ai-pilots-fail",
    title: "Why Enterprise AI Pilots Fail: What to Do About It",
    titleAr: "لماذا تفشل مشاريع الذكاء الاصطناعي التجريبية في المؤسسات: وماذا تفعل حيال ذلك",
    category: "AI Strategy",
    categoryAr: "استراتيجية الذكاء الاصطناعي",
    readTime: "8 min read",
    readTimeAr: "8 دقائق قراءة",
  },
  {
    slug: "ai-governance-middle-east",
    title: "AI Governance in the Middle East: What Enterprise Leaders Need to Know in 2026",
    titleAr: "حوكمة الذكاء الاصطناعي في الشرق الأوسط: ما يحتاج قادة المؤسسات معرفته في 2026",
    category: "AI Governance",
    categoryAr: "حوكمة الذكاء الاصطناعي",
    readTime: "10 min read",
    readTimeAr: "10 دقائق قراءة",
  },
  {
    slug: "ai-operating-model",
    title: "The AI Operating Model: Structuring Your Organisation to Scale AI Responsibly",
    titleAr: "نموذج تشغيل الذكاء الاصطناعي: هيكلة مؤسستك لتوسيع الذكاء الاصطناعي بمسؤولية",
    category: "Operating Model",
    categoryAr: "نموذج التشغيل",
    readTime: "7 min read",
    readTimeAr: "7 دقائق قراءة",
  },
  {
    slug: "ciso-cio-ai-collaboration",
    title: "The CIO and CISO Conversation That Every AI Programme Needs",
    titleAr: "المحادثة بين مدير المعلومات ومدير أمن المعلومات التي تحتاجها كل برامج الذكاء الاصطناعي",
    category: "Leadership",
    categoryAr: "القيادة",
    readTime: "6 min read",
    readTimeAr: "6 دقائق قراءة",
  },
  {
    slug: "ai-use-case-prioritisation",
    title: "How to Prioritise AI Use Cases: A Framework for Enterprise Leaders",
    titleAr: "كيف تحدد أولويات حالات استخدام الذكاء الاصطناعي: إطار لقادة المؤسسات",
    category: "AI Strategy",
    categoryAr: "استراتيجية الذكاء الاصطناعي",
    readTime: "9 min read",
    readTimeAr: "9 دقائق قراءة",
  },
  {
    slug: "measuring-ai-roi",
    title: "Measuring AI ROI: Metrics That Actually Matter to Your Board",
    titleAr: "قياس عائد استثمار الذكاء الاصطناعي: المقاييس التي تهم مجلس الإدارة فعلاً",
    category: "Delivery",
    categoryAr: "التسليم",
    readTime: "7 min read",
    readTimeAr: "7 دقائق قراءة",
  },
];
