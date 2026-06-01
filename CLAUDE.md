# Kudo Advisory website — project rules

## NON-NEGOTIABLE: no long dashes, ever
Never use em dashes (—) or en dashes (–) anywhere: not in website copy,
content, comments, commit messages, PDFs, marketing files, or anything else
in this project. Use a comma, a full stop, "to" (for ranges), or rephrase.
This applies by default to every change without being asked.

A build guard enforces this: `npm run check:dashes` fails if any em/en dash
is found in src/, public/, index.html, marketing/, api/. It runs automatically
before every `npm run build`.

## Other standing rules
- Bilingual EN/AR with RTL must be kept in sync; new pages need both.
- Deploy flow: commit to `main`, push, Vercel auto-deploys.
- Keep new pages in the sitemap (public/sitemap.xml) and add nav/footer links.
- Voice for LinkedIn/content: punchy, natural (not jargon-heavy), analogies,
  anonymised customer stories (name the industry, never the company).
