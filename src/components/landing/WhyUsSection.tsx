"use client";

import { motion } from "framer-motion";
import { Beaker, ClipboardCheck, PiggyBank, Shuffle } from "lucide-react";

const items = [
  {
    num: "01",
    title: "Scientifically Sound",
    desc: "Rigorous R&D approach with practical decisions that translate to manufacturing.",
    Icon: Beaker,
  },
  {
    num: "02",
    title: "Regulatory Compliant",
    desc: "ICH/CTD/eCTD-oriented execution and documentation to reduce downstream rework.",
    Icon: ClipboardCheck,
  },
  {
    num: "03",
    title: "Cost-Effective",
    desc: "Optimization strategies focused on meaningful cost drivers and scalable processes.",
    Icon: PiggyBank,
  },
  {
    num: "04",
    title: "Flexible Engagement",
    desc: "From single-stage support to full technology transfer — we adapt to where you are in your development journey.",
    Icon: Shuffle,
  },
] as const;

export function WhyUsSection() {
  return (
    <div className="bg-transparent">
      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="text-sm font-medium text-black/60">Why choose us</div>
            <h2 className="text-balance font-[var(--font-serif)] text-4xl tracking-tight">
              Trust built through execution.
            </h2>
          </div>
          <div className="max-w-xl text-sm text-black/55">
            A high-integrity development partner focused on clarity, compliance,
            and measurable progress.
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map(({ num, title, desc, Icon }) => (
            <motion.div
              key={title}
              className="glass relative overflow-hidden rounded-3xl p-7"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.17, 0.17, 0.43, 1] }}
            >
              <div className="pointer-events-none absolute -top-10 right-4 select-none font-[var(--font-serif)] text-[180px] leading-none text-black/[0.05]">
                {num}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white">
                  <Icon className="h-5 w-5 text-[#00c4b4]" />
                </div>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              <div className="mt-4 h-px bg-black/10" />
              <motion.svg
                className="mt-4 h-2 w-full"
                viewBox="0 0 100 2"
                fill="none"
                initial={{}}
                whileInView={{}}
                viewport={{ once: true }}
              >
                <motion.path
                  d="M0 1H100"
                  stroke="#00c4b4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                />
              </motion.svg>
              <p className="mt-4 text-sm text-black/55">{desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 hidden items-center justify-between text-black/20 lg:flex">
          <div className="h-px w-full bg-black/10" />
        </div>
      </div>
    </div>
  );
}

