import Link from "next/link";
import Image from "next/image";

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
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-14 w-[220px] max-w-[48vw] items-center overflow-hidden sm:w-[260px] sm:max-w-none md:w-[300px]">
            <Image
              src="/logo.png"
              alt="Noralix Labs"
              width={240}
              height={60}
              priority
              className="h-14 w-auto -translate-y-[1px] origin-left scale-[1.25] object-contain sm:scale-[1.18] md:scale-[1.12]"
            />
          </div>
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

