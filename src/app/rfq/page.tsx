import type { Metadata } from "next";

import { RfqForm } from "@/components/site/forms/rfq-form";
import { Container } from "@/components/site/container";
import { PageHeader, PageSection, PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Submit an RFQ to Noralix Labs with dosage form, stage, timelines, and target markets to receive a clear scope and next-step plan.",
};

export default function RfqPage() {
  return (
    <PageShell>
      <PageHeader
        title="Request a Quote (RFQ)"
        description="Share the minimum details needed to scope your workstream. You can keep confidential details high-level at first."
      />
      <PageSection>
        <Container className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 shadow-sm lg:col-span-2">
            <RfqForm />
          </div>
          <div className="rounded-2xl border bg-muted/20 p-6">
            <div className="text-sm font-medium">We’ll help you define</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Scope & deliverables</li>
              <li>Timeline and key milestones</li>
              <li>Documentation package needed for CTD/eCTD</li>
              <li>Risk areas (stability, compatibility, method strategy)</li>
            </ul>
            <div className="mt-6 text-sm font-medium">Attachments</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Optional. If your form provider supports file uploads, you can add
              specs or existing data. Otherwise, we can share a secure method
              after initial contact.
            </p>
          </div>
        </Container>
      </PageSection>
    </PageShell>
  );
}

