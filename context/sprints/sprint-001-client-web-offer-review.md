<!-- IMPL-REVIEW-REPORT -->
# Implementation Review: Sprint client-web-offer — Web-pages offer subpage (Basic/Full + quote), PL+EN+SV

- **Plan**: `context/slices/client-web-offer/plan.md`, `context/slices/client-web-offer/offer-page.md`
- **Scope**: Full sprint client-web-offer (4 phases, commits `2a26686`, `fa0613a`, `8668b3c`, `fce5c44`, `6d4534c`)
- **Date**: 2026-07-18
- **Verdict**: APPROVED
- **Findings**: 0 critical, 0 warnings, 2 observations

## Verdicts

| Dimension | Verdict |
|-----------|---------|
| Plan Adherence | PASS |
| Scope Discipline | PASS |
| Safety & Quality | PASS |
| Architecture | PASS |
| Pattern Consistency | PASS |
| Success Criteria | PASS |

## Acceptance check

- **Session 1 Exit** (build emits `/web-pages-offer` ×3; lint; test; sitemap+nav+i18n-parity tests): met — `npm run build` emits `/pl|/en|/sv/web-pages-offer`; `sitemap-offer.test.ts`, `nav-offer-link.test.ts`, `i18n-offer-completeness.test.ts` all green; `app/sitemap.ts` has the route entry (`priority 0.8`); `generateMetadata` uses `buildAlternates("/web-pages-offer")` + `pageSocial` (`app/[locale]/web-pages-offer/page.tsx:33-47`).
- **Session 2 Exit** (build/lint/test; pricing + FAQ component tests): met — all 10 content sections rendered in locked order (`page.tsx:75-84`: Hero→ThreePaths→Process→Standard→Pricing→Modules→WhyAi→Limits→Ownership→FAQ); `offer-pricing.test.tsx` (6 tests) asserts both tiers, struck base (1299/2499), promo (999/1999), and "końca sierpnia" note; `offer-faq.test.tsx` green; `/#warsztat` deep-link present (`offer-process.tsx:64-66`).
- **Session 3 Exit** (build/lint/test; contact-form BC + offer-form test): met — `ContactForm` prop is optional (`ContactFormProps = {}` default, `contact-form.tsx:90-94`), home path unchanged (intro/placeholder fall back to `contactForm` i18n); `contact-form-variant.test.tsx` asserts both default and offer variants; endpoint stays `/api/contact` with additive `context` marker.
- **Session 4 Exit** (build/lint/test; pl/en/sv `offer` parity, real translations): met — 129 offer keys identical across pl/en/sv; no jargon (subagenty/codemody/MCP/sprint-session) in any locale; zero EN/SV values left equal to PL prose; prices/`zł` preserved, promo note translated ("price valid until the end of August" / "priset gäller till slutet av augusti").
- **Session 5 Exit** (`test:e2e` incl. 3-locale offer spec): met (reported) — new `tests/web-pages-offer-3-locales.spec.ts` green 6/6 per tester. Standing pre-existing e2e red in `portfolio-*` + `smoke` is inherited from `83396ff` (before the `51db2bd` fork) — out of scope, see F1.
- **ADR 0002 (portfolio-url-pattern) conformance**: ok — the offer page follows the ADR's decided philosophy: a **dedicated static route** (`app/[locale]/web-pages-offer/page.tsx`) mirroring the privacy-policy / honeti pattern, no magic-string branching on a dynamic `[slug]`. Nothing in the diff contradicts the ADR.

## Findings

### F1 — Pre-existing e2e failures inherited from `main` (not this sprint)

- **Severity**: 👁 OBSERVATION
- **Impact**: 🏃 LOW — quick decision; scope-external, does not gate this sprint
- **Dimension**: Success Criteria
- **Location**: `tests/portfolio-honeti-3-locales.spec.ts`, `tests/portfolio-home-3-locales.spec.ts`, `tests/portfolio-regression-routes.spec.ts`, `tests/smoke.spec.ts`
- **Detail**: The tester reported ~16 `test:e2e` failures in these four specs (stale against revamped portfolio content). All four were last touched in commit `83396ff`, which pre-dates this sprint's fork point (`51db2bd`); this sprint touched none of them (its only test changes are the new offer unit specs, an additive count bump in `sitemap.test.ts`, and the new green `web-pages-offer-3-locales.spec.ts`). The failures are inherited debt from `main`, not caused by or in scope for this slice, and should **not** block the sprint verdict. They should be tracked as separate portfolio-e2e maintenance work.
- **Fix**: Track the stale portfolio/smoke e2e specs as a separate follow-up (realign them to the revamped portfolio content on `main`); do not gate this sprint on them.
- **Decision**: PENDING

### F2 — `nav-offer-link.test.ts` asserts on header source text rather than rendered nav

- **Severity**: 👁 OBSERVATION
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Pattern Consistency
- **Location**: `tests/unit/nav-offer-link.test.ts:20-32`
- **Detail**: Two of the three assertions match regexes against the raw `header.tsx` source string (`href: "/web-pages-offer"`, `item.href.startsWith("/")`, `from "@/i18n/routing"`) rather than rendering the nav and asserting a locale-aware link resolves to `/{locale}/web-pages-offer`. Source-substring pinning is slightly brittle (a benign refactor that keeps behavior can break it). It is not a defect: it deliberately mirrors the pre-existing `nav-portfolio-link.test.ts` oracle the plan told the session to mirror, and the third assertion does check the i18n labels behaviorally. Recorded for awareness only.
- **Fix**: Optionally strengthen later to render `<Header>` and assert the offer link's resolved `href` per locale (behavioral), consistent with how other nav wiring could be tested — non-blocking; matching the existing portfolio oracle is acceptable.
- **Decision**: PENDING
