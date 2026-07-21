---
date: 2026-07-19T12:20:00+0200
researcher: Claude (Opus 4.8)
git_commit: 6d4534c7a7d661d98a29ad154ba0713f42bb9c6c
branch: feature/client-web-offer
repository: buzzards_soft_web
topic: "Reusable professional WEB design capability — mirror of the copywriting capability"
tags: [research, design-system, design-tokens, capability, skill, agent, tailwind-v4, shadcn]
status: complete
last_updated: 2026-07-19
last_updated_by: Claude (Opus 4.8)
---

# Research: Professional web-design generation (reusable art-direction capability)

**Date**: 2026-07-19T12:20:00+0200
**Researcher**: Claude (Opus 4.8)
**Git Commit**: 6d4534c7a7d661d98a29ad154ba0713f42bb9c6c
**Branch**: feature/client-web-offer
**Repository**: buzzards_soft_web

## Research Question

How do we build a reusable, on-brand **professional web-design capability** that mirrors the
`web-copy-generation` copywriting capability in shape — producing a **reviewable art-direction /
design-standard artifact** (not a direct code dump), driven by a shared `~/.claude/design-standard/`
home + an interactive `design-web` skill + a sprint-callable `designer` agent, grounded in our stack
(Next.js 16 / React 19 / Tailwind v4 / shadcn + Base UI)? Includes a build-vs-buy analysis against
ready-made market design skills, and the concrete content a professional web-design standard should hold.

## Summary

**Build, not buy — same verdict as copy, for the same structural reason.** The only substantive
design asset in any installed marketplace is Anthropic's `frontend-design` skill, and it is a
**stateless, novelty-maximizing** rubric — its explicit rule is *"NEVER converge on common choices
across generations."* That is the exact **anti-thesis** of a durable, on-brand standard. Everything
else is a generic engineering persona or empty template stubs. The reusable IP we need — a locked
brand voice for *visuals* + a machine-checkable token contract + a design-quality gate — does not
exist to buy.

**The copy capability is a live, on-disk template.** As of today `~/.claude/copy-standard/` exists
with all five contracts (`voice-charter.md`, `framework-spine.md`, `ban-list-pl.md`,
`namespace-contract.md`, `voice-gap-test.md` — being materialized in a parallel instance). We clone
its **hub-and-spoke** shape 1:1: one neutral shared standard (the IP) ← read by thin front-ends (an
interactive skill + a sprint agent), a **dual quality gate** (qualitative gap-test + machine gate),
and a **6-phase build that pilots ONE unit before scaling**.

**Design differs from copy in three load-bearing ways** (see §Architecture Insights): (1) output is
**code/tokens**, not prose→JSON, so the "namespace contract" becomes a **token contract**; (2) review
is **visual** — the gap-test needs rendered output (screenshots / the `dev-live-chrome` loop), not
pure text scoring; (3) the **machine gate is weaker** — there is no single cheap invariant like i18n
key-parity, so it must be assembled from token-conformance + a11y/contrast + build/type-check.

**The current site is a strong starting corpus, not a defect.** Unlike copy (whose current text *was*
the problem), the site already has a coherent, above-average visual system — dark-first slate +
emerald(brand)/amber(CTA), an 8px-ish rhythm, a `--radius`-derived scale, restrained Framer-Motion,
`prefers-reduced-motion` respected. This means **design-DNA extraction is viable NOW** (a Phase-1
input), an advantage the copy slice lacked — the standard can be *extracted-and-sharpened*, not only
authored top-down.

## Detailed Findings

### Area 1 — Current visual design system of the live site (codebase audit → the grounding corpus)

The site is Tailwind v4 **CSS-first** (`app/globals.css` — `@theme inline` + `:root`/`.dark` vars,
no `tailwind.config.js`). It is a **mature, intentional, dark-first** system — *not* "AI slop".

- **Tokens** — `app/globals.css:1-192`. Palette: `--background #020617` (slate-950), `--surface
  #0f172a`, `--brand/--accent #10b981` (emerald-500) + `--brand-soft #34d399`, `--cta/--primary
  #f59e0b` (amber-500) + `--cta-hover #fbbf24`, `--destructive #f43f5e`, muted/foreground greys.
  Radius scale derived from one token: `--radius: 0.75rem` → sm/md/lg/xl/2xl via `calc()`
  (`globals.css:49-54`). **This is exactly the shadcn v4 convention** (semantic CSS vars, `.dark`
  mirror, `@theme inline` bridge) — see Area 4.
- **Typography** — `app/[locale]/layout.tsx:2,28-36`. Geist + Geist Mono via `next/font/google`;
  `--font-heading` is *aliased to Geist* (no distinct display face). Eyebrow idiom: `font-mono
  text-xs tracking-[0.18em] uppercase text-brand`. Type scale xs→7xl (hero h1 `text-5xl
  sm:text-6xl lg:text-7xl`, `hero.tsx:25`).
- **Components** — `components/ui/*` on **Base UI (`@base-ui/react`)** + **CVA** + `cn`
  (clsx+tailwind-merge). 12 primitives (button 6 variants/7 sizes, badge, card compound, input,
  select, accordion, sheet, textarea, form via react-hook-form, sonner). `data-slot` attribute idiom.
- **Layout/chrome** — container idiom `mx-auto max-w-7xl px-6 sm:px-8`; section rhythm `py-24
  sm:py-32` (offer `py-20 sm:py-28`); grid gaps `gap-5 md:gap-6`. Header renders **home-only**
  (`header.tsx`), scroll-hide + backdrop-blur; footer 12-col grid.
- **Motion** — **Framer Motion v12**. `components/shared/scroll-reveal.tsx` (fade + 16px y,
  0.5s easeOut, `once`, `-100px` margin, honors `prefers-reduced-motion`); `StaggerGroup`/`Item`
  (0.05–0.07s). Hero backdrop parallax glows + SVG grain overlay (opacity 0.04). Micro-interactions
  restrained: `active:translate-y-px`, card `hover:scale-[1.02]`, 3px focus ring.
- **Honest aesthetic assessment** — distinctive (emerald+amber is uncommon), coherent (consistent
  rhythm/scale/radius), purposeful ("sharp, technical, trustworthy"). Risks: **austere/cold**
  (no warmth, hero graphic is placeholder), and **type voice is default** (Geist, not a bespoke
  display face) — the two clearest sharpening targets for a standard.

### Area 2 — The copy capability blueprint we mirror (codebase: `context/slices/web-copy-generation/**` + live `~/.claude/copy-standard/`)

Hub-and-spoke, now partly on disk. The five shared contracts and their **design analogues**:

| copy-standard file | Role | → design-standard analogue |
| --- | --- | --- |
| `voice-charter.md` | Locked brand voice: "X but never Y" traits + affirmative rule + register floor | `design-charter.md` — visual "X but never Y" (e.g. *sharp-never-cold, structured-never-rigid, warm-never-soft*) + anti-slop rule + a11y floor |
| `framework-spine.md` | Structural playbook (StoryBrand SB7 + PAS/BAB/FAB) | `design-spine.md` — layout/section-composition playbook: hero pattern, proof pattern, 8pt grid, spacing rhythm, F→layer-cake scan |
| `ban-list-pl.md` | Natively-authored AI-tell ban list | `anti-slop-checklist.md` — visual AI-tells to avoid (default indigo/purple, centered-hero→3-cards skeleton, colored left-border cards, all-caps labels, glassmorphism defaults) |
| `namespace-contract.md` | Locks the `offer.*` key tree; output maps 1:1 onto `messages/*.json`; CI-checkable | `token-contract.md` — locks the shadcn semantic-token surface + Tailwind v4 `@theme` names output must map onto; the machine-checkable half |
| `voice-gap-test.md` | Scores copy vs charter per dimension MATCHED/PARTIAL/MISSED → regenerate misses | `design-gap-test.md` — scores **rendered** output vs charter per visual dimension (rhythm, hierarchy, token-adherence, alignment, contrast) → regenerate misses |

- **Why a neutral shared home, not nested in a skill** (`plan-review.md:28-43`, `plan.md:126-130`):
  three front-ends read the same contracts; nesting couples the others to one skill's private dir by
  relative path (fragile on move/rename). **Default `~/.claude/design-standard/` from the start** —
  don't repeat the nesting mistake the copy review had to fix.
- **Front-ends** — `generate-professional-copy-pl` (interactive, emits reviewable artifact under
  `context/slices/**`, does NOT write `messages/*.json`), `transcreate-copy-en` (variant deltas in
  its own `references/`), `copywriter` agent (autonomous generate→verify→fix loop, built last).
- **Build sequence** — 6 phases: shared contracts → pilot ONE section (hero) via gap-test → full
  rewrite as artifact → land (separate reviewed step) → EN/SV → agent last off critical path. Each
  phase ends in a **human-confirmation pause** (aligns with the user-only planning→impl gate).
- **~800-word generation window** → for design becomes **"one component / one section per
  generation"** (bounded unit; restate rules at the tail; primacy+recency beats drift).
- **corrections-as-data / DNA** — copy *deferred* voice-DNA extraction (no good samples existed).
  **Design can do DNA extraction now** (the site is a decent corpus): an analyzer prompt reads
  reference components/screenshots and emits a **metric-not-adjective** profile ("8px base rhythm",
  "1.25 type ratio", "radius set {7.2, 9.6, 12, 16.8, 21.6}px", "brand-token usage %") — every
  observation cites a real value, never an adjective.

### Area 3 — Professional web-design principles & tokens (external, cited)

- **Design tokens, three-tier** — primitive → semantic → component, one-way dependency; name
  semantics for *role* not appearance (`text-secondary` survives a rebrand, `gray-text` doesn't).
  Sources: contentful.com/blog/design-token-system, honcho.agency token-tiers.
- **W3C DTCG format** — *Design Tokens Format Module 2025.10* (preview draft, not ratified). Tokens
  need `$value`+`$type`; supports `$description`/`$deprecated`; aliases `"{group.token}"`; composite
  types `border`/`shadow`/`typography`/`transition`. Source: designtokens.org/TR/drafts/format.
- **Scales** — color as stepped ramps with fixed per-step roles (Radix **12 steps/hue**: 1-2 bg,
  3-5 component bg, 6-8 borders incl. focus @7, 9-10 solid, 11-12 text; M3 13 tones). Spacing
  **8-point grid** (4px half-step) — divides cleanly across densities, cuts decision count. Type =
  modular scale (Perfect Fourth 1.333 / golden 1.618). Radius = single scalable token. Elevation =
  4-6 discrete levels, layered 2-3 shadows, hue-matched. Sources: radix-ui.com/colors,
  carbondesignsystem.com/elements/spacing, m3.material.io, joshwcomeau.com/css/designing-shadows.
- **Anti-"AI slop" thesis** — LLMs emit the *statistical average* (→ "VibeCode purple", from
  Tailwind's 2019 `indigo-500` demo default flooding tutorials). Audit of 1,590 Show HN pages: 22%
  heavy slop / 32% mild / 46% clean. 16 measurable tells: Inter everywhere, centered hero, badge
  above H1, colored left-border cards, **exactly three icon-topped feature cards**, 1-2-3 steps,
  all-caps labels, glassmorphism. Clean sites: non-default palette *with a point of view*, typefaces
  beyond Inter, "one strong layout primitive repeated". Fix = explicit **negative constraints** +
  reference-driven prompting ("The model can execute. You have to direct."). Sources:
  developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it, prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website.
- **Color strategy** — 60-30-10 dominance (accent = 10%, "where the action is": CTAs/links).
  Refactoring UI: need **8-10 greys** + **1-2 primaries w/ 5-10 shades** — "can't build anything
  with five hex codes". Sources: blog.logrocket.com/ux-design/60-30-10-rule, refactoringui.com.
- **Hierarchy** — the two signals doing the heavy lifting are **size difference + whitespace**;
  "emphasize by de-emphasizing"; verify with the **squint/blur test** (grayscale + 5px blur).
  Reading patterns: convert low-efficiency **F-pattern** → high-efficiency **layer-cake** (distinct
  front-loaded headings); **Z-pattern** for sparse hero layouts. Type craft: measure **45-75 chars
  (~66 ideal)**, body line-height **1.4-1.6**, headings **1.1-1.3**, 16px baseline. Sources:
  nngroup.com (f-shaped, layer-cake), refactoringui synthesis, practicaltypography.com.
- **Codifying a standard** — design **principles** (steer decisions) vs **guideline/system docs**
  (the canon). Good principles are **opinionated, tie-breaking, memorable** (~3-7, one pithy
  sentence each, paired with on/off-brand examples) — "Be user-friendly" is fluff; GDS "Do less",
  "Be consistent, not uniform" are principles. Convergent doc taxonomy across Polaris/Carbon/
  Atlassian/M3: **Principles → Foundations/Tokens → Components → Patterns → Guidelines (a11y,
  content)**. Sources: nngroup.com/articles/design-principles, gov.uk/guidance/government-design-principles,
  vitsoe.com/us/about/good-design.

### Area 4 — Market design skills + build-vs-buy + live stack conventions (external + local, cited)

**Market scan (all local marketplaces):**

| Asset | Output | Persistent brand standard? | Stack-grounded? | Gap for us |
| --- | --- | --- | --- | --- |
| `frontend-design` (official) | one-shot UI code | **No — anti-consistency** ("never converge…no design the same") | No (HTML/React/Vue) | Stateless, novelty-seeking; importing it imports an **anti-brand** bias |
| `frontend-developer` agent (awesome) | code (React/Vue/Angular) | No (names "design system" as a bullet only) | Partial/plural | No tokens, not our stack, no reviewable doc |
| `05-frontend-dev/*` (plugins-plus, 25 skills) | nominal code | No | No — **empty boilerplate stubs** | `tailwind-class-optimizer` contains zero Tailwind knowledge |
| night-market / codex / others | workflow/arch | No | No | No design/UI/theming skill exists |

**Verdict — BUILD.** Harvest `frontend-design`'s *taste rubric* (type discipline, token-driven
color, motion restraint, anti-slop list) and `frontend-developer`'s *engineering checklist*
(WCAG, Core Web Vitals) as **inputs** — but **invert** the novelty rule into a **consistency** rule
(converge on *our* brand every time). See External Sources for stack facts.

**Accessibility floors the standard must bake in (WCAG 2.2):** contrast **4.5:1** normal / **3:1**
large + non-text; visible focus, **not obscured** (2.4.11, new), focus appearance ≥2px & 3:1 (AAA);
`prefers-reduced-motion` honored globally; target size **≥24×24** (AA) / 44×44 (AAA), platform mins
44pt (Apple) / 48dp (Material); 200% resize; 320px reflow; text-spacing survivability.

### Area 5 — Skill & agent anatomy to author `design-web` + `designer` (codebase)

- **Skill** — `~/.claude/skills/<name>/SKILL.md` (YAML frontmatter `name`/`description`/optional
  `allowed-tools`; body is **prose instructions**, harness executes the prose) + optional
  `references/` for skill-private contracts. Auto-discovered at startup. Closest analogs to study:
  `nextjs-app-router-audit` (review/severity shape), `dev-live-chrome` (live UI loop + MCP bridge),
  `research`/`plan` (question-scaling, AskUserQuestion), `impl-review` (dual foreground+AFK path over
  one shared `references/*procedure*.md`).
- **Agent** — `~/.claude/agents/<name>.md` (frontmatter `name`/`description`/`model`/optional
  `tools`; opens with *"read `~/.claude/agents/SPRINT_RULES.md` + host `CLAUDE.md` first"*). Not
  auto-discovered — dispatched by `/sprint-run` from the sprint file. Existing: `sprint-implementer/
  tester/reviewer/runner` (+ `SPRINT_RULES.md` shared preamble). Heavy on **negative constraints**.
- **Shared home** — `~/.claude/copy-standard/` (live) and `~/.claude/agents/SPRINT_RULES.md` confirm
  the neutral-top-level convention. `~/.claude/design-standard/` is the correct home for our contracts.
- **Anti-patterns to avoid** — don't nest shared contracts in a skill dir; agents live only in
  `~/.claude/agents/`; write prose not pseudocode; skills suggest the next step, never auto-invoke.

## Code References

- `app/globals.css:1-192` — Tailwind v4 `@theme inline` + `:root`/`.dark` token source of truth
- `app/globals.css:49-54` — `--radius` + calc-derived radius scale
- `app/globals.css:81-157` — full 20-token palette (slate/emerald/amber/rose)
- `app/[locale]/layout.tsx:2,28-36` — Geist + Geist Mono via next/font; `--font-heading` alias
- `components/ui/button.tsx:6-41` — CVA variant/size matrix idiom
- `components/ui/card.tsx:1-103` — compound-component pattern
- `components/layout/header.tsx` — home-only render + scroll-hide chrome
- `components/shared/scroll-reveal.tsx:1-147` — Framer Motion reveal/stagger, reduced-motion honored
- `components/sections/hero/hero.tsx:19-79` — section/container/eyebrow idiom; hero grid
- `components/sections/hero/hero-backdrop.tsx:1-67` — parallax glows + SVG grain

## External Sources (live docs)

- **Tailwind v4 theming** — Context7 `/tailwindlabs/tailwindcss.com` (topic: CSS-first `@theme`):
  v4 **replaces `tailwind.config.js`** with an `@theme{}` CSS block after `@import "tailwindcss"`;
  tokens are namespaced custom props (`--color-*` often `oklch()`, `--font-*`, `--radius-*`,
  `--ease-*`, `--breakpoint-*`); `@config`/`@plugin` interop for incremental migration.
- **shadcn/ui theming** — Context7 `/shadcn-ui/ui` (topics: theming, components.json, v4): CSS-var
  semantic tokens (`background`/`foreground` pairs, `primary`/`muted`/`accent`/`destructive`/
  `border`/`input`/`ring`/`chart-*`/`sidebar-*`); `components.json` (`cssVariables:true`,
  `baseColor`, `css` path); v4 pattern = `@theme inline` mapping vars → utilities, values in
  `:root`/`.dark` as `oklch()`; **Base UI** supported as primitive backend alongside Radix — token
  layer identical either way. **Our repo already follows this exact pattern.**
- **W3C DTCG** — designtokens.org/TR/drafts/format (Design Tokens Format Module 2025.10, preview).
- **Design systems** — m3.material.io (color roles, elevation, layout), radix-ui.com/colors
  (12-step scale), carbondesignsystem.com (spacing/2x-grid), atlassian.design/foundations/tokens,
  polaris-react.shopify.com/foundations (doc taxonomy).
- **Craft / principles** — refactoringui.com, nngroup.com (design-principles, f-shaped, layer-cake),
  practicaltypography.com (line length), joshwcomeau.com/css/designing-shadows, w3.org/TR/WCAG22.
- **Anti-slop** — developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it (1,590-page audit,
  16 tells), prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website.

*Caveats:* the AI-slop audit + purple-origin essay are current commentary, not peer-reviewed (cite
as thesis). DTCG is a preview draft, not ratified. Some M3/Apple exact figures came via search
excerpts of official domains — re-fetch if a number becomes load-bearing.

## Architecture Insights

- **Clone the hub-and-spoke verbatim:** `~/.claude/design-standard/` (charter + spine +
  anti-slop-checklist + token-contract + design-gap-test) ← `design-web` interactive skill +
  `designer` sprint agent. Dual gate: **Design-Gap-Test** (visual/manual) + **token-conformance /
  a11y-contrast / build+type-check** (machine). 6-phase build, pilot ONE component first,
  artifact→review→land, agent last.
- **Three genuine divergences from copy** (must design around, not ignore):
  1. **Output is code/tokens** → the "namespace contract" becomes a **token contract** targeting the
     concrete `globals.css` `@theme`/`:root`/`.dark` surface + shadcn semantic set. The standard's
     *machine-readable half* owns oklch token values; its *human-readable half* is the append-revised
     rationale doc pointing at that CSS as source of truth.
  2. **Review is visual** → the gap-test needs **rendered output** (screenshots via chrome-devtools /
     the existing `dev-live-chrome` loop), not text scoring. Heavier tooling, more subjective.
  3. **Machine gate is weaker** → no single cheap invariant like i18n key-parity. Assemble from
     token-conformance lint (no arbitrary values / only approved tokens), a11y/contrast checks,
     build+type-check, optional visual-regression. **Assert the invariant, not exact pixels**
     (avoid change-detector snapshots).
- **DNA extraction is a Phase-1 advantage here** (unlike copy): the site is a usable corpus, so the
  charter can be *extracted-and-sharpened* (metric-not-adjective analyzer) rather than only authored
  top-down. Sharpening targets already visible: warmth deficit + default type voice.
- **Shared core web↔mobile:** the sibling `mobile-design-generation` slice will need its own
  spine/tokens (Flutter/Material 3), but **principles, anti-slop thesis, a11y floors, gap-test
  procedure, and DNA-extraction method are platform-neutral** — candidate for a shared
  `design-standard/_core/` with `web/` and `mobile/` deltas. To settle across both research docs.

## Historical Context (from prior changes)

- `context/slices/web-copy-generation/plan.md`, `plan-brief.md`, `plan-review.md`, `research.md` —
  the capability being mirrored; `plan-review.md:28-43` is the "shared home not nested" fix we
  pre-adopt. `research.md:453-516` is the voice-DNA method reused as design-DNA.
- `~/.claude/copy-standard/*` — the live on-disk template (5 contracts) to structurally clone.

## Related Research

- `context/slices/mobile-design-generation/research.md` — sibling (Flutter). Shared-core decision
  is cross-referenced between the two.
- `context/slices/web-copy-generation/research.md` — the copy capability this mirrors.

## Open Questions

1. **Shared core vs per-platform split** — do web + mobile share `~/.claude/design-standard/_core/`
   (principles, anti-slop, a11y, gap-test method, DNA-extraction) with thin `web/`+`mobile/` deltas,
   or two fully separate homes? (Resolve jointly with the mobile research.)
2. **DNA-extract vs author top-down** — extract the charter from the current site (corpus exists) or
   author top-down and treat the sharpened site as the first corpus? Recommendation: **extract, then
   sharpen** (warmth + a bespoke display face are the obvious deltas).
3. **Design-Gap-Test tooling** — reuse `dev-live-chrome` (chrome-devtools MCP screenshots) as the
   rendering substrate for the visual gate, or a lighter static heuristic? Live rendering is the
   honest oracle but heavier.
4. **Machine-gate scope** — how far to push token-conformance lint / visual-regression now vs defer
   (mirror copy's "no new test infra if avoidable"). What's the cheapest useful invariant set?
5. **Pilot unit** — which single component/section is the Phase-2 pilot (copy chose hero)? Hero, or a
   card/section with more reusable token surface?
6. **`design-web` skill vs `nextjs-app-router-audit` overlap** — is `design-web` generate-only, or
   also a design-*review* mode? Keep generation and review as one skill (modes) or two?
7. **Does the standard write `globals.css` directly, or emit a token artifact a landing step applies?**
   (Copy analogue: skills never write `messages/*.json` directly.) Recommendation: artifact →
   reviewed landing step, same separation of concerns.
