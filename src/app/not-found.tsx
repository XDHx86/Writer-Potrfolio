import Link from "next/link";

export default function NotFound() {
  return <main id="main" className="container" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}><span className="eyebrow">404 / PAGE NOT FOUND</span><h1 className="section-title">The story<br/><em>moved on.</em></h1><p style={{ color: "#a8a8b3" }}>This page could not be found.</p><Link className="button button-primary" href="/" style={{ alignSelf: "flex-start" }}>Return home</Link></main>;
}
