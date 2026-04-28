import { NextResponse } from "next/server";

import { getResendClient, getResendDefaults } from "@/lib/resend";

function pick(fd: FormData, key: string) {
  const v = fd.get(key);
  if (typeof v !== "string") return "";
  return v.trim();
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData().catch(() => null);
    if (!fd) {
      return NextResponse.json({ ok: false, error: "Invalid form data." }, { status: 400 });
    }

    // honeypot
    if (pick(fd, "_gotcha")) {
      return NextResponse.json({ ok: true });
    }

    const createdAt = new Date().toISOString();

    const name = pick(fd, "name");
    const email = pick(fd, "email");
    const company = pick(fd, "company");
    const phone = pick(fd, "phone");
    const dosageForm = pick(fd, "dosage_form");
    const projectStage = pick(fd, "project_stage");
    const targetMarkets = pick(fd, "target_markets");
    const timeline = pick(fd, "timeline");
    const requirements = pick(fd, "requirements");

    const resend = getResendClient();
    const { from, to } = getResendDefaults();

    await resend.emails.send({
      from,
      to,
      subject: "Noralix Labs — RFQ submission",
      replyTo: email ? [email] : undefined,
      text: [
        "New RFQ submission",
        "",
        `Name: ${name || "-"}`,
        `Email: ${email || "-"}`,
        `Company: ${company || "-"}`,
        `Phone: ${phone || "-"}`,
        "",
        `Dosage form: ${dosageForm || "-"}`,
        `Project stage: ${projectStage || "-"}`,
        `Target markets: ${targetMarkets || "-"}`,
        `Desired timeline: ${timeline || "-"}`,
        "",
        "Brief requirements:",
        requirements || "-",
        "",
        `Created at: ${createdAt}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 }
    );
  }
}

