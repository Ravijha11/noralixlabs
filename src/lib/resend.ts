import { Resend } from "resend";

import { renderContactNotification, renderRfqNotification } from "@/emails/inquiry-notification";
import type { ContactSubmission, RfqSubmission } from "@/lib/inquiries";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

let resendClient: Resend | null = null;

export function getResendClient() {
  if (!resendClient) {
    resendClient = new Resend(requiredEnv("RESEND_API_KEY"));
  }
  return resendClient;
}

export function getResendDefaults() {
  return {
    from: requiredEnv("RESEND_FROM_EMAIL"),
    to: requiredEnv("RESEND_TO_EMAIL"),
  };
}

async function sendNotification(subject: string, notification: { html: string; text: string }, replyTo?: string) {
  const resend = getResendClient();
  const { from, to } = getResendDefaults();
  const response = await resend.emails.send({
    from,
    to,
    subject,
    replyTo: replyTo ? [replyTo] : undefined,
    html: notification.html,
    text: notification.text,
  });
  if (response.error) throw new Error(`Resend rejected notification: ${response.error.name}`);
}

export function sendContactNotification(payload: ContactSubmission, createdAt: Date) {
  return sendNotification(
    "New Contact Submission — Noralix Labs",
    renderContactNotification({ ...payload, createdAt }),
    payload.email || undefined,
  );
}

export function sendRfqNotification(payload: RfqSubmission, createdAt: Date) {
  return sendNotification(
    "New RFQ Submission — Noralix Labs",
    renderRfqNotification({ ...payload, createdAt }),
    payload.email || undefined,
  );
}
