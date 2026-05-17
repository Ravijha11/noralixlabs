"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { getContactHrefFromSlug } from "@/lib/site";
import {
  EXPERTISE_CAPABILITIES,
  EXPERTISE_IMAGE_FALLBACK,
  expertiseItems,
  type ExpertiseItem,
} from "@/lib/expertise";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.17, 0.17, 0.43, 1] as const },
  },
};

function ExpertiseImage({
  src,
  alt,
  priority,
  imageLayout,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  imageLayout: ExpertiseItem["imageLayout"];
}) {
  const [imgSrc, setImgSrc] = React.useState(src);

  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 50vw"
      className={cn(
        "h-full w-full transition-transform duration-700 ease-out",
        imageLayout === "graphic" && "object-contain object-center p-0",
        imageLayout === "photo" && "object-cover group-hover:scale-[1.03]"
      )}
      onError={() => {
        if (imgSrc !== EXPERTISE_IMAGE_FALLBACK) {
          setImgSrc(EXPERTISE_IMAGE_FALLBACK);
        }
      }}
    />
  );
}

export function ExpertiseSectionBlock({
  item,
  reversed,
  embedded = false,
  isFirst = false,
}: {
  item: ExpertiseItem;
  reversed: boolean;
  embedded?: boolean;
  isFirst?: boolean;
}) {
  const num = String(item.index + 1).padStart(2, "0");

  return (
    <section
      id={item.slug}
      className={cn(
        "scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20",
        !isFirst && "border-t border-slate-200/80",
        embedded && isFirst && "pt-4"
      )}
      aria-labelledby={`expertise-${item.slug}-title`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        >
          <Link
            href={getContactHrefFromSlug(item.slug)}
            aria-label={`Contact us about ${item.title}`}
            className={cn(
              "group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2",
              reversed && "lg:order-2"
            )}
          >
            <ExpertiseImage
              src={item.image}
              alt={`${item.title} pharmaceutical development`}
              priority={item.index === 0}
              imageLayout={item.imageLayout}
            />
            <span className="absolute left-3 top-3 text-xs font-semibold tracking-wider text-blue-600/80">
              {num}
            </span>
            <span
              className="pointer-events-none absolute bottom-3 right-3 rounded-lg bg-slate-900/75 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            >
              Discuss this dosage form →
            </span>
          </Link>

          <div className={`space-y-5 ${reversed ? "lg:order-1" : ""}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              Dosage form expertise
            </p>
            <h2
              id={`expertise-${item.slug}-title`}
              className="font-[var(--font-serif)] text-3xl tracking-tight text-slate-900 sm:text-4xl"
            >
              {item.title}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-600">
              {item.summary}
            </p>

            <div>
              <p className="text-sm font-medium text-slate-800">Examples</p>
              <ul className="mt-3 space-y-2">
                {item.examples.map((example) => (
                  <li
                    key={example}
                    className="flex gap-2 text-sm text-slate-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {EXPERTISE_CAPABILITIES.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors duration-200 hover:border-blue-200 hover:text-blue-700"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ExpertiseSectionsList({ embedded = false }: { embedded?: boolean }) {
  return (
    <>
      {expertiseItems.map((item) => (
        <ExpertiseSectionBlock
          key={item.slug}
          item={item}
          reversed={item.index % 2 === 1}
          embedded={embedded}
          isFirst={item.index === 0}
        />
      ))}
    </>
  );
}

export function ExpertiseHomeSection() {
  return (
    <div className="bg-slate-50">
      <div className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <motion.div
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
          >
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                Dosage form expertise
              </p>
              <h2 className="font-[var(--font-serif)] text-3xl tracking-tight text-slate-900 sm:text-4xl">
                Pharmaceutical development across every major dosage form
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                Tablets, capsules, injectables, semi-solids, liquid orals, and
                dry powders — with development aligned to stability, scale-up,
                and regulatory-ready documentation.
              </p>
            </div>
            <Link
              href="/expertise"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition-colors duration-200 hover:border-blue-200 hover:text-blue-700"
            >
              View all expertise
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </div>

      <ExpertiseSectionsList embedded />
    </div>
  );
}

export function ExpertisePageContent() {
  return (
    <div className="bg-slate-50">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            className="max-w-3xl space-y-5"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              Noralix Labs · Expertise
            </p>
            <h1 className="font-[var(--font-serif)] text-4xl tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
              Pharmaceutical dosage form development, built for scale-up and
              regulatory confidence
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              From tablets and capsules to injectables, semi-solids, liquid
              orals, and dry powders — we align every development decision with
              stability, manufacturability, and transfer-ready documentation.
            </p>
          </motion.div>
        </div>
      </header>

      <ExpertiseSectionsList />

      <section className="border-t border-slate-200/80 bg-slate-900 py-16 text-white sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid gap-8 md:grid-cols-2 md:items-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                Next step
              </p>
              <h2 className="font-[var(--font-serif)] text-3xl tracking-tight sm:text-4xl">
                Ready to discuss your dosage form and development stage?
              </h2>
              <p className="text-slate-300">
                Share your target product profile and timelines — we will propose
                a scope aligned to ICH guidance and your regulatory pathway.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link
                href="/rfq"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors duration-200 hover:bg-blue-500"
              >
                Request a quote
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
