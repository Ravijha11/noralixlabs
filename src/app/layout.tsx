import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { StructuredData } from "@/components/seo/StructuredData";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.noralixlabs.com"
  ),

  title: {
    default: "Noralixlabs | Pharmaceutical Product Development Company India",
    template: "%s | Noralixlabs",
  },

  description:
    "Noralixlabs is a pharmaceutical product development CRO offering formulation development, analytical method validation, ICH stability studies, CTD/eCTD dossier preparation, and technology transfer. Scientifically sound, regulatory compliant, cost-effective.",

  keywords: [
    "pharmaceutical product development",
    "pharmaceutical CRO India",
    "formulation development company",
    "analytical method validation",
    "CTD eCTD dossier preparation",
    "stability studies ICH",
    "technology transfer pharma",
    "tablet formulation development",
    "capsule formulation development",
    "injectable formulation development",
    "semi solid dosage form development",
    "liquid oral formulation",
    "dry powder formulation",
    "pharmaceutical outsourcing India",
    "ICH Q1A stability studies",
    "ICH Q2 analytical validation",
    "pharmaceutical contract research organization",
    "excipient vendor qualification",
    "packaging compatibility studies",
    "ready to compress granules",
    "pharmaceutical regulatory filing",
    "CDSCO dossier filing",
    "WHO dossier preparation",
    "pharma technology transfer India",
  ],

  authors: [{ name: "Noralixlabs", url: "https://www.noralixlabs.com" }],
  creator: "Noralixlabs",
  publisher: "Noralixlabs",

  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["en_US", "en_GB"],
    url: "https://www.noralixlabs.com",
    siteName: "Noralixlabs",
    title: "Noralixlabs | Pharmaceutical Product Development Company",
    description:
      "End-to-end pharmaceutical development — formulation, analytical, stability, regulatory. ICH-compliant, cost-effective CRO services from India.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Noralixlabs — Pharmaceutical Product Development Company India",
        type: "image/png",
      },
      {
        url: "/og-image-square.jpg",
        width: 600,
        height: 600,
        alt: "Noralixlabs Logo",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@noralixlabs",
    creator: "@noralixlabs",
    title: "Noralixlabs | Pharmaceutical Product Development",
    description:
      "Formulation development, analytical validation, stability studies, CTD/eCTD dossier — end-to-end pharma CRO services.",
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "IG7GRqloLvAKTZ8X_rW0q3WXituN6Pv8npVsyhBy6G0",
  },

  alternates: {
    canonical: "https://www.noralixlabs.com",
  },

  category: "pharmaceutical services",

  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    language: "English",
    "revisit-after": "7 days",
    rating: "general",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080d1a" },
    { media: "(prefers-color-scheme: light)", color: "#080d1a" },
  ],
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
      <head>
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preload" href="/opengraph-image" as="image" />
      </head>
      <body className="min-h-full bg-white text-[#0b1a14]">
        <LenisProvider>
          <LoadingScreen />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-[#00c4b4] focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to main content
          </a>
          <GoogleAnalytics />
          <StructuredData includeWebPage={false} includeFaq={false} />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
