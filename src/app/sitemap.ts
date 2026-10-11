import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [{ url: base.toString(), changeFrequency: "monthly", priority: 1 }];
}
