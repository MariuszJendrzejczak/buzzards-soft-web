# Sprint portfolio-foundation: Foundation — data + atoms

> **Pre-sprint notes surfaced by `sprint-plan`** (read before running this sprint):
>
> - **Host `CLAUDE.md` is missing** at both `./CLAUDE.md` and `v2_react/CLAUDE.md`. The user accepted to proceed without it; agents falling through `~/.claude/agents/SPRINT_RULES.md` will use baseline defaults. **Strongly recommended:** scaffold `v2_react/CLAUDE.md` before `/sprint-run portfolio-foundation` so agents discover the test runner, codegen, and build commands from the host instead of guessing.
> - **`doc/` vs `docs/` split:** the host already uses `doc/` for planning documents (`doc/content_redesign.md` etc.). This sprint file lives at `docs/sprints/` per the canonical `sprint-plan` / `sprint-run` convention. Two parallel folders coexist for now. > **TODO(user):** decide later — either rename `doc/` → `docs/` or patch the skills to read `doc/sprints/`.
> - **Not a git repository.** `sprint-run`'s Step 1.5 (branch isolation guard) will skip with a one-line warning. Concurrent `sprint-run` invocations will collide on the working tree. > **TODO(user):** `git init` + initial commit is recommended before running this sprint, especially if you plan parallel sprints.

> **Revision 2026-05-16 — post-review corrections** (folded in by `sprint-002-portfolio-sections` Session 1 — original sections below are preserved verbatim):
>
> - **App count is 15, not 14.** The Goal text and ADR 0002 refer to "14 apps (5 Flutter + 9 Unity)" — this was stale relative to the source-of-truth `doc/honeti_apps_context.md` (15 apps) and the dataset Session 1 actually shipped (15 = 5 Flutter + 10 Unity, including `roman` / Cyfry Rzymskie under Unity rozwoj-i-serwis). Treat any "14" in the historical sections as "15".
> - **Canonical Honeti dataset moved** from `v2_react/app/[locale]/portfolio/[slug]/cases/honeti.ts` to `v2_react/lib/portfolio/honeti-apps.ts`. The old `cases/honeti.ts` is deleted; the file at `lib/portfolio/honeti-apps.ts` is no longer a thin re-export — it now owns `HONETI_APPS`, `HONETI_APPS_BY_STACK_ROLE`, `HONETI_APP_SLUGS`, `getHoneticApp`, and the new `HoneticAppSlug` literal-union type (`HONETI_APPS as const`). All downstream code imports from `@/lib/portfolio/honeti-apps`.
> - **`stackLabelKey` removed** from `lib/portfolio/types.ts`. The helper returned `portfolio.stack.${stack}` but those keys never landed in `messages/{pl,en,sv}.json`; calling it under `next-intl` would have thrown `MISSING_MESSAGE`. `<StackChip>` renders the literal stack name directly and never needed it.

## Goal

Build the data layer for the Honeti portfolio of 14 apps (refactor `v2_react/app/[locale]/portfolio/[slug]/cases/honeti.ts` from a single-case model to a full 14-app model with `role`, `stack`, `links`, `description`, and `contribution` fields), three reusable atomic UI components (`<RoleBadge>`, `<StackChip>`, `<StoreLink>`), and feature-flag infrastructure (`lib/config/feature-flags.ts` + `<FeatureGate>` HOC). Without this sprint, Sprints 2 and 3 (implementation of sections 4.1, 4.2, 4.3) have nothing to stand on — this is a pure foundation layer.

## Roadmap reference

- [`doc/content_redesign.md`](../../doc/content_redesign.md) — *Revision 2026-05-15 — Sekcja 4 restructure*
- [`doc/v2_ui_plan.md`](../../doc/v2_ui_plan.md) — *Revision 2026-05-15 — Sekcja 5.4 restructure*
- [`doc/honeti_apps_context.md`](../../doc/honeti_apps_context.md) — source of truth for the 14 apps (5 Flutter + 9 Unity)
- [`doc/agent_portfolio_context.md`](../../doc/agent_portfolio_context.md) — context for feature flags and section 4.2 release gating

## Cross-cutting decisions

This sprint produces two concise ADRs (max ~1 page each) as part of Session 1 — packaged together with the data architecture, not a separate sprint:

- **ADR 0001 — Feature-flags strategy** — env vars (build-time) vs. runtime config file vs. hybrid for section 4.2 release gating. Three flags: `HOME_STORAGE_MVP_LIVE`, `POLILOCALE_REPO_PUBLIC`, computed `AGENT_PORTFOLIO_SECTION_LIVE`. Bias toward the simplest approach that allows toggling without redeploy.
- **ADR 0002 — Portfolio URL pattern** — how `/portfolio/honeti` (collective subpage listing 14 apps) coexists with the existing `/portfolio/[slug]` (per-case). Treat `honeti` as a special slug (Option A) or create a dedicated static route (Option B)? Recommend the variant that minimizes router conflicts and makes it easier to add per-app subpages later (`/portfolio/honeti/infoshare`).

ADR location: `v2_react/docs/adr/`.

## Sessions

### Session 1 — Data model + ADRs

- **Agent:** sprint-implementer
- **Depends on:** (none)
- **Exit:** TypeScript build green in `v2_react/`; both ADRs exist in `v2_react/docs/adr/`; `cases/honeti.ts` refactored to the full 14-app model; types exported from `v2_react/lib/portfolio/types.ts`; no existing route broken (smoke test `/portfolio/<existing-slug>`).
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present (note: it may be missing — fall back to conventions visible in `v2_react/` such as `tsconfig.json`, `next.config.*`, `tailwind.config.*`, and existing component patterns), and the planning docs:
  >
  > - `doc/content_redesign.md` — read the *Revision 2026-05-15 — Sekcja 4 restructure* block at the bottom of the file
  > - `doc/v2_ui_plan.md` — read the *Revision 2026-05-15 — Sekcja 5.4 restructure* block at the bottom of the file
  > - `doc/honeti_apps_context.md` — full source of truth for the 14 Honeti apps (5 Flutter + 9 Unity)
  > - `doc/agent_portfolio_context.md` — context for feature flags and section 4.2 release gating
  >
  > Then deliver three artefacts.
  >
  > **(a) Two ADRs under `v2_react/docs/adr/`.** Concise (max ~1 page each), concrete decisions ("we chose X because Y"), not exploratory ("we should consider..."):
  >
  > - `0001-feature-flags-strategy.md` — choose between env vars (build-time), runtime config file, or hybrid for the section 4.2 release gating. Three flags: `HOME_STORAGE_MVP_LIVE`, `POLILOCALE_REPO_PUBLIC`, and computed `AGENT_PORTFOLIO_SECTION_LIVE = HOME_STORAGE_MVP_LIVE && POLILOCALE_REPO_PUBLIC`. Bias toward the simplest approach that allows toggling without redeploy if possible (e.g. env vars at edge runtime, or a static JSON config the build reads). Specify how each flag is sourced and how dev / staging / production environments are switched.
  > - `0002-portfolio-url-pattern.md` — decide how the new `/portfolio/honeti` collective subpage (listing all 14 Honeti apps) coexists with the existing `/portfolio/[slug]` per-case dynamic route. Option A: treat `honeti` as a special slug returning a collective view from the dynamic route. Option B: create a dedicated static route `app/[locale]/portfolio/honeti/page.tsx` separate from `[slug]`. Recommend the option that produces less router conflict and is easiest to add per-app case study subpages to later (e.g. `/portfolio/honeti/infoshare`).
  >
  > **(b) Refactor `v2_react/app/[locale]/portfolio/[slug]/cases/honeti.ts`** from the current single-case model to a full 14-app model. Source of truth: `doc/honeti_apps_context.md`.
  >
  > Required per-app fields:
  >
  > - `slug` — kebab-case unique id (e.g. `infoshare`, `uprawnienia-budowlane`, `gastro-ninja-klient`, `der-die-das`)
  > - `name` — Polish display name as in the planning docs (preserved verbatim — these are product names)
  > - `stack` — discriminated union: `"Flutter"` or `"Unity"`
  > - `role` — discriminated union: `"od-zera"` | `"rozwoj-i-serwis"` | `"przejety-w-trakcie"` (literal Polish values used as codebase identifiers; English labels live in i18n message files)
  > - `packageName?` — Play / App Store package id when present (e.g. `com.honeti.flags`)
  > - `googleLink?` — full Play URL
  > - `appleLink?` — full App Store URL (Infoshare is the only app with this)
  > - `description` — Polish, 1–2 sentences of business context
  > - `contribution` — Polish, list of 2–5 bullets describing the user's concrete contribution
  > - `external?` — object `{ label: string, url: string }` for apps without a Play link (Gen / Oczami Dziecka → `https://gen.edu.pl/`)
  >
  > Group or sort the data so UI rendering in Sprint 2 is trivial — exporting both a flat `HONETI_APPS: HoneticApp[]` and a grouped `HONETI_APPS_BY_STACK_ROLE` derived view is fine.
  >
  > **(c) Export types from a central `v2_react/lib/portfolio/types.ts`.** Required: `HoneticApp`, `Stack`, `Role`. Optional helpers if trivial: `isHoneticApp(x): x is HoneticApp` type guard, `roleLabel(role): string` returning an i18n message key. Atomic components in Session 2 import from this file.
  >
  > Stop when: TypeScript compiles (host's standard build command in `v2_react/`), both ADRs are written and concrete, the new model contains all 14 apps with correct `role` and `stack` per `doc/honeti_apps_context.md`, and the existing `/portfolio/[slug]` route still renders for any pre-existing case (manual smoke test or quick dev-mode fetch).

### Session 2 — Atomic UI components

- **Agent:** sprint-implementer
- **Depends on:** Session 1
- **Exit:** Build green; each of the 3 components (`RoleBadge`, `StackChip`, `StoreLink`) has strongly-typed props matching the types from Session 1; each renders in isolation — stories file or temporary `/dev/portfolio-atoms` route; 3 new i18n keys in `messages/{pl,en,sv}.json`.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, and the types exported in Session 1 at `v2_react/lib/portfolio/types.ts`. Confirm the types are available before proceeding — if Session 1 hasn't shipped them, return a hard blocker; do not reimplement.
  >
  > Build three atomic presentation components under `v2_react/components/portfolio/`. All must be strongly typed via Session 1's types, contain no business logic, no data fetching, no router calls — pure props in, JSX out. Match the project's existing styling conventions (Tailwind + design tokens already in `v2_react/`).
  >
  > **(a) `<RoleBadge role={role} />`** — three visual variants:
  >
  > - `od-zera` → emerald / green accent (e.g. `bg-emerald-500/10 text-emerald-700 border-emerald-500/30`)
  > - `rozwoj-i-serwis` → neutral gray (e.g. `bg-gray-500/10 text-gray-700`)
  > - `przejety-w-trakcie` → amber (e.g. `bg-amber-500/10 text-amber-700`)
  >
  > Labels are i18n strings. Read existing `messages/{pl,en,sv}.json` first; if keys don't exist, add them:
  >
  > - `portfolio.role.od-zera` — PL "od zera", EN "from scratch", SV "från noll"
  > - `portfolio.role.rozwoj-i-serwis` — PL "rozwój i serwis", EN "maintenance", SV "underhåll"
  > - `portfolio.role.przejety-w-trakcie` — PL "przejęty w trakcie", EN "taken over mid-way", SV "övertogs i pågående utveckling"
  >
  > **(b) `<StackChip stack={stack} />`** — visual badge for `"Flutter"` (blue accent, e.g. `bg-blue-500/10 text-blue-700`) or `"Unity"` (purple accent, e.g. `bg-purple-500/10 text-purple-700`). Show a stack icon if `v2_react/` already has Flutter / Unity glyphs in an icon set (check `lib/icons/`, `public/icons/`, `components/icons/` first); otherwise text-only is acceptable for this sprint.
  >
  > **(c) `<StoreLink googleLink? appleLink? external? />`** — inline icon links:
  >
  > - Google Play icon → opens `googleLink` in new tab when defined
  > - App Store icon → opens `appleLink` in new tab when defined
  > - External icon (e.g. arrow-out-of-box) → opens `external.url` with `external.label` as the accessible name, used for apps without a Play link (Gen)
  >
  > All outbound links: `target="_blank"` + `rel="noopener noreferrer"`. Hover state, focus-visible ring, `aria-label` on icon-only links.
  >
  > Demonstrate the components: either a `*.stories.tsx` file co-located with each component (if the project already uses Storybook — check `package.json` and `.storybook/`), or a temporary route `v2_react/app/[locale]/dev/portfolio-atoms/page.tsx` that renders all variants of all three components. The temporary route is cleaned up in Sprint 3.
  >
  > Stop when: components build, each is exercisable in isolation (stories or dev route), and the 3 i18n keys are added to PL / EN / SV message files.

### Session 3 — Feature flag infrastructure

- **Agent:** sprint-implementer
- **Depends on:** Session 1 (uses ADR 0001)
- **Exit:** Build green; `<FeatureGate>` works in both server and client rendering modes per ADR 0001; two manual sanity checks pass (computed flag `true` → children visible; default `false` → renders `null`); types exported for Sprint 3 to consume.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, and ADR 0001 from Session 1 at `v2_react/docs/adr/0001-feature-flags-strategy.md`. Confirm the ADR is in place before proceeding — if Session 1 hasn't shipped it, return a hard blocker.
  >
  > Implement the feature-flag approach chosen in ADR 0001:
  >
  > **(a) `v2_react/lib/config/feature-flags.ts`** — exports:
  >
  > - `HOME_STORAGE_MVP_LIVE: boolean`
  > - `POLILOCALE_REPO_PUBLIC: boolean`
  > - `AGENT_PORTFOLIO_SECTION_LIVE: boolean` (computed: `HOME_STORAGE_MVP_LIVE && POLILOCALE_REPO_PUBLIC`)
  >
  > Default all to `false`. Source values per ADR 0001 (env vars / runtime config / hybrid). Export a `FeatureFlags` type with all three keys.
  >
  > **(b) `v2_react/components/FeatureGate.tsx`** — HOC / wrapper component:
  >
  > - Props: `{ flag: keyof FeatureFlags; children: ReactNode }`
  > - Behavior: when the flag is `false`, returns `null`; when `true`, returns `<>{children}</>`
  > - SSR-safe: works in both server components and client components per ADR 0001's chosen strategy (no client-only hooks in the default render path if the ADR allows server use)
  >
  > **(c) Manual sanity test** — render `<FeatureGate flag="AGENT_PORTFOLIO_SECTION_LIVE">test-gate-marker</FeatureGate>` somewhere in the `/dev/` route (you may append to the `portfolio-atoms` dev route from Session 2). With env vars / config set so the computed flag is `true` → `test-gate-marker` visible in the rendered output; with defaults → invisible (the element must not exist in the DOM, not merely be hidden via CSS).
  >
  > Stop when: build green, both flag states demonstrably work in the manual smoke test, types are exported for Sprint 3 to consume.

### Session 4 — Tests

- **Agent:** sprint-tester
- **Depends on:** Sessions 1, 2, 3
- **Exit:** All new tests pass; new code coverage ≥ 90% across `lib/portfolio/types.ts`, `cases/honeti.ts` data, the 3 atomic components, and `FeatureGate`.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, the host's `CLAUDE.md` if present, and the artifacts from Sessions 1–3. **Discover the test framework first:** read `v2_react/package.json` `scripts` + `devDependencies` and locate the test runner (Vitest / Jest / Playwright / similar). If no test framework is set up, return a HARD BLOCKER with that observation — do not pick one yourself. Picking a test framework is an architectural decision and must be discussed with the user, not made inside a tester session.
  >
  > Once the framework is identified, write tests covering:
  >
  > **(a) Data model** — `cases/honeti.ts`:
  >
  > - All 14 apps satisfy the `HoneticApp` type (use a runtime schema like Zod if already in deps, otherwise a hand-written type guard)
  > - `role` value is one of `"od-zera" | "rozwoj-i-serwis" | "przejety-w-trakcie"`
  > - `stack` value is one of `"Flutter" | "Unity"`
  > - Links (when present) match `/^https:\/\//`
  > - Exactly 5 Flutter apps and 9 Unity apps (matches `doc/honeti_apps_context.md`)
  > - Specific role assignments verified against the planning doc: Soildata = `przejety-w-trakcie`; the 4 own apps in Unity (`words_en`, `irregular-verbs`, `der-die-das`, `flags`) = `od-zera`; Gastro Ninja Klient, Gen / Oczami Dziecka, and the 3 extra educational apps (Tabliczka Mnożenia, Potęgi i Pierwiastki, Cyfry Rzymskie) = `rozwoj-i-serwis`
  >
  > **(b) Atomic components** — for each of `<RoleBadge>`, `<StackChip>`, `<StoreLink>`:
  >
  > - Render with each valid `role` / `stack` variant; assert correct visual variant class and label text
  > - `<StoreLink>`: assert which icons render based on which props are passed; assert `aria-label` on icon-only links; assert `target="_blank"` and `rel="noopener noreferrer"` on outbound links; assert correct render when only `external` is set (no store icons)
  >
  > **(c) `<FeatureGate>`** — render combinations:
  >
  > - Flag `true` → children present in rendered output
  > - Flag `false` → renders `null`; children must not appear in the DOM
  > - Computed `AGENT_PORTFOLIO_SECTION_LIVE` — exercise all 4 combinations of the two source flags via a test-only override seam (mock the module if needed)
  >
  > Stop when: all new tests pass via the framework's runner (`npm test` or equivalent), coverage report shows ≥ 90% on the new files listed above. Coverage of pre-existing unrelated files is not your concern this sprint.

### Session 5 — Sprint review

- **Agent:** sprint-reviewer
- **Depends on:** Sessions 1–4
- **Exit:** Verdict `pass` (sprint done, proceed to Sprint 2) or `fail` (with itemized concerns and which session to re-dispatch). No code changes — read-only.
- **Prompt:**
  > Read `~/.claude/agents/SPRINT_RULES.md`, this sprint file at `docs/sprints/sprint-001-portfolio-foundation.md`, and the diff produced by Sessions 1–4. You are read-only: no edits, no test runs that mutate the working tree (running `npm test` to verify is fine).
  >
  > Review covers:
  >
  > **(a) Types** — `HoneticApp` and related types in `v2_react/lib/portfolio/types.ts` are exhaustive; discriminated unions are used for closed type spaces (`role`, `stack`). No `any` slipped in. No string literals scattered across the codebase that should be union types.
  >
  > **(b) ADRs** — `0001-feature-flags-strategy.md` and `0002-portfolio-url-pattern.md` are concrete decisions (not "TBD" or "we should consider"). Each ends with a clear "we chose X because Y" statement. Length: max ~1 page each.
  >
  > **(c) Data fidelity** — `cases/honeti.ts` matches `doc/honeti_apps_context.md` exactly: 14 apps total (5 Flutter + 9 Unity), correct `role` assignments per the planning doc, no broken links (smoke-test a couple via `curl -I` if needed). The 4-app educational Unity series (Words EN, Czasowniki Nieregularne, Der Die Das, Flagi) is marked `od-zera`; Soildata is `przejety-w-trakcie`; Gen / Oczami Dziecka has `external` instead of `googleLink`.
  >
  > **(d) Atomic components** — `<RoleBadge>`, `<StackChip>`, `<StoreLink>` are presentation-only: no data fetching, no router calls, no business logic. Pure props in, JSX out.
  >
  > **(e) `<FeatureGate>`** — safe in both server and client components per ADR 0001's chosen strategy; no client-only hooks in the default render path (unless the ADR explicitly chose client-only); renders `null` correctly (no layout collapse bugs); types are exported for Sprint 3.
  >
  > **(f) Tests** — variants covered exhaustively, not just happy path. Edge cases: app without `googleLink`, app with `external` instead of store links, exhaustive `role` values in `<RoleBadge>` tests, all 4 combinations of the computed feature flag.
  >
  > Return a session report with **`verdict: pass`** (sprint is done) or **`verdict: fail`** with a list of concerns, each tagged with which session to re-dispatch and why.

## Out of scope

- Implementation of sections 4.1 (Honeti home tile + `/portfolio/honeti` subpage), 4.2 (Programming with agents, gated), and 4.3 (Warsztat AI) as UI — these are Sprint 2 and Sprint 3.
- The collective subpage `/portfolio/honeti` with the full 14-app list — Sprint 2.
- Localization of new strings to PL / EN / SV beyond the 3 keys for `<RoleBadge>` — Sprint 3.
- Scaffolding `v2_react/CLAUDE.md` (if missing) — a separate mini-task. > **TODO(user):** do it before `/sprint-run portfolio-foundation`, otherwise agents will guess at stack / test runner / codegen.
- Planning Sprint 2 / Sprint 3 files — separately planned by `/sprint-plan` after this sprint is accepted (ideally after `/sprint-run portfolio-foundation` returns `verdict: pass` from Session 5).
- Cleanup of the temporary route `app/[locale]/dev/portfolio-atoms/page.tsx` — Sprint 3 along with final integration.
- Per-app case study subpages (`/portfolio/honeti/infoshare` etc.) — later phase, not MVP.

> **Sprint planning skill notes:**
> - Session 1 bundles planner (ADRs) + implementer (data refactor) into a single session per the user's `A2` answer in the pre-planning round: "ADR-y w Sesji 1.1 (oszczędniej)".
> - Sessions are sequential by file order (canonical behavior). `Depends on: (none)` exists only for Session 1.
> - Total: 5 sessions — within skill boundaries (min 2, max 12–15).
