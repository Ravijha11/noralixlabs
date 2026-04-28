import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070a14]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div className="space-y-2">
            <Image
              src="/logo.png"
              alt="Noralix Labs"
              width={220}
              height={54}
              className="h-10 w-auto"
            />
            <p className="text-sm text-white/60">
              Scientifically sound. Regulatory compliant. Cost-effective.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70 md:justify-center">
            <a className="hover:text-white" href="#home">
              Home
            </a>
            <a className="hover:text-white" href="#services">
              Services
            </a>
            <a className="hover:text-white" href="#expertise">
              Expertise
            </a>
            <a className="hover:text-white" href="#about">
              About
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </div>

          <div className="text-sm text-white/60 md:text-right">
            © {new Date().getFullYear()} Noralixlabs
          </div>
        </div>
      </div>
    </footer>
  );
}

