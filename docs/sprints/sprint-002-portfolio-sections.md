# Sprint portfolio-sections: Sections 4.1 + 4.3 + Sprint 1 cleanup

> **Revision 2026-05-16 — rewrite-in-place (user override on append-only rule):**
>
> - Added Session 1 (cleanup) folding in the reviewer's MAJOR/MINOR/NIT concerns from `sprint-001-portfolio-foundation.md`. Previous file had no cleanup pass — concerns would have rotted in Sprint 3.
> - Updated app count `14 → 15 (5 Flutter + 10 Unity)` throughout — source-of-truth `doc/honeti_apps_context.md` lists 15; Sprint 1 shipped 15; tester encodes 15.
> - Canonical dataset moves `app/[locale]/portfolio/[slug]/cases/honeti.ts → lib/portfolio/honeti-apps.ts` in Session 1; all downstream sessions import from `lib/portfolio/honeti-apps.ts` (was `cases/honeti.ts`).
> - Added `HoneticAppSlug` literal-union type (derived from `HONETI_APPS as const`); router code in Sessions 2–3 uses it.
> - Sessions renumbered: 7 sessions → 8 sessions (cleanup pushed everything by one).
>
> **Pre-sprint notes (unchanged from previous revision):**
>
> - Depends on `sprint-001-portfolio-foundation` completing with `verdict: pass-with-concerns` (done 2026-05-15 — concerns folded into Session 1 of this sprint).
> - Section 4.2 (gated) is **out of scope** for this sprint — it lands in `sprint-003-portfolio-integration` together with full integration and i18n.
> - Host `CLAUDE.md` still missing (root + `v2_react/`). Same fallback as Sprint 1: read `v2_react/package.json`, `tsconfig.json`, `next.config.*`, `tailwind.config.*`, existing component patterns.
> - Not a git repo. `sprint-run`'s Step 1.5 branch-isolation guard will skip with a warning. Concurrent `sprint-run` invocations on this tree will collide. > **TODO(user):** `git init` highly recommended before this sprint.
> - Vitest + RTL is set up in `v2_react/` (Sprint 1 Session 4). Test command: `npm test` (from `v2_react/`). Coverage: `npm run test:coverage`.

## Goal

Implement the two portfolio sections that are always visible (no feature gating): **4.1 Portfolio Honeti** (home tile with 3 hero apps + collective subpage `/portfolio/honeti` listing all 15 apps grouped by stack and role) and **4.3 Warsztat AI** (tile grid with one hero tile "Sprint-driven workflow" + 6 smaller tiles). Before any new UI work, Session 1 lands the cleanup of all `sprint-001` reviewer concerns so the foundation is healthy. After this sprint, two of the three new section-4 subsections are visible in `v2_react/` across all three locales at the scaffold level (full localization happens in Sprint 3).

## Roadmap reference

- [`doc/content_redesign.md`](../../doc/content_redesign.md) — *Revision 2026-05-15 — Sekcja 4 restructure* (sections 4.1 and 4.3 content specification)
- [`doc/v2_ui_plan.md`](../../doc/v2_ui_plan.md) — *Revision 2026-05-15 — Sekcja 5.4 restructure* (layouts, components, subpage)
- [`doc/honeti_apps_context.md`](../../doc/honeti_apps_context.md) — **15 apps (5 Flutter + 10 Unity)** — source of truth
- [`doc/warsztat_ai_context.md`](../../doc/warsztat_ai_context.md) — hero tile + 6 standard tiles
- [`docs/sprints/sprint-001-portfolio-foundation.md`](./sprint-001-portfolio-foundation.md) — foundation: types, atomic components, feature flags. Reviewer verdict `pass-with-concerns` (2026-05-15) — concerns folded into Session 1 of this sprint.
- [`v2_react/docs/adr/0001-feature-flags-strategy.md`](../../v2_react/docs/adr/0001-feature-flags-strategy.md) — build-time `NEXT_PUBLIC_*` env vars
- [`v2_react/docs/adr/0002-portfolio-url-pattern.md`](../../v2_react/docs/adr/0002-portfolio-url-pattern.md) — dedicated static route `app/[locale]/portfolio/honeti/page.tsx` (Option B)

## Cross-cutting decisions

- ADR 0002 (from Sprint 1) is honoured: `/portfolio/honeti` is a dedicated static route `app/[locale]/portfolio/honeti/page.tsx`, separate from the dynamic `[slug]`. Session 3 implements this; Sprint 1's legacy `cases/honeti-case.ts` shim gets retired here (Session 1 step `g`).
- ADR 0001 (from Sprint 1) governs feature flags; section 4.2 is out of scope for this sprint, so this ADR is consulted but not exercised.
- No new ADRs.

## Sessions

### Session 1 — Sprint 1 cleanup (reviewer concerns)

- **Agent:** sprint-implementer
- **Depends on:** (none)
- **Exit:** `npm test` and `npm run build` both green in `v2_react/`; all reviewer concerns from `sprint-001-portfolio-foundation.md` Session 5 (verdict: pass-with-concerns) addressed; the canonical Honeti dataset lives at `v2_react/lib/portfolio/honeti-apps.ts`; `HoneticAppSlug` literal-union type is exported and consumable by downstream sessions.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present (note: it is MISSING at both `./CLAUDE.md` and `v2_react/CLAUDE.md` — fall back to `v2_react/` conventions: `package.json`, `tsconfig.json`, existing component patterns), `docs/sprints/sprint-001-portfolio-foundation.md` (especially Session 5's reviewer report), and the artifacts listed below.
  >
  > Goal: close every reviewer concern from Sprint 1 before any new UI work. Each task below is small and mechanical; bundle them in one commit-worthy delta.
  >
  > **(a) [MAJOR] Drop `stackLabelKey` from `v2_react/lib/portfolio/types.ts`.** The helper returns `portfolio.stack.${stack}` but those keys don't exist in `messages/{pl,en,sv}.json`; calling `t(stackLabelKey("Flutter"))` would throw `MISSING_MESSAGE` under `next-intl`. `<StackChip>` renders the literal stack name and does not use this helper. Remove the export, then delete the matching assertion in `v2_react/tests/unit/honeti-apps.test.ts` (currently around lines 339–340). Do NOT add the missing i18n keys — the helper has no caller.
  >
  > **(b) [MINOR] Move canonical dataset from `cases/honeti.ts` to `lib/portfolio/honeti-apps.ts`.** Today:
  >
  > - `v2_react/app/[locale]/portfolio/[slug]/cases/honeti.ts` is the canonical file exporting `HONETI_APPS`, `HONETI_APPS_BY_STACK_ROLE`, `HONETI_APP_SLUGS`, `getHoneticApp(slug)`.
  > - `v2_react/lib/portfolio/honeti-apps.ts` is a thin re-export.
  >
  > Invert: make `lib/portfolio/honeti-apps.ts` the canonical source. Delete `cases/honeti.ts` afterwards. Confirm nothing inside `cases/index.ts` or the dynamic route still references `cases/honeti.ts` — `cases/honeti-case.ts` (legacy `CaseStudyMeta`) stays untouched in this step. Update every import across the codebase (tests, future Sessions 2–4 will import from `lib/portfolio/honeti-apps.ts`).
  >
  > **(c) [MINOR] Declare `HONETI_APPS as const` and derive a `HoneticAppSlug` literal-union type.** In `lib/portfolio/honeti-apps.ts`:
  >
  > ```ts
  > export const HONETI_APPS = [ /* ... */ ] as const satisfies readonly HoneticApp[];
  > export type HoneticAppSlug = (typeof HONETI_APPS)[number]["slug"];
  > ```
  >
  > Verify `HONETI_APPS_BY_STACK_ROLE` and `getHoneticApp(slug: HoneticAppSlug)` still typecheck. Re-export `HoneticAppSlug` from `lib/portfolio/types.ts` (or just from `honeti-apps.ts` — pick the placement that matches Sprint 1's barrel pattern). Sprint 2 Session 3 will consume this type for `/portfolio/honeti/[appSlug]`-style anchor handling.
  >
  > **(d) [MINOR] Fix typo in `v2_react/app/[locale]/portfolio/[slug]/cases/honeti-case.ts:18` — `"Testy Prawniczy"` → `"Testy Prawnicze"`** (matches the spelling in the new dataset, line 46 pre-move).
  >
  > **(e) [NIT] Append a revision note at the top of `docs/sprints/sprint-001-portfolio-foundation.md`** (do NOT rewrite existing sections — per the user's standing rule on planning docs). Add a `> **Revision 2026-05-16 — post-review corrections:**` block immediately after the existing pre-sprint notes, recording: (1) app count is **15 (5 Flutter + 10 Unity)**, not 14 — the Goal text "14 apps" was stale relative to source-of-truth `doc/honeti_apps_context.md` and the shipped dataset; (2) canonical dataset moved to `lib/portfolio/honeti-apps.ts`; (3) `stackLabelKey` removed.
  >
  > **(f) [NIT] Strip what-comments, keep why-comments.** In `v2_react/lib/config/feature-flags.ts` lines 1–3, the leading block narrates the parser implementation. Replace with a one-liner that records the *why* only ("Closed-by-default per ADR 0001 — explicit string \"true\" required."). In `v2_react/app/[locale]/dev/portfolio-atoms/page.tsx` lines 14–17, the sprint-tracking comment rots fast; delete it (the sprint file already records the removal commitment under "Out of scope" / Sprint 3).
  >
  > **(g) Retire `cases/honeti-case.ts` only if Session 3 of THIS sprint can take over without leaving a gap.** Inspect: `cases/index.ts` still uses the legacy `CaseStudyMeta` to feed `/portfolio/[slug]?slug=honeti`. Session 3 here ships a dedicated `/portfolio/honeti` static route (per ADR 0002 Option B) that pre-empts the dynamic route for that slug. Plan:
  >
  > - In this session: KEEP `cases/honeti-case.ts` and KEEP `"honeti"` in `CASE_SLUGS`. The static route doesn't exist yet — removing the shim now breaks the existing route.
  > - Session 3 of this sprint will remove `"honeti"` from `CASE_SLUGS`, delete `cases/honeti-case.ts`, and let the new static route take the URL. Document this hand-off as a `// TODO(sprint-002 Session 3): remove this shim` comment near the `honeti-case` import — short why-comment, not a sprint-tracker.
  >
  > **(h) Tests still green.** After all edits, run `npm test` and `npm run build` from `v2_react/`. Coverage on `lib/portfolio/honeti-apps.ts` (new canonical location) should stay above 90% — the relocated tests cover it. If `stackLabelKey` removal lowers `lib/portfolio/types.ts` coverage, that's OK as long as it's still ≥ 90%.
  >
  > Stop when: TypeScript clean (`npx tsc --noEmit`), `npm test` 100% pass, `npm run build` green, all 8 items above visibly applied (verify with Grep / Read).

### Session 2 — Section 4.1: home tile

- **Agent:** sprint-implementer
- **Depends on:** Session 1
- **Exit:** `npm run build` green; home renders `<HoneticHero>` with 3 `<HeroAppMiniCard>` (Infoshare / Uprawnienia Budowlane / Gastro Ninja Klient) + CTA link to `/portfolio/honeti`; cards use `<StackChip>`, `<RoleBadge>`, `<StoreLink>` from the foundation.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, `docs/sprints/sprint-001-portfolio-foundation.md` (foundation contracts), and the planning docs:
  >
  > - `doc/content_redesign.md` — *Revision 2026-05-15 — Sekcja 4 restructure*, subsection **4.1 Portfolio Honeti** (hero apps, table, CTA)
  > - `doc/v2_ui_plan.md` — *Revision 2026-05-15 — Sekcja 5.4 restructure*, subsection **5.4.1 Portfolio Honeti** (layout, components)
  > - `doc/honeti_apps_context.md` — details of the 3 hero apps (Infoshare, Uprawnienia Budowlane, Gastro Ninja Klient)
  >
  > Confirm `v2_react/lib/portfolio/honeti-apps.ts` is the canonical dataset (post-Session-1 relocation) — if `app/[locale]/portfolio/[slug]/cases/honeti.ts` still exists with the dataset, return a hard blocker; Session 1 of this sprint must have moved it.
  >
  > Build:
  >
  > **(a) `<HoneticHero>`** under `v2_react/components/portfolio/HoneticHero.tsx` — wrapper for the home tile of section 4.1:
  > - H3 heading using i18n key `portfolio.honeti.title` (PL "Portfolio Honeti — komercyjne (4+ lata)", EN placeholder, SV placeholder — full PL/EN/SV in Sprint 3)
  > - One-sentence role line (i18n key `portfolio.honeti.role-line`)
  > - Stack chips row: `Flutter` + `Dart` + `Riverpod` + `REST API` + `Firebase` + `Clean Architecture` + a small mention `Unity (legacy)` — uses `<StackChip>` from Sprint 1 for Flutter / Unity; technology tags like `Dart`, `Riverpod` can be a simple inline `<span>` styled to match (no new component — premature abstraction)
  > - Three `<HeroAppMiniCard>` in a 3-column grid (desktop) / stack (mobile)
  > - CTA link at the bottom: `→ Zobacz pełne portfolio Honeti` (i18n key `portfolio.honeti.cta-full-list`) → href to `/portfolio/honeti`
  >
  > **(b) `<HeroAppMiniCard>`** under `v2_react/components/portfolio/HeroAppMiniCard.tsx`:
  > - Props: `{ app: HoneticApp }` from `@/lib/portfolio/types`
  > - Render: app icon (if one exists at `public/icons/honeti/<slug>.png` or similar — Glob check first; if not, a neutral placeholder block, do not invent assets), app name, `<StackChip>`, `<RoleBadge>`, short `description` (1–2 sentences, truncate if >120 chars with `line-clamp-2`), `<StoreLink googleLink={app.googleLink} appleLink={app.appleLink} />`
  > - Whole card is clickable as `<Link href={`/portfolio/honeti#${app.slug}`} />` (anchor to that app on the collective subpage). Wrap the inner store-link clicks with `e.stopPropagation()` so they navigate to the store, not the anchor.
  >
  > **(c) Insert `<HoneticHero>`** in the appropriate place on the home page (`v2_react/app/[locale]/page.tsx` or wherever section 4 currently lands). For this sprint, render it as its own H3 block — full H2 "Portfolio" wrapper + ordering of all subsections lands in Sprint 3.
  >
  > Hero card data (pull from `HONETI_APPS` via `getHoneticApp(slug)` — DO NOT hardcode content inside the component):
  >
  > 1. `infoshare` — Flutter, od-zera, Play + App Store
  > 2. `uprawnienia-budowlane` — Flutter, od-zera, Play
  > 3. `gastro-ninja-klient` — Unity, rozwoj-i-serwis, Play
  >
  > Stop when: build green, home renders the section, CTA click goes to `/portfolio/honeti` (404 acceptable for now — subpage in Session 3), mini-card click goes to `/portfolio/honeti#<slug>` (404 acceptable for now), no existing route broken.

### Session 3 — Subpage `/portfolio/honeti`: route + layout + retire shim

- **Agent:** sprint-implementer
- **Depends on:** Session 2
- **Exit:** `npm run build` green; subpage `/portfolio/honeti` exists in all 3 locales (`/pl`, `/en`, `/sv`); page layout (hero + 4 placeholder group sections) renders; `cases/honeti-case.ts` deleted and `"honeti"` removed from `CASE_SLUGS`; existing `/portfolio/<other-slug>` routes unaffected.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, ADR 0002 from Sprint 1 (`v2_react/docs/adr/0002-portfolio-url-pattern.md` — confirms Option B: dedicated static route), `doc/v2_ui_plan.md` *Revision 2026-05-15* subsection 5.4.1, and inspect `v2_react/app/[locale]/portfolio/[slug]/` for the current dynamic-route shape.
  >
  > Implement per ADR 0002 Option B:
  >
  > **(a) Create `v2_react/app/[locale]/portfolio/honeti/page.tsx`** — static route that pre-empts the dynamic `[slug]` for the `"honeti"` URL. Use `generateStaticParams` for the 3 locales (mirror what the dynamic route does — read it first).
  >
  > Page layout (per `v2_ui_plan.md` 5.4.1):
  >
  > - Page hero — H1 using `portfolio.honeti.subpage-title` (PL "Portfolio Honeti — 15 apek (5 Flutter + 10 Unity)" or similar — match the planning doc verbatim if possible), lead paragraph from `portfolio.honeti.subpage-lead`, stack chips
  > - 4 placeholder `<AppCardGroup>` sections (Session 4 populates them):
  >   1. **Flutter — wszystkie od zera** (5 apps)
  >   2. **Unity — własna seria edukacyjna (od zera)** (4 apps: words_en, irregular-verbs, der-die-das, flags)
  >   3. **Unity — rozwój i serwis** (5 apps: gastro-ninja-klient, gen-oczami-dziecka, + 3 maintenance educational apps)
  >   4. **Unity — projekt przejęty w połowie** (1 app: soildata)
  > - Each placeholder has its own H2 + an empty `<div data-group-placeholder="<key>" />` for now
  >
  > **(b) Retire the legacy `cases/honeti-case.ts` shim** — per Session 1's hand-off TODO:
  > - Remove `"honeti"` from `CASE_SLUGS` (or whatever the export is called) in `v2_react/app/[locale]/portfolio/[slug]/cases/index.ts`
  > - Delete `v2_react/app/[locale]/portfolio/[slug]/cases/honeti-case.ts`
  > - Update any test that asserted the shim's presence (search `Testy Prawnicze` / `honeti-case` to find references)
  > - Confirm `/portfolio/<other-slug>` (non-honeti) still works — Glob the `cases/` directory and `npm run build`
  >
  > **(c) Anchor scrolling stays functional even with placeholders** — render each `<AppCardGroup>` with `<section id="<slug-or-group-id>">` so URLs like `/portfolio/honeti#infoshare` at least scroll to a real section (the per-app card lands in Session 4).
  >
  > **(d) i18n** — add the 6 new keys (subpage-title, subpage-lead, 4 group headings) to `messages/{pl,en,sv}.json`. PL is final, EN/SV placeholders acceptable — Sprint 3 owns full localization.
  >
  > Stop when: all 3 locales render the subpage with hero + 4 placeholder sections; `npm run build` green; existing `/portfolio/<non-honeti-slug>` routes unaffected; `cases/honeti-case.ts` no longer in the working tree; coming from the home page's mini-card click lands on the right anchor (even if it scrolls to a placeholder).

### Session 4 — Subpage `/portfolio/honeti`: populate 15 apps

- **Agent:** sprint-implementer
- **Depends on:** Session 3
- **Exit:** `npm run build` green; subpage renders all 15 apps grouped by stack and role; each app is an `<AppCard>` with full data (`name`, `<StackChip>`, `<RoleBadge>`, `description`, `contribution` as a list, `<StoreLink>`); clicking from the home on `#<slug>` scrolls to the right card.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, the layout shipped in Session 3, and:
  >
  > - `doc/honeti_apps_context.md` — full content for the 15 apps (description, contribution per app)
  > - `doc/v2_ui_plan.md` — *Revision 2026-05-15*, fragment "Format pojedynczej karty apki na podstronie"
  >
  > Build:
  >
  > **(a) `<AppCard>`** under `v2_react/components/portfolio/AppCard.tsx`:
  > - Props: `{ app: HoneticApp }` from the foundation
  > - Render: app icon (Glob `public/icons/honeti/<slug>.{png,svg,webp}` — if absent, use a neutral placeholder, do not invent), name, `<StackChip>`, `<RoleBadge>`, description (`app.description`), contribution list (`app.contribution` as `<ul>` with `list-disc list-inside`), `<StoreLink>` at the bottom (passes through `googleLink` / `appleLink` / `external` as relevant — `<StoreLink>` already handles the empty/external cases per Sprint 1 Session 2)
  > - `id={app.slug}` on the wrapper so `#<slug>` anchor scrolling works
  >
  > **(b) `<AppCardGroup>`** under `v2_react/components/portfolio/AppCardGroup.tsx`:
  > - Props: `{ titleKey: string; apps: readonly HoneticApp[] }`
  > - Render: H2 with `useTranslations()(titleKey)`, grid of `<AppCard>` × N (responsive: 1-col mobile, 2-col tablet, 3-col desktop)
  >
  > **(c) Populate** the subpage at `v2_react/app/[locale]/portfolio/honeti/page.tsx`: import `HONETI_APPS_BY_STACK_ROLE` (from `@/lib/portfolio/honeti-apps`) and render groups in this order, replacing the placeholders from Session 3:
  >
  > 1. Flutter (all 5 — all `od-zera`) — title `portfolio.honeti.group.flutter-od-zera`
  > 2. Unity — `od-zera` (educational series, 4 apps) — title `portfolio.honeti.group.unity-od-zera`
  > 3. Unity — `rozwoj-i-serwis` (5 apps: Gastro Ninja Klient, Gen / Oczami Dziecka, Tabliczka Mnożenia, Potęgi i Pierwiastki, Cyfry Rzymskie) — title `portfolio.honeti.group.unity-rozwoj`
  > 4. Unity — `przejety-w-trakcie` (Soildata, 1 app) — title `portfolio.honeti.group.unity-przejety`
  >
  > **All 15 apps must appear.** Gen / Oczami Dziecka renders `<StoreLink external={...} />` (no `googleLink/appleLink`) — already encoded in the dataset; this is a smoke check.
  >
  > **(d) i18n** — group titles must exist in `messages/{pl,en,sv}.json` (PL final, EN/SV placeholders — full localization in Sprint 3). The 4 group keys were scaffolded in Session 3; verify they're filled.
  >
  > Stop when: build green, the subpage at `/pl/portfolio/honeti` shows all 15 grouped apps, anchor scrolling from home (`/pl/portfolio/honeti#infoshare` etc.) works, each card has complete data, no `<AppCard>` is rendered outside an `<AppCardGroup>`.

### Session 5 — Section 4.3: Warsztat AI grid scaffold

- **Agent:** sprint-implementer
- **Depends on:** Session 1 (cleanup) — does NOT depend on 4.1 sessions; can run in parallel in a future restructuring, but file order keeps it after the Honeti sessions
- **Exit:** `npm run build` green; home renders `<WarsztatGrid>` with 1 hero tile ("Sprint-driven workflow") + 6 smaller tiles (Claude Code config, sub-agents, slash commands, MCP, memory, cost control); Lucide icons; PL content placeholders OK (final content in Session 6).
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, and:
  >
  > - `doc/warsztat_ai_context.md` — hero tile + 6 standard tiles, order and content
  > - `doc/v2_ui_plan.md` — *Revision 2026-05-15*, subsection 5.4.3 (grid layout)
  > - `doc/content_redesign.md` — *Revision 2026-05-15*, section 4.3 (tile content)
  >
  > Build three components under `v2_react/components/portfolio/`:
  >
  > **(a) `<WarsztatGrid>`** — section 4.3 wrapper:
  > - H3 using i18n key `portfolio.warsztat.title`
  > - One-sentence intro from `portfolio.warsztat.intro`
  > - Grid with 1 `<WarsztatHeroTile>` (col-span-2 on desktop, full-width on mobile) + 6 `<WarsztatTile>` in a 3×2 grid (desktop) / 1×6 stack (mobile)
  >
  > **(b) `<WarsztatHeroTile>`** — large hero tile:
  > - Subtle emerald accent (`bg-emerald-500/5 border border-emerald-500/30`)
  > - Title: i18n key `portfolio.warsztat.hero.title` (PL "Sprint-driven workflow z typowanymi sesjami")
  > - 2–3 sentences of description (i18n key `portfolio.warsztat.hero.description`)
  > - Lucide icon: `GitBranch` or `Workflow` — pick one and commit; Session 6 may finalize
  > - 2–3 chips / links to artifacts (placeholders for now — full links land after Polilocale public repo release; mark with inline `// TODO(post-polilocale-public): link to BRIEF.md`)
  >
  > **(c) `<WarsztatTile>`** — standard tile:
  > - Props: `{ titleKey: string; descriptionKey: string; icon: LucideIcon; example?: string }`
  > - Lucide icon in the upper-left corner
  > - Title (`useTranslations()(titleKey)`)
  > - 1–2 sentences (`useTranslations()(descriptionKey)`)
  > - Optional chip with a concrete example (rendered only if `example` is set)
  >
  > Six smaller tiles (per `warsztat_ai_context.md`, in order):
  >
  > 1. Konfiguracja Claude Code — icon `Settings` or `Wrench`
  > 2. Wyspecjalizowane subagenty — icon `Users` or `Network`
  > 3. Custom slash commands i skille — icon `Terminal` or `Command`
  > 4. Integracje MCP w workflow — icon `Plug` or `Cable`
  > 5. Persistent memory + bilingual rule — icon `Brain` or `Database`
  > 6. Kontrola kosztów + agent w pętli — icon `Shield` or `CircleCheck`
  >
  > Each tile gets i18n keys `portfolio.warsztat.tile.<n>.title` and `.description`. PL final, EN/SV placeholders.
  >
  > Insert `<WarsztatGrid>` on the home page below `<HoneticHero>` (section 4.1) — full H2 integration in Sprint 3.
  >
  > Stop when: build green, home renders section 4.3 with hero + 6 tiles, Lucide icons visible (named imports — no `import * as`, tree-shaking matters), PL content visible (EN/SV placeholders acceptable).

### Session 6 — Section 4.3: per-tile content and example chips

- **Agent:** sprint-implementer
- **Depends on:** Session 5
- **Exit:** `npm run build` green; each of the 7 tiles has a real example chip (link to an artifact, tooltip, or plain-text example); Lucide icons are finalized (no placeholders); PL content is final.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, `doc/warsztat_ai_context.md` (especially the "Pozostałe kafelki" section with concrete examples and artifacts to link), and the components shipped in Session 5.
  >
  > For each of the 7 tiles, pick a final **example chip** (one concrete example per tile):
  >
  > 1. **Hero — Sprint-driven workflow** — 3 chips: "BRIEF.md (post-Polilocale public)", "sprint files (this site)", "SPRINT_RULES.md"
  > 2. **Konfiguracja Claude Code** — link to a sample `.claude/settings.json` hook (if available in the repo) or a plain-text snippet
  > 3. **Wyspecjalizowane subagenty** — list of sub-agent names actually in use (Glob `~/.claude/agents/`)
  > 4. **Custom slash commands i skille** — name of one flagship skill / slash command (e.g. `sprint-plan`, `sprint-run`)
  > 5. **Integracje MCP** — 3 MCP names (`context7`, `playwright`, `scheduled-tasks` — verify against actual MCP config)
  > 6. **Persistent memory + bilingual rule** — short snippet from `MEMORY.md` (anonymized — drop user-identifying paths)
  > 7. **Kontrola kosztów** — example practice (e.g. "agent context budget", "manual review before merge")
  >
  > Fill PL i18n keys for descriptions (full EN/SV in Sprint 3 — PL is enough, EN/SV placeholders acceptable).
  >
  > Finalize Lucide icons per tile (review https://lucide.dev/ — pick exact matches, no placeholders).
  >
  > Stop when: build green, each tile has a real example chip, all icons are finalized, PL content is final.

### Session 7 — Tests

- **Agent:** sprint-tester
- **Depends on:** Sessions 1–6
- **Exit:** `npm test` 100% pass; coverage ≥ 85% on new components (`HoneticHero`, `HeroAppMiniCard`, `AppCard`, `AppCardGroup`, `WarsztatGrid`, `WarsztatHeroTile`, `WarsztatTile`); the `/portfolio/honeti` subpage SSG-renders in all 3 locales (`pl`, `en`, `sv`); all 15 apps appear in the rendered DOM.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, and the artifacts from Sessions 1–6. Test framework: **Vitest + React Testing Library** (set up in `v2_react/` during Sprint 1 Session 4 — do not switch frameworks). E2E for routing can stay in Playwright if the host already uses it; otherwise SSG-output assertions (read the `out/` directory after `npm run build`) are acceptable.
  >
  > Cover:
  >
  > **(a) Components** — render tests (RTL + `NextIntlClientProvider` via `tests/unit/test-utils.tsx` from Sprint 1):
  > - `<HoneticHero>` — renders 3 hero cards (slugs: `infoshare`, `uprawnienia-budowlane`, `gastro-ninja-klient`); CTA link has `href="/portfolio/honeti"`
  > - `<HeroAppMiniCard>` — renders for each of the 3 hero apps; outer `<Link>` has `href={`/portfolio/honeti#${slug}`}`; `<StoreLink>` is present
  > - `<AppCard>` — renders for representative app types (with `googleLink`-only, with `googleLink + appleLink`, with `external`); wrapper has `id={slug}`
  > - `<AppCardGroup>` — renders N apps with a shared title; verify `<AppCard>` count matches `apps.length`
  > - `<WarsztatGrid>` — renders hero + 6 tiles; correct grid classes present
  > - `<WarsztatHeroTile>` — renders title + description + at least 1 chip
  > - `<WarsztatTile>` — renders with a Lucide icon component; optional example chip appears only when `example` prop is set
  >
  > **(b) SSG output / routing** — after `npm run build`:
  > - `out/pl/portfolio/honeti.html` exists, contains "Portfolio Honeti" or the localized H1
  > - `out/en/portfolio/honeti.html` exists (placeholder content OK)
  > - `out/sv/portfolio/honeti.html` exists
  > - Each of the 3 locale outputs contains the names of all 15 apps (Grep `app.name` from `HONETI_APPS`)
  > - `out/pl/portfolio/honeti.html` contains `id="infoshare"` (anchor target)
  > - Existing case-study routes (e.g. `out/pl/portfolio/sayuri-sushi.html` if present) still build — Glob `out/pl/portfolio/*.html` and verify non-honeti slugs survive
  >
  > **(c) Data fidelity** — assert `HONETI_APPS.length === 15` (already in Sprint 1 tests, but reaffirm post-relocation to `lib/portfolio/honeti-apps.ts`); assert subpage DOM contains every `app.name` from `HONETI_APPS` (use a single test that loops over the dataset rather than 15 separate tests).
  >
  > **(d) Cleanup verification (from Session 1)** — sanity tests:
  > - `stackLabelKey` is NOT exported from `@/lib/portfolio/types` — `import { stackLabelKey }` should fail at type-check
  > - `cases/honeti.ts` does NOT exist (Glob check inside the test or runtime FS check)
  > - `cases/honeti-case.ts` does NOT exist (Session 3 retired it)
  > - `HoneticAppSlug` type can be assigned from any `app.slug` literal — write a type-only test
  >
  > Stop when: `npm test` green (all new + existing tests), coverage ≥ 85% on the 7 new components, SSG output verified, no regression in pre-existing routes.

### Session 8 — Sprint review

- **Agent:** sprint-reviewer
- **Depends on:** Sessions 1–7
- **Exit:** Verdict `pass` (sprint done, proceed to Sprint 3) or `fail` (with itemized concerns and which session to re-dispatch). No code changes — read-only.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, this sprint file at `docs/sprints/sprint-002-portfolio-sections.md`, `docs/sprints/sprint-001-portfolio-foundation.md` (Session 5 reviewer report — confirm every concern is now closed), and the working tree state from Sessions 1–7. Read-only: no edits; running `npm test` / `npm run build` to verify is fine.
  >
  > Review covers:
  >
  > **(a) Sprint 1 cleanup** (Session 1) — every concern from Sprint 1's pass-with-concerns review is addressed:
  > - `stackLabelKey` is gone (Grep across `v2_react/` returns no hits)
  > - Canonical dataset lives in `lib/portfolio/honeti-apps.ts`; `cases/honeti.ts` is gone
  > - `HONETI_APPS as const` + `HoneticAppSlug` type are exported
  > - Typo "Testy Prawniczy" → "Prawnicze" was fixed in `cases/honeti-case.ts` BEFORE the file was deleted in Session 3 (verify via earlier checkpoints or sanity-Grep the final dataset)
  > - `sprint-001-portfolio-foundation.md` has a 2026-05-16 revision note appended (not rewritten)
  > - What-comments in `feature-flags.ts` and `dev/portfolio-atoms/page.tsx` are gone or replaced with why-only
  > - `cases/honeti-case.ts` deleted (Session 3) and `"honeti"` removed from `CASE_SLUGS`
  >
  > **(b) Section 4.1 home tile** — `<HoneticHero>` renders the 3 hero cards via `getHoneticApp(slug)` (no hardcoded content); CTA goes to `/portfolio/honeti`; mini-card click goes to the anchor; uses `<StackChip>` / `<RoleBadge>` / `<StoreLink>` from Sprint 1.
  >
  > **(c) Subpage `/portfolio/honeti`** — exists as a dedicated static route per ADR 0002; renders in all 3 locales; all 15 apps appear; anchor scrolling from the home page works.
  >
  > **(d) Section 4.3 Warsztat AI** — `<WarsztatGrid>` renders 1 hero + 6 tiles; Lucide icons are finalized (no placeholders); each tile has a real example chip; PL content is final.
  >
  > **(e) No regression** — existing routes (`/portfolio/<other-slug>` non-honeti, home page sections outside 4.1/4.3) still work; `npm run build` green.
  >
  > **(f) Tests** — variants covered, all 15 apps asserted (not just happy-path), SSG output verified for 3 locales, coverage ≥ 85% on the 7 new components.
  >
  > **(g) A11y** — clickable cards are `<Link>` (not `<div onClick>`); icon-only links have `aria-label`; H2/H3 hierarchy is sensible.
  >
  > Return a session report with **`verdict: pass`** (Sprint 3 may proceed) or **`verdict: fail`** with a list of concerns, each tagged with which session to re-dispatch and why.

## Out of scope

- Section 4.2 (Programming with agents, gated `<FeatureGate>`) — `sprint-003-portfolio-integration`.
- Full EN / SV localization beyond placeholders — `sprint-003-portfolio-integration` Session 3.
- Integration of all 3 subsections under one H2 "Portfolio" + header navigation update — `sprint-003-portfolio-integration` Session 2.
- Cleanup of the temporary route `app/[locale]/dev/portfolio-atoms/` from Sprint 1 — `sprint-003-portfolio-integration` Session 2 (the route is still useful as a manual smoke-test surface until then; what-comment cleanup happens in Session 1 here).
- Per-app case study subpages (`/portfolio/honeti/<appSlug>/page.tsx`) — later phase, not MVP. The `HoneticAppSlug` literal-union type shipped in Session 1 is the seam for this future work.
- AI-assisted translation of EN / SV strings — `sprint-003-portfolio-integration` Session 3 (dedicated i18n session).
- Scaffolding `v2_react/CLAUDE.md` — separate mini-task. > **TODO(user):** strongly recommended before `/sprint-run portfolio-sections` so agents don't re-derive stack conventions from `package.json` each session.

> **Sprint planning skill notes (revision 2026-05-16):**
> - 8 sessions (up from 7) — Session 1 added for Sprint 1 cleanup. Within skill boundaries (min 2, max 12–15).
> - Sessions are sequential by file order (canonical sprint-run behavior). `Depends on: (none)` exists only for Session 1.
> - File rewritten in-place per explicit user override on the standing append-only rule for planning docs. The append-only rule still holds for the parent `doc/*.md` planning docs and for closed sprint files (sprint-001 here gets a revision note appended, not a rewrite).
