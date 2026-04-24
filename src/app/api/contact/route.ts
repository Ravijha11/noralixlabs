import { NextResponse } from "next/server";

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

    // For now: log and return success.
    // You can later replace this with nodemailer (SMTP) or an email API.
    console.log("CONTACT_SUBMISSION", {
      name: body.name,
      company: body.company,
      email: body.email,
      interest: body.interest,
      projectStage: body.projectStage,
      message: body.message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 }
    );
  }
}

