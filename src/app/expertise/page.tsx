import type { Metadata } from "next";

import { DosageFormsSection } from "@/components/landing/DosageFormsSection";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Dosage form expertise across tablets, capsules, injectables, semi-solids, liquid orals, and dry powders/sachets.",
};

export default function ExpertisePage() {
  return (
    <div className="pt-16">
      <DosageFormsSection />
    </div>
  );
}

