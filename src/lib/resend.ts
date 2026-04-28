import { Resend } from "resend";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export function getResendClient() {
  return new Resend(requiredEnv("RESEND_API_KEY"));
}

export function getResendDefaults() {
  return {
    from: requiredEnv("RESEND_FROM_EMAIL"),
    to: requiredEnv("RESEND_TO_EMAIL"),
  };
}

