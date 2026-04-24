"use client";

import * as React from "react";

export function ContactSection() {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

      setStatus("success");
      form.reset();
    } catch {
      setError("Failed to submit. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5">
          <div className="text-sm font-medium text-black/60">Contact</div>
          <h2 className="text-balance font-[var(--font-serif)] text-4xl tracking-tight">
            Let’s build your next pharmaceutical product.
          </h2>
          <p className="max-w-xl text-black/55">
            Whether you need support at a specific stage or complete technology
            transfer — we customize our solutions to your needs.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-black/55">
            {["Scientifically sound", "Regulatory compliant", "Cost-effective"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-black/10 bg-white/70 px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-8">
          {status === "success" ? (
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white">
                  <span className="text-[#00c4b4]">✓</span>
                </div>
                <div className="text-lg font-semibold">Submitted</div>
              </div>
              <div className="text-sm text-black/55">
                We&apos;ll be in touch within 24 hours.
              </div>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-semibold text-black/70 hover:bg-black/5"
              >
                Send another message
              </button>
              <div className="mt-2 text-xs text-black/50">
                Or reach us directly:{" "}
                <a
                  className="text-[#00c4b4] hover:underline"
                  href="mailto:contact@noralixlabs.com"
                >
                  contact@noralixlabs.com
                </a>{" "}
                <span className="text-black/25">·</span> <span>India</span>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Name</span>
                  <input
                    name="name"
                    required
                    className="h-11 rounded-2xl border border-black/10 bg-white px-3 text-sm text-[#0b1a14] outline-none placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-[#00c4b4]/40"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Company</span>
                  <input
                    name="company"
                    className="h-11 rounded-2xl border border-black/10 bg-white px-3 text-sm text-[#0b1a14] outline-none placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-[#00c4b4]/40"
                    placeholder="Company"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-medium">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="h-11 rounded-2xl border border-black/10 bg-white px-3 text-sm text-[#0b1a14] outline-none placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-[#00c4b4]/40"
                  placeholder="you@company.com"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Project Stage</span>
                  <select
                    name="projectStage"
                    required
                    defaultValue=""
                    className="h-11 rounded-2xl border border-black/10 bg-white px-3 text-sm text-[#0b1a14] outline-none focus-visible:ring-2 focus-visible:ring-[#00c4b4]/40"
                  >
                    <option value="" disabled className="bg-white">
                      Select…
                    </option>
                    {[
                      "Early Development",
                      "Formulation Optimization",
                      "Analytical Validation",
                      "Stability Studies",
                      "Regulatory Filing",
                      "Technology Transfer",
                      "Not Sure Yet",
                    ].map((x) => (
                      <option key={x} value={x} className="bg-white">
                        {x}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">Service interest</span>
                  <select
                    name="interest"
                    className="h-11 rounded-2xl border border-black/10 bg-white px-3 text-sm text-[#0b1a14] outline-none focus-visible:ring-2 focus-visible:ring-[#00c4b4]/40"
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-white">
                      Select…
                    </option>
                    {[
                      "Formulation development",
                      "Analytical methods",
                      "Packaging compatibility",
                      "Stability studies",
                      "Regulatory filing",
                      "Technology transfer",
                      "Not sure yet",
                    ].map((x) => (
                      <option key={x} value={x} className="bg-white">
                        {x}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-medium">Message</span>
                <textarea
                  name="message"
                  required
                  className="min-h-36 rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-[#0b1a14] outline-none placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-[#00c4b4]/40"
                  placeholder="Briefly describe dosage form, stage, and timelines."
                />
              </label>

              {/* Honeypot */}
              <input
                type="text"
                name="gotcha"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex h-11 items-center justify-center rounded-full border border-[#00c4b4]/50 bg-[#d9f5ee] px-6 text-sm font-semibold text-[#0b6b60] transition hover:bg-[#c8f0e6] disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0b6b60]/30 border-t-[#0b6b60]" />
                    Sending...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>

              {status === "error" ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

