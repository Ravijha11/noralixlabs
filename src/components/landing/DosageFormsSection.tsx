"use client";

import * as React from "react";

const items = [
  {
    num: "01",
    title: "Tablets",
    desc: "Robust formulation and optimization support aligned to manufacturability.",
    hue: "rgba(0,196,180,0.18)",
  },
  {
    num: "02",
    title: "Capsules",
    desc: "Blend, fill, and stability considerations with transfer-ready documentation.",
    hue: "rgba(58,123,213,0.18)",
  },
  {
    num: "03",
    title: "Injectable formulations",
    desc: "Support for parenteral development needs with analytical rigor.",
    hue: "rgba(0,196,180,0.12)",
  },
  {
    num: "04",
    title: "Semi-solid dosage forms",
    desc: "Ointments, creams, and gels with rheology and stability focus.",
    hue: "rgba(58,123,213,0.12)",
  },
  {
    num: "05",
    title: "Liquid orals",
    desc: "Syrups, suspensions, and solutions with dosing and stability considerations.",
    hue: "rgba(0,196,180,0.16)",
  },
  {
    num: "06",
    title: "Dry powders & sachets",
    desc: "Powder blends and sachets optimized for flow, uniformity, and stability.",
    hue: "rgba(58,123,213,0.16)",
  },
] as const;

function Icon({
  kind,
  className,
}: {
  kind:
    | "tablets"
    | "capsules"
    | "injectables"
    | "semi_solids"
    | "liquid_orals"
    | "dry_powders";
  className?: string;
}) {
  const common = {
    className,
    width: "100%",
    height: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  } as const;

  switch (kind) {
    case "tablets":
      return (
        <svg {...common}>
          <path
            d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 6v12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "capsules":
      return (
        <svg {...common}>
          <path
            d="M8 16l8-8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M7.2 8.8a5.5 5.5 0 0 1 7.778 0l.422.422a5.5 5.5 0 0 1 0 7.778l-.622.622a5.5 5.5 0 0 1-7.778 0l-.422-.422a5.5 5.5 0 0 1 0-7.778l.622-.622Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "injectables":
      return (
        <svg {...common}>
          <path
            d="M14 4l6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M5 19l9-9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9 7l8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3.5 20.5l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "semi_solids":
      return (
        <svg {...common}>
          <path
            d="M7 6h10l-1 12H8L7 6Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 6V4h6v2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9 14h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "liquid_orals":
      return (
        <svg {...common}>
          <path
            d="M9 3h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M10 3v4l-2 3v9h8v-9l-2-3V3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 14h8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "dry_powders":
      return (
        <svg {...common}>
          <path
            d="M7 3h10v18H7V3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M7 7h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9.5 12.5c.6.6 1.4.6 2 0 .6-.6 1.4-.6 2 0 .6.6 1.4.6 2 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function DosageFormsSection() {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const panel = wrapper.querySelector<HTMLElement>("[data-panel]");
        const slides = gsap.utils.toArray<HTMLElement>("[data-slide]");
        const dots = gsap.utils.toArray<HTMLElement>("[data-dot]");

        if (!panel || !slides.length) return;

        gsap.set(slides, { autoAlpha: 0, y: 18 });
        gsap.set(slides[0], { autoAlpha: 1, y: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        slides.forEach((slide, i) => {
          const label = `s${i}`;
          tl.addLabel(label);
          if (i === 0) return;
          tl.to(slides[i - 1], { autoAlpha: 0, y: -18, duration: 0.5 }, label);
          tl.to(slide, { autoAlpha: 1, y: 0, duration: 0.6 }, label);
        });

        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          animation: tl,
          onUpdate(self) {
            const idx = Math.min(
              slides.length - 1,
              Math.floor(self.progress * slides.length)
            );
            setActiveIndex(idx);
            dots.forEach((d, i) => {
              d.dataset.active = i === idx ? "true" : "false";
            });
          },
        });
      }, wrapper);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(900px 500px at 50% 25%, ${
              items[activeIndex]?.hue ?? "rgba(0,196,180,0.14)"
            }, transparent 60%)`,
          }}
        />
      </div>

      <div
        data-panel
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <div className="text-sm font-medium text-black/60">Dosage forms</div>
              <h2 className="text-balance font-[var(--font-serif)] text-4xl tracking-tight">
                Why Choose Noralixlabs as Your Pharmaceutical Development Partner
              </h2>
              <p className="max-w-xl text-black/55">
                Demonstrated expertise across tablets, capsules, injectables,
                semi-solids, liquid orals, and dry powders — with development
                decisions aligned to stability, scale-up, and regulatory-ready
                documentation.
              </p>

              <div className="mt-8 flex items-start gap-4">
                <div className="relative mt-1">
                  <div className="absolute left-1/2 top-2 h-[140px] w-px -translate-x-1/2 bg-black/10" />
                  <div className="grid gap-4">
                    {items.map((it, i) => (
                      <div key={it.num} className="flex items-center gap-2">
                        <div
                          data-dot
                          data-active={i === activeIndex ? "true" : "false"}
                          className="h-3 w-3 rounded-full border border-black/15 bg-transparent transition"
                          style={{
                            transform:
                              i === activeIndex ? "scale(1.3)" : "scale(1)",
                            backgroundColor:
                              i === activeIndex ? "#00c4b4" : "transparent",
                            borderColor:
                              i === activeIndex ? "#00c4b4" : "rgba(0,0,0,0.18)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-black/55">
                  {items.map((it, i) => (
                    <div key={it.num} className={i === activeIndex ? "text-black/80" : ""}>
                      <span className="mr-2 text-black/35">{it.num}</span>
                      {it.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card relative p-8">
              {items.map((it, i) => {
                const kind =
                  i === 0
                    ? "tablets"
                    : i === 1
                      ? "capsules"
                      : i === 2
                        ? "injectables"
                        : i === 3
                          ? "semi_solids"
                          : i === 4
                            ? "liquid_orals"
                            : "dry_powders";

                return (
                  <div
                    key={it.num}
                    data-slide
                    className="absolute inset-0 flex flex-col justify-between p-8"
                    aria-hidden={i !== activeIndex}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-5xl font-semibold tracking-tight text-black/20">
                          {it.num}
                        </div>
                        <div className="h-12 w-12 text-[#00c4b4]">
                          <Icon kind={kind as never} />
                        </div>
                      </div>
                      <div className="text-2xl font-semibold">{it.title}</div>
                      <div className="max-w-md text-sm text-black/55">{it.desc}</div>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {[
                        "Development & optimization",
                        "Analytical strategy",
                        "Stability approach",
                        "Transfer-ready deliverables",
                      ].map((chip) => (
                        <div
                          key={chip}
                          className="rounded-2xl border border-black/10 bg-white/70 p-3 text-xs text-black/60"
                        >
                          {chip}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="invisible">
                <div className="text-5xl font-semibold">{items[0].num}</div>
                <div className="text-2xl font-semibold">{items[0].title}</div>
                <div className="text-sm">{items[0].desc}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

