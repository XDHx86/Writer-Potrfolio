"use client";

import Link from "next/link";
import { CopyButton } from "@/components/copy-button";

export function ResumeActions({ url }: { url: string }) {
  return <nav className="resume-actions" aria-label="Resume document actions">
    <Link href="/">← Portfolio</Link>
    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">View PDF</a>
    <a href="/resume.pdf" download="Muwafaq-Sami-Resume.pdf">Download PDF</a>
    <a href="/resume.md">View Markdown</a>
    <a href="/resume.md" download="Muwafaq-Sami-Resume.md">Download Markdown</a>
    <button type="button" onClick={() => window.print()}>Print</button>
    <CopyButton value={url} label="Copy resume URL" />
  </nav>;
}
