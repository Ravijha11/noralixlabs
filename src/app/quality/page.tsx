import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { PageHeader, PageSection, PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Quality & Compliance",
  description:
    "Quality-focused execution with regulatory-aligned documentation, ICH-guided stability thinking, and a data integrity mindset.",
};

export default function QualityPage() {
  return (
    <PageShell>
      <PageHeader
        title="Quality & compliance mindset"
        description="We emphasize scientifically sound decisions, clear documentation, and practices aligned to ICH and regulatory expectations—while respecting confidentiality and project constraints."
        actions={
          <>
            <Link
              href="/rfq"
              className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90"
            >
              Request a Quote
            </Link>
          </>
        }
      />

      <PageSection>
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Regulatory-aligned documentation",
                body: "A documentation-first approach to reduce rework and accelerate review readiness.",
              },
              {
                title: "ICH-guided stability thinking",
                body: "Stability design support aligned to intended markets and packaging considerations.",
              },
              {
                title: "Analytical rigor",
                body: "Method development and validation support with traceability and clarity in mind.",
              },
              {
                title: "Data integrity mindset",
                body: "Clear traceability, controlled records, and quality checks across deliverables.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div className="text-lg font-semibold tracking-tight">
                  {item.title}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border bg-muted/30 p-8">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div className="space-y-2">
                <div className="text-sm font-medium">Confidentiality</div>
                <p className="text-sm text-muted-foreground">
                  We can share only non-confidential capability information on the
                  website. Project details can be shared securely through the RFQ
                  process.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-md border bg-background px-5 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
                >
                  Contact
                </Link>
                <Link
                  href="/rfq"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90"
                >
                  Submit RFQ
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </PageSection>
    </PageShell>
  );
}

