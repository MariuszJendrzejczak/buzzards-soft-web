# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Buzzards Soft marketing site — a trilingual (PL / EN / SV) **statically-exported**
Next.js 16 (App Router, RSC) single-page site on React 19, Tailwind v4, shadcn/Base UI,
next-intl, deployed to Firebase Hosting. Contact form relays through one Cloud Function.

## Commands

- `npm run dev` — local dev at http://localhost:3000 (redirects `/` → `/pl`).
- `npm run build` — `next build` (static export to `out/`) + RSC-payload copy for Hosting. This is also the **type-check** (there is no separate `tsc` script).
- `npm run lint` — ESLint 9 (flat config, `eslint-config-next`).
- `npm run test` — vitest (unit in `tests/unit/`, plus SSG suites that assert on `out/` artifacts).
- `npm run test:e2e` — Playwright specs (`tests/*.spec.ts`).

**Build before tests.** Several vitest SSG suites read the exported `out/` tree, so run `npm run build` before `npm run test` (this is what CI does).

## Architecture gotchas

- **Static export** (`output: 'export'` in `next.config.ts`): no SSR, no route handlers, no server actions at runtime. Keep it that way — the contact form posts to `/api/contact`, which `firebase.json` **rewrites** to the `contact` Cloud Function (region `europe-west1`), not a Next.js API route.
- **i18n** (next-intl, `i18n/routing.ts`): locales `pl` / `en` / `sv`, `defaultLocale: pl`, `localePrefix: "always"`. Every route is generated per locale via `generateStaticParams()` → `routing.locales`. `messages/{pl,en,sv}.json` are namespaced trees and **must stay key-parallel** across all three files (an i18n-completeness test enforces this). **PL is the source of truth**; EN + SV are translations.
- **Header renders only on the home route** (`components/layout/header.tsx` — `usePathname() !== "/" → return null`). Subpages provide their own chrome (a breadcrumb back-link to `/`) — see `app/[locale]/privacy-policy/page.tsx` for the pattern.
- **New subpage checklist**: `generateStaticParams` + `generateMetadata` using `buildAlternates`/`pageSocial` from `lib/seo.ts`; add the route to `app/sitemap.ts`; add its i18n namespace to all three `messages/*.json`.
- **`functions/` is a separate Firebase codebase** (Node 22, its own `package.json`) — **excluded from the web app's type-check**. Don't import across the web ↔ functions boundary.

## Conventions

- **Conventional Commits** (`fix(build): …`, `feat(offer): …`, `test(portfolio): …`, `chore(deps): …`).
- **Trunk-based on `main`** — solo repo, commits land on `main` directly; use a `feature/<slug>` branch for larger changes. **Never push to `main` or merge a PR without an explicit user instruction.**
- No formatter is configured — **ESLint is the style authority**. Match the surrounding code.

## Deploy

`npm run build` then `firebase deploy` (Hosting from `out/` + the function). `RESEND_API_KEY` lives in Firebase Secret Manager — never committed.

## Docs

- ADRs in `docs/adr/` (`0001-feature-flags-strategy`, `0002-portfolio-url-pattern` — read the latter before adding routes).
- Slice/sprint working context lives under `context/`.
