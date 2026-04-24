"use client";

import * as React from "react";
import Lenis from "lenis";

type LenisCtx = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void;
};

const LenisContext = React.createContext<LenisCtx | null>(null);

export function useLenis() {
  const ctx = React.useContext(LenisContext);
  if (!ctx) {
    return {
      lenis: null,
      scrollTo: () => {},
    } satisfies LenisCtx;
  }
  return ctx;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = React.useRef<Lenis | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const biomeSenseOptions = {
      lerp: 0.05,
      wheelMultiplier: 0.5,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false,
    } as const;

    const lenis = new Lenis(
      biomeSenseOptions as unknown as ConstructorParameters<typeof Lenis>[0]
    );
    lenisRef.current = lenis;
    setReady(true);

    let cleanup: (() => void) | null = null;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      gsap.ticker.lagSmoothing(0);

      // Sync Lenis with GSAP ticker (time is in seconds)
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);

      lenis.on("scroll", () => ScrollTrigger.update());
      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(tick);
      };
    })();

    return () => {
      cleanup?.();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value = React.useMemo<LenisCtx>(() => {
    return {
      lenis: ready ? lenisRef.current : null,
      scrollTo: (target, options) => {
        const l = lenisRef.current;
        if (!l) return;
        l.scrollTo(target as never, { offset: options?.offset ?? 0 });
      },
    };
  }, [ready]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

