import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { PageHeader, PageSection, PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Noralix Labs website.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader
        title="Privacy Policy"
        description="This is a template. Replace with your legal privacy policy before launch."
      />
      <PageSection>
        <Container className="prose prose-zinc max-w-none dark:prose-invert">
          <p>
            Noralix Labs respects your privacy. This policy describes what
            information we collect and how we use it.
          </p>
          <h2>Information we collect</h2>
          <ul>
            <li>Information you submit through forms (name, email, message).</li>
            <li>Basic technical data needed to operate the site.</li>
          </ul>
          <h2>How we use information</h2>
          <ul>
            <li>To respond to inquiries and provide requested information.</li>
            <li>To improve website performance and reliability.</li>
          </ul>
          <h2>Contact</h2>
          <p>
            If you have privacy questions, contact us via the Contact page.
          </p>
        </Container>
      </PageSection>
    </PageShell>
  );
}

