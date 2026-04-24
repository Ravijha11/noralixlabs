"use client";

import * as React from "react";

import { FormStatus } from "@/components/site/form-status";
import { getFormEndpoint } from "@/lib/forms";

function Input({
  label,
  name,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">
        {label} {required ? <span className="text-destructive">*</span> : null}
      </span>
      <input
        className="h-11 rounded-md border bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        name={name}
        required={required}
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
}

function Select({
  label,
  name,
  required,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">
        {label} {required ? <span className="text-destructive">*</span> : null}
      </span>
      <select
        className="h-11 rounded-md border bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        name={name}
        required={required}
        defaultValue=""
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function RfqForm() {
  const endpoint = getFormEndpoint("rfq");
  const { state, error, onSubmit, successMessage } = FormStatus({
    successMessage:
      "Thanks—your RFQ has been submitted. We’ll respond with a scope and next steps.",
  });

  if (!endpoint) {
    return (
      <div className="text-sm text-muted-foreground">
        RFQ form is not configured yet. Set{" "}
        <code className="rounded bg-muted px-1 py-0.5">
          NEXT_PUBLIC_RFQ_FORM_URL
        </code>{" "}
        to your form provider endpoint.
      </div>
    );
  }

  return (
    <form
      action={endpoint}
      method="POST"
      onSubmit={onSubmit}
      className="grid gap-4"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Full name"
          name="name"
          required
          placeholder="Your name"
        />
        <Input
          label="Email"
          name="email"
          required
          type="email"
          placeholder="you@company.com"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Company (optional)" name="company" placeholder="Company" />
        <Input
          label="Phone (optional)"
          name="phone"
          type="tel"
          placeholder="+91…"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label="Dosage form"
          name="dosage_form"
          required
          options={[
            { value: "tablets", label: "Tablets" },
            { value: "capsules", label: "Capsules" },
            { value: "injectables", label: "Injectables" },
            { value: "semi_solids", label: "Semi-solid (ointment/cream/gel)" },
            { value: "liquid_orals", label: "Liquid orals (syrup/suspension)" },
            { value: "dry_powders", label: "Dry powders / sachets" },
            { value: "other", label: "Other" },
          ]}
        />
        <Select
          label="Project stage"
          name="project_stage"
          required
          options={[
            { value: "concept", label: "Concept / early feasibility" },
            { value: "development", label: "Formulation development" },
            { value: "analytical", label: "Analytical method work" },
            { value: "stability", label: "Stability studies" },
            { value: "tech_transfer", label: "Technology transfer" },
            { value: "regulatory", label: "Dossier / regulatory support" },
          ]}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Target markets (optional)"
          name="target_markets"
          placeholder="e.g., India, US, EU"
        />
        <Input
          label="Desired timeline (optional)"
          name="timeline"
          placeholder="e.g., 8–12 weeks"
        />
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium">
          Brief requirements <span className="text-destructive">*</span>
        </span>
        <textarea
          className="min-h-40 rounded-md border bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          name="requirements"
          required
          placeholder="Describe your product, any constraints (excipients, cost targets, packaging), and what support you need."
        />
      </label>

      {/* Honeypot spam trap */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <input type="hidden" name="_subject" value="Noralix Labs — RFQ submission" />

      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90 disabled:opacity-60"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Submitting..." : "Submit RFQ"}
      </button>

      {state === "success" ? (
        <div className="rounded-md border bg-muted/30 p-3 text-sm">
          {successMessage}
        </div>
      ) : null}
      {state === "error" ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <p className="text-xs text-muted-foreground">
        Tip: If you need to share files and your form provider doesn’t support
        uploads, we can arrange a secure method after initial contact.
      </p>
    </form>
  );
}

