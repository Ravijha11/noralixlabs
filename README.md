## Noralix Labs website

Modern, high-trust marketing website for **Noralix Labs** built with Next.js + Tailwind + shadcn/ui.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

Create a `.env.local` file in the project root:

```bash
# Public base URL (used for metadata, sitemap, robots)
NEXT_PUBLIC_SITE_URL=https://noralixlabs.com

# Form provider endpoints (email-forwarding service)
# Example: Formspree endpoint URL for each form
NEXT_PUBLIC_CONTACT_FORM_URL=
NEXT_PUBLIC_RFQ_FORM_URL=
```

## Lead capture (email forwarding)

- **Contact** page posts to `NEXT_PUBLIC_CONTACT_FORM_URL`
- **RFQ** page posts to `NEXT_PUBLIC_RFQ_FORM_URL`
- Both forms include a simple **honeypot** field (`_gotcha`) to reduce spam.

Recommended providers:
- **Formspree** or **Basin** (easy setup + deliverability + dashboard)

## Deployment (Vercel)

- Push this repo to GitHub/GitLab.
- Create a new project on Vercel and import the repo.
- Set environment variables in Vercel Project Settings:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_CONTACT_FORM_URL`
  - `NEXT_PUBLIC_RFQ_FORM_URL`
- Deploy.

## Connect `noralixlabs.com` domain

In your DNS provider:
- Add `A` record for apex (`@`) pointing to Vercel’s IP (Vercel will show the exact value), **or** use the DNS records Vercel provides.
- Add `CNAME` for `www` pointing to Vercel (value provided in Vercel UI).
- Wait for DNS propagation, then enable HTTPS (automatic on Vercel once verified).

## Build

```bash
npm run build
```
