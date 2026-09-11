import { NextResponse } from "next/server";

import { validateContactSubmission } from "@/lib/inquiries";
import { takeSubmissionSlot } from "@/lib/rate-limit";
import { readLimitedBody } from "@/lib/request-body";
import { sendContactNotification } from "@/lib/resend";

const MAX_BODY_BYTES = 20_000;

export async function POST(req: Request) {
  try {
    if (!req.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return NextResponse.json({ ok: false, error: "Invalid request format." }, { status: 400 });
    }
    const bytes = await readLimitedBody(req, MAX_BODY_BYTES);
    if (!bytes) {
      return NextResponse.json({ ok: false, error: "Request is too large." }, { status: 413 });
    }

    const body = (() => {
      try {
        return JSON.parse(new TextDecoder().decode(bytes));
      } catch {
        return null;
      }
    })();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ ok: false, error: "Invalid request format." }, { status: 400 });
    }
    const input = body as Record<string, unknown>;
    if (typeof input.gotcha === "string" && input.gotcha.trim()) {
      return NextResponse.json({ ok: true });
    }

    const limit = takeSubmissionSlot(req, "contact");
    if (!limit.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many submissions. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
      );
    }

    const validated = validateContactSubmission(input);
    if (!validated.ok) {
      return NextResponse.json(
        { ok: false, error: "Please correct the highlighted fields.", errors: validated.errors },
        { status: 400 },
      );
    }

    await sendContactNotification(validated.data, new Date());
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] notification submission failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { ok: false, error: "Something went wrong while submitting your inquiry. Please try again." },
      { status: 500 },
    );
  }
}
