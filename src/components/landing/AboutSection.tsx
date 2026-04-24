"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "@/components/landing/Section";

function useCountUp(target: number, startWhen: boolean) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!startWhen) return;
    const start = performance.now();
    const duration = 900;

    let raf = 0;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [startWhen, target]);

  return value;
}

export function AboutSection() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });

  const dosage = useCountUp(6, inView);

  return (
    <div ref={ref} className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-3xl p-6">
              <div className="text-4xl font-semibold text-[#0b1a14]">
                {dosage}+
              </div>
              <div className="mt-1 text-sm text-black/55">
                Dosage Form Categories
              </div>
            </div>
            <div className="glass rounded-3xl p-6">
              <div className="text-4xl font-semibold text-[#0b1a14]">ICH Q1–Q14</div>
              <div className="mt-1 text-sm text-black/55">Guidelines Covered</div>
            </div>
            <div className="glass rounded-3xl p-6 sm:col-span-2">
              <div className="text-4xl font-semibold text-[#0b1a14]">CTD/eCTD</div>
              <div className="mt-1 text-sm text-black/55">
                Dossier Format Expertise
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="space-y-5">
            <h2 className="text-balance font-[var(--font-serif)] text-4xl tracking-tight">
              A partner built for modern development programs.
            </h2>
            <p className="text-pretty text-black/55">
              We are a pharmaceutical product development company providing
              comprehensive and flexible support ranging from partial assistance
              to complete end-to-end technology solutions — from product
              development to commercialization.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Formulation optimization",
                "Analytical validation",
                "Packaging compatibility",
                "Stability (ICH-aligned)",
                "CTD/eCTD support",
              ].map((t) => (
                <motion.span
                  key={t}
                  className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/65"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-10 overflow-hidden border-y border-black/10 bg-black/[0.02] py-4">
        <div className="marquee whitespace-nowrap text-sm text-[#00a89a]/80">
          <span className="marquee__inner">
            Formulation Development · Analytical Validation · Stability Studies ·
            Regulatory Filing · Technology Transfer · Vendor Qualification ·
          </span>
          <span className="marquee__inner" aria-hidden="true">
            Formulation Development · Analytical Validation · Stability Studies ·
            Regulatory Filing · Technology Transfer · Vendor Qualification ·
          </span>
        </div>
      </div>
    </div>
  );
}

