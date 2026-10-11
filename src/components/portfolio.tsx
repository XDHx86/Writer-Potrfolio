"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Mail, Menu, Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/contact";
import { profile, highlights, education, languages } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { experience } from "@/data/experience";
import { archiveWorks, categories, filterProjects, projects, type ProjectCategory } from "@/data/projects";
import { ProjectDialog } from "@/components/project-dialog";
import { Wolf } from "@/components/wolf";
import { recordEvent } from "@/lib/analytics";

const navigation = [
  { id: "about", label: "About" }, { id: "expertise", label: "Expertise" }, { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" }, { id: "contact", label: "Contact" },
] as const;

function Eyebrow({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="eyebrow"><span>{number}</span><span className="eyebrow-line"/><span>{children}</span></div>;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: reduced ? 0 : 0.35, delay }}>{children}</motion.div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.5] });
    navigation.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? (window.scrollY / available) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    if (!open) return;
    mobileNav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return <header className="site-header">
    <div className="header-inner container">
      <a href="#top" className="brand" aria-label="Muwafaq Sami, back to top"><span className="brand-mark">M<span>.</span></span><span className="brand-name">MUWAFAQ<br/>SAMI</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(({ id, label }) => <a key={id} href={`#${id}`} className={active === id ? "nav-active" : ""} aria-current={active === id ? "location" : undefined} onClick={() => recordEvent("navigation_click", { section: id })}>{label}</a>)}</nav>
      <a className="header-contact" href="#contact" onClick={() => recordEvent("contact_cta_click", { location: "header" })}>Let&apos;s talk <ArrowUpRight size={16}/></a>
      <button ref={menuButton} className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={24}/> : <Menu size={24}/>}</button>
    </div>
    <nav ref={mobileNav} id="mobile-menu" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation" inert={!open}>{navigation.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => { setOpen(false); recordEvent("navigation_click", { section: id }); }}>{label}<ArrowUpRight size={17}/></a>)}</nav>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
  </header>;
}

function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const interval = window.setInterval(() => { if (!document.hidden) setTitleIndex((index) => (index + 1) % profile.titles.length); }, 2700);
    return () => window.clearInterval(interval);
  }, [reduced]);
  return <section id="top" className="hero">
    <div className="hero-grain" aria-hidden="true"/>
    <div className="container hero-grid">
      <div className="hero-copy">
        <motion.div className="hero-kicker" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}><span className="red-dot"/>INDEPENDENT CREATIVE PRACTICE <span className="kicker-rule"/></motion.div>
        <div className="hero-title-mask"><motion.h1 aria-label="Muwafaq Sami" initial={reduced ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: .85, ease: [0.22, 1, 0.36, 1] }}>Muwafaq<br/><em>Sami.</em></motion.h1></div>
        <div className="title-frame" aria-label={`Professional title: ${profile.titles[titleIndex]}`}>
          <AnimatePresence mode="wait" initial={false}><motion.p key={titleIndex} initial={reduced ? false : { y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduced ? { opacity: 0 } : { y: -22, opacity: 0 }} transition={{ duration: reduced ? 0 : .28 }}>{profile.titles[titleIndex]}</motion.p></AnimatePresence>
          <span className="title-count">0{titleIndex + 1} / 0{profile.titles.length}</span>
        </div>
        <motion.p className="hero-description" initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .2 }}>{profile.description}</motion.p>
        <motion.div className="hero-actions" initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .3 }}><a className="button button-primary" href="#projects" onClick={() => recordEvent("navigation_click", { section: "projects" })}>Explore my work <ArrowUpRight size={18}/></a><a className="button button-text" href="#contact" onClick={() => recordEvent("contact_cta_click", { location: "hero" })}>Contact me <ArrowRight size={18}/></a></motion.div>
      </div>
      <motion.div className="hero-art" initial={reduced ? false : { opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .2 }}>
        <div className="hero-art-ring ring-one"/><div className="hero-art-ring ring-two"/><div className="hero-art-ring ring-three"/>
        <span className="art-side-label">THE ART OF THE UNWRITTEN</span><Wolf className="hero-wolf"/><span className="art-corner">FIG. 01 <span>THE STORYTELLER</span></span>
      </motion.div>
    </div>
    <div className="container hero-bottom"><span>SCROLL TO DISCOVER <ArrowDown size={15}/></span><span>FICTION / SCREEN / STORY WORLDS</span></div>
  </section>;
}

function About() {
  return <section id="about" className="section section-about"><div className="container">
    <Eyebrow number="01">THE PERSON BEHIND THE PAGE</Eyebrow>
    <div className="about-grid"><Reveal><h2 className="section-title" aria-label="A good story leaves a mark.">A good story<br/>leaves a <em>mark.</em></h2></Reveal><Reveal className="about-prose" delay={.08}><p className="lead">I write where character, atmosphere, and structure meet.</p><p>My work spans long-form ghostwriting, theatrical scripts, original fiction, EPUB editing, and audience-aware short-form content. Across formats, I build psychologically detailed characters and worlds with rules that hold.</p><p>From the cadence of a line of dialogue to the architecture of a fantasy setting, I look for the detail that makes a story feel lived in.</p><div className="about-signature">“Stories with a pulse. Worlds with a memory.”</div></Reveal></div>
    <div className="highlight-grid">{highlights.map((item, index) => <Reveal key={item.label} className="highlight-card" delay={index * .06}><span className="highlight-number">{item.value}<small>{item.unit}</small></span><p>{item.label}</p><span className="highlight-note">{item.note}</span></Reveal>)}</div>
  </div></section>;
}

function Expertise() {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const matches = skillCategories.flatMap((group) => group.skills.map((skill) => ({ skill, category: group.name }))).filter(({ skill, category: group }) => (category === "All" || category === group) && skill.toLowerCase().includes(query.toLowerCase().trim()));
  return <section id="expertise" className="section section-expertise"><div className="container">
    <Eyebrow number="02">HOW I BUILD A STORY</Eyebrow><div className="section-heading-row"><Reveal><h2 className="section-title" aria-label="The craft behind the work.">The craft<br/><em>behind the work.</em></h2></Reveal><p className="section-intro">Four connected disciplines. One approach: make every choice serve the story.</p></div>
    <div className="filter-bar"><div className="filter-pills" aria-label="Filter skills by discipline">{["All", ...skillCategories.map((item) => item.name)].map((item) => <button type="button" className={`filter-pill ${category === item ? "selected" : ""}`} aria-pressed={category === item} onClick={() => { setCategory(item); recordEvent("skill_category_select", { category: item }); }} key={item}>{item}</button>)}</div><label className="search-field"><Search size={17}/><span className="sr-only">Search skills</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search skills" type="search"/></label></div>
    <div className="skills-grid" aria-live="polite">{matches.length ? matches.map(({ skill, category: group }, index) => <div key={`${group}-${skill}`} className="skill-card"><span className="skill-index">{String(index + 1).padStart(2, "0")}</span><span>{skill}</span><span className="skill-group">{group}</span></div>) : <p className="empty-state">No skills match that search. Try a different term.</p>}</div>
  </div></section>;
}

function Experience() {
  return <section id="experience" className="section section-experience"><div className="container">
    <Eyebrow number="03">THE PATH SO FAR</Eyebrow><div className="section-heading-row"><Reveal><h2 className="section-title" aria-label="Words at work.">Words at<br/><em>work.</em></h2></Reveal><p className="section-intro">A practice shaped by fiction, scripts, digital publishing, and content for real audiences.</p></div>
    <div className="timeline">{experience.map((entry, index) => <Reveal key={`${entry.organization}-${entry.period}`} className="timeline-row" delay={Math.min(index * .04, .2)}><div className="timeline-date"><span className="timeline-node"/>{entry.period}</div><details className="experience-card" onToggle={(event) => { if (event.currentTarget.open) recordEvent("experience_expand", { role: entry.role }); }}><summary><span className="experience-main"><span className="experience-overline">{entry.organization} <span>· {entry.location}</span></span><strong>{entry.role}</strong><span className="experience-summary">{entry.summary}</span></span><ChevronDown className="experience-chevron" size={20}/></summary><div className="experience-expanded"><ul>{entry.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><div className="tag-row">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></details></Reveal>)}</div>
  </div></section>;
}

export function Work() {
  const [category, setCategory] = useState<ProjectCategory>("All");
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const visible = filterProjects(projects, category, query);
  useEffect(() => {
    const sync = () => {
      const value = new URL(window.location.href).searchParams.get("project");
      setActiveSlug([...projects, ...archiveWorks].some((item) => item.slug === value) ? value : null);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const openProject = (slug: string, element?: HTMLElement) => {
    if (element) opener.current = element;
    const item = projects.find((project) => project.slug === slug);
    recordEvent("project_open", { project: slug, category: item?.category ?? "Archive" });
    const url = new URL(window.location.href);
    url.searchParams.set("project", slug);
    window.history.pushState({ project: slug }, "", url);
    setActiveSlug(slug);
  };
  const closeProject = () => {
    if (activeSlug) recordEvent("project_close", { project: activeSlug });
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.replaceState({}, "", url);
    setActiveSlug(null);
    window.requestAnimationFrame(() => opener.current?.focus());
  };
  return <section id="projects" aria-labelledby="projects-heading" className="section section-projects"><div className="container">
    <Eyebrow number="04">THE STORY INDEX</Eyebrow><div className="section-heading-row"><Reveal><h2 id="projects-heading" className="section-title" aria-label="Stories in the making.">Stories in<br/><em>the making.</em></h2></Reveal><p className="section-intro">Five selected worlds, with the original documents close at hand. Open a title to read the work.</p></div>
    <div className="filter-bar"><div className="filter-pills" aria-label="Filter projects by category">{categories.map((item) => <button type="button" className={`filter-pill ${category === item ? "selected" : ""}`} aria-pressed={category === item} onClick={() => { setCategory(item); recordEvent("project_filter_change", { category: item }); }} key={item}>{item}</button>)}</div><label className="search-field"><Search size={17}/><span className="sr-only">Search projects</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" type="search"/></label></div>
    <div className="manuscript-list" aria-live="polite">{visible.length ? visible.map((project) => <button className={`manuscript-row manuscript-${project.accent}`} type="button" key={project.slug} onClick={(event) => openProject(project.slug, event.currentTarget)}><span className="manuscript-number">{project.number} / 05</span><span className="manuscript-main"><span className="manuscript-category">{project.category} · {project.genre}</span><strong>{project.title}</strong><span className="manuscript-premise">{project.premise}</span></span><span className="manuscript-ornament" aria-hidden="true">{project.title.charAt(0)}</span><ArrowUpRight className="manuscript-arrow" size={25}/></button>) : <p className="empty-state">No projects match your search. Clear a filter to see more work.</p>}</div>
    <div className="archive-heading"><span>THE ARCHIVE</span><p>More premises and writing samples from the supplied collection.</p></div><div className="archive-list">{archiveWorks.map((item, index) => <button type="button" className="archive-row" key={item.slug} onClick={(event) => openProject(item.slug, event.currentTarget)}><span>{String(index + 6).padStart(2, "0")}</span><strong>{item.title}</strong><small>{item.label}</small><ArrowUpRight size={17}/></button>)}</div>
    <p className="projects-note">Portfolio concepts and supplied documents. Publication or production status is not implied.</p>
    {activeSlug && <ProjectDialog key={activeSlug} slug={activeSlug} onClose={closeProject} onNavigate={openProject}/>}
  </div></section>;
}

function Education() {
  return <section id="education" className="section section-education"><div className="container education-grid"><div><Eyebrow number="05">FOUNDATIONS</Eyebrow><Reveal><h2 className="section-title" aria-label="Always learning.">Always<br/><em>learning.</em></h2></Reveal></div><div className="education-content"><h3>Education</h3>{education.map((item) => <div className="education-item" key={item.school}><span>{item.date}</span><strong>{item.school}</strong><p>{item.detail}</p></div>)}<h3 className="language-title">Languages</h3><div className="language-list">{languages.map((item) => <div key={item.name}><strong>{item.name}</strong><span>{item.level}</span></div>)}</div></div></div></section>;
}

function Contact() {
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [started, setStarted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: { name: "", email: "", subject: "", message: "", website: "" } });
  const onSubmit = async (values: ContactInput) => {
    setStatus(null);
    recordEvent("contact_form_submit_attempt", {});
    try {
      const response = await fetch("https://formspree.io/f/mdeadwwe", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ name: values.name, email: values.email, subject: values.subject, message: values.message, _gotcha: values.website || "" }) });
      if (response.ok) { setStatus({ type: "success", text: "Message sent. Thank you for reaching out." }); recordEvent("contact_form_submit_success", {}); reset(); setStarted(false); }
      else { setStatus({ type: "error", text: response.status === 429 ? "Too many messages right now. Please try again later or email me directly." : "Your message could not be sent. Please try again or email me directly." }); recordEvent("contact_form_submit_failure", { reason: String(response.status) }); }
    } catch { setStatus({ type: "error", text: "Connection failed. Please try again or email me directly." }); recordEvent("contact_form_submit_failure", { reason: "network" }); }
  };
  const onInvalid = (formErrors: typeof errors) => recordEvent("contact_form_validation_error", { count: Object.keys(formErrors).length });
  const onStart = (field: string) => { if (!started) { setStarted(true); recordEvent("contact_form_start", { field }); } };
  return <section id="contact" className="section section-contact"><div className="container"><Eyebrow number="06">START A CONVERSATION</Eyebrow><div className="contact-grid"><Reveal><h2 className="section-title" aria-label="Have a story in mind?">Have a story<br/><em>in mind?</em></h2><p className="contact-intro">For writing, narrative development, scripts, or a conversation about a new idea, send a note.</p><a className="contact-email" href={`mailto:${profile.email}`} onClick={() => recordEvent("contact_cta_click", { location: "contact" })}><Mail size={19}/>{profile.email}<ArrowUpRight size={18}/></a><div className="contact-details"><span>{profile.location}</span><a href={`tel:${profile.phoneHref}`}>{profile.phoneDisplay}</a></div></Reveal><Reveal className="contact-form-wrap" delay={.08}><form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate onFocusCapture={(event) => { const field = (event.target as HTMLElement).getAttribute("name"); if (field && field !== "website") onStart(field); }}><div className="form-row"><label>Your name <input autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "error-name" : undefined} {...register("name")}/>{errors.name && <span id="error-name" className="field-error">{errors.name.message}</span>}</label><label>Email address <input type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "error-email" : undefined} {...register("email")}/>{errors.email && <span id="error-email" className="field-error">{errors.email.message}</span>}</label></div><label>Subject <input aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "error-subject" : undefined} {...register("subject")}/>{errors.subject && <span id="error-subject" className="field-error">{errors.subject.message}</span>}</label><label>Message <textarea rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "error-message" : undefined} {...register("message")}/>{errors.message && <span id="error-message" className="field-error">{errors.message.message}</span>}</label><label className="honeypot" aria-hidden="true">Website <input tabIndex={-1} autoComplete="off" {...register("website")}/></label><div className="form-bottom"><p>Your message is used only to reply to your enquiry.</p><button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send message"} {isSubmitting ? null : <ArrowUpRight size={18}/>}</button></div>{status && <p className={`form-status status-${status.type}`} role="status">{status.type === "success" && <Check size={18}/>} {status.text}</p>}</form></Reveal></div></div></section>;
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><a className="footer-mark" href="#top">M<span>.</span></a><p>Story, character, atmosphere.<br/>Written to stay with you.</p><div className="footer-links"><a href="#top">Back to top ↑</a><a href={`mailto:${profile.email}`}>Email ↗</a></div><span className="copyright">© {new Date().getFullYear()} Muwafaq Sami</span></div></footer>;
}

export function Portfolio() {
  return <><Header/><main id="main"><Hero/><About/><Expertise/><Experience/><Work/><Education/><Contact/></main><Footer/></>;
}
