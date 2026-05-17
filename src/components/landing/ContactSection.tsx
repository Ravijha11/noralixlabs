"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { Suspense } from "react";

import { getContactInquiryFromSlug, SITE_CONTACT } from "@/lib/site";

const CONTACT_IMAGE = "/images/pharma-contact.png";

const PROJECT_STAGES = [
  "Early Development",
  "Formulation Optimization",
  "Analytical Validation",
  "Stability Studies",
  "Regulatory Filing",
  "Technology Transfer",
  "Not Sure Yet",
] as const;

const SERVICE_INTERESTS = [
  "Formulation development",
  "Analytical methods",
  "Packaging compatibility",
  "Stability studies",
  "Regulatory filing",
  "Technology transfer",
  "Not sure yet",
] as const;

const TRUST_BADGES = [
  "ICH-aligned development",
  "Regulatory-ready documentation",
  "End-to-end CRO support",
] as const;

const inputClassName =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 hover:border-blue-200 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/25";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const SUBMIT_TIMEOUT_MS = 30_000;

function ContactCallBar() {
  return (
    <div
      className="mb-8 flex flex-col gap-4 rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6"
      role="region"
      aria-label="Contact by phone or email"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/25">
          <Phone className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Speak with our team
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{SITE_CONTACT.phone}</p>
          <p className="mt-0.5 text-sm text-slate-600">Available during business hours (IST)</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={`tel:${SITE_CONTACT.phoneTel}`}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors duration-200 hover:bg-blue-700"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Call now
        </a>
        <a
          href={`mailto:${SITE_CONTACT.email}`}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
        >
          <Mail className="h-4 w-4" aria-hidden />
          Email us
        </a>
      </div>
    </div>
  );
}

function ContactSectionInner({ standalone = false }: { standalone?: boolean }) {
  const searchParams = useSearchParams();
  const messageRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const from = searchParams.get("from");
    if (!from) return;
    const inquiry = getContactInquiryFromSlug(from);
    if (!inquiry) return;

    const field = messageRef.current;
    if (!field) return;

    field.value = inquiry;
    field.focus({ preventScroll: true });
    field.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [searchParams]);
  const [status, setStatus] = React.useState<SubmitStatus>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const isSubmittingRef = React.useRef(false);

  const isSubmitting = status === "submitting";

  const sectionHeight = standalone
    ? "lg:min-h-[calc(100dvh-4rem)]"
    : "lg:min-h-screen";

  const onSubmit = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      interest: String(fd.get("interest") ?? ""),
      projectStage: String(fd.get("projectStage") ?? ""),
      message: String(fd.get("message") ?? ""),
      gotcha: String(fd.get("gotcha") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setError((data && "error" in data && data.error) || "Failed to submit.");
        setStatus("error");
        return;
      }

      if (typeof window !== "undefined") {
        const w = window as unknown as { gtag?: (...args: unknown[]) => void };
        w.gtag?.("event", "generate_lead", {
          event_category: "Contact Form",
          event_label: "Pharmaceutical Development Inquiry",
          value: 1,
        });
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      const timedOut =
        err instanceof DOMException && err.name === "TimeoutError";
      setError(
        timedOut
          ? "Request timed out. Please check your connection and try again."
          : "Failed to submit. Please try again."
      );
      setStatus("error");
    } finally {
      isSubmittingRef.current = false;
    }
  }, []);

  return (
    <article
      aria-labelledby="contact-heading"
      className={`flex w-full flex-col bg-slate-50 lg:grid lg:grid-cols-2 ${sectionHeight}`}
    >
      {/* Image — top on mobile, right on desktop */}
      <div
        className={`relative order-1 h-[320px] w-full shrink-0 overflow-hidden md:h-[440px] lg:order-2 lg:h-auto lg:min-h-full ${sectionHeight}`}
      >
        <Image
          src={CONTACT_IMAGE}
          alt="Pharmaceutical laboratory with scientists conducting quality analysis"
          fill
          priority={standalone}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/45 to-slate-900/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden p-8 text-white lg:block xl:p-10"
          aria-hidden="true"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
            Noralix Labs
          </p>
          <p className="mt-2 max-w-sm font-[var(--font-serif)] text-2xl leading-snug tracking-tight text-white">
            Science-led pharmaceutical development, built for regulatory confidence.
          </p>
        </div>
      </div>

      {/* Form — below image on mobile, left on desktop */}
      <div
        className={`order-2 flex flex-col justify-center bg-slate-50 px-4 py-10 sm:px-6 sm:py-12 md:px-10 lg:order-1 lg:px-12 lg:py-16 xl:px-16 ${sectionHeight}`}
      >
        <div className="mx-auto w-full max-w-xl">
          <ContactCallBar />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-3 font-[var(--font-serif)] text-3xl tracking-tight text-slate-900 sm:text-4xl lg:text-[2.35rem] lg:leading-tight"
          >
            Partner with our pharmaceutical development team
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
            Share your project stage and service needs. Our scientists will respond with a
            tailored development pathway for your dosage form and regulatory goals.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Key capabilities">
            {TRUST_BADGES.map((badge) => (
              <li key={badge}>
                <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-colors duration-200 hover:border-blue-200 hover:text-blue-700">
                  {badge}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgb(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgb(37,99,235,0.08)] sm:p-8">
            {status === "success" ? (
              <div className="grid gap-4" role="status" aria-live="polite">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-semibold text-blue-600">
                    ✓
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-slate-900">Message received</p>
                    <p className="text-sm text-slate-600">
                      We&apos;ll be in touch within one business day.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="inline-flex h-12 w-fit items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
                >
                  Send another inquiry
                </button>
                <p className="text-xs text-slate-500">
                  Direct line:{" "}
                  <a
                    className="font-medium text-blue-600 underline-offset-2 transition hover:text-blue-700 hover:underline"
                    href={`mailto:${SITE_CONTACT.email}`}
                  >
                    {SITE_CONTACT.email}
                  </a>{" "}
                  ·{" "}
                  <a
                    className="font-medium text-blue-600 underline-offset-2 transition hover:text-blue-700 hover:underline"
                    href={`tel:${SITE_CONTACT.phoneTel}`}
                  >
                    {SITE_CONTACT.phone}
                  </a>
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="grid gap-5"
                aria-busy={isSubmitting}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2" htmlFor="contact-name">
                    <span className="text-sm font-medium text-slate-800">
                      Name <span className="text-blue-600">*</span>
                    </span>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={inputClassName}
                      placeholder="Your full name"
                    />
                  </label>
                  <label className="grid gap-2" htmlFor="contact-company">
                    <span className="text-sm font-medium text-slate-800">Company</span>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className={inputClassName}
                      placeholder="Organization"
                    />
                  </label>
                </div>

                <label className="grid gap-2" htmlFor="contact-email">
                  <span className="text-sm font-medium text-slate-800">
                    Email <span className="text-blue-600">*</span>
                  </span>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClassName}
                    placeholder="you@company.com"
                  />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2" htmlFor="contact-project-stage">
                    <span className="text-sm font-medium text-slate-800">
                      Project Stage <span className="text-blue-600">*</span>
                    </span>
                    <select
                      id="contact-project-stage"
                      name="projectStage"
                      required
                      defaultValue=""
                      className={`${inputClassName} cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select stage…
                      </option>
                      {PROJECT_STAGES.map((stage) => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2" htmlFor="contact-interest">
                    <span className="text-sm font-medium text-slate-800">
                      Service Interest
                    </span>
                    <select
                      id="contact-interest"
                      name="interest"
                      defaultValue=""
                      className={`${inputClassName} cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select service…
                      </option>
                      {SERVICE_INTERESTS.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="grid gap-2" htmlFor="contact-message">
                  <span className="text-sm font-medium text-slate-800">
                    Message <span className="text-blue-600">*</span>
                  </span>
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className={`${inputClassName} min-h-36 resize-y py-3`}
                    placeholder="Dosage form, development stage, timelines, and regulatory target markets."
                  />
                </label>

                <input
                  type="text"
                  name="gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />

                <button
                  type="submit"
                  aria-busy={isSubmitting}
                  aria-disabled={isSubmitting}
                  className={`relative inline-flex h-12 min-h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-[background-color,box-shadow,transform] duration-300 ease-out hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto sm:min-w-[11rem] ${
                    isSubmitting
                      ? "pointer-events-none cursor-wait scale-[0.99] bg-blue-700"
                      : ""
                  }`}
                >
                  <span
                    className={`inline-flex min-w-[7.5rem] items-center justify-center gap-2 transition-opacity duration-300 ease-out ${
                      isSubmitting ? "opacity-0" : "opacity-100"
                    }`}
                    aria-hidden={isSubmitting}
                  >
                    Submit inquiry
                  </span>
                  <span
                    className={`absolute inset-0 inline-flex items-center justify-center gap-2 transition-opacity duration-300 ease-out ${
                      isSubmitting ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={!isSubmitting}
                  >
                    <span
                      className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
                      style={{ animationDuration: "0.85s" }}
                      aria-hidden="true"
                    />
                    Sending…
                  </span>
                </button>

                {status === "error" ? (
                  <div
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    {error}
                  </div>
                ) : null}

                <p className="text-xs leading-relaxed text-slate-500">
                  By submitting, you agree to be contacted about your pharmaceutical
                  development inquiry. We respect confidentiality and never share your
                  details with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ContactSectionFallback({ standalone = false }: { standalone?: boolean }) {
  const sectionHeight = standalone
    ? "lg:min-h-[calc(100dvh-4rem)]"
    : "lg:min-h-screen";

  return (
    <article
      aria-hidden
      className={`flex w-full animate-pulse flex-col bg-slate-50 lg:grid lg:grid-cols-2 ${sectionHeight}`}
    >
      <div className={`order-1 h-[320px] bg-slate-200 md:h-[440px] lg:order-2 lg:h-auto ${sectionHeight}`} />
      <div className={`order-2 bg-slate-100 px-4 py-10 lg:order-1 ${sectionHeight}`} />
    </article>
  );
}

export function ContactSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <Suspense fallback={<ContactSectionFallback standalone={standalone} />}>
      <ContactSectionInner standalone={standalone} />
    </Suspense>
  );
}
