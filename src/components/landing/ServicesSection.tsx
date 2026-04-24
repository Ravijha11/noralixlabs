"use client";

import { motion } from "framer-motion";
import {
  Clock,
  FileText,
  FlaskConical,
  Layers,
  Package,
  TestTube,
  TrendingDown,
  Truck,
} from "lucide-react";

const services = [
  {
    title: "Formulation Development and Optimization",
    Icon: FlaskConical,
  },
  {
    title: "Analytical Method Development and Validation",
    Icon: TestTube,
  },
  {
    title: "Packaging Development and Compatibility Studies",
    Icon: Package,
  },
  {
    title: "API/Excipients Vendor Qualification",
    Icon: Truck,
  },
  {
    title: "Evaluation of Existing Formulation for Cost Reduction",
    Icon: TrendingDown,
  },
  {
    title: "Ready-to-Compress Granules/Pellets",
    Icon: Layers,
  },
  {
    title: "Stability Studies (ICH/Regulatory Guidelines)",
    Icon: Clock,
  },
  {
    title: "Dossier Preparation and Regulatory Filing (CTD/eCTD)",
    Icon: FileText,
  },
] as const;

export function ServicesSection() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
        <div className="space-y-4">
          <div className="text-xs font-semibold tracking-[0.24em] text-[#00c4b4]">
            WHAT WE DO
          </div>
          <h2 className="text-balance font-[var(--font-serif)] text-4xl tracking-tight">
            Comprehensive support—designed to move programs forward.
          </h2>
          <p className="max-w-xl text-black/55">
            From early formulation decisions to stability, packaging
            compatibility, and CTD/eCTD-ready documentation.
          </p>
        </div>

        <div className="glass rounded-3xl p-6 text-sm text-black/55">
          Deliverables are tailored to your stage and target markets—focused on
          clarity, traceability, and transfer readiness.
        </div>
      </div>

      <motion.div
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {services.map(({ title, Icon }) => (
          <motion.div
            key={title}
            className="glass group relative rounded-3xl p-6 transition will-change-transform"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.17, 0.17, 0.43, 1] }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white text-[#00c4b4]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="pointer-events-none translate-x-[-6px] opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                <div className="text-sm text-[#00c4b4]">→</div>
              </div>
            </div>

            <div className="mt-4 text-base font-semibold text-[#0b1a14]">{title}</div>
            <div className="mt-3 h-px w-full bg-black/10" />
            <div className="mt-3 text-sm text-black/55">
              High-quality deliverables with a regulatory-aligned mindset and
              practical scalability.
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-black/10 transition duration-200 group-hover:border-[#00c4b4]/40" />
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 shadow-[0_0_30px_rgba(0,196,180,0.12)] transition duration-200 group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

