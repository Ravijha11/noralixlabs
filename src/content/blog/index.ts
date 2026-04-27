export type BlogPostMeta = {
  title: string;
  excerpt: string;
  date: string; // ISO date
  keyword: string;
  readingTimeMinutes?: number;
};

export type BlogPostIndexEntry = {
  slug: string;
  meta: BlogPostMeta;
};

export const blogPostIndex: BlogPostIndexEntry[] = [
  {
    slug: "ich-q1a-stability-studies-guide",
    meta: {
      title: "ICH Q1A(R2) Stability Studies: Complete Guide for Pharmaceutical Companies",
      excerpt:
        "A practical, regulatory-aligned guide to ICH Q1A(R2) stability studies—study designs, storage conditions, data expectations for CTD dossiers, and how a CRO should execute stability programs.",
      date: "2026-04-24",
      keyword: "ICH Q1A stability studies",
    },
  },
  {
    slug: "ctd-vs-ectd-dossier-guide",
    meta: {
      title: "CTD vs eCTD Dossier: Which Format Does Your Regulatory Filing Need?",
      excerpt:
        "Understand the practical difference between CTD and eCTD dossier formats, what regulators expect, and how to plan CTD/eCTD dossier preparation without rework across regions.",
      date: "2026-04-18",
      keyword: "CTD eCTD dossier preparation",
    },
  },
  {
    slug: "tablet-formulation-development-process",
    meta: {
      title: "Tablet Formulation Development: Step-by-Step Process Guide",
      excerpt:
        "A practical guide to tablet formulation development—from preformulation and excipient selection to granulation, compression, dissolution, stability, and tech transfer-ready documentation.",
      date: "2026-04-12",
      keyword: "tablet formulation development",
    },
  },
  {
    slug: "how-to-choose-pharmaceutical-cro",
    meta: {
      title: "How to Choose a Pharmaceutical CRO: 7 Critical Questions to Ask",
      excerpt:
        "A decision framework for selecting a pharmaceutical CRO in India—what to ask about ICH alignment, data integrity, method validation, stability execution, and dossier-ready deliverables.",
      date: "2026-04-06",
      keyword: "pharmaceutical CRO India",
    },
  },
  {
    slug: "analytical-method-validation-ich-q2",
    meta: {
      title: "Analytical Method Validation per ICH Q2(R1): Complete Checklist",
      excerpt:
        "A practical checklist for analytical method validation under ICH Q2(R1)—what to validate, how to justify acceptance criteria, and how to keep methods stability-indicating and dossier-ready.",
      date: "2026-03-30",
      keyword: "analytical method validation ICH Q2",
    },
  },
  {
    slug: "pharmaceutical-technology-transfer-guide",
    meta: {
      title: "Pharmaceutical Technology Transfer: Process, Documentation & Best Practices",
      excerpt:
        "A practical guide to pharmaceutical technology transfer—what to document, how to manage process knowledge, and how to move from development to commercial manufacturing with fewer deviations.",
      date: "2026-03-22",
      keyword: "pharmaceutical technology transfer",
    },
  },
].sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

export function getPostMetaBySlug(slug: string) {
  return blogPostIndex.find((p) => p.slug === slug) ?? null;
}

