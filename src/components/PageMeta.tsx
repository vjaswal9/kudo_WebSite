// src/components/PageMeta.tsx
// ════════════════════════════════════════════════════
// Drop this into any page to set per-page SEO meta.
// Usage:
//   <PageMeta
//     title="Your Page Title | Kudo Advisory"
//     description="Your meta description."
//     canonical="https://www.kudoadvisory.com/your-path"
//   />
// ════════════════════════════════════════════════════
import { Head } from "vite-react-ssg";

interface PageMetaProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleKeywords?: string[];
  articleWordCount?: number;
  noIndex?: boolean;
}

export function PageMeta({
  title,
  description,
  canonical,
  ogImage = "https://www.kudoadvisory.com/og-image.jpg",
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleSection,
  articleKeywords,
  articleWordCount,
  noIndex = false,
}: PageMetaProps) {
  const isArticle = !!articlePublishedTime;
  const modifiedTime = articleModifiedTime ?? articlePublishedTime;

  const pathParts = canonical.replace("https://www.kudoadvisory.com", "").split("/").filter(Boolean);
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.kudoadvisory.com/" },
    ...(pathParts.length > 0 ? [{ "@type": "ListItem", position: 2, name: "Insights", item: "https://www.kudoadvisory.com/insights" }] : []),
    ...(pathParts.length > 1 ? [{ "@type": "ListItem", position: 3, name: title.split(" | ")[0], item: canonical }] : []),
  ];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {articleKeywords && articleKeywords.length > 0 && (
        <meta name="keywords" content={articleKeywords.join(", ")} />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:site_name" content="Kudo Advisory" />
      <meta property="og:locale" content="en_AE" />
      <meta property="og:locale:alternate" content="ar_AE" />
      {/* Hreflang per-page */}
      <link rel="alternate" hreflang="en"        href={canonical} />
      <link rel="alternate" hreflang="en-ae"     href={canonical} />
      <link rel="alternate" hreflang="ar"        href={canonical} />
      <link rel="alternate" hreflang="ar-ae"     href={canonical} />
      <link rel="alternate" hreflang="x-default" href={canonical} />
      {isArticle && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {isArticle && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {isArticle && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {isArticle && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      {isArticle && articleKeywords && articleKeywords.map((kw) => (
        <meta key={kw} property="article:tag" content={kw} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content="Vijay Jaswal" />

      {/* Article structured data */}
      {isArticle && (
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": title.split(" | ")[0],
          "description": description,
          "url": canonical,
          "datePublished": articlePublishedTime,
          "dateModified": modifiedTime,
          ...(articleWordCount ? { "wordCount": articleWordCount } : {}),
          ...(articleSection ? { "articleSection": articleSection } : {}),
          ...(articleKeywords ? { "keywords": articleKeywords.join(", ") } : {}),
          "inLanguage": "en",
          "author": {
            "@type": "Person",
            "@id": "https://www.kudoadvisory.com/#vijay-jaswal",
            "name": "Vijay Jaswal",
            "jobTitle": "Founder & CEO, Kudo Advisory",
            "url": "https://www.linkedin.com/in/vijayjaswal"
          },
          "publisher": {
            "@type": "Organization",
            "@id": "https://www.kudoadvisory.com/#organization",
            "name": "Kudo Advisory",
            "url": "https://www.kudoadvisory.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.kudoadvisory.com/og-image.jpg",
              "width": 1200,
              "height": 630
            }
          },
          "image": {
            "@type": "ImageObject",
            "url": ogImage,
            "width": 1200,
            "height": 630
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonical
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems
          },
          "isPartOf": {
            "@type": "Blog",
            "name": "Kudo Advisory Insights",
            "url": "https://www.kudoadvisory.com/insights",
            "publisher": {
              "@id": "https://www.kudoadvisory.com/#organization"
            }
          }
        })}</script>
      )}

      {/* BreadcrumbList as separate block */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      })}</script>
    </Head>
  );
}
