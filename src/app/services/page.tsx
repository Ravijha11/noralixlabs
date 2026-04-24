import type { Metadata } from "next";

import { ServicesSection } from "@/components/landing/ServicesSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive pharmaceutical CRO services — formulation, analytical development, stability, regulatory dossier support, and technology transfer.",
};

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <ServicesSection />
    </div>
  );
}

