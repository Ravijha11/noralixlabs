import { Resend } from "resend";

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

export type ContactNotificationPayload = {
  name: string;
  company: string;
  email: string;
  interest: string;
  projectStage: string;
  message: string;
};

export function sendContactNotification(payload: ContactNotificationPayload) {
  const resend = getResendClient();
  const { from, to } = getResendDefaults();
  const createdAt = new Date().toISOString();
  const { name, company, email, interest, projectStage, message } = payload;

  return resend.emails.send({
    from,
    to,
    subject: "Noralix Labs — Contact form",
    replyTo: email ? [email] : undefined,
    text: [
      "New contact form submission",
      "",
      `Name: ${name || "-"}`,
      `Company: ${company || "-"}`,
      `Email: ${email || "-"}`,
      `Service interest: ${interest || "-"}`,
      `Project stage: ${projectStage || "-"}`,
      "",
      "Message:",
      message || "-",
      "",
      `Created at: ${createdAt}`,
    ].join("\n"),
  });
}

/** Send email after the HTTP response (Vercel waitUntil or local background). */
export async function runAfterResponse(work: Promise<unknown>) {
  const tracked = work.catch((err) => {
    console.error("[resend] background send failed:", err);
  });

  if (process.env.VERCEL) {
    const { waitUntil } = await import("@vercel/functions");
    waitUntil(tracked);
    return;
  }

  void tracked;
}
