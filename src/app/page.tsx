import { Section } from "@/components/landing/Section";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { DosageFormsSection } from "@/components/landing/DosageFormsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WhyUsSection } from "@/components/landing/WhyUsSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { StructuredData } from "@/components/seo/StructuredData";

export default function Home() {
  return (
    <div>
      <StructuredData includeFaq pageUrl="https://www.noralixlabs.com" />
      <Section id="home" ariaLabel="Homepage hero">
        <HeroSection />
      </Section>
      <Section id="about" ariaLabel="About Noralixlabs">
        <AboutSection />
      </Section>
      <Section
        id="expertise"
        ariaLabel="Pharmaceutical development expertise"
        className="border-t border-black/10"
      >
        <DosageFormsSection />
      </Section>
      <Section
        id="services"
        ariaLabel="Pharmaceutical development services"
        className="border-t border-black/10"
      >
        <ServicesSection />
      </Section>
      <section className="border-t border-black/10" aria-label="Why choose Noralixlabs">
        <WhyUsSection />
      </section>
      <Section
        id="workflow"
        ariaLabel="Pharmaceutical development process"
        className="border-t border-black/10"
      >
        <ProcessSection />
      </Section>
      <Section
        id="contact"
        ariaLabel="Contact Noralixlabs"
        className="border-t border-black/10"
      >
        <ContactSection />
      </Section>
      <section className="border-t border-black/10" aria-label="Frequently asked questions">
        <FAQSection />
      </section>
    </div>
  );
}
