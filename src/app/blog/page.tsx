import Link from "next/link";
import type { Metadata } from "next";

import { blogPostIndex } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical pharma CRO insights from Noralixlabs — ICH stability studies, CTD/eCTD dossiers, analytical validation, formulation development, and technology transfer.",
  alternates: { canonical: "https://www.noralixlabs.com/blog" },
  openGraph: {
    title: "Noralixlabs Blog",
    description:
      "Long-form guides on pharmaceutical development: ICH, CTD/eCTD, analytical validation, formulation, and technology transfer.",
    url: "https://www.noralixlabs.com/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <div className="text-xs font-semibold tracking-[0.24em] text-[#00c4b4]">
          BLOG
        </div>
        <h1 className="text-balance font-[var(--font-serif)] text-5xl tracking-tight">
          Pharmaceutical development guides & checklists
        </h1>
        <p className="max-w-2xl text-black/55">
          Written for pharma professionals — technical, practical, and aligned to
          ICH expectations.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {blogPostIndex.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card group p-7 transition hover:-translate-y-0.5"
          >
            <div className="text-xs text-black/50">{post.meta.date}</div>
            <div className="mt-2 text-lg font-semibold text-[#0b1a14]">
              {post.meta.title}
            </div>
            <div className="mt-3 text-sm text-black/55">{post.meta.excerpt}</div>
            <div className="mt-5 text-sm font-medium text-[#00a89a]">
              Read article →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

