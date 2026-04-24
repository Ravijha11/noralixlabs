import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Noralixlabs | Pharmaceutical Product Development",
  description:
    "Noralixlabs is a pharmaceutical CRO providing end-to-end product development services — from formulation and analytical development to stability studies, dossier preparation, and technology transfer.",
  keywords: [
    "pharmaceutical CRO",
    "formulation development",
    "analytical method validation",
    "stability studies",
    "CTD eCTD dossier",
    "technology transfer",
    "Noralixlabs",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://noralixlabs.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Noralixlabs",
    title: "Noralixlabs | Pharmaceutical Product Development",
    description:
      "End-to-end pharmaceutical development — scientifically sound, regulatory compliant, cost-effective.",
    url: "/",
  },
  verification: {
    google: "IG7GRqloLvAKTZ8X_rW0q3WXituN6Pv8npVsyhBy6G0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-[#0b1a14]">
        <LenisProvider>
          <LoadingScreen />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
