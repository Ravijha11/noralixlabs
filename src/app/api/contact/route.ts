import { NextResponse } from "next/server";

import { getResendClient, getResendDefaults } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
    }

    // honeypot
    if (body.gotcha) {
      return NextResponse.json({ ok: true });
    }

    const createdAt = new Date().toISOString();

    const email = String(body.email ?? "").trim();
    const name = String(body.name ?? "").trim();
    const company = String(body.company ?? "").trim();
    const interest = String(body.interest ?? "").trim();
    const projectStage = String(body.projectStage ?? "").trim();
    const message = String(body.message ?? "").trim();

    const resend = getResendClient();
    const { from, to } = getResendDefaults();

    await resend.emails.send({
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

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 }
    );
  }
}

