import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteUrl } from "@/lib/site-url";
import { profile } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: `${profile.name} — Writer & Narrative Designer`, template: `%s | ${profile.name}` },
  description: profile.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: `${profile.name} — Writer & Narrative Designer`, description: profile.description, siteName: profile.name, images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: `${profile.name} — Writer & Narrative Designer`, description: profile.description, images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#100d11", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main">Skip to content</a>{children}<Analytics /><SpeedInsights /></body></html>;
}
