export function siteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  return new URL(configured || "https://portofolio-muwafaq.vercel.app");
}
