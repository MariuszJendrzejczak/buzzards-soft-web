# Web-pages Offer Subpage — Implementation Plan

## Overview

Build a new client-facing marketing subpage at `app/[locale]/web-pages-offer/page.tsx`
that presents the productized web offer (Basic 1299 / Full 2499 + individual quote) to
**non-technical micro-businesses**. Copy is already written and locked in
`./offer-page.md` (11 sections, PL source of truth). The page reuses the existing
design system, the lead form, and the next-intl / SEO / sitemap plumbing. It ships in
all three locales (PL + EN + SV) in this slice, is reachable from the home page main
menu, and speaks in a **plain, non-technical register** distinct from the recruiter-
facing rest of the site.

## Current State Analysis

- **Routing / i18n**: Next.js 16 App Router, `output: 'export'` (fully static),
  next-intl `4.11` with locales `["pl","en","sv"]`, `localePrefix: "always"`,
  `defaultLocale: "pl"` (`i18n/routing.ts`). Messages live in `messages/{pl,en,sv}.json`
  as namespaced trees. Every route is generated for all three locales via
  `generateStaticParams()` returning `routing.locales`.
- **Subpage pattern is established**: `app/[locale]/privacy-policy/page.tsx` and
  `app/[locale]/portfolio/honeti/page.tsx` show the canonical shape — `generateStaticParams`,
  `generateMetadata` reading a namespace + `buildAlternates`/`pageSocial` from `lib/seo.ts`,
  `setRequestLocale(locale)`, and a **breadcrumb back-link to `/`** because the global
  `Header` renders `null` on non-home routes (`components/layout/header.tsx:42-43`).
- **Header nav** (`components/layout/header.tsx:22-30`): `NAV_KEYS` is an array of
  `{ href, key }` where `href` is always a **hash anchor** (`#portfolio`) rendered by a
  plain `<a href>` in both desktop (`NavLink`, line 185) and mobile (`SheetClose`, line 122).
  There is no route-link path today — adding a subpage menu entry needs a hash-vs-route branch.
- **Lead form** (`components/sections/contact/contact-form.tsx`): client component
  `ContactForm()`, **no props**, reads namespace `contactForm`, posts to `/api/contact`
  (rewritten by `firebase.json` to the `contact` Cloud Function, europe-west1). Fields:
  name / email / company / message / source. Reusable — labels/placeholders are all i18n.
- **Design system**: dark-first Tailwind v4 theme (`app/globals.css`), section pattern =
  `<section id aria-labelledby>` + `max-w-7xl` container + mono eyebrow (`text-brand uppercase
  tracking-[0.18em]`) + `font-heading` H2; animation via `ScrollReveal` / `StaggerGroup`
  (`components/shared/scroll-reveal.tsx`); primitives `Card`, `Button` (amber `cta` variant),
  `Callout`, `ChipCloud`, `TechChip`, `Accordion`.
- **SEO** (`lib/seo.ts`): `buildAlternates(locale, path)` → canonical + hreflang map;
  `pageSocial(...)` → OG + Twitter. `TITLE_TEMPLATE = "%s | Buzzards Soft"` applies the
  brand suffix automatically to any non-absolute page `title`.
- **Sitemap** (`app/sitemap.ts`): static `ROUTES` array; each entry fans out across locales
  with hreflang alternates.
- **Tests**: vitest unit/integration in `tests/unit/*` + playwright specs in `tests/*.spec.ts`.
  Directly reusable oracles: `i18n-portfolio-completeness.test.ts` (all locales share a
  namespace's key set), `sitemap.test.ts`, `nav-portfolio-link.test.ts`, `ssg-output.test.ts`
  (asserts `out/` artifacts), and `portfolio-*-3-locales.spec.ts` (per-locale route reachability).
  CI builds **before** tests because SSG suites read `out/`.

## Desired End State

- Visiting `/{pl,en,sv}/web-pages-offer` renders the full 11-section offer page in the
  correct language, styled consistently with the rest of the site, with a working lead
  form and a back-to-home affordance.
- A new item in the home-page main menu (desktop + mobile) links to the subpage in the
  active locale.
- `sitemap.xml` lists the route for all three locales with hreflang alternates; page has
  its own `<title>` / description / OG per locale.
- `npm run build` (static export), `npm run lint`, and `npm run test` all pass; new tests
  assert i18n completeness, nav wiring, sitemap inclusion, SSG output, and pricing/promo rendering.

### Key Discoveries:

- Subpage chrome must be self-provided — `Header` returns `null` off-home
  (`components/layout/header.tsx:42-43`); follow the privacy-policy breadcrumb pattern.
- Menu entry to a subpage needs a **route link**, not a hash `<a>` — must branch on
  `href.startsWith("#")` and use the locale-aware `Link` from `@/i18n/routing` for routes
  (`components/layout/header.tsx:185-199` desktop, `:122-135` mobile).
- `pageSocial` does **not** deep-merge with the layout — the page must re-specify OG/Twitter
  via the helper (already handled by copying the privacy-policy pattern).
- Promo pricing is copy, not logic: struck base price + promo price + a fixed
  "valid until end of August" note, all as i18n strings, removed manually after the window.

## What We're NOT Doing

- **No CMS, no pricing engine, no promo auto-expiry flag** — promo values are i18n strings,
  manually retired after the window (static export makes a date flag build-time only anyway).
- **No new form engine / no new API endpoint** — reuse `ContactForm` and `/api/contact`.
- **No change to the recruiter-facing home content or its voice** — only a new menu link is added.
- **No mobile-app offer** — out of scope (future slice, per `concept.md` §8).
- **No dark/light toggle, animations module, or any of the à-la-carte modules as features** —
  they are described in copy only; this slice ships marketing content, not the modules themselves.
- **No og-image specific to the offer** — reuse the default `OG_IMAGE` for now.

## Implementation Approach

Build bottom-up in four phases: (1) stand up the route + i18n scaffold + navigation + SEO +
sitemap + subpage chrome so the empty page is reachable and wired everywhere; (2) build the 11
section components with PL copy wired to a new `offer` namespace; (3) reuse the lead form with
an offer-specific intro; (4) translate the namespace to EN + SV and verify. Copy is lifted
verbatim from `offer-page.md`; the structure mirrors existing sections so the work is
composition, not new primitives.

PL is authored first as the source of truth; EN + SV are produced as translations in Phase 4
(the whole `offer` namespace already exists in `pl.json`, so Phase 4 is a mechanical
key-for-key translation the i18n-completeness test guards).

## Critical Implementation Details

- **Menu-link hash-vs-route branch**: `NAV_KEYS` entries currently assume hash anchors and
  render `<a href>`. Introduce a discriminator (e.g. entries whose `href` starts with `/` are
  routes) and render the locale-aware `Link` for those in both the desktop `NavLink` and the
  mobile `SheetClose` list, so the link resolves to `/{locale}/web-pages-offer`. Hash entries
  keep their existing `<a>` behavior (in-page scroll on home).
- **Register discipline (copy)**: this page must not use dev jargon (subagenty, codemody, MCP,
  sprint sessions). The AI-process proof is translated to client language and links the existing
  `/#warsztat` anchor as the credibility deep-link (per `offer-page.md` §3 / §7).
- **Static-export form**: `ContactForm` posts to `/api/contact` via a firebase.json rewrite —
  this already works from any static route, so reusing it on the offer page needs no server code.

## Phase 1: Routing plumbing, i18n scaffold, navigation, SEO, sitemap, chrome

### Overview

Stand up a reachable, correctly-wired (but content-light) offer route in all three locales,
with the menu entry, sitemap entry, per-locale metadata, and a back-to-home chrome.

### Changes Required:

#### 1. Offer route + metadata

**File**: `app/[locale]/web-pages-offer/page.tsx` (new)

**Intent**: Create the page shell following the privacy-policy pattern — static params for all
locales, `generateMetadata` reading the new `offer` namespace, `setRequestLocale`, a breadcrumb
back-link to `/`, and slots that Phase 2 fills with section components.

**Contract**: `generateStaticParams()` returns `routing.locales.map(l => ({ locale: l }))`;
`generateMetadata` uses `buildAlternates(locale, "/web-pages-offer")` + `pageSocial(...)` with
`title = t("meta.title")`, `description = t("meta.description")` (namespace `offer`). Default
export is an async server component taking `params: Promise<{ locale: string }>`.

#### 2. `offer` i18n namespace (PL source)

**File**: `messages/pl.json`

**Intent**: Add a new top-level `offer` namespace holding all copy for the 11 sections + meta +
nav label, structured so section components read sub-keys. This phase adds meta + section
scaffolding keys; Phase 2 fills the full copy.

**Contract**: New `offer` object with at least `meta.{title,description}`, `nav.label`, and a
per-section sub-object (`hero`, `threePaths`, `process`, `standard`, `pricing`, `modules`,
`whyAi`, `limits`, `ownership`, `faq`, `quote`). Keys mirror the section structure in
`offer-page.md`.

#### 3. Main-menu entry (desktop + mobile), route-aware

**File**: `components/layout/header.tsx`

**Intent**: Add an offer menu item that navigates to the subpage in the active locale, branching
rendering so route hrefs use the locale-aware `Link` while existing hash items keep `<a>`.

**Contract**: Extend `NAV_KEYS` with `{ href: "/web-pages-offer", key: "offer" }`. In `NavLink`
and the mobile `SheetClose` map, render `Link` (from `@/i18n/routing`) when
`item.href.startsWith("/")`, else the current `<a href>`. Label from `nav.items.offer`.

#### 4. Nav label i18n key

**File**: `messages/pl.json`

**Intent**: Add the menu label under the existing `nav.items` namespace.

**Contract**: `nav.items.offer` = PL label (e.g. "Strony dla firm" — final wording confirmed in copy).

#### 5. Sitemap entry

**File**: `app/sitemap.ts`

**Intent**: Register the route so it is discoverable and gets hreflang alternates.

**Contract**: Add `{ path: "/web-pages-offer", changeFrequency: "monthly", priority: 0.8 }` to
`ROUTES`.

#### 6. Placeholder EN/SV meta keys

**File**: `messages/en.json`, `messages/sv.json`

**Intent**: Keep the three locales key-parallel from the start so build + i18n-completeness test
pass before Phase 4 (temporary values may equal PL; Phase 4 replaces them).

**Contract**: Mirror the `offer` + `nav.items.offer` key structure added to `pl.json`.

### Success Criteria:

#### Automated Verification:

- Build (static export) passes and emits the route for all locales: `npm run build`
- Lint passes: `npm run lint`
- Unit/integration tests pass: `npm run test`
- New sitemap test asserts `/web-pages-offer` is present for all 3 locales
- New nav test asserts the offer menu item resolves to a locale-aware route link
- i18n-completeness test asserts `offer` + `nav.items.offer` key sets match across pl/en/sv

#### Manual Verification:

- `/pl/web-pages-offer`, `/en/...`, `/sv/...` all load (empty-ish) without console errors
- The menu item appears on the home page and navigates to the subpage in the current locale
- Back-link on the subpage returns to `/` in the active locale

**Implementation Note**: After completing this phase and all automated verification passes,
pause for manual confirmation before proceeding.

---

## Phase 2: Section components + PL copy

### Overview

Build the 11 offer sections as components under `components/sections/offer/`, wired to the
`offer` namespace, reusing existing primitives, and render them from the page.

### Changes Required:

#### 1. Section components

**File**: `components/sections/offer/*.tsx` (new — one component per section, or grouped)

**Intent**: Implement sections 1–10 from `offer-page.md` (hero, three-paths gap, 5-step process
with `/#warsztat` deep-link, standard-includes list, pricing table, modules table, why-AI,
honest-limits, ownership, FAQ). Reuse the section wrapper pattern (eyebrow + `font-heading` H2),
`ScrollReveal`/`StaggerGroup`, `Card`, `Callout`, `ChipCloud`/`TechChip`, `Accordion` (FAQ).

**Contract**: Each section is a server component reading `getTranslations("offer")` (or a
sub-namespace) and rendered inside `<section id aria-labelledby>`. The **pricing table** renders
three columns (Basic / Full / individual quote) with **struck base price + promo price + "valid
until end of August" note**; the **modules table** renders the à-la-carte list. Tables are
responsive (stacked on mobile).

#### 2. Wire sections into the page

**File**: `app/[locale]/web-pages-offer/page.tsx`

**Intent**: Compose the section components in the locked top→bottom order under the page shell.

**Contract**: Ordered render: Hero → ThreePaths → Process → Standard → Pricing → Modules →
WhyAi → Limits → Ownership → FAQ → (Quote/form in Phase 3).

#### 3. Full PL copy

**File**: `messages/pl.json`

**Intent**: Fill the `offer` namespace with the verbatim PL copy from `offer-page.md` §1–§10
(hero eyebrow/heading/subtitle/CTAs, gap bullets, process steps, standard list, pricing cells,
module rows, why-AI prose, limits bullets, ownership prose, FAQ Q&A). FAQ "no logo/photos"
answer per the locked decision (client provides; simple options if none; branding = quote).

**Contract**: Keys populate every string referenced by the section components; pricing/promo
values as strings; no dev jargon.

### Success Criteria:

#### Automated Verification:

- Build passes: `npm run build`
- Lint passes: `npm run lint`
- Tests pass: `npm run test`
- New component test asserts the pricing section renders both tier prices, the struck base
  price, the promo price, and the "end of August" note
- New component test asserts the FAQ renders the expected number of Q&A entries

#### Manual Verification:

- `/pl/web-pages-offer` shows all 10 content sections in order, visually consistent with the site
- The `/#warsztat` deep-link in the process section navigates to the workshop section on home
- Pricing + modules tables are readable on mobile and desktop
- Register reads plain / non-technical (no dev jargon) end-to-end

**Implementation Note**: Pause for manual confirmation before proceeding.

---

## Phase 3: Lead-form reuse (offer variant)

### Overview

Render the existing lead form at the bottom of the offer page (section 11) with an offer-specific
intro and placeholder, without forking the form engine or the endpoint.

### Changes Required:

#### 1. Offer-context form intro

**File**: `components/sections/offer/offer-quote.tsx` (new) + `components/sections/contact/contact-form.tsx`

**Intent**: Provide section 11 (the quote CTA + form). Reuse `ContactForm`; give it an
offer-appropriate intro/heading and a message-field placeholder aligned to the offer ("what
business/service you have and what you need"). Prefer a minimal, backwards-compatible change:
accept an optional prop on `ContactForm` selecting the placeholder/intro source, defaulting to
current behavior.

**Contract**: `ContactForm` gains an **optional** prop (e.g. `variant`/`namespaceOverride` or an
`intro`/`messagePlaceholderKey`) that, when set, sources the intro + message placeholder from the
`offer.quote` keys; when unset, behavior is unchanged for the home contact section. Endpoint stays
`/api/contact`; a `source`/context marker may be added to the payload if trivial. `offer.quote`
keys added to `messages/pl.json`.

### Success Criteria:

#### Automated Verification:

- Build passes: `npm run build`
- Lint passes: `npm run lint`
- Tests pass: `npm run test`
- Existing contact-form tests still pass (backwards-compatible prop)
- New test asserts the offer page renders the form with the offer-specific intro/placeholder

#### Manual Verification:

- Submitting the form from the offer page reaches `/api/contact` and shows the success toast
- The home contact form is visually and behaviorally unchanged

**Implementation Note**: Pause for manual confirmation before proceeding.

---

## Phase 4: EN + SV translations + verification

### Overview

Translate the full `offer` namespace (and `nav.items.offer`) into EN and SV, replacing the Phase-1
placeholders, and run the full verification pass.

### Changes Required:

#### 1. EN translation

**File**: `messages/en.json`

**Intent**: Translate every `offer.*` key from the PL source to natural English in the same plain
register; translate `nav.items.offer`. Keep pricing values/currency (zł) and the promo note.

**Contract**: Key-for-key parity with `pl.json` `offer` subtree; meaning-preserving translation.

#### 2. SV translation

**File**: `messages/sv.json`

**Intent**: Same as EN for Swedish.

**Contract**: Key-for-key parity with `pl.json` `offer` subtree.

#### 3. Per-locale route smoke spec

**File**: `tests/web-pages-offer-3-locales.spec.ts` (new, playwright)

**Intent**: Mirror `tests/portfolio-honeti-3-locales.spec.ts` to assert the offer route renders
in each locale with locale-appropriate headline text.

**Contract**: For each of pl/en/sv, navigate to `/{locale}/web-pages-offer` and assert the page
loads (200 / expected H1 present).

### Success Criteria:

#### Automated Verification:

- Build passes: `npm run build`
- Lint passes: `npm run lint`
- Unit/integration tests pass: `npm run test`
- i18n-completeness test confirms pl/en/sv `offer` key sets are identical
- Playwright 3-locale spec passes: `npm run test:e2e`

#### Manual Verification:

- `/en/web-pages-offer` and `/sv/web-pages-offer` read as natural, non-technical copy (spot-check)
- Language toggle on the offer page switches locale and stays on the offer route
- No leftover PL placeholder strings on EN/SV

**Implementation Note**: Final phase — confirm the full page reads well in all three locales.

---

## Testing Strategy

| Behavior asserted | Expected outcome (oracle source) | Regression caught | Layer | Anti-pattern avoided |
|---|---|---|---|---|
| `offer` namespace key set is identical across pl/en/sv | Equal key sets | A locale missing a key → runtime missing-translation / build break | unit (mirror `i18n-portfolio-completeness.test.ts`) | Not asserting values (translations differ) — only structural parity |
| Sitemap includes `/web-pages-offer` for all locales | Route present ×3 with hreflang | Page invisible to crawlers | unit (mirror `sitemap.test.ts`) | Not snapshotting the whole sitemap |
| Main menu exposes a locale-aware offer route link | Link to `/{locale}/web-pages-offer` present | Menu entry missing or hash-broken | unit (mirror `nav-portfolio-link.test.ts`) | Not testing hover/scroll internals |
| Pricing section renders both tiers + struck base + promo + "end of August" note | All present (oracle: `offer-page.md` §5 + locked promo decision) | Silent copy/price drift, missing promo | unit component | Not asserting exact styling/class names |
| FAQ renders the expected Q&A set incl. "no logo/photos" answer | All entries present (oracle: `offer-page.md` §10 + locked FAQ decision) | Dropped/duplicated FAQ entries | unit component | Not asserting accordion internals |
| Offer route reachable + localized in each locale | 200 / expected H1 per locale | Broken SSG output for a locale | e2e (mirror `portfolio-*-3-locales.spec.ts`) | Not asserting pixel layout |
| Static export emits the offer route artifacts | `out/{locale}/web-pages-offer` exists | Route dropped from export | unit (extend `ssg-output.test.ts`) | — |

### Manual Testing Steps:

1. Load `/pl/web-pages-offer`, scroll all 11 sections — visual consistency + plain register.
2. Click the process section `/#warsztat` link — lands on the workshop section on home.
3. Submit the lead form — success toast; confirm the home contact form is unchanged.
4. Toggle language on the offer page → EN and SV render, staying on the offer route.
5. Verify the menu item appears on home and routes to the subpage per locale.

## Performance Considerations

Static export = no runtime cost; page is prerendered per locale. Reuse of `ScrollReveal`/framer
matches existing sections (no new perf surface). No images added beyond the shared OG default.

## References

- Copy + structure (source of truth): `context/slices/client-web-offer/offer-page.md`
- Offer model + decisions: `context/slices/client-web-offer/concept.md` (Revision v5)
- Market research: `context/slices/client-web-offer/research.md`
- Subpage pattern: `app/[locale]/privacy-policy/page.tsx`, `app/[locale]/portfolio/honeti/page.tsx`
- SEO helpers: `lib/seo.ts` · Sitemap: `app/sitemap.ts` · Nav: `components/layout/header.tsx`
- Form: `components/sections/contact/contact-form.tsx`

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Routing plumbing, i18n scaffold, navigation, SEO, sitemap, chrome

#### Automated

- [x] 1.1 Build (static export) passes, route emitted for all locales: `npm run build` — 2a26686
- [x] 1.2 Lint passes: `npm run lint` (no new problems from this phase; pre-existing v1_flutter/build + out/ noise unchanged vs clean tree) — 2a26686
- [x] 1.3 Unit/integration tests pass: `npm run test` — 2a26686
- [x] 1.4 Sitemap test asserts `/web-pages-offer` present for all 3 locales — 2a26686
- [x] 1.5 Nav test asserts offer menu item resolves to a locale-aware route link — 2a26686
- [x] 1.6 i18n-completeness test asserts `offer` + `nav.items.offer` parity across pl/en/sv — 2a26686

#### Manual

- [ ] 1.7 All three locale routes load without console errors
- [ ] 1.8 Menu item appears on home and navigates to the subpage per locale
- [ ] 1.9 Back-link returns to `/` in the active locale

### Phase 2: Section components + PL copy

#### Automated

- [x] 2.1 Build passes: `npm run build` — fa0613a
- [x] 2.2 Lint passes: `npm run lint` (delta-clean; pre-existing artifact noise only) — fa0613a
- [x] 2.3 Tests pass: `npm run test` — fa0613a
- [x] 2.4 Pricing test asserts both tiers + struck base + promo + "end of August" note — fa0613a
- [x] 2.5 FAQ test asserts the expected Q&A set — fa0613a

#### Manual

- [ ] 2.6 All 10 content sections render in order, visually consistent
- [ ] 2.7 `/#warsztat` deep-link works
- [ ] 2.8 Pricing + modules tables readable on mobile and desktop
- [ ] 2.9 Register reads plain / non-technical end-to-end

### Phase 3: Lead-form reuse (offer variant)

#### Automated

- [x] 3.1 Build passes: `npm run build` — 8668b3c
- [x] 3.2 Lint passes: `npm run lint` (delta-clean; pre-existing artifact noise only) — 8668b3c
- [x] 3.3 Tests pass: `npm run test` — 8668b3c
- [x] 3.4 Existing contact-form tests still pass (backwards-compatible prop) — 8668b3c
- [x] 3.5 Test asserts offer page renders form with offer-specific intro/placeholder — 8668b3c

#### Manual

- [ ] 3.6 Form submit from offer page reaches `/api/contact` + success toast
- [ ] 3.7 Home contact form unchanged

### Phase 4: EN + SV translations + verification

#### Automated

- [x] 4.1 Build passes: `npm run build`
- [x] 4.2 Lint passes: `npm run lint` (delta-clean; pre-existing artifact noise only)
- [x] 4.3 Unit/integration tests pass: `npm run test`
- [x] 4.4 i18n-completeness confirms pl/en/sv `offer` parity
- [ ] 4.5 Playwright 3-locale spec passes: `npm run test:e2e`

#### Manual

- [ ] 4.6 EN + SV read as natural, non-technical copy
- [ ] 4.7 Language toggle stays on the offer route across locales
- [ ] 4.8 No leftover PL placeholder strings on EN/SV
