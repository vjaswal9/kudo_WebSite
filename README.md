# Kudo Advisory

Marketing and insights site for Kudo Advisory, an AI advisory and
consultancy firm in Dubai and the Middle East.

Built with Vite, TypeScript, React, React Router, Tailwind CSS and
shadcn/ui. Pages are prerendered to static HTML at build time with
vite-react-ssg, so every route (including the homepage and each article)

is fully crawlable by search engines and AI crawlers, then hydrates into
a React app in the browser.

## Local development

Requires Node.js and npm.


```sh
# Install dependencies
npm install

# Start the dev server with hot reload
npm run dev
```

## Build

```sh
# Prerender all routes to static HTML in dist/
npm run build

# Preview the production build locally
npm run preview
```

## Deployment

Deployed to GitHub Pages via the workflow in
`.github/workflows/pages.yml`. Pushing to `main` builds the site and
publishes it. The custom domain is configured in `CNAME`.

## Project structure

- `src/pages` and `src/pages/articles` hold the page and article views.
- `src/App.tsx` exports the `routes` config that the prerenderer crawls.
- `src/main.tsx` is the vite-react-ssg entry (prerender plus hydration).
- `src/components/PageMeta.tsx` sets per-page SEO meta and JSON-LD.
- `index.html` holds the global head (Organization, WebSite and FAQ
  JSON-LD, geo and AI-EO meta, fonts, analytics).
- `public` holds static assets: `robots.txt`, `sitemap.xml`, `llms.txt`,
  images and the favicon.
