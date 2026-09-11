import { NextResponse } from "next/server";

import { validateRfqSubmission } from "@/lib/inquiries";
import { takeSubmissionSlot } from "@/lib/rate-limit";
import { readLimitedBody } from "@/lib/request-body";
import { sendRfqNotification } from "@/lib/resend";

const MAX_BODY_BYTES = 20_000;

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type")?.toLowerCase() ?? "";
    if (!contentType.includes("multipart/form-data") && !contentType.includes("application/x-www-form-urlencoded")) {
      return NextResponse.json({ ok: false, error: "Invalid request format." }, { status: 400 });
    }
    const bytes = await readLimitedBody(req, MAX_BODY_BYTES);
    if (!bytes) {
      return NextResponse.json({ ok: false, error: "Request is too large." }, { status: 413 });
    }

    const formData = await new Response(bytes, { headers: { "content-type": contentType } }).formData().catch(() => null);
    if (!formData) {
      return NextResponse.json({ ok: false, error: "Invalid request format." }, { status: 400 });
    }
    const input = Object.fromEntries(formData.entries());
    if (typeof input._gotcha === "string" && input._gotcha.trim()) {
      return NextResponse.json({ ok: true });
    }

    const limit = takeSubmissionSlot(req, "rfq");
    if (!limit.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many submissions. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
      );
    }

    const validated = validateRfqSubmission(input);
    if (!validated.ok) {
      return NextResponse.json(
        { ok: false, error: "Please correct the highlighted fields.", errors: validated.errors },
        { status: 400 },
      );
    }

    await sendRfqNotification(validated.data, new Date());
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[rfq] notification submission failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { ok: false, error: "Something went wrong while submitting your inquiry. Please try again." },
      { status: 500 },
    );
  }
}
