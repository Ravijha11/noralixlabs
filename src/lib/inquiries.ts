export const CONTACT_PROJECT_STAGES = [
  "Early Development",
  "Formulation Optimization",
  "Analytical Validation",
  "Stability Studies",
  "Regulatory Filing",
  "Technology Transfer",
  "Not Sure Yet",
] as const;

export const CONTACT_SERVICE_INTERESTS = [
  "Formulation development",
  "Analytical methods",
  "Packaging compatibility",
  "Stability studies",
  "Regulatory filing",
  "Technology transfer",
  "Not sure yet",
] as const;

export const RFQ_DOSAGE_FORMS = [
  "tablets",
  "capsules",
  "injectables",
  "semi_solids",
  "liquid_orals",
  "dry_powders",
  "other",
] as const;

export const RFQ_PROJECT_STAGES = [
  "concept",
  "development",
  "analytical",
  "stability",
  "tech_transfer",
  "regulatory",
] as const;

type ValidationErrors = Record<string, string>;
type ValidationResult<T> = { ok: true; data: T } | { ok: false; errors: ValidationErrors };
type Input = Record<string, unknown>;

export type ContactSubmission = {
  name: string;
  company: string;
  phone: string;
  email: string;
  projectStage: (typeof CONTACT_PROJECT_STAGES)[number];
  interest: "" | (typeof CONTACT_SERVICE_INTERESTS)[number];
  message: string;
};

export type RfqSubmission = {
  name: string;
  company: string;
  phone: string;
  email: string;
  dosageForm: (typeof RFQ_DOSAGE_FORMS)[number];
  projectStage: (typeof RFQ_PROJECT_STAGES)[number];
  targetMarkets: string;
  timeline: string;
  requirements: string;
};

const INVALID_SINGLE_LINE = /[\u0000-\u001F\u007F]/;
const INVALID_MESSAGE_CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const NAME = /^[\p{L}\p{M}][\p{L}\p{M} .,'’\-]{1,79}$/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function value(input: Input, key: string) {
  return typeof input[key] === "string" ? input[key].trim() : "";
}

function validSingleLine(text: string, maximum: number) {
  return text.length <= maximum && !INVALID_SINGLE_LINE.test(text);
}

function validOptionalText(input: Input, key: string, maximum: number, errors: ValidationErrors) {
  const text = value(input, key);
  if (text && !validSingleLine(text, maximum)) errors[key] = "This field contains invalid characters or is too long.";
  return text;
}

function validName(input: Input, errors: ValidationErrors) {
  const name = value(input, "name");
  if (!NAME.test(name)) errors.name = name ? "Enter a valid name." : "Name is required.";
  return name;
}

function validOptionalEmail(input: Input, errors: ValidationErrors) {
  const email = value(input, "email").toLowerCase();
  if (email && (!validSingleLine(email, 254) || !EMAIL.test(email))) {
    errors.email = "Enter a valid email address.";
  }
  return email;
}

function validPhone(input: Input, errors: ValidationErrors) {
  const submitted = value(input, "phone");
  if (!submitted) {
    errors.phone = "Phone number is required.";
    return "";
  }
  if (!/^[+\d\s()\-]+$/.test(submitted) || (submitted.match(/\+/g)?.length ?? 0) > 1 || (submitted.includes("+") && !submitted.startsWith("+"))) {
    errors.phone = "Enter a valid phone number.";
    return "";
  }

  const compact = submitted.replace(/[\s()\-]/g, "");
  const digits = compact.replace(/^\+/, "");
  if (/^(\d)\1+$/.test(digits)) {
    errors.phone = "Enter a valid phone number.";
    return "";
  }
  if (/^[6-9]\d{9}$/.test(digits)) return `+91${digits}`;
  if (/^91[6-9]\d{9}$/.test(digits)) return `+${digits}`;
  if (/^\+[1-9]\d{7,14}$/.test(compact)) return compact;

  errors.phone = "Enter a valid phone number.";
  return "";
}

function validMessage(input: Input, key: string, errors: ValidationErrors) {
  const message = value(input, key).replace(/\r\n?/g, "\n");
  if (message.length < 10) errors[key] = key === "message" ? "Message must be at least 10 characters." : "Brief requirements must be at least 10 characters.";
  else if (message.length > 4_000 || INVALID_MESSAGE_CONTROL.test(message)) errors[key] = "This field contains invalid characters or is too long.";
  return message;
}

function allowed<T extends readonly string[]>(input: Input, key: string, values: T, label: string, errors: ValidationErrors, optional = false): "" | T[number] {
  const selected = value(input, key);
  if (optional && !selected) return "";
  if (!values.includes(selected)) errors[key] = `Select a valid ${label}.`;
  return selected as T[number];
}

export function validateContactSubmission(input: Input): ValidationResult<ContactSubmission> {
  const errors: ValidationErrors = {};
  const data: ContactSubmission = {
    name: validName(input, errors),
    company: validOptionalText(input, "company", 120, errors),
    phone: validPhone(input, errors),
    email: validOptionalEmail(input, errors),
    projectStage: allowed(input, "projectStage", CONTACT_PROJECT_STAGES, "project stage", errors) as ContactSubmission["projectStage"],
    interest: allowed(input, "interest", CONTACT_SERVICE_INTERESTS, "service interest", errors, true) as ContactSubmission["interest"],
    message: validMessage(input, "message", errors),
  };
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

export function validateRfqSubmission(input: Input): ValidationResult<RfqSubmission> {
  const errors: ValidationErrors = {};
  const data: RfqSubmission = {
    name: validName(input, errors),
    company: validOptionalText(input, "company", 120, errors),
    phone: validPhone(input, errors),
    email: validOptionalEmail(input, errors),
    dosageForm: allowed(input, "dosage_form", RFQ_DOSAGE_FORMS, "dosage form", errors) as RfqSubmission["dosageForm"],
    projectStage: allowed(input, "project_stage", RFQ_PROJECT_STAGES, "project stage", errors) as RfqSubmission["projectStage"],
    targetMarkets: validOptionalText(input, "target_markets", 160, errors),
    timeline: validOptionalText(input, "timeline", 100, errors),
    requirements: validMessage(input, "requirements", errors),
  };
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
