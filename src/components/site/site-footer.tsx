import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/site/container";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <Image
              src="/logo.png"
              alt="Noralix Labs"
              width={220}
              height={54}
              className="h-10 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              Comprehensive and flexible support from product development to
              commercialization.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div className="font-medium">Company</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  <Link className="hover:text-foreground" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-foreground" href="/capabilities">
                    Capabilities
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-foreground" href="/quality">
                    Quality
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Services</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  <Link className="hover:text-foreground" href="/services">
                    All services
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-foreground" href="/rfq">
                    Request a quote
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-foreground" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="font-medium">Legal</div>
            <div className="text-muted-foreground">
              <Link className="hover:text-foreground" href="/privacy">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Noralix Labs. All rights reserved.</div>
          <div>Made for performance, accessibility, and trust.</div>
        </div>
      </Container>
    </footer>
  );
}

