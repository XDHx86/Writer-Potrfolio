import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteUrl } from "@/lib/site-url";
import { profile } from "@/data/profile";
import { CommandPalette } from "@/components/command-palette";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: `${profile.name} — Writer & Narrative Designer`, template: `%s | ${profile.name}` },
  description: profile.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: `${profile.name} — Writer & Narrative Designer`, description: profile.description, siteName: profile.name },
  twitter: { card: "summary_large_image", title: `${profile.name} — Writer & Narrative Designer`, description: profile.description, images: ["/opengraph-image.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#100d11", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main">Skip to content</a>{children}<CommandPalette/><Analytics /><SpeedInsights /></body></html>;
}
