import * as React from "react";

type StructuredDataProps = {
  pageUrl?: string;
  includeOrganization?: boolean;
  includeWebsite?: boolean;
  includeWebPage?: boolean;
  includeFaq?: boolean;
};

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function StructuredData({
  pageUrl = "https://www.noralixlabs.com",
  includeOrganization = true,
  includeWebsite = true,
  includeWebPage = true,
  includeFaq = false,
}: StructuredDataProps) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.noralixlabs.com/#organization",
    name: "Noralixlabs",
    alternateName: "Noralix Labs",
    url: "https://www.noralixlabs.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.noralixlabs.com/logo.png",
      width: 200,
      height: 60,
    },
    description:
      "Pharmaceutical product development CRO providing formulation development, analytical method validation, stability studies, and regulatory dossier preparation.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "India",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "ojha.pharma@yahoo.com",
        telephone: "+919630693905",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "ojha.pharma@yahoo.com",
        telephone: "+919630693905",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/noralixlabs",
      "https://twitter.com/noralixlabs",
    ],
    knowsAbout: [
      "Pharmaceutical Formulation Development",
      "Analytical Method Validation",
      "ICH Stability Studies",
      "CTD eCTD Dossier Preparation",
      "Technology Transfer",
      "Injectable Formulation Development",
      "Tablet Formulation",
      "Capsule Development",
      "Semi-solid Formulation",
      "Liquid Oral Formulation",
      "Regulatory Affairs",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pharmaceutical Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Formulation Development and Optimization",
            description:
              "Complete formulation design across tablets, capsules, injectables, semi-solids, liquid orals and dry powders with scale-up documentation.",
            serviceType: "Pharmaceutical Formulation Development",
            provider: { "@id": "https://www.noralixlabs.com/#organization" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Analytical Method Development and Validation",
            description:
              "ICH Q2(R1) compliant HPLC, dissolution, and assay method development with full validation and transfer documentation.",
            serviceType: "Analytical Method Validation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Stability Studies",
            description:
              "Real-time and accelerated stability studies per ICH Q1A(R2) at 25°C/60%RH, 30°C/65%RH, and 40°C/75%RH.",
            serviceType: "Pharmaceutical Stability Testing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CTD/eCTD Dossier Preparation",
            description:
              "Module 1-5 CTD compilation and eCTD formatting for FDA, EMA, CDSCO, and WHO regulatory submissions.",
            serviceType: "Regulatory Affairs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Packaging Development and Compatibility Studies",
            description:
              "Primary and secondary packaging selection with extractables, leachables, and stability compatibility data.",
            serviceType: "Pharmaceutical Packaging Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technology Transfer",
            description:
              "Complete technology transfer documentation and scale-up support for pharmaceutical manufacturing.",
            serviceType: "Pharmaceutical Technology Transfer",
          },
        },
      ],
    },
  } as const;

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.noralixlabs.com/#website",
    url: "https://www.noralixlabs.com",
    name: "Noralixlabs",
    description: "Pharmaceutical Product Development Company",
    publisher: { "@id": "https://www.noralixlabs.com/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.noralixlabs.com/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  } as const;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.noralixlabs.com/#webpage",
    url: pageUrl,
    name: "Noralixlabs | Pharmaceutical Product Development Company India",
    isPartOf: { "@id": "https://www.noralixlabs.com/#website" },
    about: { "@id": "https://www.noralixlabs.com/#organization" },
    description:
      "Noralixlabs provides pharmaceutical product development services including formulation, analytical validation, stability studies, and CTD/eCTD dossier preparation.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.noralixlabs.com",
        },
      ],
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".hero-description"],
    },
  } as const;

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What pharmaceutical development services does Noralixlabs offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Noralixlabs offers comprehensive pharmaceutical development services including formulation development and optimization, analytical method development and validation, packaging compatibility studies, API/excipients vendor qualification, stability studies per ICH guidelines, CTD/eCTD dossier preparation, and technology transfer support.",
        },
      },
      {
        "@type": "Question",
        name: "What dosage forms does Noralixlabs develop?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Noralixlabs develops formulations for tablets, capsules, injectable formulations, semi-solid dosage forms (ointments, creams, gels), liquid orals (syrups, suspensions, solutions), and dry powders and sachets.",
        },
      },
      {
        "@type": "Question",
        name: "Is Noralixlabs ICH compliant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All development activities at Noralixlabs are aligned with ICH guidelines including ICH Q1A(R2) for stability studies, ICH Q2(R1) for analytical method validation, and ICH Q8-Q11 for pharmaceutical development and quality by design.",
        },
      },
      {
        "@type": "Question",
        name: "Does Noralixlabs prepare CTD and eCTD dossiers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Noralixlabs prepares complete CTD (Common Technical Document) Module 1-5 compilations and eCTD-formatted submissions for regulatory filings with FDA, EMA, CDSCO, and WHO.",
        },
      },
      {
        "@type": "Question",
        name: "Can Noralixlabs support technology transfer to manufacturing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Noralixlabs provides complete technology transfer documentation and scale-up support to help pharmaceutical companies transition from development to commercial manufacturing smoothly.",
        },
      },
      {
        "@type": "Question",
        name: "How can I get started with Noralixlabs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact Noralixlabs through the contact form on our website at noralixlabs.com. Share details about your molecule, target market, and development stage, and our team will reach out within 24 hours to discuss your project.",
        },
      },
    ],
  } as const;

  return (
    <>
      {includeOrganization ? <JsonLd data={organization} /> : null}
      {includeWebsite ? <JsonLd data={website} /> : null}
      {includeWebPage ? <JsonLd data={webPage} /> : null}
      {includeFaq ? <JsonLd data={faq} /> : null}
    </>
  );
}

