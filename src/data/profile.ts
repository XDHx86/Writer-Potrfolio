export const profile = {
  name: "Muwafaq Sami",
  initials: "MS",
  titles: ["Creative Writer", "Screenwriter", "Narrative Designer"],
  email: "muwafaqsami.sp@gmail.com",
  phoneDisplay: "+968 9097 7315",
  phoneHref: "+96890977315",
  location: "Working remotely",
  introduction: "Stories with a pulse. Worlds with a memory.",
  description: "Creative writer, screenwriter, and narrative designer developing character-led fiction, dramatic scripts, and carefully built story worlds.",
} as const;

export const highlights = [
  { value: "420", unit: "pages", label: "Client-directed contemporary novel ghostwritten", note: "Page count from applicant resume" },
  { value: "1", unit: "stage play", label: "Client-commissioned theatre script developed", note: "Commission reported in resume" },
  { value: "8", unit: "pages", label: "Lore glossary for The Fate of Moramania", note: "Reference document reported in resume" },
] as const;

export const education = [
  { school: "Arab Academy for Science, Technology & Maritime Transport", detail: "Art & Design · In progress", date: "2026 — present" },
  { school: "Alexandria University, Faculty of Fine Arts", detail: "Sculpture studies · Not completed", date: "Earlier studies" },
] as const;

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Bilingual" },
  { name: "German", level: "B1" },
] as const;
