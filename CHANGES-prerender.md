# Crawlability fix: build-time prerendering (SSG)

The site was a client-rendered SPA, so crawlers and AI bots that do not
run JavaScript saw an empty `<div id="root">` on every route, including
the homepage. This change makes every route emit fully rendered static
HTML at build time, while the React app still hydrates for interactivity.

## What changed

- Added `vite-react-ssg`. `npm run build` now prerenders one static HTML
  file per route with the real page content baked in.
- `src/App.tsx`: replaced `<BrowserRouter>/<Routes>` with an exported
  `routes` config (a root `Layout` holds the providers; pages are its
  children). This is the route tree the prerenderer crawls.
- `src/main.tsx`: now the `ViteReactSSG` entry. Removed the old
  `sessionStorage` redirect hack and the manual `HelmetProvider`.
- `src/components/PageMeta.tsx`: swapped `react-helmet-async`'s
  `<Helmet>` for vite-react-ssg's `<Head>`, so per-page title, meta,
  canonical, OG, Twitter and Article JSON-LD land in the static HTML.
- `index.html`: removed the homepage-specific tags (title, description,
  keywords, canonical, OG, Twitter) that now come per route from
  `PageMeta`. Kept all global tags: Organization, WebSite and FAQ
  JSON-LD, geo, AI-EO meta, fonts and analytics.
- Deleted the manual stub HTML under `public/about`, `public/faq` and
  `public/insights/*`. The prerenderer now produces the real pages, so
  the thin stubs (which redirected to an empty homepage) are obsolete.
- Deleted the corrupted `public/404.html` (it contained a stray shell
  heredoc). The GitHub Action regenerates `404.html` from the built
  homepage as the SPA fallback.

## Deploy

No workflow change needed. `.github/workflows/pages.yml` already runs
`npm install`, then `npm run build`, then copies `404.html`, then
deploys. Push to `main` and it ships.

## Optional follow-ups (not required for crawlability)

- The FAQ (`FAQPage`) JSON-LD is global in `index.html`, so it now
  appears on every page. Ideally it lives only on the FAQ page (and the
  homepage if it shows those FAQs). Move it into `FAQ.tsx`'s `PageMeta`
  to avoid Search Console "structured data does not match content" notes.
- A harmless build warning about `fetchPriority` on an `<img>`: change
  the prop to lowercase `fetchpriority` (or remove it) to silence it.
