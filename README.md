# Muwafaq Sami — The Living Manuscript

A Next.js portfolio for creative writing, screenwriting, and narrative design. The supplied resume under `public/resume.md` is the rendered resume source; homepage career facts follow the supplied resume. Project documents are served from `public/personal/`.

## Public resume and brand assets

`public/resume.md` is the editable source for the rendered `/resume` page and the raw `/resume.md` URL. The page reads that Markdown during the Next.js build and renders it as text and safe links. Update this file first when resume wording changes. The supplied `public/resume.pdf` is the independent `/resume.pdf` document; update it separately after approving a revised PDF, then check it matches the Markdown. The original supplied files under `public/personal/` are retained. The site does not generate a PDF from Markdown.

The wolf favicon and social preview derive from the existing mascot in `src/components/wolf.tsx`. `src/app/icon.svg` is the simplified mark; `npm run brand-assets` regenerates `favicon.ico`, `apple-icon.png`, and the 1200×630 Open Graph image from it. Inspect these images after changing the mark.

The homepage offers a Resume link and Ctrl+K / Cmd+K command palette. The resume page offers PDF view/download, Markdown view/download, print, and copy-link actions. Public machine-readable details live at `/llms.txt`; this supplements the sitemap and conventional metadata.

## Run and verify

Use Node.js 20.9 or newer in this folder:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Available checks:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run brand-assets
```

For browser tests, leave the development server running, then run `npm run test:e2e`. The Windows test configuration uses installed Chrome; elsewhere install Playwright Chromium if needed.

## Project PDFs

The 15 supplied project PDFs are available in `public/personal/` so the browser can request them at `/personal/<filename>`. The mapping is in `src/data/projects.ts`; names and punctuation are intentionally preserved. The former root `personal/` copies are currently removed in this working tree.

Five resume-backed projects appear in the main manuscript index. Nine other supplied PDFs appear in the archive. Their titles and document types follow their filenames. Where the resume and filenames disagree, the site does not assume they are the same work.

Project buttons open a native modal dialog. It has Escape and backdrop close, focus containment, focus return, browser history support, a document selector where needed, a native PDF viewer, and download/new-tab links. Old `/projects/<slug>` links redirect to the matching dialog URL.

## Contact and analytics

The form POSTs JSON directly to `https://formspree.io/f/mdeadwwe` with `Accept: application/json`. It validates fields with Zod and React Hook Form, includes a Formspree honeypot, blocks repeated submission while pending, preserves inputs on failure, and shows success only after an HTTP success response. Confirm in the Formspree dashboard that this form ID is active and sends to the intended inbox. No live message is sent by the automated tests; responses are mocked.

Plausible Analytics initializes once in the root layout and automatically records pageviews, including client-side navigation. Custom events are typed in `src/lib/analytics.ts` for navigation, project and PDF interactions, filters, experience expansion, and contact flow. Events contain only interaction metadata; no visitor or message content is sent. Vercel Speed Insights still measures performance; enable it in the Vercel project dashboard to collect production traffic data.

Add the deployed site's hostname to your Plausible account. The tracker uses `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` if set, otherwise the hostname from `NEXT_PUBLIC_SITE_URL`; it must match the domain registered in Plausible. Plausible ignores localhost visits by default. After deployment, use Plausible's site installation checker or look for a `POST` to `https://plausible.io/api/event` in the browser Network tab. To see custom events as conversions, add matching Custom event goals in Plausible's Goals settings. Start with `contact_form_submit_success`, `project_open`, and `project_pdf_download`; the other exact event names are in `src/lib/analytics.ts`.

## Deploy to Vercel

1. Push this folder as a repository or set `Resumes/mufaq/Portofolio` as the Vercel project root.
2. Import it as a Next.js project. The build command is `npm run build`.
3. Set `NEXT_PUBLIC_SITE_URL=https://portofolio-muwafaq.vercel.app` if a URL override is needed. This is already the code fallback for metadata, sitemap, robots, structured data, and the Plausible domain. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` only if the Plausible site uses a different hostname.
4. Deploy, then verify `/`, `/resume`, `/resume.pdf`, `/resume.md`, `/llms.txt`, `/favicon.ico`, `/sitemap.xml`, `/robots.txt`, the project dialog, and one real Formspree submission you initiate.

No server-side email key or Resend setup is required. The project is prepared for the requested domain but has not been deployed by this workspace task.

## Content and accessibility

The resume is the source for career claims. The site does not claim publication or production status for original concepts. PDF filenames and archive titles are transcribed from the supplied files. The illustration is an original inline SVG.

The design uses semantic sections, visible focus, a native dialog, reduced-motion styles, and mobile layouts. Animations use short entrance transitions and restrained ongoing motion; the PDF viewer loads only when a project is open. Performance scores and Core Web Vitals require measurement on the deployed site and are not guaranteed by local tests.
