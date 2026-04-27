import type { ComponentType } from "react";

import Post1, { meta as meta1 } from "./ich-q1a-stability-studies-guide.mdx";
import Post2, { meta as meta2 } from "./ctd-vs-ectd-dossier-guide.mdx";
import Post3, { meta as meta3 } from "./tablet-formulation-development-process.mdx";
import Post4, { meta as meta4 } from "./how-to-choose-pharmaceutical-cro.mdx";
import Post5, { meta as meta5 } from "./analytical-method-validation-ich-q2.mdx";
import Post6, { meta as meta6 } from "./pharmaceutical-technology-transfer-guide.mdx";

export type BlogPostMeta = {
  title: string;
  excerpt: string;
  date: string; // ISO date
  keyword: string;
  readingTimeMinutes?: number;
};

export type BlogPost = {
  slug: string;
  meta: BlogPostMeta;
  Component: ComponentType;
};

export const blogPosts: BlogPost[] = [
  { slug: "ich-q1a-stability-studies-guide", meta: meta1, Component: Post1 },
  { slug: "ctd-vs-ectd-dossier-guide", meta: meta2, Component: Post2 },
  { slug: "tablet-formulation-development-process", meta: meta3, Component: Post3 },
  { slug: "how-to-choose-pharmaceutical-cro", meta: meta4, Component: Post4 },
  { slug: "analytical-method-validation-ich-q2", meta: meta5, Component: Post5 },
  { slug: "pharmaceutical-technology-transfer-guide", meta: meta6, Component: Post6 },
].sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

