"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useLenis } from "@/lib/lenis-provider";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/expertise", label: "Expertise" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { scrollY } = useScroll();
  const { scrollTo } = useLenis();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string>(() => pathname ?? "/");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const brandClass = scrolled ? "text-[#0b1a14]" : "text-white";

  const scrollProgress = useSpring(scrollY, { stiffness: 120, damping: 30 });
  const [progress, setProgress] = React.useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(h > 0 ? Math.min(1, Math.max(0, latest / h)) : 0);
  });

  React.useEffect(() => {
    setActive(pathname ?? "/");
  }, [pathname]);

  function onNavClick(href: string) {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      scrollTo(href);
      return;
    }
    router.push(href);
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={scrolled ? "solid" : "clear"}
      variants={{
        clear: { backdropFilter: "blur(0px)", backgroundColor: "rgba(10,14,26,0)" },
        solid: {
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(10,14,26,0.65)",
        },
      }}
      transition={{ duration: 0.25 }}
    >
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent">
        <div className="h-full bg-[#00c4b4]" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-left" aria-label="Go to Noralixlabs homepage">
          <span className={"text-sm font-semibold tracking-tight " + brandClass}>Noralixlabs</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={`Go to ${item.label} page`}
              className={
                "transition-colors hover:text-white " +
                (active === item.href ? "text-[#00c4b4]" : "")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavClick("/contact")}
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#00c4b4]/50 bg-white/0 px-4 text-sm font-medium text-white shadow-[0_0_0_0_rgba(0,196,180,0.0)] transition hover:border-[#00c4b4] hover:shadow-[0_0_32px_rgba(0,196,180,0.25)]"
            aria-label="Go to Contact page"
          >
            Get in Touch
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="border-t border-white/10 bg-[#0a0e1a]/90 backdrop-blur md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
              <div className="grid gap-2">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-label={`Go to ${item.label} page`}
                    className={
                      "rounded-2xl px-3 py-3 text-left text-sm text-white/80 hover:bg-white/5 hover:text-white " +
                      (active === item.href ? "text-[#00c4b4]" : "")
                    }
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

