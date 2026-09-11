import type { ContactSubmission, RfqSubmission } from "../lib/inquiries";

type Notification = { html: string; text: string };
type Field = { label: string; value: string };

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function display(value: string) {
  return value || "Not provided";
}

function submittedAt(createdAt: Date) {
  const date = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(createdAt);
  const time = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(createdAt);
  return `${date}, ${time} IST`;
}

function renderNotification(title: string, contact: Field[], project: Field[], messageLabel: string, message: string, createdAt: Date): Notification {
  const timestamp = submittedAt(createdAt);
  const table = (fields: Field[]) => fields.map(({ label, value }) => `
    <tr>
      <td style="padding:0 0 6px;color:#64748b;font-size:13px;font-weight:600;vertical-align:top;width:150px">${escapeHtml(label)}</td>
      <td style="padding:0 0 6px;color:#0f172a;font-size:14px;line-height:1.5">${escapeHtml(display(value))}</td>
    </tr>`).join("");
  const textFields = (fields: Field[]) => fields.map(({ label, value }) => `${label}\n${display(value)}`).join("\n\n");
  const safeMessage = escapeHtml(display(message)).replace(/\n/g, "<br />");

  return {
    html: `<!doctype html>
<html lang="en"><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
  <div style="padding:24px 12px">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
      <tr><td style="padding:28px 32px;background:#0f172a;color:#ffffff">
        <div style="font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#bfdbfe">Noralix Labs</div>
        <div style="margin-top:8px;font-size:24px;font-weight:700;line-height:1.3">${escapeHtml(title)}</div>
      </td></tr>
      <tr><td style="padding:28px 32px">
        <div style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#2563eb">Contact information</div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${table(contact)}</table>
        <div style="height:1px;background:#e2e8f0;margin:22px 0"></div>
        <div style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#2563eb">Project details</div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${table(project)}</table>
        <div style="margin-top:22px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px">
          <div style="margin-bottom:8px;font-size:13px;font-weight:700;color:#0f172a">${escapeHtml(messageLabel)}</div>
          <div style="font-size:14px;line-height:1.65;color:#334155;word-break:break-word">${safeMessage}</div>
        </div>
        <div style="height:1px;background:#e2e8f0;margin:22px 0 16px"></div>
        <div style="font-size:12px;color:#64748b">Submitted: ${escapeHtml(timestamp)}</div>
      </td></tr>
    </table>
  </div>
</body></html>`,
    text: [
      "NORALIX LABS",
      title.toUpperCase(),
      "",
      "CONTACT INFORMATION",
      textFields(contact),
      "",
      "PROJECT DETAILS",
      textFields(project),
      "",
      messageLabel,
      display(message),
      "",
      `Submitted: ${timestamp}`,
    ].join("\n"),
  };
}

export function renderContactNotification(payload: ContactSubmission & { createdAt: Date }) {
  return renderNotification(
    "New Contact Submission",
    [
      { label: "Name", value: payload.name },
      { label: "Company", value: payload.company },
      { label: "Phone", value: payload.phone },
      { label: "Email", value: payload.email },
    ],
    [
      { label: "Project Stage", value: payload.projectStage },
      { label: "Service Interest", value: payload.interest },
    ],
    "Message",
    payload.message,
    payload.createdAt,
  );
}

export function renderRfqNotification(payload: RfqSubmission & { createdAt: Date }) {
  return renderNotification(
    "New RFQ Submission",
    [
      { label: "Name", value: payload.name },
      { label: "Company", value: payload.company },
      { label: "Phone", value: payload.phone },
      { label: "Email", value: payload.email },
    ],
    [
      { label: "Dosage Form", value: payload.dosageForm },
      { label: "Project Stage", value: payload.projectStage },
      { label: "Target Markets", value: payload.targetMarkets },
      { label: "Desired Timeline", value: payload.timeline },
    ],
    "Brief Requirements",
    payload.requirements,
    payload.createdAt,
  );
}
