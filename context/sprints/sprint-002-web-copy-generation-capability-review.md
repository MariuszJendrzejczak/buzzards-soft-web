<!-- IMPL-REVIEW-REPORT -->
# Implementation Review: Sprint web-copy-generation-capability (Phases 1–3)

- **Plan**: `context/slices/web-copy-generation/plan.md` (Phases 1–3 of 6); sprint `context/sprints/sprint-002-web-copy-generation-capability.md`
- **Scope**: Full sprint web-copy-generation-capability (Phases 1–3 — the capability build + PL rewrite artifact; landing/EN/SV/agent are Sprint 003)
- **Date**: 2026-07-19
- **Verdict**: APPROVED
- **Findings**: 0 critical, 0 warnings, 4 observations

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

- **Session 1 Exit** (five files exist & non-empty under `~/.claude/copy-standard/`): met — `voice-charter.md` (8437 B), `framework-spine.md` (6817 B), `ban-list-pl.md` (7292 B), `namespace-contract.md` (14051 B), `voice-gap-test.md` (6309 B) all present and substantive; Progress 1.1 `[x] — ead0d98`.
- **Session 2 Exit** (`generate-professional-copy-pl/SKILL.md` exists & parses): met — frontmatter opens with `---`, valid YAML (`name`, `description` with PL+EN triggers, `allowed-tools`); `pilot-hero.md` carries the hero draft + full Voice-Gap-Test; Progress 2.1 `[x] — e8e6760`.
- **Session 3 Exit** (`offer-rewrite-pl.md` + finalized `namespace-contract.md` cover every target `offer.*` leaf): met — rewrite maps all 11 SB7 beats; namespace-contract §6 freezes 126 leaves; Progress 3.1 `[x] — 0ca1e07`.
- **Manual 1.2–1.4** (charter traits/affirmative rule/register floor; ban-list native-PL + current tics; framework & rubric consistent): met — see F-observations; charter §1–3 encode the three locked "X-never-Y" traits, the affirmative-phrasing rule with the negation→affirmation table + two keep-negative exceptions, and the half-formal register floor; ban-list prose is authored in Polish (§G table catalogues *pogadasz / kilka stówek / jakieś / łapać kontakt / zaistnieć w sieci* + scare-quotes), confirmed present in the "before" copy (`offer-page.md:55,66`).
- **Manual 2.2–2.4** (pilot is an artifact not `messages/*`; all VGT dimensions MATCHED; professional/affirmative/tic-free): met — `pilot-hero.md` is a reviewable artifact; all 10 dimensions MATCHED with cited evidence, converged in 2 passes; the H1 uses a comma not the amateur em-dash, colloquialisms removed.
- **Manual 3.2–3.4** (every section VGT'd; no cross-section re-pitch; affirmative/half-formal/jargon-free; honest+AI-transparency preserved): met — every prose section scored (data-only groups given a combined hygiene line); the Cross-section repetition audit maps each of the 6 catalogued themes to one owning section; AI framed as expertise-with-a-tool throughout (`guide` owns the proof once).
- **F2 test-coupling recorded**: met and verified — namespace-contract §5–§6 record `offer.hero.heading` and `offer.quote.{heading,intro,messagePlaceholder}` as frozen key paths. Verified against the actual tests: `web-pages-offer-3-locales.spec.ts:24` reads `messages.offer.hero.heading` dynamically; `offer-quote.test.tsx:82-100` reads the three `quote.*` values dynamically from `pl.json` and asserts `context="web-pages-offer"` as a hardcoded string (not a message key). The "no pinning-test edit needed" claim holds.
- **ADR 0002 (portfolio-url-pattern) conformance**: ok — route `/web-pages-offer` unchanged by this sprint (copy/structure only); no route work in the diff.
- **Scope guardrails**: ok — no `messages/*.json` written by the capability; artifacts confined to `context/slices/web-copy-generation/` + user-scope; landing/EN/SV/agent correctly deferred to Sprint 003.

## Findings

### F1 — Hero price anchor "kilkuset złotych" is honest for Basic but low against Full

- **Severity**: 🟦 OBSERVATION
- **Impact**: 🔎 MEDIUM — real positioning tradeoff; decide at the closing gate before landing
- **Dimension**: Plan Adherence
- **Location**: `context/slices/web-copy-generation/offer-rewrite-pl.md:94` (`offer.hero.heading`), Open Question 1
- **Detail**: The H1 anchors on *"w cenie kilkuset złotych"*. Shipped prices are 999 (Basic) / 1999 (Full) — *kilkuset* is truthful for the entry tier but reads low against Full. The artifact correctly **did not invent** a resolution; it banked the tradeoff as an Open Question (anchor on entry price vs. *"od kilkuset złotych"*). This is a positioning call reserved for the human gate (HC1), surfaced here so it isn't lost.
- **Fix**: At HC1, decide the anchor wording (entry-price vs. range *"od kilkuset złotych"*) before Sprint 003 lands the H1. No code action for the reviewer.
- **Decision**: PENDING

### F2 — Six Open Questions carried to the closing human gate

- **Severity**: 🟦 OBSERVATION
- **Impact**: 🏃 LOW — expected artifact hand-off, resolve at HC1
- **Dimension**: Success Criteria
- **Location**: `context/slices/web-copy-generation/offer-rewrite-pl.md:763-789`
- **Detail**: The rewrite banks 6 Open Questions (price anchor; secondary-CTA/proof-link targets; promo end-date firmness; `meta.title` brand-suffix format vs `lib/seo.ts`; FAQ `logo` scope answer; `pricing.footnote` wording). These are correctly deferred, not invented — consistent with the "generator-not-inventor" house rule. They are inputs the landing sprint (003) and the human gate must close; none blocks this sprint's exit.
- **Fix**: Resolve all six during HC1 sign-off; carry the link-target decisions (Q2) into Sprint 003's component re-pointing so CTA labels match destinations.
- **Decision**: PENDING

### F3 — Deliberate "controlled echo" judgment call in the repetition audit is a human-review item

- **Severity**: 🟦 OBSERVATION
- **Impact**: 🔎 MEDIUM — the whole sprint exists to kill the repetition defect; confirm the echo is not a re-pitch
- **Dimension**: Plan Adherence
- **Location**: `context/slices/web-copy-generation/offer-rewrite-pl.md:755-759` (repetition audit "Judgment call recorded")
- **Detail**: The audit assigns each of the 6 re-pitched themes one owning section and permits a single controlled *echo* (a name, not a re-pitch) in adjacent sections — e.g. ownership is the hero *headline promise* and again fully owned in `ownership`; the human-led theme is owned by `guide` but *named* in `problem`/`plan`/`proof`. This is a defensible reading of the Rule of One, and the artifact itself flags it for human review (row 3.3). Recording it so the closing gate consciously confirms the echoes read as reinforcement, not the old defect.
- **Fix**: At HC1, read `hero`→`ownership` and `guide`→`plan`/`proof` back-to-back and confirm each echo is a name/reference, not a restated full argument. If any reads as a re-pitch, loop back into Phase 3 before closing.
- **Decision**: PENDING

### F4 — `meta.title` brand suffix added without verifying the site's existing pattern

- **Severity**: 🟦 OBSERVATION
- **Impact**: 🏃 LOW — one-line check at landing
- **Dimension**: Pattern Consistency
- **Location**: `context/slices/web-copy-generation/offer-rewrite-pl.md:72` (`offer.meta.title` — *"… — Buzzards Soft"*), Open Question 4
- **Detail**: The rewrite appends *"— Buzzards Soft"* to `meta.title` as an SEO convention and honestly flags (Q4) that the brand-suffix format should be checked against the rest of the site's `meta.title` pattern (`lib/seo.ts`) at landing. Since `meta.*` is data-only and this artifact is not landed, there is no live inconsistency yet — but the suffix separator/format (em-dash vs pipe vs the site's `buildAlternates`/`pageSocial` convention) should match before Sprint 003 writes it.
- **Fix**: At landing (Sprint 003), diff the proposed `meta.title` format against an existing localized `meta.title` / `lib/seo.ts` and normalize the separator to the site convention.
- **Decision**: PENDING
