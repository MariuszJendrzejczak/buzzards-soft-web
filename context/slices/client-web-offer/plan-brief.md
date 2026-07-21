# Web-pages Offer Subpage — Plan Brief

> Full plan: `context/slices/client-web-offer/plan.md`
> Copy + structure (source of truth): `context/slices/client-web-offer/offer-page.md`
> Research: `context/slices/client-web-offer/research.md` · Concept: `./concept.md`

## What & Why

Build a client-facing marketing subpage that presents the productized web offer
(Basic 1299 / Full 2499 + individual quote) to **non-technical micro-businesses** —
a second business line distinct from the site's recruiter-facing CV content. Copy is
already written and locked in `offer-page.md`; this slice implements it as a real page.

## Starting Point

`buzzards-soft.com` is a static Next.js 16 (`output: 'export'`) site, next-intl in
pl/en/sv, dark-first design system, with two existing subpages (privacy-policy, portfolio/honeti)
that establish the exact pattern to follow. The offer copy exists as a doc but no page renders it.

## Desired End State

`/{pl,en,sv}/web-pages-offer` renders the full 11-section offer page — hero, gap, process,
standard-includes, pricing table (with promo), modules table, why-AI, honest limits, ownership,
FAQ, and a reused lead form — styled like the rest of the site, reachable from the home main menu,
in a plain non-technical voice, in all three languages.

## Key Decisions Made

| Decision | Choice | Why | Source |
| --- | --- | --- | --- |
| Route slug | `/web-pages-offer` | User-chosen; stable English slug | Plan |
| Discovery / positioning | Link in home **main menu** → subpage | Max discoverability | Plan |
| Subpage chrome | Own breadcrumb back-link (Header is null off-home) | Matches existing subpage pattern | Plan |
| Package names | **Basic / Full** | Consistent with locked v5 model + EN/SV | Concept v5 |
| Language scope | **All 3 (PL+EN+SV) now**, PL authored first | User chose full coverage this slice | Plan |
| Promo handling | Struck base + promo price + "valid until end of August"; i18n strings, manual retire | Static export; simplest honest option | Plan |
| FAQ "no logo/photos" | Client provides; simple options if none; branding = individual quote | Honest-limits consistency | Concept |
| Lead form | Reuse `ContactForm` + `/api/contact` with offer intro | No new form engine | Research/offer-page |

## Scope

**In scope:** new locale route + `offer` i18n namespace (pl/en/sv), 11 section components,
pricing + modules tables, promo copy, main-menu route link (desktop + mobile), sitemap + SEO
per locale, lead-form reuse, tests.

**Out of scope:** CMS / pricing engine / promo auto-expiry, new API endpoint, mobile-app offer,
the à-la-carte modules as actual features, offer-specific OG image, changes to home content/voice.

## Architecture / Approach

A static subpage composed from existing primitives: `page.tsx` shell (per the privacy-policy
pattern) renders 11 server components under `components/sections/offer/*`, each reading the new
`offer` next-intl namespace. Navigation gets a hash-vs-route branch so the menu can link to a real
route. SEO/sitemap reuse `lib/seo.ts` helpers. The lead form is reused with an optional
offer-context prop.

## Phases at a Glance

| Phase | What it delivers | Key risk |
| --- | --- | --- |
| 1. Plumbing | Reachable route ×3 locales, menu link, sitemap, SEO, chrome | Header hash-vs-route nav branch touches shared component |
| 2. Sections + PL copy | 11 sections rendered with locked PL copy incl. pricing/promo | Register drifting into dev jargon; table responsiveness |
| 3. Lead-form reuse | Offer form variant, home form unchanged | Backwards-compatible prop must not regress contact form |
| 4. EN + SV + verify | Full translations + 3-locale smoke + green suite | Translation parity (guarded by i18n-completeness test) |

**Prerequisites:** none — all upstream artifacts (offer-page.md, concept v5, research) exist.
**Estimated effort:** ~2–3 sessions across 4 phases (Phase 2 is the largest).

## Open Risks & Assumptions

- Promo "end of August" is copy only — someone must manually retire it after the window.
- EN/SV translations are AI-produced from PL; a human spot-check is a manual gate (Phase 4).
- Adding a route link to the menu changes a shared, home-only `Header` — must not break the
  existing hash-anchor nav or the null-on-subpage behavior.

## Success Criteria (Summary)

- Offer page renders fully and consistently in pl/en/sv, reachable from the main menu.
- Pricing/promo, modules, FAQ, and the working lead form all present and correct.
- `npm run build`, `npm run lint`, `npm run test` (and the 3-locale e2e spec) pass.
