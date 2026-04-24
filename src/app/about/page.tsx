import type { Metadata } from "next";

import { AboutSection } from "@/components/landing/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Noralixlabs is a pharmaceutical CRO providing end-to-end product development support from formulation through technology transfer.",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutSection />
    </div>
  );
}

