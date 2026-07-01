const inquiryBySlug: Record<string, string> = {
  tablets: "Inquiry regarding tablet formulation development.",
  capsules: "Inquiry regarding capsule formulation development.",
  injectables: "Inquiry regarding injectable formulation development.",
  "semi-solids": "Inquiry regarding semi-solid dosage form development.",
  "liquid-orals": "Inquiry regarding liquid oral formulation development.",
  "dry-powders-sachets":
    "Inquiry regarding dry powder and sachet formulation development.",
};

export function getContactInquiryFromSlug(slug: string): string | null {
  return inquiryBySlug[slug] ?? null;
}

export function getContactHrefFromSlug(slug: string): string {
  return `/contact?from=${encodeURIComponent(slug)}`;
}
