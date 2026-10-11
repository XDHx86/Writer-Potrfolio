"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { archiveWorks, documentUrl, projects, type ArchiveWork, type Project, type ProjectDocument } from "@/data/projects";
import { recordEvent } from "@/lib/analytics";

type WorkItem = Project | ArchiveWork;
const allWorks: WorkItem[] = [...projects, ...archiveWorks];
const isFeatured = (item: WorkItem): item is Project => "documents" in item;

function PdfViewer({ item, selectedDocument }: { item: WorkItem; selectedDocument: ProjectDocument }) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    let cancelled = false;
    fetch(documentUrl(selectedDocument), { method: "HEAD" }).then((response) => {
      if (!cancelled) setState(response.ok ? "ready" : "error");
    }).catch(() => { if (!cancelled) setState("error"); });
    return () => { cancelled = true; };
  }, [selectedDocument]);
  return <div className="pdf-frame">{state === "loading" && <p className="pdf-message" role="status">Opening the document…</p>}{state === "error" && <p className="pdf-message" role="alert">This document could not be loaded. Try the download link.</p>}{state === "ready" && <iframe src={`${documentUrl(selectedDocument)}#toolbar=1`} title={`${item.title} — ${selectedDocument.label}`} onLoad={() => recordEvent("project_pdf_view", { project: item.slug, document: selectedDocument.id })}/>}</div>;
}

export function ProjectDialog({ slug, onClose, onNavigate }: { slug: string; onClose: () => void; onNavigate: (slug: string) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [documentIndex, setDocumentIndex] = useState(0);
  const item = allWorks.find((work) => work.slug === slug);
  const documents = item ? (isFeatured(item) ? item.documents : [item.document]) : [];
  const selectedDocument = documents[documentIndex] ?? documents[0];
  const itemIndex = item ? allWorks.findIndex((work) => work.slug === item.slug) : -1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const body = window.document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => { dialog.close(); body.style.overflow = previousOverflow; };
  }, []);

  if (!item || !selectedDocument) return null;
  const navigate = (offset: number) => onNavigate(allWorks[(itemIndex + offset + allWorks.length) % allWorks.length].slug);
  const pdfAction = (name: "project_pdf_download" | "project_pdf_external_open") => recordEvent(name, { project: item.slug, document: selectedDocument.id });

  return <dialog ref={dialogRef} className="project-dialog" aria-labelledby="dialog-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}>
    <div className="dialog-shell"><div className="dialog-topline"><span>THE MANUSCRIPT / {String(itemIndex + 1).padStart(2, "0")}</span><span>SELECTED WORK</span><button type="button" className="dialog-close" onClick={onClose} aria-label="Close project"><X size={21}/></button></div>
      <div className="dialog-body"><div className="dialog-story"><p className="dialog-overline">{isFeatured(item) ? `${item.category} / ${item.genre}` : item.label}</p><h2 id="dialog-title">{item.title}</h2>
        {isFeatured(item) ? <><p className="dialog-premise">{item.premise}</p><div className="dialog-facts"><div><span>THE IDEA</span><p>{item.objective}</p></div><div><span>THE WORK</span><p>{item.contribution}</p></div></div><p className="dialog-note">{item.note}</p></> : <p className="dialog-premise">{item.note}</p>}
        {documents.length > 1 && <div className="document-switcher" aria-label="Choose document">{documents.map((doc, index) => <button key={doc.id} type="button" className={index === documentIndex ? "selected" : ""} aria-pressed={index === documentIndex} onClick={() => setDocumentIndex(index)}>{doc.label}</button>)}</div>}
        <div className="document-actions"><a href={documentUrl(selectedDocument)} download={selectedDocument.file} onClick={() => pdfAction("project_pdf_download")}>Download PDF <ArrowDownToLine size={16}/></a><a href={documentUrl(selectedDocument)} target="_blank" rel="noopener noreferrer" onClick={() => pdfAction("project_pdf_external_open")}>Open in new tab <ArrowUpRight size={16}/></a></div>
      </div><div className="pdf-panel"><div className="pdf-heading"><span>ATTACHED DOCUMENT</span><span>{selectedDocument.kind} · PDF</span></div><PdfViewer key={selectedDocument.id} item={item} selectedDocument={selectedDocument}/></div></div>
      <div className="dialog-footer"><button type="button" onClick={() => navigate(-1)}><ArrowLeft size={16}/> Previous work</button><span>{String(itemIndex + 1).padStart(2, "0")} / {String(allWorks.length).padStart(2, "0")}</span><button type="button" onClick={() => navigate(1)}>Next work <ArrowRight size={16}/></button></div>
    </div>
  </dialog>;
}
