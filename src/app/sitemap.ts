import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: base.toString(), changeFrequency: "monthly", priority: 1 },
    { url: new URL("/resume", base).toString(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
