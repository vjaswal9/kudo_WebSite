// src/lib/articleImages.ts
// Per-article hero/thumbnail images, keyed by slug. Only add a slug here once
// a real image exists at the given path; articles without an entry stay
// text-only (no hero, no thumbnail). Keeps the Insights section flexible as
// images are supplied one at a time.
export const ARTICLE_IMAGES: Record<string, string> = {
  "ai-governance-checklist-uae": "/insights/ai-governance-checklist-uae.webp",
  "ai-use-case-scorecard": "/insights/ai-use-case-scorecard.webp",
  "the-ai-meeting-nobody-admits-to": "/insights/the-ai-meeting-nobody-admits-to.webp",
  "ai-governance-framework-uae": "/insights/ai-governance-framework-uae.webp",
  "why-enterprise-ai-pilots-fail": "/insights/why-enterprise-ai-pilots-fail.webp",
  "ai-governance-middle-east": "/insights/ai-governance-middle-east.webp",
  "ai-operating-model": "/insights/ai-operating-model.webp",
  "ciso-cio-ai-collaboration": "/insights/ciso-cio-ai-collaboration.webp",
  "ai-use-case-prioritisation": "/insights/ai-use-case-prioritisation.webp",
  "measuring-ai-roi": "/insights/measuring-ai-roi.webp",
};

export function articleImage(slug: string): string | undefined {
  return ARTICLE_IMAGES[slug];
}
