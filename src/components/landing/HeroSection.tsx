"use client";

import * as React from "react";
import gsap from "gsap";
import { CustomEase, ScrollTrigger } from "gsap/all";

import { useLenis } from "@/lib/lenis-provider";

export function HeroSection() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const { lenis } = useLenis();
  const [indicatorOpacity, setIndicatorOpacity] = React.useState(1);

  React.useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7801/ingest/e84a15bc-cbf7-43cb-9efe-a6699252c008", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "f5b097" },
      body: JSON.stringify({
        sessionId: "f5b097",
        runId: "pre-fix",
        hypothesisId: "H1",
        location: "src/components/landing/HeroSection.tsx:HeroEffect:enter",
        message: "Hero GSAP effect enter",
        data: {
          hasSectionRef: Boolean(sectionRef.current),
          reducedMotion:
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    gsap.registerPlugin(CustomEase, ScrollTrigger);
    CustomEase.create("customEase", "M0,0 C0.17,0.17 0.43,1 1,1");

    const ctx = gsap.context(() => {
      const h1 = sectionRef.current?.querySelector("h1");
      // #region agent log
      fetch("http://127.0.0.1:7801/ingest/e84a15bc-cbf7-43cb-9efe-a6699252c008", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "f5b097" },
        body: JSON.stringify({
          sessionId: "f5b097",
          runId: "pre-fix",
          hypothesisId: "H2",
          location: "src/components/landing/HeroSection.tsx:HeroEffect:ctx",
          message: "Hero ctx created; initial h1 styles",
          data: h1
            ? {
                text: (h1.textContent ?? "").trim().slice(0, 80),
                inlineOpacity: (h1 as HTMLElement).style.opacity || null,
                computedOpacity: window.getComputedStyle(h1).opacity,
                computedVisibility: window.getComputedStyle(h1).visibility,
                computedDisplay: window.getComputedStyle(h1).display,
              }
            : { h1Found: false },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion

      const tl = gsap.timeline();
      tl.eventCallback("onStart", () => {
        const el = sectionRef.current?.querySelector("h1");
        // #region agent log
        fetch("http://127.0.0.1:7801/ingest/e84a15bc-cbf7-43cb-9efe-a6699252c008", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "f5b097" },
          body: JSON.stringify({
            sessionId: "f5b097",
            runId: "pre-fix",
            hypothesisId: "H3",
            location: "src/components/landing/HeroSection.tsx:HeroEffect:tl:onStart",
            message: "Hero GSAP timeline started",
            data: el
              ? {
                  progress: tl.progress(),
                  computedOpacity: window.getComputedStyle(el).opacity,
                  inlineOpacity: (el as HTMLElement).style.opacity || null,
                }
              : { progress: tl.progress(), h1Found: false },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion
      });
      tl.eventCallback("onComplete", () => {
        const el = sectionRef.current?.querySelector("h1");
        // #region agent log
        fetch("http://127.0.0.1:7801/ingest/e84a15bc-cbf7-43cb-9efe-a6699252c008", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "f5b097" },
          body: JSON.stringify({
            sessionId: "f5b097",
            runId: "pre-fix",
            hypothesisId: "H4",
            location: "src/components/landing/HeroSection.tsx:HeroEffect:tl:onComplete",
            message: "Hero GSAP timeline complete",
            data: el
              ? {
                  progress: tl.progress(),
                  computedOpacity: window.getComputedStyle(el).opacity,
                  inlineOpacity: (el as HTMLElement).style.opacity || null,
                }
              : { progress: tl.progress(), h1Found: false },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion
      });

      tl.to(".hero .hero-bg", {
        scale: 1,
        ease: "customEase",
        duration: 1,
      })
        .from(
          ".hero .button",
          {
            opacity: 0,
            y: "1rem",
            ease: "customEase",
            duration: 1,
          },
          "<0.4"
        );

      // after a couple frames, re-check h1 visibility (captures "flash then hide" behavior)
      let frames = 0;
      const raf = () => {
        frames += 1;
        if (frames === 2 || frames === 30) {
          const el = sectionRef.current?.querySelector("h1");
          // #region agent log
          fetch("http://127.0.0.1:7801/ingest/e84a15bc-cbf7-43cb-9efe-a6699252c008", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "f5b097" },
            body: JSON.stringify({
              sessionId: "f5b097",
              runId: "pre-fix",
              hypothesisId: "H5",
              location: "src/components/landing/HeroSection.tsx:HeroEffect:rafCheck",
              message: "Hero h1 style check after frames",
              data: el
                ? {
                    frames,
                    tlProgress: tl.progress(),
                    computedOpacity: window.getComputedStyle(el).opacity,
                    computedVisibility: window.getComputedStyle(el).visibility,
                    computedDisplay: window.getComputedStyle(el).display,
                    inlineOpacity: (el as HTMLElement).style.opacity || null,
                    inlineTransform: (el as HTMLElement).style.transform || null,
                  }
                : { frames, tlProgress: tl.progress(), h1Found: false },
              timestamp: Date.now(),
            }),
          }).catch(() => {});
          // #endregion
        }
        if (frames < 30) requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      return;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  React.useEffect(() => {
    // Fade indicator out after 100px scroll (prefer Lenis if present)
    if (!lenis) return;

    const onScroll = (e: unknown) => {
      const scroll =
        typeof e === "object" && e && "scroll" in e
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (e as any).scroll
          : window.scrollY;
      setIndicatorOpacity(scroll > 100 ? 0 : 1);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (lenis as any).on?.("scroll", onScroll);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (lenis as any).off?.("scroll", onScroll);
    };
  }, [lenis]);

  React.useEffect(() => {
    // Lenis is handled globally via LenisProvider.
  }, []);

  return (
    <section ref={sectionRef} className="hero relative h-[100vh] overflow-hidden">
      <div className="hero-bg absolute inset-0 will-change-transform" style={{ transform: "scale(1.4)" }}>
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/8485632-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="hero-bg-gradient absolute inset-0 opacity-15 mix-blend-multiply" />
      </div>

      {/* keep video clear; rely on text shadow for readability */}

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full px-[6%]">
          <div className="max-w-full sm:max-w-[85%] lg:max-w-[55%] drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
            <h1
              text-split=""
              className="font-[var(--font-serif)] text-white"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                lineHeight: 1.05,
              }}
            >
              One CRO Partner
              <br />
              for Your <span className="text-[#00c4b4]">Drug Program</span>
            </h1>

            <h2 className="hero-subtitle hero-description mt-5 max-w-2xl text-pretty text-base font-medium text-white/75 sm:text-lg">
              Formulation • Testing • Stability • Regulatory
            </h2>

            <a href="#contact" className="button is-primary mt-7 inline-flex">
              <div>Partner with Us</div>
              <div className="button_icon-wrap is-premium">
                <svg viewBox="0 0 8 8" className="h-3 w-3">
                  <path
                    d="M1 4H7M7 4L4 1M7 4L4 7"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-opacity"
        style={{ opacity: indicatorOpacity }}
        aria-hidden="true"
      >
        <div className="hero-scroll-indicator">↓</div>
      </div>
    </section>
  );
}

