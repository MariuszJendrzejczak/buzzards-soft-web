---
sprint: client-web-offer
slices: [client-web-offer]
created: 2026-07-18
---

# Sprint client-web-offer: Web-pages offer subpage (Basic/Full + quote), PL+EN+SV

## Goal

Build and ship the client-facing offer subpage at `/{pl,en,sv}/web-pages-offer` — an
11-section marketing page presenting the productized web offer (Basic 1299 / Full 2499 +
individual quote) to non-technical micro-businesses, in a plain register distinct from the
recruiter-facing site. Reuses the existing design system, lead form, and next-intl / SEO /
sitemap plumbing; reachable from the home main menu; delivered in all three locales.

## Slices
- `client-web-offer` — `context/slices/client-web-offer/plan.md` (4 phases)

> Note: slice `change.md.status` is `planned` (not yet `plan_reviewed`). `/plan-review
> client-web-offer` is recommended before running, but not required.

## Cross-cutting decisions
- ADR 0002 — portfolio-url-pattern (`docs/adr/0002-portfolio-url-pattern.md`): read before adding the new route; follow the established subpage URL pattern.
- Copy + structure source of truth: `context/slices/client-web-offer/offer-page.md` (verbatim PL copy). Decisions: `./concept.md` (Revision v5), market grounding: `./research.md`.

## Human gate (HITL)
> Stateful, run FIRST. `/sprint-run` walks these point-by-point with you and flips each box.
> Every box must be `[x]` before the AFK block below dispatches.

none

> TODO(user): confirm the exact main-menu label + H1 wording. Plan proposes menu label
> "Strony dla firm"; hero H1 is "Strona jak z agencji — bez ceny agencji." (offer-page.md §1).
> The AFK sessions use these defaults unless you say otherwise — not a blocker.

## AFK sessions

### Session 1 — Phase 1: Routing plumbing, i18n scaffold, navigation, SEO, sitemap, chrome (implement)
- **Agent:** sprint-implementer
- **Slice:** `client-web-offer`
- **Phase:** 1
- **Depends on:** (none)
- **Exit:** `npm run build` passes and emits `/web-pages-offer` for all locales; `npm run lint` passes; `npm run test` passes, including new tests asserting sitemap inclusion (3 locales), a locale-aware nav route link, and `offer` + `nav.items.offer` i18n key parity across pl/en/sv.
- **Prompt:**
  > Read `CLAUDE.md`, the slice plan at `context/slices/client-web-offer/plan.md`, its
  > `plan-brief.md`, `offer-page.md` (copy/structure source of truth), and
  > `docs/adr/0002-portfolio-url-pattern.md` first. You are implementing **Phase 1: Routing
  > plumbing, i18n scaffold, navigation, SEO, sitemap, chrome** of slice `client-web-offer`.
  >
  > Goal of this phase: stand up a reachable, correctly-wired (content-light) offer route in
  > all three locales, with the main-menu entry, sitemap entry, per-locale metadata, and a
  > back-to-home chrome. Phase 2 fills the sections.
  >
  > Changes required:
  > - **`app/[locale]/web-pages-offer/page.tsx`** (new): page shell following the
  >   `app/[locale]/privacy-policy/page.tsx` pattern — `generateStaticParams()` returning
  >   `routing.locales.map(l => ({ locale: l }))`; `generateMetadata` reading namespace
  >   `offer` and using `buildAlternates(locale, "/web-pages-offer")` + `pageSocial(...)`
  >   from `lib/seo.ts` (title = `t("meta.title")`, description = `t("meta.description")`);
  >   `setRequestLocale(locale)`; a breadcrumb back-link to `/` (Header is null off-home).
  >   Leave section slots empty/placeholder for Phase 2.
  > - **`messages/pl.json`**: add a top-level `offer` namespace with at least
  >   `meta.{title,description}` and a per-section sub-object skeleton
  >   (`hero, threePaths, process, standard, pricing, modules, whyAi, limits, ownership,
  >   faq, quote`); add `nav.items.offer` (PL label — default "Strony dla firm").
  > - **`messages/en.json`, `messages/sv.json`**: mirror the same `offer` + `nav.items.offer`
  >   key structure so all three files stay key-parallel (temporary values may equal PL;
  >   Phase 4 translates them). The i18n-completeness test requires identical key sets.
  > - **`components/layout/header.tsx`**: add `{ href: "/web-pages-offer", key: "offer" }` to
  >   `NAV_KEYS`; branch rendering so entries whose `href` starts with `/` render the
  >   locale-aware `Link` from `@/i18n/routing` (resolving to `/{locale}/web-pages-offer`),
  >   while existing hash entries keep their `<a href>`. Apply the branch in BOTH the desktop
  >   `NavLink` (around line 185) and the mobile `SheetClose` map (around line 122).
  > - **`app/sitemap.ts`**: add `{ path: "/web-pages-offer", changeFrequency: "monthly", priority: 0.8 }` to `ROUTES`.
  >
  > Tests to add (unit, in `tests/unit/`), mirroring existing oracles:
  > - sitemap includes `/web-pages-offer` for all 3 locales (mirror `sitemap.test.ts`).
  > - the offer menu item resolves to a locale-aware route link (mirror `nav-portfolio-link.test.ts`).
  > - `offer` + `nav.items.offer` key sets identical across pl/en/sv (mirror `i18n-portfolio-completeness.test.ts`).
  >
  > Constraints: keep the site a static export (`output: 'export'`) — no server code. PL is the
  > i18n source of truth. Do not touch home content beyond the nav entry. Follow Conventional
  > Commits. Register: plain, non-technical (this is client-facing) — but this phase is mostly
  > plumbing, so copy is minimal.
  >
  > Files to touch: `app/[locale]/web-pages-offer/page.tsx` (new), `messages/pl.json`,
  > `messages/en.json`, `messages/sv.json`, `components/layout/header.tsx`, `app/sitemap.ts`,
  > plus new test files under `tests/unit/`.
  >
  > Phase 1 owns Progress rows 1.1–1.6 (Automated) in the plan's `## Progress`; flip them as
  > you land them. Rows 1.7–1.9 are Manual (verified later) — do not flip.
  >
  > Remember: `npm run build` before `npm run test` (SSG suites read `out/`).
  >
  > Stop when: `npm run build`, `npm run lint`, and `npm run test` all pass with the new tests green.

### Session 2 — Phase 2: Section components + PL copy (implement)
- **Agent:** sprint-implementer
- **Slice:** `client-web-offer`
- **Phase:** 2
- **Depends on:** Session 1
- **Exit:** `npm run build` passes; `npm run lint` passes; `npm run test` passes, including a new component test asserting the pricing section renders both tier prices, the struck base price, the promo price, and the "end of August" note, and a test asserting the FAQ renders the expected Q&A set.
- **Prompt:**
  > Read `CLAUDE.md`, `context/slices/client-web-offer/plan.md`, and
  > `context/slices/client-web-offer/offer-page.md` (verbatim copy source) first. You are
  > implementing **Phase 2: Section components + PL copy** of slice `client-web-offer`.
  >
  > Build the 11 offer sections as components under `components/sections/offer/` and render
  > them from `app/[locale]/web-pages-offer/page.tsx` in the locked top→bottom order:
  > 1 Hero · 2 Trzy drogi (gap) · 3 Jak to działa (5-step process) · 4 W każdej stronie
  > (standard includes) · 5 Cennik (pricing table) · 6 Moduły (modules table) · 7 Dlaczego
  > mówię wprost o AI · 8 Uczciwe granice · 9 Wszystko jest Twoje (ownership) · 10 FAQ.
  > (Section 11 quote/form is Phase 3.)
  >
  > Reuse existing primitives — do not invent new ones: the section wrapper pattern
  > (`<section id aria-labelledby>` + `max-w-7xl` container + mono eyebrow
  > `text-brand uppercase tracking-[0.18em]` + `font-heading` H2), `ScrollReveal` /
  > `StaggerGroup` (`components/shared/scroll-reveal.tsx`), `Card`, `Callout`, `ChipCloud` /
  > `TechChip`, and `Accordion` for the FAQ. Study `components/sections/contact/contact.tsx`
  > and `components/sections/education/education.tsx` for the exact section idiom.
  >
  > Section-specific contracts:
  > - **Process (§3)** must include the client-language deep-link to the existing workshop
  >   section: `/#warsztat` ("Tak pracuję z AI →").
  > - **Pricing table (§5)**: three columns (Basic / Full / individual quote). Basic and Full
  >   each show a **struck-through base price + promo price on top + a "cena ważna do końca
  >   sierpnia" note** (promo values are i18n strings; struck 1299→999, 2499→1999). Responsive:
  >   stacked cards on mobile, table/columns on desktop.
  > - **Modules table (§6)**: the à-la-carte list from offer-page.md §6.
  > - **FAQ (§10)**: include the "nie mam logo / zdjęć" answer per the locked decision — client
  >   provides; if none, simple options (free stock / AI graphics); full branding/logo = individual quote.
  >
  > Copy: populate the `offer` namespace in `messages/pl.json` with the **verbatim PL copy**
  > from `offer-page.md` §1–§10 (hero eyebrow/heading/subtitle/CTAs, gap bullets, process steps,
  > standard list, pricing cells, module rows, why-AI prose, limits bullets, ownership prose,
  > FAQ Q&A). No dev jargon (no subagenty / codemody / MCP / sprint sessions) — plain register.
  > Keep en.json / sv.json key-parallel (placeholder values are fine here; Phase 4 translates).
  >
  > Tests to add (unit component, in `tests/unit/`): pricing renders both tiers + struck base +
  > promo + "koniec sierpnia" note; FAQ renders the expected number of Q&A entries. Assert
  > presence of content, not styling/class internals.
  >
  > Files to touch: `components/sections/offer/*.tsx` (new), `app/[locale]/web-pages-offer/page.tsx`,
  > `messages/pl.json` (+ key-parallel stubs in en/sv), new tests under `tests/unit/`.
  >
  > Phase 2 owns Progress rows 2.1–2.5 (Automated). Rows 2.6–2.9 are Manual — do not flip.
  >
  > Remember: `npm run build` before `npm run test`.
  >
  > Stop when: `npm run build`, `npm run lint`, and `npm run test` all pass with the new tests green.

### Session 3 — Phase 3: Lead-form reuse (offer variant) (implement)
- **Agent:** sprint-implementer
- **Slice:** `client-web-offer`
- **Phase:** 3
- **Depends on:** Session 2
- **Exit:** `npm run build` passes; `npm run lint` passes; `npm run test` passes, including existing contact-form tests still green and a new test asserting the offer page renders the form with the offer-specific intro/placeholder.
- **Prompt:**
  > Read `CLAUDE.md`, `context/slices/client-web-offer/plan.md`, and
  > `context/slices/client-web-offer/offer-page.md` (§11) first. You are implementing
  > **Phase 3: Lead-form reuse (offer variant)** of slice `client-web-offer`.
  >
  > Render the existing lead form as section 11 of the offer page with an offer-specific intro
  > and message-field placeholder, WITHOUT forking the form engine or the endpoint.
  >
  > Changes required:
  > - **`components/sections/offer/offer-quote.tsx`** (new): section 11 — the quote CTA +
  >   the reused `ContactForm`. Heading/intro from offer-page.md §11 ("Opisz krótko, czego
  >   potrzebujesz — odezwę się z wyceną.").
  > - **`components/sections/contact/contact-form.tsx`**: add an **optional, backwards-
  >   compatible** prop (e.g. a `variant`/`namespaceOverride` or an `intro` +
  >   `messagePlaceholderKey`) that, when set, sources the intro + message placeholder from
  >   the `offer.quote` keys; when unset, behavior is unchanged for the home contact section.
  >   Do not change fields, validation, or the endpoint. The form still posts to `/api/contact`
  >   (firebase.json rewrite → `contact` Cloud Function, europe-west1) — a trivial `source`/
  >   context marker in the payload is acceptable if it doesn't break the function contract.
  > - **`messages/pl.json`**: add `offer.quote` keys (intro + message placeholder tuned to the
  >   offer: "jaką firmę/usługę masz i czego potrzebujesz"); keep en/sv key-parallel.
  >
  > Constraint (critical): the home contact form must stay visually and behaviorally identical —
  > the new prop is optional and defaults to current behavior. Existing contact-form tests must
  > keep passing.
  >
  > Tests to add: assert the offer page renders the form with the offer-specific intro/placeholder;
  > confirm existing contact-form tests still pass.
  >
  > Files to touch: `components/sections/offer/offer-quote.tsx` (new),
  > `components/sections/contact/contact-form.tsx`, `app/[locale]/web-pages-offer/page.tsx`
  > (wire section 11), `messages/pl.json` (+ en/sv stubs), tests under `tests/unit/`.
  >
  > Phase 3 owns Progress rows 3.1–3.5 (Automated). Rows 3.6–3.7 are Manual — do not flip.
  >
  > Remember: `npm run build` before `npm run test`.
  >
  > Stop when: `npm run build`, `npm run lint`, and `npm run test` all pass with the new tests green.

### Session 4 — Phase 4: EN + SV translations (implement)
- **Agent:** sprint-implementer
- **Slice:** `client-web-offer`
- **Phase:** 4
- **Depends on:** Session 3
- **Exit:** `npm run build` passes; `npm run lint` passes; `npm run test` passes, including the i18n-completeness test confirming pl/en/sv `offer` key sets are identical with real (non-placeholder) translated values.
- **Prompt:**
  > Read `CLAUDE.md` and `context/slices/client-web-offer/plan.md` first. You are implementing
  > **Phase 4 (translations part): EN + SV translations** of slice `client-web-offer`.
  >
  > Translate the full `offer.*` namespace (and `nav.items.offer`) from the PL source into
  > natural English (`messages/en.json`) and Swedish (`messages/sv.json`), replacing the
  > Phase-1/2/3 placeholders. Same plain, non-technical register as PL — this is client-facing
  > copy for micro-businesses, not the recruiter-facing site. Keep pricing values and currency
  > (zł) and the promo "end of August" note; translate the prose around them. Preserve
  > **key-for-key parity** with the `pl.json` `offer` subtree (the i18n-completeness test enforces
  > identical key sets across all three files).
  >
  > Do NOT change PL copy, component code, routing, or the form. Translation only.
  >
  > Files to touch: `messages/en.json`, `messages/sv.json`.
  >
  > Phase 4 owns Progress rows 4.1–4.4 (Automated). Row 4.5 (the Playwright 3-locale spec) is
  > owned by the next session (tester) — do not add or flip it. Rows 4.6–4.8 are Manual.
  >
  > Remember: `npm run build` before `npm run test`.
  >
  > Stop when: `npm run build`, `npm run lint`, and `npm run test` all pass with pl/en/sv `offer` parity.

### Session 5 — Phase 4: 3-locale route smoke (test)
- **Agent:** sprint-tester
- **Slice:** `client-web-offer`
- **Phase:** 4
- **Depends on:** Session 4
- **Exit:** `npm run test:e2e` passes, including a new Playwright spec asserting `/web-pages-offer` renders in each of pl/en/sv with locale-appropriate headline text.
- **Prompt:**
  > Read `CLAUDE.md`, `context/slices/client-web-offer/plan.md`, and the existing
  > `tests/portfolio-honeti-3-locales.spec.ts` first. You are adding the **system-level route
  > coverage for Phase 4** of slice `client-web-offer`.
  >
  > Add `tests/web-pages-offer-3-locales.spec.ts` (Playwright), mirroring
  > `tests/portfolio-honeti-3-locales.spec.ts`: for each of pl / en / sv, navigate to
  > `/{locale}/web-pages-offer` and assert the page loads and shows the locale-appropriate H1 /
  > headline (from the `offer.hero` copy in each `messages/*.json`). Follow the existing spec's
  > setup (webServer / base URL / how it serves the exported site) exactly — do not invent new
  > harness config.
  >
  > Do not modify production code; this session only adds a test. If the test reveals a real
  > routing/render defect, report it in your summary rather than patching page code.
  >
  > Files to touch: `tests/web-pages-offer-3-locales.spec.ts` (new).
  >
  > This session owns Progress row 4.5 (Automated). Flip it when the spec passes.
  >
  > Stop when: `npm run test:e2e` passes with the new 3-locale spec green.

### Session 6 — Review
- **Agent:** sprint-reviewer
- **Depends on:** all prior sessions
- **Exit:** verdict (pass/fail) + itemised concerns reported.
- **Prompt:**
  > Read-only review of the full sprint diff against `context/slices/client-web-offer/plan.md`
  > (Desired End State) and `context/slices/client-web-offer/offer-page.md` (copy source of
  > truth). Verify the implementation matches the plan and that the **Manual Success Criteria**
  > are visibly satisfied in the diff:
  > - All three locale routes are wired and reachable; the main-menu entry links to the subpage
  >   per locale; the subpage has a working back-to-home affordance.
  > - All 10 content sections render in the locked order; the `/#warsztat` deep-link is present.
  > - Pricing + modules tables present, with struck base + promo + "koniec sierpnia" note.
  > - The lead form is reused with an offer-specific intro; the home contact form is unchanged
  >   (the new `ContactForm` prop is optional and backwards-compatible).
  > - Register is plain / non-technical throughout (no dev jargon: subagenty / codemody / MCP /
  >   sprint sessions); EN + SV read as natural translations with no leftover PL placeholders.
  > - i18n `offer` key sets are identical across pl/en/sv; the route is in `app/sitemap.ts`;
  >   metadata uses `buildAlternates` + `pageSocial`.
  > Confirm the static-export constraint is intact (no server code introduced). Report pass/fail
  > with itemised concerns. Do not edit code.

## Out of scope
- CMS, pricing engine, promo auto-expiry logic (promo is copy, retired manually after the window).
- New form engine or new API endpoint (reuse `ContactForm` + `/api/contact`).
- Changes to the recruiter-facing home content or its voice (only a nav link is added).
- The mobile-app offer (future slice).
- The à-la-carte modules as actual features (described in copy only).
- An offer-specific OG image (reuse the default).
