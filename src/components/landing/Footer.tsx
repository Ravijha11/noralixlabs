import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/expertise", label: "Expertise" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const linkClassName =
  "text-sm text-slate-600 transition-colors duration-200 hover:text-blue-700";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-50">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-blue-100/60 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-48 w-48 rounded-full bg-cyan-100/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-4 sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-block" aria-label="Noralix Labs home">
              <Image
                src="/logo.png"
                alt="Noralix Labs"
                width={280}
                height={72}
                className="h-12 w-auto max-w-[240px] object-contain object-left sm:h-14"
              />
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Translating science into solutions
            </p>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              Pharmaceutical product development — scientifically sound, regulatory
              compliant, and cost-effective CRO services from India.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              Contact
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Share your project details and our team will respond via the contact form.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/15 transition-colors duration-200 hover:bg-blue-700"
            >
              Get a quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              Legal
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/privacy" className={linkClassName}>
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/rfq" className={linkClassName}>
                  Request a quote
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">
              © {year} Noralix Labs
              <br />
              All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 sm:text-left">
          <p>
            ICH-aligned development · Regulatory-ready documentation · End-to-end CRO
            support
          </p>
        </div>
      </div>
    </footer>
  );
}
