# Buzzards Soft — landing page

Source for the Buzzards Soft marketing site, served at
**[buzzards-soft.com](https://buzzards-soft.com)**.

A trilingual (PL / EN / SV) Next.js single-page site presenting Buzzards Soft —
an indie studio working at the intersection of Flutter, Unity, and AI-assisted
delivery. This repository is published as a portfolio artifact: the code is
**view-only**. See [`LICENSE`](./LICENSE) for terms.

## Stack

- **Next.js 16** (App Router, RSC) on **React 19**
- **Tailwind CSS v4** (CSS-first `@theme inline`) + **shadcn/ui** + **Base UI**
- **next-intl** for routing and translations across `pl` / `en` / `sv`
- **Framer Motion** for in-view reveals and micro-interactions
- **react-hook-form** + **Zod** for the contact form
- **Firebase Hosting** + a single **Cloud Function** that relays the contact
  form via **Resend**
- **TypeScript 5**, ESLint 9

## Project layout

```
app/                  Next App Router — [locale]/ segment, portfolio case studies, privacy, sitemap, robots
components/           layout/, sections/, seo/ — page chrome and section composables
i18n/                 next-intl routing config and request handler
lib/                  shared helpers (SEO metadata, class merging)
messages/             pl.json / en.json / sv.json — UI translations
public/               brand mark, OG image, favicons
functions/            Firebase Cloud Function: POST /contact → Resend
scripts/              build-time helpers (RSC payload copy for Hosting)
```

## Run locally

Requires **Node 20+** for the web app and **Node 22** for `functions/`.

```bash
npm install
npm run dev          # http://localhost:3000 — defaults to /pl
```

The contact form posts to a deployed Cloud Function; locally it will respond
with a CORS rejection unless you also run the emulator. To work on the function:

```bash
cd functions
npm install
npm run build:watch
firebase emulators:start --only functions
```

`RESEND_API_KEY` is supplied via Firebase Functions Secret Manager
(`firebase functions:secrets:set RESEND_API_KEY`) — never committed.

## Build & deploy

```bash
npm run build        # next build + RSC payload copy for Hosting
firebase deploy      # Hosting + functions
```

Hosting serves the prerendered output; the function is region-pinned to
`europe-west1` and rate-limited per IP.

## License

All rights reserved — see [`LICENSE`](./LICENSE). The code is shared so it can
be read; it is not licensed for copying, forking, or reuse.

For inquiries: **dev.buzzardssoft@gmail.com**
