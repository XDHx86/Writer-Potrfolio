"use client";

import { useEffect, useRef, useState } from "react";
import { archiveWorks, projects } from "@/data/projects";

const commands = [
  { label: "About", href: "/#about", keywords: "person biography" },
  { label: "Skills", href: "/#expertise", keywords: "expertise craft" },
  { label: "Projects", href: "/#projects", keywords: "work writing" },
  { label: "Contact", href: "/#contact", keywords: "email form" },
  { label: "Open resume", href: "/resume", keywords: "cv experience" },
  { label: "View resume PDF", href: "/resume.pdf", keywords: "document" },
  { label: "Download resume PDF", href: "/resume.pdf", keywords: "save document", download: true },
  { label: "Search projects", href: "/#projects", keywords: "find work" },
  ...[...projects, ...archiveWorks].map((project) => ({ label: project.title, href: `/?project=${project.slug}#projects`, keywords: `project ${"genre" in project ? project.genre : project.label}` })),
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        returnFocus.current = document.activeElement as HTMLElement;
        setOpen(true);
      }
    };
    const external = () => { returnFocus.current = document.activeElement as HTMLElement; setOpen(true); };
    window.addEventListener("keydown", keyboard);
    window.addEventListener("open-command-palette", external);
    return () => { window.removeEventListener("keydown", keyboard); window.removeEventListener("open-command-palette", external); };
  }, []);

  useEffect(() => {
    if (open) { dialog.current?.showModal(); input.current?.focus(); }
    else if (dialog.current?.open) { dialog.current.close(); returnFocus.current?.focus(); }
  }, [open]);

  const matches = commands.filter((command) => `${command.label} ${command.keywords}`.toLowerCase().includes(query.toLowerCase().trim()));
  const close = () => { setOpen(false); setQuery(""); };

  return <dialog ref={dialog} className="command-dialog" aria-labelledby="command-heading" onCancel={(event) => { event.preventDefault(); close(); }} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); close(); } }} onClick={(event) => { if (event.target === dialog.current) close(); }}>
    <div className="command-shell">
      <div className="command-head"><h2 id="command-heading">Go to…</h2><button type="button" onClick={close} aria-label="Close command palette">Esc</button></div>
      <label className="command-search"><span className="sr-only">Search commands and projects</span><input ref={input} type="search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && matches[0]) { event.preventDefault(); document.getElementById("command-first")?.click(); } }} placeholder="Search pages, projects, actions…" autoComplete="off" /></label>
      <div className="command-results" aria-label="Available commands">{matches.length ? matches.map((command, index) => <a id={index === 0 ? "command-first" : undefined} key={`${command.label}-${index}`} href={command.href} download={"download" in command ? "Muwafaq-Sami-Resume.pdf" : undefined} onClick={close}><span>{command.label}</span><span aria-hidden="true">↗</span></a>) : <p>No matching commands.</p>}</div>
      <p className="command-hint">Ctrl+K / ⌘K to open · Escape to close</p>
    </div>
  </dialog>;
}
