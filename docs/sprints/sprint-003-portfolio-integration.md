# Sprint portfolio-integration: Section 4.2 gated + full integration + i18n

> **Revision 2026-05-16 — sprint-002 reviewer concerns folded in:**
>
> Sprint 2 closed with `verdict: pass` (Session 8 reviewer report, 2026-05-16). The reviewer surfaced 1 MAJOR + 4 MINOR/NIT concerns that should land inside Sprint 3 rather than as a separate fix-up sprint. Each implementer session below absorbs its assigned items; the final reviewer session (Session 5) MUST explicitly verify every item is closed and, if any remain, report them as an itemized follow-up list (not a hard `fail`).
>
> **[MAJOR] Sitemap entry for `/portfolio/honeti` is missing.** `app/sitemap.ts` builds its route list from `CASE_SLUGS`, which is `[]` after Sprint 2 Session 3 retired the legacy dynamic route. The new static subpage is reachable but undiscoverable by crawlers. → **Fold into Session 2** (integration pass — already touches home + nav, natural place to add the entry to `ROUTES`). Acceptance: `app/sitemap.ts` advertises `/portfolio/honeti` at `priority: 0.9` (or whatever matches the home priority pattern) across all 3 locales.
>
> **[MINOR] Stale comment in `app/[locale]/portfolio/[slug]/cases/index.ts:7-9`.** The comment still claims the dynamic `[slug]` route stays in place; Sprint 2 Session 3 actually deleted `[slug]/page.tsx` because Next.js 16 + `output: "export"` rejects empty `generateStaticParams`. The empty `CASE_META = {}` + `CASE_SLUGS = []` + types are kept as scaffolding for a future flagship case study. → **Fold into Session 2 task (e)** (cleanup placeholders): either correct the comment to "removed in Sprint 2 Session 3; reintroduce when a real case study lands" OR retire the empty scaffolding entirely (delete `cases/`, drop the `CASE_SLUGS` import from `sitemap.ts`, accept the ~40-line one-shot diff when a case study returns). Pick one and commit.
>
> **[MINOR] `<WarsztatHeroTile>` chips are plain-text placeholders.** The 3 hero chips render as `<span>` with inline `// TODO(post-polilocale-public): wrap each chip in <a href=...>`. Real links land when the Polilocale public repo ships (the same B1 gate that drives Section 4.2's Polilocale card). → **Leave deferred** in this sprint. Session 5 reviewer: verify the TODO comment is still in place (do not flag) and add a line item to the production checklist — "wrap WarsztatHeroTile chips once Polilocale repo is public".
>
> **[NIT] ADR 0002 references stale facts.** "14 apps (5 Flutter + 9 Unity)" (correct: 15 — 5 Flutter + 10 Unity); claims `cases/honeti-case.ts` "stays live during Sprint 1" and "the legacy view simply stops being reachable when the static page is added" — both files are now deleted. Per `SPRINT_RULES.md` ("ADRs are immutable once accepted") no edits to 0002. → **Optional in Session 1**: if a new URL-pattern decision is needed for Section 4.2 (GitHub / homepage links — extended `<StoreLink>` or new `<ProjectLink>`), draft ADR 0003 that supersedes the affected scope of 0002. Otherwise leave alone; the live code is the source of truth.
>
> **[NIT] Duplicated `TechTag` helper.** Same inline-`<span>` helper rendered in `components/portfolio/HoneticHero.tsx` and `app/[locale]/portfolio/honeti/page.tsx`. → **Fold into Session 2 task (e)** (cleanup placeholders): promote to `components/portfolio/tech-tag.tsx`, replace both call sites. Keep the API minimal (just `{ label: string }` + className passthrough); a full atom isn't needed.
>
> **Doc-drift notes on this sprint file (not blockers):**
>
> - Existing pre-sprint note says "verdict: pass from its Session 7" — Sprint 2 was revised from 7 to 8 sessions (Session 1 added for cleanup); the reviewer is now Session 8. Treat the reference as "Sprint 2's final reviewer session, whatever its index" — do not retro-edit the line.
> - Existing Session 4 prompt (line ~153) reads "All 14 apps visible" — same drift as ADR 0002. Sprint 2 shipped 15. **Implementer / tester / reviewer sessions: treat as 15.** Do not flag the literal text as a code bug; the implementation under test is correct.
>
> **Pre-sprint notes (unchanged from previous revision):**
>
> - Depends on `sprint-002-portfolio-sections` completing with `verdict: pass` from its Session 7. This sprint closes the entire "Experience / Portfolio" section redesign.
> - **After this sprint the feature is production-ready** — minus the real release content for section 4.2 (Home Storage / Polilocale anonymous placeholders; final content flips on once their gates open).

## Goal

Close the redesign of the "Experience / Portfolio" section: (1) implement the feature-gated section 4.2 (Programming with agents — three cards: Home Storage, Polilocale, buzzards-soft.com) using `<FeatureGate>` from Sprint 1; (2) wire all three subsections (4.1 + 4.2 + 4.3) under a single H2 "Portfolio" and update the header navigation; (3) bring full i18n PL / EN / SV for all new strings with AI-assisted translation; (4) clean up temporary artifacts (`/dev/portfolio-atoms/`). After this sprint v2 is ready for a production release with section 4.2 invisible (gated `false`), ready to flip once Home Storage MVP + Polilocale public repo are ready.

## Roadmap reference

- [`doc/content_redesign.md`](../../doc/content_redesign.md) — *Revision 2026-05-15 — Sekcja 4 restructure* (4.2 specification)
- [`doc/v2_ui_plan.md`](../../doc/v2_ui_plan.md) — *Revision 2026-05-15 — Sekcja 5.4 restructure* (5.4.2 layout + feature gating + navigation)
- [`doc/agent_portfolio_context.md`](../../doc/agent_portfolio_context.md) — 3 deployments, release gating, anonymous placeholders
- [`docs/sprints/sprint-001-portfolio-foundation.md`](./sprint-001-portfolio-foundation.md) — foundation (`<FeatureGate>`, `feature-flags.ts`)
- [`docs/sprints/sprint-002-portfolio-sections.md`](./sprint-002-portfolio-sections.md) — sections 4.1 + 4.3 (already shipped)

## Cross-cutting decisions

- ADR 0001 (from Sprint 1) determines the flag configuration (env vars / runtime config / hybrid). Session 1 implements section 4.2 per that ADR, without re-discussion.
- No new ADRs.
- i18n strategy (Session 3): AI-assisted translation EN and SV with manual review in the same session. The manual review is part of Session 3 (the implementer runs the AI translation and reviews the output themselves).

## Sessions

### Session 1 — Section 4.2: gated `<AgentPortfolioSection>` + 3 cards

- **Agent:** sprint-implementer
- **Depends on:** (none) — directly on the foundation from Sprint 1
- **Exit:** Build green; section 4.2 renders when `AGENT_PORTFOLIO_SECTION_LIVE = true` and not when `false`; three cards (Home Storage / Polilocale / the site) with anonymous placeholders and the final layout.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, ADR 0001 + ADR 0002 from Sprint 1, and:
  >
  > - `doc/content_redesign.md` — *Revision 2026-05-15*, subsection **4.2 Programowanie agentowe** (3 positions, descriptions)
  > - `doc/v2_ui_plan.md` — *Revision 2026-05-15*, subsection **5.4.2 Programowanie agentowe** (layout, components, gating in code)
  > - `doc/agent_portfolio_context.md` — context per position, release gating, the A1/B1/C2 decision
  >
  > Build:
  >
  > **(a) `<AgentPortfolioSection>`** under `v2_react/components/portfolio/AgentPortfolioSection.tsx`:
  > - Wrapped in `<FeatureGate flag="AGENT_PORTFOLIO_SECTION_LIVE">` from Sprint 1
  > - Inside: H3 using i18n key `portfolio.agent.title`, 1–2 sentences of intro using `portfolio.agent.intro`
  > - 3 cards `<AgentProjectCard>` in a row (desktop) / stack (mobile)
  >
  > **(b) `<AgentProjectCard>`** under `v2_react/components/portfolio/AgentProjectCard.tsx`:
  > - Props: `{ project: AgentProject }` — add the `AgentProject` type definition to `v2_react/lib/portfolio/types.ts` (foundation from Sprint 1 — a small extension is acceptable, OK)
  > - Render: project title (i18n), 1–2 sentences of description, stack/role badges, links (Play / App Store / GitHub / homepage — extended `<StoreLink>` or a separate `<ProjectLink>`)
  >
  > **(c) Data definition** — `v2_react/lib/portfolio/agent-projects.ts` with 3 positions:
  >
  > 1. **Home Storage** — anonymous placeholder until Home Storage MVP is live (A1 decision). Temporary content: i18n key `portfolio.agent.homeStorage.title` = "Własna apka mobilna" (PL) / "Personal mobile app" (EN) / SV. Description: "W końcowej fazie produkcji. Pełen pipeline CI/CD z udziałem agentów AI." (no "Home Storage" name, no Play link). > **TODO(user):** after Home Storage MVP — swap to real data.
  > 2. **Polilocale** — anonymous placeholder until the repo is public (B1 decision). Temporary content: "Własny OSS — narzędzie do lokalizacji (w przygotowaniu publicznego release)". Stack: TypeScript, AGPL-3.0. > **TODO(user):** after Polilocale public repo — swap to name + GitHub link.
  > 3. **buzzards-soft.com (this site)** — final content (C2 decision: effect + process). Title: "buzzards-soft.com". Description: "Strona, którą czytasz, zbudowana z aktywną asystą agentów AI. Cały proces jest publicznie udokumentowany." Link to `/process` or an accordion with process artifacts (if such subpage / accordion exists — otherwise a placeholder URL).
  >
  > **(d) Insert `<AgentPortfolioSection>`** in the home page after `<HoneticHero>` (section 4.1) and before `<WarsztatGrid>` (section 4.3) — full H2 integration in Session 2.
  >
  > **(e) Manual smoke test:** set env vars so `AGENT_PORTFOLIO_SECTION_LIVE = true` → section visible. Default (`false`) → invisible (not in DOM at all, not merely `display: none`).
  >
  > Stop when: build green, the section works in both flag states (visible / null), the 3 cards have placeholder content + i18n keys, TODOs are left inline in `agent-projects.ts` (comment `// TODO(user): replace after gate release`).

### Session 2 — Integration: one H2 "Portfolio" + header navigation

- **Agent:** sprint-implementer
- **Depends on:** Session 1
- **Exit:** Build green; the home page renders one H2 "Portfolio" covering the 3 subsections (4.1 + 4.2 + 4.3) in order; the header nav has a "Portfolio" link (or updated equivalent) pointing to the `#portfolio` anchor; the temporary route `/dev/portfolio-atoms/` from Sprint 1 is removed.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, and:
  >
  > - `doc/content_redesign.md` — *Revision 2026-05-15*, the **"## 4. Portfolio"** structure with 3 subsections
  > - `doc/v2_ui_plan.md` — *Revision 2026-05-15*, "Struktura sekcji na home" (5.4) + line 447 referring to nav buttons (header)
  >
  > Tasks:
  >
  > **(a) Section 4 wrapper** — create `v2_react/components/portfolio/PortfolioSection.tsx` as a wrapper with H2 "Portfolio" + intro paragraph (i18n keys `portfolio.title`, `portfolio.intro`), inside which the 3 subsections render in order:
  > 1. `<HoneticHero>` (from Sprint 2 Session 1)
  > 2. `<AgentPortfolioSection>` (from this sprint, Session 1) — internally wrapped in `<FeatureGate>` so it will often be `null`
  > 3. `<WarsztatGrid>` (from Sprint 2 Session 4)
  >
  > **(b) Home page refactor** — in `v2_react/app/[locale]/page.tsx` (or wherever the home currently lives) replace the three separate inserts `<HoneticHero>` / `<AgentPortfolioSection>` / `<WarsztatGrid>` with one `<PortfolioSection id="portfolio">`.
  >
  > **(c) Header navigation** — find the header / nav component (check `v2_react/components/` for names like `Header`, `Nav`, `Navigation`, `SiteHeader`). Update the section-4 link:
  > - Old name: "Doświadczenie i artefakty" or "Portfolio" (check `messages/{pl,en,sv}.json` currently)
  > - New name: "Portfolio" across all 3 locales (i18n keys in Session 3)
  > - Anchor: `/#portfolio`
  >
  > **(d) Cleanup `/dev/portfolio-atoms/`** — remove the temporary route from Sprint 1 Session 2 (atoms) + Sprint 1 Session 3 (feature gate smoke). These components are now used for real; the dev route is no longer needed.
  >
  > **(e) Cleanup placeholders** — review the entire section-4 code (components from Sprint 2 + this sprint) for unaddressed placeholders / TODOs. The ones that remain (e.g. gated content for Home Storage / Polilocale) — OK, leave with a clear `TODO(user)` comment. The ones meant to be cleaned up — clean them up.
  >
  > Stop when: build green, the home renders one H2 "Portfolio" with 3 subsections in order, the nav header shows a "Portfolio" link that scrolls to `#portfolio`, `/dev/portfolio-atoms/` does not exist in the build output.

### Session 3 — i18n PL / EN / SV (full localization)

- **Agent:** sprint-implementer
- **Depends on:** Sessions 1 and 2
- **Exit:** Build green; all new i18n keys from Sprint 1 + Sprint 2 + Sprint 3 are localized in PL / EN / SV in `messages/{pl,en,sv}.json`; manual verification of PL and selected SV strings on the subpage and home; AI translation logs (if a model API is used) saved to `doc/i18n_translation_log.md` as an artifact of the agentic process.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, and every new i18n key added across Sprints 1, 2, and 3.
  >
  > Strategy: AI-assisted translation with manual review in the same session. Models available: OpenAI GPT-4 or Anthropic Claude via API (user's host — you decide). API keys live in the user's env vars; if they're not set, return a blocker.
  >
  > Tasks:
  >
  > **(a) Inventory** — collect every i18n key touched by Sprints 1, 2, 3 (`portfolio.role.*`, `portfolio.honeti.*`, `portfolio.warsztat.*`, `portfolio.agent.*`, `portfolio.title`, `portfolio.intro`, the nav link).
  >
  > **(b) PL** — fill all PL keys (first, because PL is the source language). If a key still has no PL placeholder — fill it based on the source of truth (`doc/content_redesign.md`, `doc/v2_ui_plan.md`, the context files). PL is the source language — write in the user's tone ("calm expert + honest humility"). After writing PL, **manual review by the user is not required in this session** (you are the source of content), but consistency with the planning docs must hold.
  >
  > **(c) EN** — translate all PL keys to EN via the chosen model. Stick to industry terminology. After translation, MANUAL REVIEW — go through each key:
  > - Are proper nouns preserved (Honeti, Sayuri Sushi, Polilocale, etc.)?
  > - Are idioms natural for an English-speaking IT reader?
  > - Does the tone match the PL ("calm expert" not "aggressive sales")?
  >
  > **(d) SV** — translate EN → SV via the same model (EN is more stable to translate from than PL). Manual review for SV: especially proper nouns and technical terminology.
  >
  > **(e) Log** — write `doc/i18n_translation_log.md` (append if it exists) with:
  > - the list of keys addressed (count)
  > - the model used (e.g. "Claude Sonnet 4.6 via Anthropic API")
  > - examples of trickier translation decisions (e.g. "od zera" → "from scratch" vs "from zero" — chose the former, idiomatic in EN)
  > - any manual edits made after AI translation
  >
  > **(f) Smoke test** — build the project, walk through `/pl/`, `/en/`, `/sv/` on home + `/{locale}/portfolio/honeti` — verify there are no "undefined" / raw keys / fallbacks to a different language.
  >
  > Stop when: every i18n key is addressed in all 3 languages, the log is written, build green, smoke test shows sensible content in all locales.

### Session 4 — Tests (E2E + feature flag combinations + 3 languages)

- **Agent:** sprint-tester
- **Depends on:** Sessions 1, 2, 3
- **Exit:** All new tests pass; the e2e suite runs across all 3 locales × all 4 flag combinations for `AGENT_PORTFOLIO_SECTION_LIVE`; no regression in old routes.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, this sprint file, and the previous sprints (`sprint-001-portfolio-foundation.md`, `sprint-002-portfolio-sections.md`). Test framework: the one Sprint 1 Session 4 settled on.
  >
  > Cover:
  >
  > **(a) Feature flag matrix** — section 4.2 must behave correctly across all 4 combinations of source flags:
  > - `HOME_STORAGE_MVP_LIVE=false, POLILOCALE_REPO_PUBLIC=false` → section 4.2 invisible (computed = false)
  > - `HOME_STORAGE_MVP_LIVE=true, POLILOCALE_REPO_PUBLIC=false` → section 4.2 invisible
  > - `HOME_STORAGE_MVP_LIVE=false, POLILOCALE_REPO_PUBLIC=true` → section 4.2 invisible
  > - `HOME_STORAGE_MVP_LIVE=true, POLILOCALE_REPO_PUBLIC=true` → section 4.2 visible with 3 cards
  >
  > Tests must verify that when the section is invisible, its DOM simply doesn't exist (assert `queryByTestId('agent-portfolio-section')` returns null), not merely that it's `display: none`.
  >
  > **(b) 3 locales × home** — for `pl`, `en`, `sv`:
  > - Home renders H2 "Portfolio" in the locale's language
  > - All 3 subsections (4.1 + 4.3, and 4.2 when flags on) appear in order
  > - The header nav shows a "Portfolio" link
  > - Clicking the header link → scrolls to the portfolio section
  >
  > **(c) 3 locales × Honeti subpage** — for `pl`, `en`, `sv`:
  > - `/<locale>/portfolio/honeti` → 200
  > - All 14 apps visible
  > - Group titles are localized (not raw keys)
  >
  > **(d) No regression** — existing routes / components (privacy policy, contact, how I work, etc.) still work. Smoke test the route list under `v2_react/app/[locale]/`.
  >
  > **(e) i18n completeness** — assert that no key under `portfolio.*` in `messages/{pl,en,sv}.json` contains a placeholder like "TODO" / "TBD" / "[PL]" or an empty string.
  >
  > Stop when: the full test suite is green, the feature flag matrix is tested, 3 locales × 2 (home + subpage) work, no regression.

### Session 5 — Final review + production checklist

- **Agent:** sprint-reviewer
- **Depends on:** Sessions 1–4
- **Exit:** Verdict `pass` with a production checklist, or `fail` with a list of concerns.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, this sprint file, both previous sprint files (`sprint-001-portfolio-foundation.md`, `sprint-002-portfolio-sections.md`), and the diff across the entire process (all 3 sprints, 17 sessions). Read-only.
  >
  > Final review:
  >
  > **(a) Plan adherence** — the Revision 2026-05-15 in `doc/content_redesign.md` and `doc/v2_ui_plan.md` is implemented 1:1. No silent scope creep, no silent scope drop.
  >
  > **(b) Feature flag posture** — section 4.2 is actually gated. The default state (env vars unset) must be `false`. Check `next.config.*` / hosting config to confirm the default deployment does not flip section 4.2 on.
  >
  > **(c) No debug traces** — no `console.log`, no `// TODO temp`, no `placeholder-text` in production code. `TODO(user)` for gated content (Home Storage, Polilocale) is OK and intentionally left behind — anything else must be gone.
  >
  > **(d) A11y** — sensible H2 / H3 hierarchy, all clickable elements keyboard-accessible, focus-visible works, `aria-label` on icon-only buttons.
  >
  > **(e) Performance** — quick check: are Lucide imports tree-shaken (named imports, not default), do app icons use `<Image>` from `next/image` instead of `<img>`, does the Honeti subpage not ship all 14 apps as a per-route bundle (should be SSG / RSC).
  >
  > **(f) i18n** — all 3 locales have the full key set, smoke test (user walks through manually) at the level of "no raw keys, no fallback to a different language".
  >
  > **(g) Production checklist** — propose a TODO list to handle before the final production deploy:
  > - production env vars (default false for the 4.2 gates)
  > - cache invalidation strategy (if hosting is static + CDN)
  > - sitemap update if `/portfolio/honeti` is a new route
  > - OG images for the new subpage (if the host generates them)
  > - smoke test on the real production URL after deploy
  >
  > Return: verdict `pass` (sprint closed, production-ready) + production checklist, or `fail` with a list of sessions to re-dispatch.

## Out of scope

- The real content for section 4.2 (Home Storage name / Polilocale link / site process artifacts) — lands when the release gates flip (A1/B1 decision).
- Per-app case study subpages (`/portfolio/honeti/<slug>`) — later phase.
- The `/warsztat` subpage with deep-dive per tile — later phase (decision in `warsztat_ai_context.md`).
- New ADRs — everything is already decided in Sprint 1.
- Refactor outside the scope of the "Experience / Portfolio" section — every other site section stays untouched.
- Scaffolding CLAUDE.md / `v2_react/CLAUDE.md` — separate task outside this sprint (though preferred before `/sprint-run portfolio-foundation`).
