"use client";

import * as React from "react";
import { motion } from "framer-motion";

const stages = [
  {
    title: "Product Brief & Feasibility",
    desc: "Understanding your molecule, target market, and regulatory pathway.",
  },
  {
    title: "Formulation Development",
    desc: "Prototype development, excipient screening, and optimization cycles.",
  },
  {
    title: "Analytical Method Development",
    desc: "Development, qualification, and validation of all required analytical methods.",
  },
  {
    title: "Stability & Compatibility Studies",
    desc: "ICH-compliant stability chambers, packaging compatibility and shelf-life determination.",
  },
  {
    title: "Dossier Preparation",
    desc: "CTD/eCTD module compilation and pre-submission regulatory review.",
  },
  {
    title: "Technology Transfer & Commercialization",
    desc: "Complete tech transfer documentation and scale-up support for manufacturing.",
  },
] as const;

export function ProcessSection() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 20%",
          end: "bottom 70%",
          scrub: 1,
          onUpdate(self) {
            setProgress(self.progress);
          },
        });
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={ref} className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
        <div className="space-y-4">
          <div className="text-sm font-medium text-black/60">Workflow</div>
          <h2 className="text-balance font-[var(--font-serif)] text-4xl tracking-tight">
            A clear process from brief to commercialization.
          </h2>
          <p className="max-w-xl text-black/55">
            We align scope, deliverables, and documentation to match your stage
            and target markets.
          </p>
        </div>
        <div className="glass rounded-3xl p-6 text-sm text-black/55">
          Vertical timeline for reliability on mobile, with a scroll-drawn line
          and stage nodes that fill as you progress.
        </div>
      </div>

      <div className="mt-10 glass rounded-3xl p-8">
        <div className="relative grid gap-8 lg:grid-cols-[120px_1fr]">
          <div className="relative hidden lg:block">
            <svg className="sticky top-28 h-[520px] w-full" viewBox="0 0 10 520" fill="none">
              <path d="M5 5V515" stroke="rgba(0,0,0,0.10)" strokeWidth="2" strokeLinecap="round" />
              <motion.path
                d="M5 5V515"
                stroke="#00c4b4"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: progress }}
              />
            </svg>
          </div>

          <div className="space-y-4">
            {stages.map((s, i) => {
              const nodeActive = progress >= i / (stages.length - 1) - 0.02;
              const alignRight = i % 2 === 1;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.7, ease: [0.17, 0.17, 0.43, 1] }}
                  className={"relative grid gap-4 lg:grid-cols-2 " + (alignRight ? "lg:[&>div]:col-start-2" : "")}
                >
                  <div className="glass rounded-3xl p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-sm font-semibold text-black/70">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div
                        className="h-3 w-3 rounded-full border border-black/15"
                        style={{
                          backgroundColor: nodeActive ? "#00c4b4" : "rgba(0,0,0,0.06)",
                        }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-2 text-lg font-semibold">{s.title}</div>
                    <div className="mt-2 text-sm text-black/55">{s.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

