import { Portfolio } from "@/components/portfolio";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site-url";

export default function Home() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: [...profile.titles],
    description: profile.description,
    email: `mailto:${profile.email}`,
    url: siteUrl().toString(),
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}/><Portfolio /></>;
}
