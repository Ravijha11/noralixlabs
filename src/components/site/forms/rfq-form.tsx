"use client";

import { RFQ_DOSAGE_FORMS, RFQ_PROJECT_STAGES } from "@/lib/inquiries";
import { FormStatus } from "@/components/site/form-status";

type FieldProps = {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
};

function Input({ label, name, required, type = "text", placeholder, error, autoComplete }: FieldProps) {
  const id = `rfq-${name}`;
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="text-sm font-medium">{label} {required ? <span className="text-destructive">*</span> : null}</span>
      <input
        id={id}
        name={name}
        required={required}
        type={type}
        autoComplete={autoComplete}
        maxLength={name === "email" ? 254 : 160}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-11 rounded-md border bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50 aria-[invalid=true]:border-destructive"
        placeholder={placeholder}
      />
      {error ? <span id={`${id}-error`} className="text-sm text-destructive">{error}</span> : null}
    </label>
  );
}

function Select({ label, name, required, options, error }: { label: string; name: string; required?: boolean; options: { value: string; label: string }[]; error?: string }) {
  const id = `rfq-${name}`;
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="text-sm font-medium">{label} {required ? <span className="text-destructive">*</span> : null}</span>
      <select id={id} name={name} required={required} defaultValue="" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="h-11 rounded-md border bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50 aria-[invalid=true]:border-destructive">
        <option value="" disabled>Select…</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      {error ? <span id={`${id}-error`} className="text-sm text-destructive">{error}</span> : null}
    </label>
  );
}

export function RfqForm() {
  const { state, error, fieldErrors, onSubmit, successMessage } = FormStatus({
    successMessage: "Thank you. Your RFQ has been submitted successfully. Our pharmaceutical development team will contact you shortly.",
  });

  return (
    <form action="/api/rfq" method="POST" onSubmit={onSubmit} className="grid gap-4" aria-busy={state === "submitting"}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Full name" name="name" required placeholder="Your name" autoComplete="name" error={fieldErrors.name} />
        <Input label="Company" name="company" placeholder="Company" autoComplete="organization" error={fieldErrors.company} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative grid gap-2">
          <label htmlFor="rfq-phone" className="text-sm font-medium">Phone Number <span className="text-destructive">*</span></label>
          <span className="pointer-events-none absolute left-3 top-[39px] text-sm text-muted-foreground" aria-hidden="true">+91</span>
          <input id="rfq-phone" name="phone" required type="tel" inputMode="tel" autoComplete="tel-national" maxLength={20} aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? "rfq-phone-error" : undefined} className="h-11 rounded-md border bg-background px-3 pl-12 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50 aria-[invalid=true]:border-destructive" placeholder="98765 43210" />
          {fieldErrors.phone ? <span id="rfq-phone-error" className="text-sm text-destructive">{fieldErrors.phone}</span> : null}
        </div>
        <Input label="Email (Optional)" name="email" type="email" placeholder="you@company.com" autoComplete="email" error={fieldErrors.email} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Select label="Dosage form" name="dosage_form" required error={fieldErrors.dosage_form} options={[
          { value: RFQ_DOSAGE_FORMS[0], label: "Tablets" }, { value: RFQ_DOSAGE_FORMS[1], label: "Capsules" }, { value: RFQ_DOSAGE_FORMS[2], label: "Injectables" }, { value: RFQ_DOSAGE_FORMS[3], label: "Semi-solid (ointment/cream/gel)" }, { value: RFQ_DOSAGE_FORMS[4], label: "Liquid orals (syrup/suspension)" }, { value: RFQ_DOSAGE_FORMS[5], label: "Dry powders / sachets" }, { value: RFQ_DOSAGE_FORMS[6], label: "Other" },
        ]} />
        <Select label="Project stage" name="project_stage" required error={fieldErrors.project_stage} options={[
          { value: RFQ_PROJECT_STAGES[0], label: "Concept / early feasibility" }, { value: RFQ_PROJECT_STAGES[1], label: "Formulation development" }, { value: RFQ_PROJECT_STAGES[2], label: "Analytical method work" }, { value: RFQ_PROJECT_STAGES[3], label: "Stability studies" }, { value: RFQ_PROJECT_STAGES[4], label: "Technology transfer" }, { value: RFQ_PROJECT_STAGES[5], label: "Dossier / regulatory support" },
        ]} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Target markets (optional)" name="target_markets" placeholder="e.g., India, US, EU" error={fieldErrors.target_markets} />
        <Input label="Desired timeline (optional)" name="timeline" placeholder="e.g., 8–12 weeks" error={fieldErrors.timeline} />
      </div>
      <label className="grid gap-2" htmlFor="rfq-requirements">
        <span className="text-sm font-medium">Brief requirements <span className="text-destructive">*</span></span>
        <textarea id="rfq-requirements" name="requirements" required minLength={10} maxLength={4000} aria-invalid={Boolean(fieldErrors.requirements)} aria-describedby={fieldErrors.requirements ? "rfq-requirements-error" : undefined} className="min-h-40 rounded-md border bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50 aria-[invalid=true]:border-destructive" placeholder="Describe your product, constraints, and the support you need." />
        {fieldErrors.requirements ? <span id="rfq-requirements-error" className="text-sm text-destructive">{fieldErrors.requirements}</span> : null}
      </label>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button type="submit" className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90 disabled:opacity-60" disabled={state === "submitting"}>{state === "submitting" ? "Submitting..." : "Submit RFQ"}</button>
      {state === "success" ? <div className="rounded-md border bg-muted/30 p-3 text-sm" role="status">{successMessage}</div> : null}
      {state === "error" ? <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">{error}</div> : null}
    </form>
  );
}
