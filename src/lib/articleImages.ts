// src/lib/articleImages.ts
// Per-article hero/thumbnail images, keyed by slug. Only add a slug here once
// a real image exists at the given path; articles without an entry stay
// text-only (no hero, no thumbnail). Keeps the Insights section flexible as
// images are supplied one at a time.
export const ARTICLE_IMAGES: Record<string, string> = {
  "why-enterprise-ai-pilots-fail": "/insights/why-enterprise-ai-pilots-fail.webp",
  "ai-governance-middle-east": "/insights/ai-governance-middle-east.webp",
};

export function articleImage(slug: string): string | undefined {
  return ARTICLE_IMAGES[slug];
}
