export type ProjectDocument = { id: string; label: string; file: string; kind: "Premise" | "Glossary" | "Writing sample" };

export function documentUrl(document: ProjectDocument): string {
  return `/personal/${encodeURIComponent(document.file)}`;
}

export type Project = {
  slug: string;
  title: string;
  category: "Worldbuilding" | "Fiction" | "Horror";
  genre: string;
  format: string;
  number: string;
  accent: string;
  premise: string;
  objective: string;
  themes: string[];
  contribution: string;
  skills: string[];
  note: string;
  documents: ProjectDocument[];
};

export const projects: Project[] = [
  {
    slug: "the-fate-of-moramania", title: "The Fate of Moramania", category: "Worldbuilding", genre: "Epic fantasy", format: "Original story world", number: "01", accent: "ember",
    premise: "A fantasy kingdom shaped by supernatural species, hybrid lineage, magical artifacts, and intertwined character histories.",
    objective: "Give a large speculative setting a coherent internal logic that can support character-driven stories.",
    themes: ["Lineage", "Power", "Belonging"],
    contribution: "Created an eight-page reference glossary for species, magic systems, artifacts, relationships, and lore continuity.",
    skills: ["Worldbuilding", "Lore taxonomy", "Narrative continuity"], note: "Original portfolio concept; publication status is not claimed.",
    documents: [
      { id: "moramania-glossary", label: "World glossary", file: "Fate of Muramania Glossary .pdf", kind: "Glossary" },
      { id: "moramania-sample", label: "Writing sample", file: "Fate of Muramnia Sample.pdf", kind: "Writing sample" },
    ]
  },
  {
    slug: "earth-and-purgatory", title: "Earth & Purgatory", category: "Worldbuilding", genre: "Dark supernatural fantasy", format: "Long-form narrative concept", number: "02", accent: "violet",
    premise: "A morally complex protagonist moves through a world defined by human–monster conflict and the cost of power.",
    objective: "Explore ethical deterioration through a supernatural lens while keeping the central conflict personal.",
    themes: ["Identity", "Power", "Moral compromise"], contribution: "Developed the protagonist, central conflict, and long-form narrative premise.",
    skills: ["Character design", "Dark fantasy", "Story architecture"], note: "Original portfolio concept; publication status is not claimed.",
    documents: [{ id: "earth-purgatory-premise", label: "Story premise", file: "Earth and Purgatory Premise.pdf", kind: "Premise" }]
  },
  {
    slug: "wild-horses", title: "Wild Horses", category: "Fiction", genre: "Coming-of-age / literary fiction", format: "Story concept", number: "03", accent: "ochre",
    premise: "A Sudan-set story looks back through conversations in 2036, where memory and social observation reshape what can be known.",
    objective: "Use retrospective conversation and uncertain memory to build an intimate view of place and change.",
    themes: ["Memory", "Coming of age", "Perspective"], contribution: "Designed the setting, retrospective structure, and unreliable narrative perspective.",
    skills: ["Literary fiction", "Nonlinear structure", "Unreliable narration"], note: "Original portfolio concept; publication status is not claimed.",
    documents: [{ id: "wild-horses-premise", label: "Story premise", file: "Wild Horses Premise.pdf", kind: "Premise" }]
  },
  {
    slug: "what-remains-of-us", title: "What Remains of Us", category: "Fiction", genre: "Journal-format dark romance", format: "Story concept", number: "04", accent: "rose",
    premise: "An intimate first-person account of guarded characters, concealed histories, and the things they misread in each other.",
    objective: "Create emotional tension through restricted perspective and the gap between intention and interpretation.",
    themes: ["Identity", "Trust", "Misinterpretation"], contribution: "Built the first-person narrative approach and central character dynamics.",
    skills: ["Character arcs", "First-person voice", "Romance"], note: "Original portfolio concept; publication status is not claimed.",
    documents: [{ id: "what-remains-premise", label: "Story premise", file: "What remains of us premise.pdf", kind: "Premise" }]
  },
  {
    slug: "the-monster-in-the-woods", title: "The Monster in the Woods", category: "Horror", genre: "Psychological horror / mystery", format: "Story concept", number: "05", accent: "teal",
    premise: "A tightly framed mystery uses limited perspective and mounting danger to keep certainty just out of reach.",
    objective: "Build a compact suspense premise through controlled information and deliberate misdirection.",
    themes: ["Fear", "Perception", "Uncertainty"], contribution: "Developed the twist-oriented premise and limited-perspective suspense structure.",
    skills: ["Psychological horror", "Suspense", "Misdirection"], note: "Original portfolio concept; publication status is not claimed.",
    documents: [{ id: "monster-woods-premise", label: "Story premise", file: "The Monster In The Woods Premise.pdf", kind: "Premise" }]
  }
];

export type ArchiveWork = { slug: string; title: string; label: string; document: ProjectDocument; note: string };

// These documents are identified by their supplied filenames. No genre, credits, or publication history is inferred.
export const archiveWorks: ArchiveWork[] = [
  { slug: "dante", title: "Dante", label: "Writing sample", document: { id: "dante-sample", label: "Writing sample", file: "Dante Sample.pdf", kind: "Writing sample" }, note: "Additional sample named in the resume." },
  { slug: "love-kills", title: "Love Kills", label: "Writing sample", document: { id: "love-kills-sample", label: "Writing sample", file: "Love Kills Sample.pdf", kind: "Writing sample" }, note: "Additional sample named in the resume." },
  { slug: "one-last-caress", title: "One Last Caress", label: "Writing sample", document: { id: "one-last-caress-sample", label: "Writing sample", file: "One Last Caress Sample .pdf", kind: "Writing sample" }, note: "Additional sample named in the resume." },
  { slug: "got-to-be-real", title: "Got To Be Real", label: "Premise", document: { id: "got-to-be-real-premise", label: "Concept premise", file: "Got To Be Real Premise.pdf", kind: "Premise" }, note: "Script or visual narrative concept named in the resume." },
  { slug: "hybrid-moments", title: "Hybrid Moments", label: "Premise", document: { id: "hybrid-moments-premise", label: "Concept premise", file: "Hybrid Moments Premise.pdf", kind: "Premise" }, note: "Script or visual narrative concept named in the resume." },
  { slug: "invader", title: "INVADER", label: "Premise", document: { id: "invader-premise", label: "Concept premise", file: "INVADER Premise .pdf", kind: "Premise" }, note: "Script or visual narrative concept named in the resume." },
  { slug: "far-from-any-road", title: "Far from any road", label: "Premise", document: { id: "far-from-any-road-premise", label: "Concept premise", file: "Far from any road premise.pdf", kind: "Premise" }, note: "Supplied PDF; no further project details were provided." },
  { slug: "the-four-seasons", title: "The Four Seasons", label: "Premise", document: { id: "four-seasons-premise", label: "Concept premise", file: "The Four Seasons Premise.pdf", kind: "Premise" }, note: "Supplied PDF; no further project details were provided." },
  { slug: "containment-in-outer-space", title: "Containment In Outer Space", label: "Writing sample", document: { id: "containment-sample", label: "Writing sample", file: "Containment In Outer Space Sample.pdf", kind: "Writing sample" }, note: "Additional supplied writing sample." },
];

export const categories = ["All", "Worldbuilding", "Fiction", "Horror"] as const;
export type ProjectCategory = typeof categories[number];

export function filterProjects(items: Project[], category: ProjectCategory, query: string): Project[] {
  const term = query.trim().toLocaleLowerCase();
  return items.filter((project) => {
    const matchesCategory = category === "All" || project.category === category;
    const haystack = [project.title, project.category, project.genre, project.premise, ...project.themes].join(" ").toLocaleLowerCase();
    return matchesCategory && (!term || haystack.includes(term));
  });
}
