import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogPostIndex, getPostMetaBySlug } from "@/content/blog";

export function generateStaticParams() {
  return blogPostIndex.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostMetaBySlug(params.slug);
  if (!post) return {};

  const url = `https://www.noralixlabs.com/blog/${post.slug}`;
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      url,
      type: "article",
      publishedTime: post.meta.date,
      authors: ["Noralixlabs"],
    },
  };
}

async function loadPost(slug: string) {
  switch (slug) {
    case "ich-q1a-stability-studies-guide":
      return await import("@/content/blog/ich-q1a-stability-studies-guide.mdx");
    case "ctd-vs-ectd-dossier-guide":
      return await import("@/content/blog/ctd-vs-ectd-dossier-guide.mdx");
    case "tablet-formulation-development-process":
      return await import("@/content/blog/tablet-formulation-development-process.mdx");
    case "how-to-choose-pharmaceutical-cro":
      return await import("@/content/blog/how-to-choose-pharmaceutical-cro.mdx");
    case "analytical-method-validation-ich-q2":
      return await import("@/content/blog/analytical-method-validation-ich-q2.mdx");
    case "pharmaceutical-technology-transfer-guide":
      return await import("@/content/blog/pharmaceutical-technology-transfer-guide.mdx");
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostMetaBySlug(params.slug);
  if (!post) notFound();

  const mdxModule = await loadPost(params.slug);
  if (!mdxModule) notFound();
  const Component = mdxModule.default;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <header className="space-y-4">
        <div className="text-xs font-semibold tracking-[0.24em] text-[#00c4b4]">
          ARTICLE
        </div>
        <h1 className="text-balance font-[var(--font-serif)] text-5xl tracking-tight">
          {post.meta.title}
        </h1>
        <div className="text-sm text-black/55">{post.meta.date}</div>
        <p className="text-pretty text-base text-black/60">{post.meta.excerpt}</p>
      </header>

      <div className="prose prose-zinc mt-10 max-w-none prose-h2:font-[var(--font-serif)] prose-h2:tracking-tight prose-h3:tracking-tight prose-a:text-[#00a89a] prose-a:no-underline hover:prose-a:underline">
        <Component />
      </div>
    </article>
  );
}

