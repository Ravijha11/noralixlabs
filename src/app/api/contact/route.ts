import { NextResponse } from "next/server";

import {
  getResendClient,
  getResendDefaults,
  runAfterResponse,
  sendContactNotification,
  type ContactNotificationPayload,
} from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactBody(body: Record<string, unknown>): {
  ok: true;
  payload: ContactNotificationPayload;
} | { ok: false; error: string } {
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const projectStage = String(body.projectStage ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name) return { ok: false, error: "Name is required." };
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "A valid email is required." };
  }
  if (!projectStage) return { ok: false, error: "Project stage is required." };
  if (!message) return { ok: false, error: "Message is required." };

  return {
    ok: true,
    payload: {
      name,
      email,
      projectStage,
      message,
      company: String(body.company ?? "").trim(),
      interest: String(body.interest ?? "").trim(),
    },
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
    }

    if (body.gotcha) {
      return NextResponse.json({ ok: true });
    }

    const validated = validateContactBody(body as Record<string, unknown>);
    if (!validated.ok) {
      return NextResponse.json(
        { ok: false, error: validated.error },
        { status: 400 }
      );
    }

    getResendClient();
    getResendDefaults();

    await runAfterResponse(sendContactNotification(validated.payload));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 }
    );
  }
}
