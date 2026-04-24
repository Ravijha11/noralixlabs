import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/site/container";
import { PageHeader, PageSection, PageShell } from "@/components/site/page-shell";
import { dosageForms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dosage Forms",
  description:
    "Dosage form expertise across tablets, capsules, injectables, semi-solids, liquid orals, and dry powders/sachets.",
};

export default function DosageFormsPage() {
  return (
    <PageShell>
      <PageHeader
        title="Dosage forms we support"
        description="A broad range of dosage forms with a practical focus on development, scale-up readiness, and regulatory-aligned documentation."
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
            {dosageForms.map((d) => (
              <div
                key={d.slug}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div className="text-lg font-semibold tracking-tight">
                  {d.title}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{d.summary}</p>
                <div className="mt-4 text-sm font-medium">Examples</div>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {d.examples.map((e) => (
                    <li key={e} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border bg-foreground p-8 text-background shadow-sm">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div className="space-y-2">
                <div className="text-sm font-medium text-background/80">
                  Not sure where to start?
                </div>
                <div className="text-2xl font-semibold tracking-tight">
                  Tell us your dosage form and stage.
                </div>
                <p className="text-sm text-background/80">
                  We’ll propose a scope and deliverables aligned to your timeline.
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

