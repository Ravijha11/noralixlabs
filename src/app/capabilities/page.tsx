import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/site/container";
import { PageHeader, PageSection, PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Overview of capabilities across formulation, analytical development, packaging compatibility, stability, and regulatory documentation support.",
};

export default function CapabilitiesPage() {
  return (
    <PageShell>
      <PageHeader
        title="Capabilities"
        description="A high-level view of what we can support. If you share your product profile and target markets, we’ll recommend an efficient scope and deliverables."
        actions={
          <Link
            href="/rfq"
            className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90"
          >
            Request a Quote
          </Link>
        }
      />

      <PageSection>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Formulation & process support",
                body: "Development, optimization, and transfer-ready deliverables with manufacturability in mind.",
              },
              {
                title: "Analytical development",
                body: "Method development and validation support aligned to stability and regulatory needs.",
              },
              {
                title: "Stability strategy",
                body: "ICH-aligned stability study planning, storage conditions, and reporting support.",
              },
              {
                title: "Packaging compatibility",
                body: "Compatibility study support to reduce packaging-related risk.",
              },
              {
                title: "Vendor qualification",
                body: "Support for API/excipients supplier evaluation and quality risk thinking.",
              },
              {
                title: "Regulatory documentation",
                body: "CTD/eCTD-oriented dossier preparation and consistency checks across modules.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div className="text-lg font-semibold tracking-tight">
                  {c.title}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border bg-foreground p-8 text-background shadow-sm">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div className="space-y-2">
                <div className="text-sm font-medium text-background/80">
                  Fast scope definition
                </div>
                <div className="text-2xl font-semibold tracking-tight">
                  Get a clear scope in one message.
                </div>
                <p className="text-sm text-background/80">
                  Share dosage form, stage, timelines, and target markets.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Link
                  href="/rfq"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-background px-5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-background/90"
                >
                  Submit RFQ <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-background/30 px-5 text-sm font-medium text-background shadow-sm transition-colors hover:bg-background/10"
                >
                  Services
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </PageSection>
    </PageShell>
  );
}

