"use client";

import * as React from "react";
import NextImage from "next/image";

type Props = {
  src: string;
  alt: string;
  trigger: boolean;
  className?: string;
  slices?: number;
  durationMs?: number;
  slideAmount?: string;
};

export function SlicedRevealImage({
  src,
  alt,
  trigger,
  className,
  slices = 64,
  durationMs = 1000,
  slideAmount = "15%",
}: Props) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);

  React.useEffect(() => {
    // Preload so slices don't animate before image is ready.
    let cancelled = false;
    const img = new window.Image();
    img.decoding = "async";
    img.loading = "eager";
    img.addEventListener("load", () => {
      if (cancelled) return;
      setIsLoaded(true);
    });
    img.addEventListener("error", () => {
      if (cancelled) return;
      // Still mark as loaded so we show the fallback <img>.
      setIsLoaded(true);
    });
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  React.useEffect(() => {
    if (!trigger) return;
    if (!isLoaded) return;
    setHasAnimated(true);
  }, [trigger, isLoaded]);

  React.useEffect(() => {
    if (!hasAnimated) return;
    const t = window.setTimeout(() => setIsDone(true), durationMs + 60);
    return () => window.clearTimeout(t);
  }, [hasAnimated, durationMs]);

  const sliceIndexes = React.useMemo(
    () => Array.from({ length: slices }, (_, i) => i),
    [slices],
  );

  return (
    <div
      className={[
        "slicedReveal",
        isLoaded ? "ready" : "",
        hasAnimated ? "animate-in" : "",
        isDone ? "done" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--slicedReveal-slices": slices,
          "--slicedReveal-duration": `${durationMs}ms`,
          "--slicedReveal-slide-amount": slideAmount,
          "--slicedReveal-src": `url("${src}")`,
        } as React.CSSProperties
      }
      role="img"
      aria-label={alt}
    >
      {/* Baseline visual; wrapper owns the accessible name */}
      <NextImage
        className="slicedReveal__img"
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 520px, (min-width: 640px) 90vw, 100vw"
        aria-hidden="true"
        priority
      />

      {/* Slice divs are decorative; wrapper carries the accessible name */}
      <div className="slicedReveal__slices" aria-hidden="true">
        {sliceIndexes.map((i) => (
          <div
            key={i}
            className="slicedReveal__slice"
            style={{ "--slicedReveal-i": i } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

