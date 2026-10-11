import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { ResumeActions } from "@/components/resume-actions";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name}, creative writer, screenwriter, and narrative designer. Experience, writing projects, skills, and education.`,
  alternates: { canonical: "/resume" },
  openGraph: { type: "profile", url: "/resume", title: `${profile.name} — Resume`, description: profile.description, images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: `${profile.name} beside the portfolio wolf mascot` }] },
};

type Block = { kind: "heading" | "paragraph" | "list"; text?: string; level?: number; items?: string[] };

function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  for (let index = 0; index < lines.length;) {
    const line = lines[index].trim();
    if (!line) { index++; continue; }
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) { blocks.push({ kind: "heading", level: heading[1].length, text: heading[2] }); index++; continue; }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) items.push(lines[index++].trim().slice(2));
      blocks.push({ kind: "list", items });
      continue;
    }
    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() && !/^#{1,3}\s/.test(lines[index]) && !lines[index].trim().startsWith("- ")) paragraph.push(lines[index++].trim());
    blocks.push({ kind: "paragraph", text: paragraph.join("\n") });
  }
  return blocks;
}

function inline(text: string): React.ReactNode[] {
  const expression = /(\[[^\]]+\]\(https?:\/\/[^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(expression)) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("[")) {
      const [, label, href] = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/.exec(token)!;
      parts.push(<a href={href} key={match.index} target="_blank" rel="noopener noreferrer">{label}</a>);
    } else if (token.startsWith("**")) parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
    else parts.push(<em key={match.index}>{token.slice(1, -1)}</em>);
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function renderText(text: string) {
  return text.split("\n").map((line, index) => <span key={index}>{index > 0 && <br/>}{inline(line)}</span>);
}

export default function ResumePage() {
  const markdown = readFileSync(join(process.cwd(), "public", "resume.md"), "utf8");
  const blocks = parseBlocks(markdown);
  const url = new URL("/resume", siteUrl()).toString();
  return <main id="main" className="resume-page">
    <div className="resume-shell">
      <ResumeActions url={url} />
      <article className="resume-document" aria-label={`${profile.name} resume`}>
        <div className="resume-masthead"><span>CURRICULUM VITAE / MUWAFAQ SAMI</span><span>WRITING · SCREEN · STORY WORLDS</span></div>
        {blocks.map((block, index) => {
          if (block.kind === "heading") {
            if (block.level === 1) return <h1 key={index}>{block.text}</h1>;
            return <h2 key={index}>{block.text}</h2>;
          }
          if (block.kind === "list") return <ul key={index}>{block.items?.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ul>;
          return <p key={index} className={index < 3 ? "resume-intro" : undefined}>{renderText(block.text ?? "")}</p>;
        })}
      </article>
    </div>
  </main>;
}
