"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="main" className="container error-page" role="alert">
    <span className="eyebrow">A PAGE COULD NOT OPEN</span>
    <h1 className="section-title">A pause in<br/><em>the story.</em></h1>
    <p>Something went wrong while opening this page. Please try again.</p>
    <div className="not-found-actions"><button type="button" className="button button-primary" onClick={reset}>Try again</button><Link className="button button-text" href="/">Return home</Link></div>
  </main>;
}
