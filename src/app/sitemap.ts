import type { MetadataRoute } from "next";
import { blogPostIndex } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.noralixlabs.com";

  const routes = [
    "/",
    "/services",
    "/expertise",
    "/dosage-forms",
    "/quality",
    "/capabilities",
    "/about",
    "/contact",
    "/rfq",
    "/privacy",
    "/blog",
  ];

  const now = new Date();

  const staticEntries = routes.map((path) => {
    const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
      path === "/" ? "weekly" : "monthly";

    return {
      url: new URL(path, siteUrl).toString(),
      lastModified: now,
      changeFrequency,
      priority: path === "/" ? 1 : 0.7,
    };
  });

  const blogEntries = blogPostIndex.map((p) => ({
    url: new URL(`/blog/${p.slug}`, siteUrl).toString(),
    lastModified: new Date(p.meta.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}

