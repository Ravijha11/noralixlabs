import { Section } from "@/components/landing/Section";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { DosageFormsSection } from "@/components/landing/DosageFormsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WhyUsSection } from "@/components/landing/WhyUsSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { ContactSection } from "@/components/landing/ContactSection";

export default function Home() {
  return (
    <div>
      <Section id="home">
        <HeroSection />
      </Section>
      <Section id="about">
        <AboutSection />
      </Section>
      <Section id="expertise" className="border-t border-black/10">
        <DosageFormsSection />
      </Section>
      <Section id="services" className="border-t border-black/10">
        <ServicesSection />
      </Section>
      <section className="border-t border-black/10">
        <WhyUsSection />
      </section>
      <Section id="workflow" className="border-t border-black/10">
        <ProcessSection />
      </Section>
      <Section id="contact" className="border-t border-black/10">
        <ContactSection />
      </Section>
    </div>
  );
}
