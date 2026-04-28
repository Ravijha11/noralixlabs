"use client";

import * as React from "react";

import { FormStatus } from "@/components/site/form-status";

function Field({
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

export function ContactForm() {
  const endpoint = "/api/contact";
  const { state, error, onSubmit, successMessage } = FormStatus({
    successMessage:
      "Thanks—your message has been sent. We’ll get back with next steps.",
  });

  return (
    <form
      action={endpoint}
      method="POST"
      onSubmit={onSubmit}
      className="grid gap-4"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          required
          placeholder="Your name"
        />
        <Field
          label="Email"
          name="email"
          required
          type="email"
          placeholder="you@company.com"
        />
      </div>

      <Field label="Company (optional)" name="company" placeholder="Company" />

      <label className="grid gap-2">
        <span className="text-sm font-medium">
          Message <span className="text-destructive">*</span>
        </span>
        <textarea
          className="min-h-36 rounded-md border bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          name="message"
          required
          placeholder="Tell us what you need support with (dosage form, stage, timelines)."
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

      <input type="hidden" name="_subject" value="Noralix Labs — Contact form" />

      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90 disabled:opacity-60"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Sending..." : "Send message"}
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
        By submitting, you agree to be contacted regarding your inquiry.
      </p>
    </form>
  );
}

