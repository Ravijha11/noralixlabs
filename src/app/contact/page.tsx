import type { Metadata } from "next";
import { ContactSection } from "@/components/landing/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Noralix Labs to discuss your pharmaceutical development needs.",
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactSection />
    </div>
  );
}

