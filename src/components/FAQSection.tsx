"use client";

import * as React from "react";

const faqs = [
  {
    q: "What pharmaceutical development services does Noralixlabs offer?",
    a: "We offer formulation development, analytical method validation, stability studies, packaging compatibility, vendor qualification, CTD/eCTD dossier preparation, and technology transfer — covering all dosage forms from tablets to injectables.",
  },
  {
    q: "What dosage forms does Noralixlabs develop?",
    a: "Tablets, capsules, injectable formulations, semi-solids (ointments/creams/gels), liquid orals (syrups/suspensions/solutions), and dry powders & sachets.",
  },
  {
    q: "Is Noralixlabs ICH compliant?",
    a: "Yes — all work is aligned to ICH Q1A(R2) for stability, ICH Q2(R1) for analytical validation, and ICH Q8-Q11 for pharmaceutical development.",
  },
  {
    q: "Does Noralixlabs prepare CTD and eCTD dossiers?",
    a: "Yes. We compile CTD Modules 1-5 and format eCTD submissions for FDA, EMA, CDSCO, and WHO regulatory filings.",
  },
  {
    q: "Can Noralixlabs support technology transfer?",
    a: "Yes. We provide complete tech transfer documentation and scale-up support from development to commercial manufacturing.",
  },
  {
    q: "How do I get started?",
    a: "Fill out our contact form with your molecule details and target market. We respond within 24 hours.",
  },
] as const;

export function FAQSection() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <div className="text-xs font-semibold tracking-[0.24em] text-[#00c4b4]">
          FAQ
        </div>
        <h2 className="text-balance font-[var(--font-serif)] text-4xl tracking-tight">
          Frequently Asked Questions About Our Pharma CRO Services
        </h2>
        <p className="max-w-2xl text-black/55">
          Quick answers about our pharmaceutical development capabilities, ICH
          alignment, and regulatory deliverables.
        </p>
      </div>

      <div className="mt-10 divide-y divide-black/10 rounded-3xl border border-black/10 bg-white/60">
        {faqs.map((item) => (
          <details key={item.q} className="group p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
              <span className="text-base font-semibold text-[#0b1a14]">
                {item.q}
              </span>
              <span
                className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-black/10 text-[#0b1a14]/70 transition group-open:border-[#00c4b4]/50 group-open:text-[#00c4b4]"
                aria-hidden="true"
              >
                +
              </span>
            </summary>

            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-black/60">
                  {item.a}
                </p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

