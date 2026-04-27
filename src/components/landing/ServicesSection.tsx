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
    desc: "Prototype formulation design across all dosage forms — tablets, capsules, injectables, and semi-solids. Includes excipient screening, compatibility evaluation, and scale-up strategy with complete development documentation.",
    Icon: FlaskConical,
  },
  {
    title: "Analytical Method Development and Validation",
    desc: "ICH Q2(R1)-compliant development and full validation of HPLC, UV, dissolution, and assay methods. Method transfer packages and system suitability protocols included.",
    Icon: TestTube,
  },
  {
    title: "Packaging Development and Compatibility Studies",
    desc: "Primary and secondary packaging evaluation including extractables, leachables, and accelerated stress compatibility per ICH Q1B. Container closure integrity documentation provided.",
    Icon: Package,
  },
  {
    title: "API/Excipients Vendor Qualification",
    desc: "Supplier audit frameworks, CoA review protocols, and vendor qualification reports to ensure GMP-compliant, traceable raw material sourcing for both APIs and functional excipients.",
    Icon: Truck,
  },
  {
    title: "Evaluation of Existing Formulation for Cost Reduction",
    desc: "Systematic gap analysis of current formulations to identify excipient substitution opportunities, process simplifications, and batch size efficiencies — without compromising quality or regulatory status.",
    Icon: TrendingDown,
  },
  {
    title: "Ready-to-Compress Granules/Pellets",
    desc: "Wet granulation, dry granulation, and pelletization development with blend uniformity, flowability, and compressibility optimization. Scale-up and transfer documentation included.",
    Icon: Layers,
  },
  {
    title: "Stability Studies (ICH/Regulatory Guidelines)",
    desc: "Real-time and accelerated stability protocols per ICH Q1A(R2) — 25°C/60%RH, 30°C/65%RH, 40°C/75%RH zones. Includes degradation profiling, shelf-life determination, and regulatory-ready reports.",
    Icon: Clock,
  },
  {
    title: "Dossier Preparation and Regulatory Filing (CTD/eCTD)",
    desc: "Module 1-5 CTD compilation and eCTD-formatted submissions for FDA 505(b)(2), EMA MAA, CDSCO NDA/ANDAs, and WHO PQ dossiers. Pre-submission review support included.",
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
            Pharmaceutical Development Services — From Formulation to Regulatory
            Filing
          </h2>
          <p className="max-w-xl text-black/55">
            From early formulation decisions to stability, packaging
            compatibility, and CTD/eCTD-ready documentation.
          </p>
        </div>

        <div className="glass-card p-6 text-sm text-black/55">
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
        {services.map(({ title, desc, Icon }) => (
          <motion.div
            key={title}
            className="glass-card group relative p-6 transition will-change-transform"
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
              {desc}
            </div>

            <div className="pointer-events-none absolute inset-0 border border-black/10 transition duration-200 group-hover:border-[#00c4b4]/40" />
            <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[0_0_30px_rgba(0,196,180,0.12)] transition duration-200 group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

