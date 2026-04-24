import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://noralixlabs.com";

  const routes = [
    "/",
    "/services",
    "/dosage-forms",
    "/quality",
    "/capabilities",
    "/about",
    "/contact",
    "/rfq",
    "/privacy",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

