export type Service = {
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
};

export type DosageForm = {
  slug: string;
  title: string;
  summary: string;
  examples: string[];
};

export const services: Service[] = [
  {
    slug: "formulation-development",
    title: "Formulation development & optimization",
    summary:
      "Development and optimization tailored to target product profile, manufacturability, and cost objectives.",
    highlights: [
      "QTPP-aligned formulation strategy",
      "Excipient screening and compatibility support",
      "Processability and scale-up readiness",
    ],
  },
  {
    slug: "analytical-methods",
    title: "Analytical method development & validation",
    summary:
      "Method development and validation with a documentation-first mindset aligned to regulatory expectations.",
    highlights: [
      "Stability-indicating method approach",
      "Validation protocol and report support",
      "Data integrity and traceability focus",
    ],
  },
  {
    slug: "packaging-compatibility",
    title: "Packaging development & compatibility studies",
    summary:
      "Packaging selection and compatibility studies to reduce risk across development and commercialization.",
    highlights: [
      "Material selection and compatibility rationale",
      "Risk-based study design support",
      "Labeling/pack considerations (where applicable)",
    ],
  },
  {
    slug: "vendor-qualification",
    title: "API / excipients vendor qualification",
    summary:
      "Vendor evaluation support to help ensure consistent supply of quality materials.",
    highlights: [
      "Supplier documentation review support",
      "Quality risk assessment assistance",
      "Sourcing strategy to reduce variability",
    ],
  },
  {
    slug: "cost-reduction",
    title: "Formulation evaluation for cost reduction",
    summary:
      "Evaluation of existing formulations to identify meaningful cost and process improvements.",
    highlights: [
      "BOM and process cost drivers assessment",
      "Alternate excipient/supplier evaluation",
      "Yield and cycle-time improvement opportunities",
    ],
  },
  {
    slug: "granules-pellets",
    title: "Ready-to-compress granules / pellets",
    summary:
      "Support for preparing ready-to-compress intermediates to accelerate manufacturing readiness.",
    highlights: [
      "Granulation/pelletization approach support",
      "Flow/compression readiness checks",
      "Transfer-friendly documentation package",
    ],
  },
  {
    slug: "stability-studies",
    title: "Stability studies (ICH / regulatory aligned)",
    summary:
      "Stability study planning and execution support aligned to ICH and market expectations.",
    highlights: [
      "Study design and pull schedule planning",
      "Storage conditions and packaging considerations",
      "Summary reporting support for dossiers",
    ],
  },
  {
    slug: "regulatory-dossiers",
    title: "Dossier preparation & regulatory filing support",
    summary:
      "CTD/eCTD-ready documentation support to streamline review and reduce rework.",
    highlights: [
      "CTD module structuring support",
      "Consistency checks across methods/stability",
      "Technology transfer documentation support",
    ],
  },
];

export const dosageForms: DosageForm[] = [
  {
    slug: "tablets",
    title: "Tablets",
    summary:
      "Immediate or modified release development support with manufacturability in mind.",
    examples: ["IR tablets", "MR tablets", "Coated tablets"],
  },
  {
    slug: "capsules",
    title: "Capsules",
    summary:
      "Capsule formulation support focusing on fill uniformity, stability, and scalability.",
    examples: ["Hard gelatin capsules", "HPMC capsules", "Powder/blend fills"],
  },
  {
    slug: "injectables",
    title: "Injectable formulations",
    summary:
      "Formulation and analytical support for sterile dosage forms and parenteral development needs.",
    examples: ["Solutions", "Suspensions", "Lyophilized products (where applicable)"],
  },
  {
    slug: "semi-solids",
    title: "Semi-solid dosage forms",
    summary:
      "Ointments, creams, and gels with focus on rheology, stability, and patient use.",
    examples: ["Ointments", "Creams", "Gels"],
  },
  {
    slug: "liquid-orals",
    title: "Liquid orals",
    summary:
      "Syrups, suspensions, and solutions with taste, stability, and dosing considerations.",
    examples: ["Syrups", "Suspensions", "Solutions"],
  },
  {
    slug: "dry-powders-sachets",
    title: "Dry powders & sachets",
    summary:
      "Powder blends and sachet presentations optimized for flow, uniformity, and stability.",
    examples: ["Dry powders", "Sachets", "Granules"],
  },
];

