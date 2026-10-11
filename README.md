# Muwafaq Sami — The Living Manuscript

A Next.js portfolio for creative writing, screenwriting, and narrative design. The professional information comes from `../Resume.md`; project documents come from this folder's `personal/` directory.

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
```

For browser tests, leave the development server running, then run `npm run test:e2e`. The Windows test configuration uses installed Chrome; elsewhere install Playwright Chromium if needed.

## Project PDFs

The 15 original files are in `personal/`. Identical copies are in `public/personal/` so the browser can request them at `/personal/<filename>`. Keep both folders in sync when adding or replacing a document. The mapping is in `src/data/projects.ts`; names and punctuation are intentionally preserved.

Five resume-backed projects appear in the main manuscript index. Nine other supplied PDFs appear in the archive. Their titles and document types follow their filenames. Where the resume and filenames disagree, the site does not assume they are the same work.

Project buttons open a native modal dialog. It has Escape and backdrop close, focus containment, focus return, browser history support, a document selector where needed, a native PDF viewer, and download/new-tab links. Old `/projects/<slug>` links redirect to the matching dialog URL.

## Contact and analytics

The form POSTs JSON directly to `https://formspree.io/f/mdeadwwe` with `Accept: application/json`. It validates fields with Zod and React Hook Form, includes a Formspree honeypot, blocks repeated submission while pending, preserves inputs on failure, and shows success only after an HTTP success response. Confirm in the Formspree dashboard that this form ID is active and sends to the intended inbox. No live message is sent by the automated tests; responses are mocked.

Vercel Web Analytics and Speed Insights load in the root layout. Custom events are typed in `src/lib/analytics.ts` for navigation, project and PDF interactions, filters, experience expansion, and contact flow. Events contain only interaction metadata; no visitor or message content is sent. Vercel custom events may require a supported paid plan, while basic page views and Speed Insights remain integrated.

## Deploy to Vercel

1. Push this folder as a repository or set `Resumes/mufaq/Portofolio` as the Vercel project root.
2. Import it as a Next.js project. The build command is `npm run build`.
3. Set `NEXT_PUBLIC_SITE_URL=https://portofolio-muwafaq.vercel.app` if a URL override is needed. This is already the code fallback for metadata, sitemap, robots, and structured data.
4. Deploy, then verify the homepage, project dialog, PDF URL, `/sitemap.xml`, `/robots.txt`, and one real Formspree submission you initiate.

No server-side email key or Resend setup is required. The project is prepared for the requested domain but has not been deployed by this workspace task.

## Content and accessibility

The resume is the source for career claims. The site does not claim publication or production status for original concepts. PDF filenames and archive titles are transcribed from the supplied files. The illustration is an original inline SVG.

The design uses semantic sections, visible focus, a native dialog, reduced-motion styles, and mobile layouts. Animations use short entrance transitions and restrained ongoing motion; the PDF viewer loads only when a project is open. Performance scores and Core Web Vitals require measurement on the deployed site and are not guaranteed by local tests.
