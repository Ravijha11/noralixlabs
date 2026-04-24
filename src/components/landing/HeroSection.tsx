"use client";

import * as React from "react";
import gsap from "gsap";
import { CustomEase, ScrollTrigger } from "gsap/all";
import SplitType from "split-type";

import { useLenis } from "@/lib/lenis-provider";

export function HeroSection() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const { lenis } = useLenis();
  const [indicatorOpacity, setIndicatorOpacity] = React.useState(1);

  React.useEffect(() => {
    gsap.registerPlugin(CustomEase, ScrollTrigger);
    CustomEase.create("customEase", "M0,0 C0.17,0.17 0.43,1 1,1");

    const ctx = gsap.context(() => {
      const split = new SplitType("[text-split]", {
        types: "words,chars,lines",
        tagName: "span",
      });

      gsap.set("[text-split]", { opacity: 1 });

      const tl = gsap.timeline();
      tl.to(".hero .hero-bg", {
        scale: 1,
        ease: "customEase",
        duration: 1,
      })
        .from(
          ".hero h1 .line",
          {
            opacity: 0,
            y: "1rem",
            ease: "customEase",
            duration: 1,
            stagger: { amount: 0.1 },
          },
          "<0.2"
        )
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

      return () => {
        split.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    type Bubble = {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      alpha: number;
      layer: 1 | 2 | 3;
    };

    let w = 0;
    let h = 0;
    let dpr = 1;
    let layer1: Bubble[] = [];
    let layer2: Bubble[] = [];
    let layer3: Bubble[] = [];

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function drawBackground(c: CanvasRenderingContext2D) {
      const g = c.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#020f0e");
      g.addColorStop(1, "#041a18");
      c.fillStyle = g;
      c.fillRect(0, 0, w, h);
    }

    function drawBubble(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      alpha: number
    ) {
      const bodyGrad = c.createRadialGradient(
        x - r * 0.3,
        y - r * 0.35,
        r * 0.05,
        x,
        y,
        r
      );
      bodyGrad.addColorStop(0, `rgba(160, 255, 245, ${alpha * 0.95})`);
      bodyGrad.addColorStop(0.25, `rgba(0, 210, 195, ${alpha * 0.7})`);
      bodyGrad.addColorStop(0.6, `rgba(0, 150, 140, ${alpha * 0.4})`);
      bodyGrad.addColorStop(1, `rgba(0, 60, 55, ${alpha * 0.05})`);

      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fillStyle = bodyGrad;
      c.fill();

      c.strokeStyle = `rgba(100, 255, 235, ${alpha * 0.25})`;
      c.lineWidth = Math.max(0.3, r * 0.04);
      c.stroke();

      const specGrad = c.createRadialGradient(
        x - r * 0.35,
        y - r * 0.38,
        0,
        x - r * 0.35,
        y - r * 0.38,
        r * 0.25
      );
      specGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.7})`);
      specGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

      c.beginPath();
      c.arc(x - r * 0.35, y - r * 0.38, r * 0.25, 0, Math.PI * 2);
      c.fillStyle = specGrad;
      c.fill();
    }

    function init() {
      const c = canvasRef.current;
      if (!c) return;
      const parent = c.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      layer1 = Array.from({ length: 6 }, () => ({
        layer: 1 as const,
        r: rand(80, 180),
        x: rand(0, w * 0.3),
        y: rand(0, h),
        alpha: rand(0.08, 0.15),
        dx: rand(0.1, 0.3),
        dy: rand(-0.05, 0.1),
      }));

      layer2 = Array.from({ length: 18 }, () => ({
        layer: 2 as const,
        r: rand(15, 55),
        x: rand(0, w),
        y: rand(0, h),
        alpha: rand(0.35, 0.7),
        dx: rand(-0.4, 0.4),
        dy: rand(-0.3, 0.3),
      }));

      layer3 = Array.from({ length: 120 }, () => ({
        layer: 3 as const,
        r: rand(3, 18),
        x: rand(w * 0.75, w),
        y: rand(0, h),
        alpha: rand(0.25, 0.7),
        dx: rand(-0.05, 0.05),
        dy: rand(-0.1, 0.1),
      }));
    }

    function step() {
      context.clearRect(0, 0, w, h);
      drawBackground(context);

      context.filter = "blur(12px)";
      for (const b of layer1) {
        drawBubble(context, b.x, b.y, b.r, b.alpha);
        b.x += b.dx;
        b.y += b.dy;
        if (b.x > w + b.r) b.x = -b.r;
        if (b.x < -b.r) b.x = w + b.r;
        if (b.y > h + b.r) b.y = -b.r;
        if (b.y < -b.r) b.y = h + b.r;
      }

      context.filter = "none";
      for (const b of layer2) {
        drawBubble(context, b.x, b.y, b.r, b.alpha);
        b.x += b.dx;
        b.y += b.dy;
        if (b.x + b.r > w || b.x - b.r < 0) b.dx *= -1;
        if (b.y + b.r > h || b.y - b.r < 0) b.dy *= -1;
      }

      for (const b of layer3) {
        drawBubble(context, b.x, b.y, b.r, b.alpha);
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < w * 0.65) b.dx += 0.01;
        if (b.x > w + b.r) b.x = w * 0.75;
        if (b.y + b.r > h || b.y - b.r < 0) b.dy *= -1;
      }

      rafRef.current = requestAnimationFrame(step);
    }

    init();
    rafRef.current = requestAnimationFrame(step);

    let t: number | null = null;
    function onResize() {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => init(), 200);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      context.filter = "none";
    };
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
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-bg-gradient absolute inset-0" />
      </div>

      <div className="hero-bg_overlay absolute inset-0" />

      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,15,14,0.75)_0%,rgba(2,15,14,0.3)_50%,rgba(2,15,14,0.05)_100%)]" />
      </div>

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full px-[6%]">
          <div className="max-w-full sm:max-w-[85%] lg:max-w-[55%]">
            <h1
              text-split=""
              className="opacity-0 font-[var(--font-serif)] text-white"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                lineHeight: 1.05,
              }}
            >
              Pharmaceutical Product
              <br />
              Development. <span className="text-[#00c4b4]">Redefined.</span>
            </h1>

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

