import { dosageForms, type DosageForm } from "@/lib/content";

/** Fallback when section image is not yet uploaded to public/images/expertise/ */
export const EXPERTISE_IMAGE_FALLBACK = "/images/pharma-contact.png";

const expertiseImageBySlug: Record<string, string> = {
  tablets: "/images/expertise/ChatGPT Image May 17, 2026, 09_31_50 PM.png",
  capsules: "/images/expertise/ChatGPT Image May 17, 2026, 09_21_30 PM.png",
  injectables: "/images/expertise/ChatGPT Image May 17, 2026, 09_36_14 PM.png",
  "semi-solids": "/images/expertise/ChatGPT Image May 17, 2026, 09_39_42 PM.png",
  "liquid-orals": "/images/expertise/ChatGPT Image May 17, 2026, 09_44_13 PM.png",
  "dry-powders-sachets":
    "/images/expertise/ChatGPT Image May 17, 2026, 09_45_10 PM.png",
};

export const EXPERTISE_CAPABILITIES = [
  "Development & optimization",
  "Analytical strategy",
  "Stability approach",
  "Transfer-ready deliverables",
] as const;

/** Custom PNG graphics — full image visible, no crop, maximized in card */
const graphicImageSlugs = new Set([
  "tablets",
  "capsules",
  "injectables",
  "semi-solids",
  "liquid-orals",
  "dry-powders-sachets",
]);

export type ExpertiseImageLayout = "photo" | "graphic";

/** Panel tone behind graphic images (letterboxing only, image never cropped) */
export type GraphicPanelTone = "dark" | "light";

const graphicPanelToneBySlug: Record<string, GraphicPanelTone> = {
  tablets: "dark",
  capsules: "light",
  injectables: "light",
  "semi-solids": "light",
  "liquid-orals": "light",
  "dry-powders-sachets": "light",
};

export type ExpertiseItem = DosageForm & {
  image: string;
  index: number;
  imageLayout: ExpertiseImageLayout;
  graphicPanelTone: GraphicPanelTone | null;
};

function getImageLayout(slug: string): ExpertiseImageLayout {
  return graphicImageSlugs.has(slug) ? "graphic" : "photo";
}

export function getExpertiseImage(slug: string): string {
  return expertiseImageBySlug[slug] ?? EXPERTISE_IMAGE_FALLBACK;
}

export const expertiseItems: ExpertiseItem[] = dosageForms.map((form, index) => {
  const imageLayout = getImageLayout(form.slug);
  return {
    ...form,
    image: getExpertiseImage(form.slug),
    index,
    imageLayout,
    graphicPanelTone:
      imageLayout === "graphic"
        ? (graphicPanelToneBySlug[form.slug] ?? "light")
        : null,
  };
});
