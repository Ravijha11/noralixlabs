"use client";

import * as React from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

export function MoleculeCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const nodesRef = React.useRef<Node[]>([]);
  const mouseRef = React.useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let w = 0;
    let h = 0;

    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      const parent = c.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Init nodes if needed
      if (!nodesRef.current.length) {
        const count = clamp(Math.floor((w * h) / 28000), 40, 60);
        nodesRef.current = Array.from({ length: count }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() * 0.6 - 0.3) * 0.6,
          vy: (Math.random() * 0.6 - 0.3) * 0.6,
        }));
      }
    }

    let resizeT: number | null = null;
    function onResize() {
      if (resizeT) window.clearTimeout(resizeT);
      resizeT = window.setTimeout(() => resize(), 120);
    }

    function onMouseMove(e: MouseEvent) {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    }
    function onMouseLeave() {
      mouseRef.current.active = false;
    }

    resize();
    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    function step() {
      context.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const maxLinkDist = 120;
      const repelDist = 150;

      // Move nodes
      for (const n of nodes) {
        // cursor repel
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < repelDist) {
            const f = (1 - dist / repelDist) * 0.6;
            n.vx += (dx / dist) * f * 0.15;
            n.vy += (dy / dist) * f * 0.15;
          }
        }

        n.x += n.vx;
        n.y += n.vy;

        // soft bounds
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = clamp(n.x, 0, w);
        n.y = clamp(n.y, 0, h);

        // tiny damping
        n.vx *= 0.995;
        n.vy *= 0.995;
      }

      // Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxLinkDist) {
            const t = 1 - dist / maxLinkDist;
            context.strokeStyle = `rgba(0,196,180,${0.15 * t})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        context.fillStyle = "rgba(0,196,180,0.6)";
        context.beginPath();
        context.arc(n.x, n.y, 2, 0, Math.PI * 2);
        context.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

