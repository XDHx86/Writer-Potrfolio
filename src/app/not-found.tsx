import Link from "next/link";
import Image from "next/image";
import wolfMark from "./icon.svg";

export default function NotFound() {
  return <main id="main" className="container not-found-page"><Image src={wolfMark} alt="Muwafaq Sami wolf mark" width={88} height={98}/><span className="eyebrow">404 / PAGE NOT FOUND</span><h1 className="section-title">The story<br/><em>moved on.</em></h1><p>This page could not be found.</p><div className="not-found-actions"><Link className="button button-primary" href="/">Return home</Link><Link className="button button-text" href="/#projects">Browse projects</Link></div></main>;
}
