import { Section } from "@/components/landing/Section";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ExpertiseHomeSection } from "@/components/expertise/ExpertisePageContent";
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
      <section
        id="expertise"
        aria-label="Pharmaceutical development expertise"
        className="scroll-mt-16 border-t border-black/10"
      >
        <ExpertiseHomeSection />
      </section>
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
        className="border-t border-black/10 !min-h-0 overflow-hidden p-0"
      >
        <ContactSection />
      </Section>
      <section className="border-t border-black/10" aria-label="Frequently asked questions">
        <FAQSection />
      </section>
    </div>
  );
}
