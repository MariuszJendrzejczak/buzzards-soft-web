# Web-Design Generation — Plan Brief

> Full plan: `context/slices/web-design-generation/plan.md`
> Research: `context/slices/web-design-generation/research.md`

## What & Why

Build a reusable, on-brand **web-design capability** — a shared standard home
`~/.claude/design-standard/` (`_core/` + `web/`), a dual-mode `design-web` skill, and a
sprint-callable `designer` agent — the visual sibling of the `web-copy-generation` copy capability.
Then use it to **add a light theme + dark/light toggle and fully redesign the site** (home + offer +
chrome) in both themes. The gap it fills: no market skill holds a durable, on-brand, stack-grounded,
reviewable design *standard* (research Area 4 → BUILD).

## Starting Point

The site is Tailwind v4 CSS-first (`app/globals.css` `@theme inline`), **dark-only** (palette in
`:root`, no light theme, no toggle), Geist-only type (`--font-heading` aliased to Geist), Base UI +
CVA components, static export (`output:'export'`). Research judges it coherent and above-average —
**not AI slop** — with two honest weaknesses: austere/cold and a default type voice. That makes the
live site a usable DNA corpus, an advantage the copy slice lacked.

## Desired End State

`~/.claude/design-standard/` drives a `design-web` skill + `designer` agent. The site ships a light
theme and a no-flash dark/light toggle (default dark), and home + offer + chrome are redesigned onto
a sharpened design-spine in both themes — landed section-by-section after review, each passing the
machine gate and the developer's on-screen HITL test, closed by a final AI design review.

## Key Decisions Made

| Decision | Choice | Why | Source |
| --- | --- | --- | --- |
| Build vs buy | Build | No market skill holds a durable on-brand stack-grounded design standard | Research |
| Capability shape | Shared `_core`+`web` home ← `design-web` skill + `designer` agent | 1:1 mirror of the copy capability | Research/Plan |
| Shared-home structure | `_core/` (neutral) + `web/` delta now; `mobile/` later | Web+mobile share the core; no duplication | Plan |
| Output | Reviewable art-direction artifact → separate reviewed landing | Separation of concerns; review before prod (copy mirror) | Plan |
| `design-web` scope | Dual-mode: generate **+** review | One front-end; gap-test reused for audit (impl-review precedent) | Plan |
| Charter method | Extract design-DNA → sharpen | Live site is a ready measured corpus (metric-not-adjective) | Research/Plan |
| Aesthetic direction | Sharpen existing (dark slate+emerald/amber) + **add light theme + toggle** | On-brand consistency over novelty; fixes cold + default type | Plan |
| Redesign surface | Whole site: home + offer + chrome, **dark+light** | "Everything designed in this slice" | Plan |
| Pilot unit | Hero section | Highest-signal, richest token surface; where the weakness lives | Plan |
| Visual gate | Design-Gap-Test via `dev-live-chrome` (chrome-devtools MCP) | Honest rendered oracle, both themes, zero new infra | Plan |
| Machine gate | Token-conformance lint + WCAG contrast (both themes) + build/test/lint | Cheapest useful invariants; no visual-regression | Plan |
| Skill authoring | Use `/skill-creator` | House tool for scaffolding skills | User |
| HITL cadence | Developer on-screen test per phase + final AI review | User-directed | User |

## Scope

**In scope:** shared standard (`_core`+`web`); DNA extraction + sharpened charter incl. light palette
+ display font; token inversion to shadcn convention (light `:root` / dark `.dark`); dark/light
toggle (static-export-safe); `design-web` dual-mode skill; `designer` agent; full redesign of home +
offer + chrome in both themes; contrast + token-conformance tests.

**Out of scope:** mobile/Flutter (sibling slice); any copy/content change; SaaS adoption;
visual-regression snapshots; pricing/module/contact/SEO/i18n behavior changes; bespoke redesign of
privacy/portfolio beyond token inheritance + toggle reachability.

## Architecture / Approach

Hub-and-spoke, cloned from copy: neutral `~/.claude/design-standard/_core/` + a `web/` delta ← a thin
interactive `design-web` skill (generate/review) + an autonomous `designer` agent. Standard authored
first (highest leverage), grounded in a **measured** DNA extraction of the live site + two sharpening
deltas (warmth, display font) + a full light palette. Token + toggle infrastructure lands next as the
rendering substrate; then the skill/agent are built (`/skill-creator`) and proven on the hero pilot;
then the rest of home + chrome + offer are redesigned section-by-section — generate→gap-test
(dev-live-chrome)→machine gate→developer HITL→reviewed landing. Agent finalized last, closing AI
review over the whole redesign.

## Phases at a Glance

| Phase | What it delivers | Key risk |
| --- | --- | --- |
| 1. Contracts + DNA | `_core`+`web` standard + measured DNA profile + sharpened charter (dark+light) | Charter too vague to change output; light palette weak |
| 2. Token + toggle infra | Light+dark tokens in `globals.css`, display font, no-flash toggle, contrast/conformance tests | Static-export toggle flash/hydration; token inversion blast radius |
| 3. Skill + agent + hero pilot | `design-web` (dual-mode) + `designer`; hero landed both themes | Loop doesn't beat a plain prompt |
| 4. Home sections + chrome | Rest of home + header/footer redesigned, both themes | Cross-section inconsistency; toggle placement |
| 5. Offer page | Offer redesigned, both themes | Breaking offer i18n/route smoke |
| 6. Agent finalize + AI review | Runnable `designer` + closing whole-site design review | Autonomous loop underperforms the skill |

**Prerequisites:** research complete (done); `dev-live-chrome` usable (user's Chrome + dev server);
`/skill-creator` available. No roadmap dependency. `_core/` must be authored neutral for mobile reuse.
**Estimated effort:** ~6–8 sessions across 6 phases (Phase 1 + the redesign Phases 4–5 are the heavy
ones; Phase 6 is small, off critical path).

## Open Risks & Assumptions

- Charter is extract-then-sharpen — risk of codifying current weaknesses if the sharpening pass is
  weak; the developer's Phase-1 review is the guard.
- Light theme is net-new and the higher contrast risk; the contrast test covers both themes.
- Static-export theme toggle (no-flash, hydration-safe) is the trickiest engineering detail;
  next-themes usage must be grounded via Context7 at implementation, not memory.
- Token inversion touches every semantic token — must land whole before component re-point.
- Heavy per-phase visual HITL means this is better run **foreground** (`/slice-run`) than fully AFK.

## Success Criteria (Summary)

- The capability produces on-brand art-direction an autonomous agent can reuse; the hero pilot passes
  the Design-Gap-Test in both themes.
- The site ships a working, no-flash light/dark toggle and a fully redesigned home + offer + chrome in
  both themes, visually consistent and warmer than today.
- `npm run build && npm run test && npm run lint` green across all three locales, incl. the new
  contrast + token-conformance tests; closing AI design review has no unresolved high-severity findings.
