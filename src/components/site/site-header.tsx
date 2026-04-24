import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/dosage-forms", label: "Dosage Forms" },
  { href: "/quality", label: "Quality" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background text-sm font-semibold">
            NL
          </span>
          <span className="font-semibold tracking-tight">Noralix Labs</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/rfq"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden sm:inline-flex"
            )}
          >
            Request a Quote
          </Link>
          <Link href="/contact" className={buttonVariants({ variant: "default" })}>
            Talk to an Expert
          </Link>
        </div>
      </Container>
    </header>
  );
}

