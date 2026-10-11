import { notFound, redirect } from "next/navigation";
import { archiveWorks, projects } from "@/data/projects";

export function generateStaticParams() {
  return [...projects, ...archiveWorks].map(({ slug }) => ({ slug }));
}

export default async function LegacyProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (![...projects, ...archiveWorks].some((item) => item.slug === slug)) notFound();
  redirect(`/?project=${encodeURIComponent(slug)}#projects`);
}
