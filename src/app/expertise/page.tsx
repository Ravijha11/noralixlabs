import type { Metadata } from "next";

import { ExpertisePageContent } from "@/components/expertise/ExpertisePageContent";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Dosage form expertise across tablets, capsules, injectables, semi-solids, liquid orals, and dry powders/sachets — ICH-aligned development with transfer-ready documentation.",
};

export default function ExpertisePage() {
  return (
    <main className="pt-16">
      <ExpertisePageContent />
    </main>
  );
}
