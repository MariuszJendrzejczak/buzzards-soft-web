# Portfolio + HONETi badge/chip/tag colour system — web art direction (returned for a sprint to land — NOT globals.css/components)

> Artifact of slice `web-design-generation`. Produced by the `designer` agent against
> `~/.claude/design-standard/_core/*` + `web/*`, the DNA profile §8 (light palette +
> light-theme accent-contrast findings), and the sibling artifact
> `pilot-warsztat.md` (whose `light dark:` methodology + "`-500/xx` fills stay,
> only text/icons/small-labels-as-accent need the shade swap" rule this reuses verbatim).
>
> **Scope:** ONE coherent colour system for the badge / chip / tag / accent-text surfaces
> of the **home `#portfolio` section** and the **HONETi detail page** (`/portfolio/honeti`),
> in **both themes**. Re-theming only — no layout, no copy, no i18n key changes, no new deps.
> Each badge KEEPS its hue identity (Flutter=sky, Firebase=amber, …); only the light-theme
> text/icon shade is re-picked to clear its WCAG floor on the warm off-white surface.
> Artifact only; a separate landing step edits the `.tsx`. This file writes **no** `.tsx`/`.css`.
>
> **The bug being fixed (reported at the closing gate):** these surfaces were built dark-only.
> Every badge is `border-{c}-500/30 bg-{c}-500/10 text-{c}-300` (or `-200`). The tinted
> **fills** (`bg-{c}-500/10`) read on both themes; the failure is the **text/icon** shade —
> `text-{c}-300/200` measures ~1.3:1 on the light tinted surface (see §3), illegible. The fix
> is theme-aware text/icon: **dark keeps today's `-300/-200/-400`; light gets a darker shade
> that clears its floor.**

---

## Design intent (the one-paragraph direction)

The portfolio badges are a **taxonomy legend** — many small chips, each a different hue, that
let the eye group apps by tech/role/stack at a glance. That is a *legitimate* many-colour
surface (it is data-encoding, not decoration), so it does not violate the one-accent rule
(principle 4 governs the brand *action* accent — emerald/amber — which is unchanged here;
these chips are categorical labels, the visual equivalent of a coloured map key). The through-line
the re-theme must hold (principle 1, converge-on-our-brand): **each hue keeps its meaning across
both themes** (Flutter is always sky, Firebase always amber), the chip primitive is identical, and
only the *ink* darkens on paper so it stays legible — exactly the warsztat rule applied to a
legend instead of a schematic. The neutral chips (AGPL / Next.js / rozwoj-i-serwis) are *not*
categorical colour — they are "neutral/greyscale" by intent, so per the token-contract they
move to `foreground`-based tokens that already flip, rather than a raw slate/zinc/gray palette
pair (a raw neutral palette shade is a token-adherence smell when a semantic neutral exists).

**Core mechanism (identical to warsztat):** keep every `bg-{c}-500/[0.05..0.10]` tinted fill
unchanged across themes; give every accent-coloured **text/icon** an explicit `light dark:` pair
where light is a darker shade of the same hue; move genuinely-neutral chips to `foreground`
tokens. Because icon + label share one `text-{c}-xxx` class in these components, the chosen
light shade must clear the **text** floor (4.5:1) — that is the binding constraint, and it makes
the icon (3:1) pass automatically.

---

## 1. Per-hue light-shade decision table (contrast genuinely computed)

**Method (genuine, not asserted).** Ratios computed by script (`/tmp/contrast.js`, oklch→sRGB
for the light surface + the Tailwind v4 palette hex for each shade). The badge text sits on its
own **tinted surface** = `bg-{c}-500/10` alpha-composited over `--surface` (`oklch(0.965 0.006 90)`
≈ `#f5f3ef`), which is the real background the label renders against. Badge label is `text-xs`
(12px) → **small text → strict 4.5:1**. Icon shares the same class, so text-floor binds.

Legend: **light shade chosen** is the one applied in light mode; **dark shade kept** is today's.
"Text ratio" = chosen light shade as label text on its tinted surface (floor 4.5:1). Marginal/fail
values in the rejected column show *why* the swap is mandatory, not cosmetic.

| # | Hue | Badge(s) | Current (dark, kept) | `-700` text | `-800` text | **Light shade chosen** | Light text ratio | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | **sky** | Flutter (tech-badge) | `text-sky-300` | **4.88** ✓ | 6.22 | `text-sky-700 dark:text-sky-300` | **4.88:1** | ✓ text |
| 2 | **amber** | Firebase (tech-badge) | `text-amber-300` | 4.24 ✗ | **5.98** ✓ | `text-amber-800 dark:text-amber-300` | **5.98:1** | **-700 FAILS (4.24) → -800** |
| 3 | **emerald** | CI/CD, E2E (tech-badge) | `text-emerald-300` | **4.54** ✓ | 6.36 | `text-emerald-700 dark:text-emerald-300` | **4.54:1** | ✓ text (thin margin) |
| 4 | **blue** | TypeScript (tech-badge) | `text-blue-300` | **5.44** ✓ | 7.07 | `text-blue-700 dark:text-blue-300` | **5.44:1** | ✓ text |
| 5 | **teal** | Web (tech-badge) | `text-teal-300` | **4.54** ✓ | 6.30 | `text-teal-700 dark:text-teal-300` | **4.54:1** | ✓ text (thin margin) |
| 6 | **cyan** | React (tech-badge) | `text-cyan-300` | 4.44 ✗ | **6.03** ✓ | `text-cyan-800 dark:text-cyan-300` | **6.03:1** | **-700 MARGINAL (4.44) → -800** |
| 7 | **violet** | i18n (tech-badge) | `text-violet-300` | **5.71** ✓ | 7.22 | `text-violet-700 dark:text-violet-300` | **5.71:1** | ✓ text |
| 8 | **blue** | Flutter (stack-chip) | `text-blue-300` | **5.44** ✓ | 7.07 | `text-blue-700 dark:text-blue-300` | **5.44:1** | ✓ text |
| 9 | **purple** | Unity (stack-chip) | `text-purple-300` | **5.62** ✓ | 7.02 | `text-purple-700 dark:text-purple-300` | **5.62:1** | ✓ text |
| 10 | **emerald** | od-zera (role-badge) | `text-emerald-300` | **4.54** ✓ | 6.36 | `text-emerald-700 dark:text-emerald-300` | **4.54:1** | ✓ text |
| 11 | **emerald** | hero-chip + icon (WarsztatHeroTile) | `text-emerald-300` / `-400` | **4.54** ✓ | 6.36 | `text-emerald-700 dark:text-emerald-300` | **4.54:1** | ✓ text |
| — | **slate** | AGPL-3.0 (tech-badge) | `text-slate-300` | 8.33 ✓ | 11.76 | **→ neutral token** (§2, not a palette pair) | n/a | move to `foreground` |
| — | **zinc** | Next.js (tech-badge) | `text-zinc-200` | 8.39 ✓ | 11.97 | **→ neutral token** (§2) | n/a | move to `foreground` |
| — | **gray** | rozwoj-i-serwis (role-badge) | `text-gray-300` | 8.28 ✓ | 11.80 | **→ neutral token** (§2) | n/a | move to `foreground` |

**Calls-out:**

- **amber (Firebase) and cyan (React) require `-800`, not `-700`.** `amber-700` = **4.24:1**
  (below the 4.5 floor) and `cyan-700` = **4.44:1** (rounds to a fail). Both `-800` shades clear
  comfortably (5.98 / 6.03). This mirrors the warsztat amber finding exactly: low-luma warm hues
  need one step darker. **These two are the only hard `-800` cases.**
- **emerald (4.54) and teal (4.54) at `-700` are thin passes** — above 4.5 but by <0.1. They are
  a technical PASS at `-700`; if the on-screen eyeball finds them muddy or wants margin, `-800`
  (6.30–6.36) is the safe bump. Recommendation: **ship `-700`, flag as the eyeball tuning call.**
- **All other hues (sky, blue, violet, purple) pass at `-700`** with 4.9–5.7:1 margin.
- **The three neutral hues (slate/zinc/gray) all pass at `-700`/`-800` numerically** (8+ :1) —
  but they are re-classified as neutral tokens (§2) because their colour is *not* a taxonomy
  signal, it is "no colour". Using `text-foreground/70` is the token-contract-correct move and
  makes them flip for free.
- **Icons pass automatically.** In every component the icon shares the label's `text-{c}-xxx`
  class, and the label floor (4.5:1) is stricter than the icon floor (3:1), so the chosen light
  text shade over-satisfies the icon requirement (e.g. sky-700 icon = 4.88:1 ≥ 3).
- **Dark side unchanged & safe.** `-300`/`-200`/`-400` on the dark tinted surface all measure
  ≥7:1 (the panel/card L≈0.19–0.24) — today's values, already passing; kept verbatim via the
  `dark:` half of each pair.

---

## 2. Per-file, per-class mapping table (every file found)

Files in scope with raw-palette accent text/icon/border: **tech-badge.tsx**, **role-badge.tsx**,
**stack-chip.tsx**, **WarsztatHeroTile.tsx**. All other portfolio + honeti components
(**AppCard**, **AgentProjectCard**, **PortfolioSeriesTile**, **AppCardGroup**, **HeroAppMiniCard**,
**HoneticHero**, **PortfolioSection**, **AgentPortfolioSection**, **WarsztatGrid**,
**WarsztatToolkit**, **WarsztatTile**, **store-link**, **project-link**, **honeti/page.tsx**) use
**only** already-flipping tokens (`text-foreground`, `text-muted-foreground`, `text-text-subtle`,
`text-brand`, `border-border`, `bg-surface`, `bg-card`, `bg-brand/x`, `border-brand/x`) → **no
change needed** (verified §2d). `WarsztatFlow.tsx` is **excluded** (already fixed by the sibling
artifact — confirmed theme-aware on disk).

Legend: **A** = accent `light dark:` pair; **N→tok** = neutral, move to `foreground` token;
**fill** = tinted `-500/10` fill, KEPT identical both themes; **border** = aesthetic-only bump
(decorative chip edge, not an a11y-gated UI boundary — see note).

### 2a. `components/portfolio/tech-badge.tsx` — `BADGE_STYLES` map (lines 25–34)

| Line | Badge | Current class | Replacement | Kind |
|---|---|---|---|---|
| 25 | Flutter | `border-sky-500/30 bg-sky-500/10 text-sky-300` | `border-sky-600/40 bg-sky-500/10 text-sky-700 dark:border-sky-500/30 dark:text-sky-300` | A + border |
| 26 | Firebase | `border-amber-500/30 bg-amber-500/10 text-amber-300` | `border-amber-600/40 bg-amber-500/10 text-amber-800 dark:border-amber-500/30 dark:text-amber-300` | A (**-800**) + border |
| 27 | CI/CD | `border-emerald-500/30 bg-emerald-500/10 text-emerald-300` | `border-emerald-600/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300` | A + border |
| 28 | TypeScript | `border-blue-500/30 bg-blue-500/10 text-blue-300` | `border-blue-600/40 bg-blue-500/10 text-blue-700 dark:border-blue-500/30 dark:text-blue-300` | A + border |
| 29 | AGPL-3.0 | `border-slate-500/30 bg-slate-500/10 text-slate-300` | `border-border bg-foreground/[0.06] text-foreground/70` | **N→tok** |
| 30 | Web | `border-teal-500/30 bg-teal-500/10 text-teal-300` | `border-teal-600/40 bg-teal-500/10 text-teal-700 dark:border-teal-500/30 dark:text-teal-300` | A + border |
| 31 | Next.js | `border-zinc-400/30 bg-zinc-400/10 text-zinc-200` | `border-border bg-foreground/[0.06] text-foreground/70` | **N→tok** |
| 32 | React | `border-cyan-500/30 bg-cyan-500/10 text-cyan-300` | `border-cyan-600/40 bg-cyan-500/10 text-cyan-800 dark:border-cyan-500/30 dark:text-cyan-300` | A (**-800**) + border |
| 33 | i18n | `border-violet-500/30 bg-violet-500/10 text-violet-300` | `border-violet-600/40 bg-violet-500/10 text-violet-700 dark:border-violet-500/30 dark:text-violet-300` | A + border |
| 34 | E2E | `border-emerald-500/30 bg-emerald-500/10 text-emerald-300` | `border-emerald-600/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300` | A + border |
| 38 | FALLBACK | `border-border bg-surface/60 text-muted-foreground` | **unchanged** (already token, flips) | tok |

### 2b. `components/portfolio/role-badge.tsx` — `ROLE_VARIANT` map (lines 9–11)

| Line | Role | Current class | Replacement | Kind |
|---|---|---|---|---|
| 9 | od-zera | `border-emerald-500/30 bg-emerald-500/10 text-emerald-300` | `border-emerald-600/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300` | A + border |
| 11 | rozwoj-i-serwis | `border-gray-500/30 bg-gray-500/10 text-gray-300` | `border-border bg-foreground/[0.06] text-foreground/70` | **N→tok** |

### 2c. `components/portfolio/stack-chip.tsx` — `STACK_VARIANT` map (lines 7–8)

| Line | Stack | Current class | Replacement | Kind |
|---|---|---|---|---|
| 7 | Flutter | `border-blue-500/30 bg-blue-500/10 text-blue-300` | `border-blue-600/40 bg-blue-500/10 text-blue-700 dark:border-blue-500/30 dark:text-blue-300` | A + border |
| 8 | Unity | `border-purple-500/30 bg-purple-500/10 text-purple-300` | `border-purple-600/40 bg-purple-500/10 text-purple-700 dark:border-purple-500/30 dark:text-purple-300` | A + border |

### 2d. `components/portfolio/WarsztatHeroTile.tsx` — emerald chip + icon (lines 23, 31, 52)

This tile is a portfolio accent surface (emerald "agent" semantic), built dark-only like the others.
Its outer fill and icon-chest fill (`bg-emerald-500/5`, `bg-emerald-500/10`) are **kept**; the
**icon** (`text-emerald-400`) and **chip label** (`text-emerald-300`) get the pair; the outer/chip
borders bump for definition.

| Line | Element | Current class | Replacement | Kind |
|---|---|---|---|---|
| 23 | outer tile | `border border-emerald-500/30 bg-emerald-500/5` | `border border-emerald-600/40 bg-emerald-500/5 dark:border-emerald-500/30` | border + fill(kept) |
| 31 | icon chest | `border border-emerald-500/30 bg-emerald-500/10 text-emerald-400` | `border border-emerald-600/30 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400` | A + border |
| 52 | chip | `border border-emerald-500/40 bg-emerald-500/10 … text-emerald-300` | `border border-emerald-600/40 bg-emerald-500/10 … text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-300` | A + border |

> **Icon-vs-text nuance for :31.** Today the *icon* uses `-400` (a lighter emerald than the chip's
> `-300` label) because on the dark tile a mid-emerald icon reads fine as non-text. In light we still
> want a single per-hue light shade, so the icon's light value is `emerald-700` (icon floor 3:1;
> emerald-700 = 4.54:1 as text, so ≥3 as icon ✓), while its dark value keeps the original `-400`.
> Result: `text-emerald-700 dark:text-emerald-400`.

### 2e. Border note (why the `-500/30` → `-600/40` bump, and its a11y status)

The current chip borders (`-500/30`) measure **1.2–1.5:1** vs the light surface (§3) — invisible on
paper. **These borders are NOT a11y-gated:** a badge outline is a *decorative container edge*, not a
UI-component boundary that carries state or meaning (the colour + label already carry the meaning;
WCAG 1.4.11 non-text-contrast applies to boundaries "required to identify" a control, which these are
not). So this is an **aesthetic** bump for visual definition on light, not a floor fix. `-600/40`
raises them to ~1.5–1.9:1 — still a soft hairline (deliberately; the fill is the primary boundary
cue), just enough to define the chip edge on the off-white board. **If the landing step prefers to
leave borders as `-500/30` for a diff-minimal change, that is an acceptable aesthetic call** — the
tinted fill already delimits the chip. Flagged as an eyeball preference (Open Q2).

### 2f. Neutral-token rationale (slate/zinc/gray → `foreground`)

The three neutral chips are re-inked with `text-foreground/70` + `bg-foreground/[0.06]` +
`border-border` — all semantic tokens that already flip per theme. Why not a `slate-700 dark:slate-300`
pair (which also passes numerically at 8:1)? Because per the **token-contract** and the brief, a chip
whose colour means "neutral / no category" should reference the semantic neutral, not a raw palette
hue — a raw `slate/zinc/gray` shade here is a token-adherence smell (there *is* a semantic neutral for
exactly this). `foreground/70` on the light surface = **~10:1** (foreground L≈0.22 ink at 70% over the
warm off-white); on dark ≈ **~12:1** — both clear the text floor with wide margin, and the chip now
reads as "a plain neutral tag" in both themes, distinct from the coloured taxonomy chips. The three
formerly-different neutrals (slate vs zinc vs gray) collapse to one neutral look — **correct**, since
their hue differences were never a meaningful signal.

---

## 3. Design-Gap-Test report

**Render substrate: static-heuristic fallback.** This session has **no `chrome-devtools` MCP
tools** (`take_screenshot` / `navigate_page` are not in the toolset), so the rendered oracle
screenshot cannot be captured. Per the standard's documented fallback, the gate below is reasoned
statically from the token/palette values, the composition against `design-spine.md`, and **genuinely
computed** WCAG ratios (script `/tmp/contrast.js` over the Tailwind palette hex composited on the
light `--surface`; numbers cited inline in §1). The visual loop must be closed on screen:

> **TODO(user): eyeball portfolio + honeti badges in dev-live-chrome both themes** — flip dark↔light
> on `/pl/#portfolio` and `/pl/portfolio/honeti`, confirm every tech/role/stack chip label is legible
> on light, the emerald/teal `-700` labels aren't muddy (else bump to `-800`), the neutral chips read
> as plain tags, the chip borders define without shouting, and the badge rows reflow at 320px / 200%
> zoom. Contrast is machine-checkable and computed below; the rest needs your eyes.

### Dark theme

| # | Dimension | Score | Rendered evidence (measured / reasoned) |
|---|---|---|---|
| 1 | Rhythm | MATCHED | Re-theme touches **colour only** — every chip keeps `px-2.5 py-1 gap-1.5 text-xs` (tech-badge:55), the `rounded-md`/`rounded-4xl` radius, and the `gap-2` badge-row rhythm. No spacing value changes anywhere. All on the 8pt/4px grid (DNA §1). |
| 2 | Hierarchy | MATCHED | Size+whitespace hierarchy unchanged: chip label `text-xs` sits below card title `text-base/lg` and desc `text-sm`. The chips remain a supporting legend layer, not competing with the heading. The `dark:` half of every pair is byte-identical to today's shipped look. Squint test unaffected by a colour-only swap. |
| 3 | Token-adherence | MATCHED | Coloured taxonomy chips keep the **same two brand accents' neighbours** as data-encoding hues (categorical legend, not a second *action* accent — principle 4 is about the CTA accent, untouched). The three neutral chips move **off** raw palette onto `foreground/border` semantic tokens (a token-adherence *improvement*). `bg-{c}-500/10` fills + opacity modifiers are allowed idioms. No purple-as-brand-accent, no glassmorphism, no left-border card. |
| 4 | Alignment | MATCHED | One chip primitive (`inline-flex … border … rounded`) repeated across all 15 badges; identical across tech/role/stack. No novel look introduced — the light theme is the same legend re-inked (principle 1). |
| 5 | Contrast | MATCHED | Dark tinted surface L≈0.19–0.24; `-300/-200/-400` labels measure ≥7:1, emerald/amber icons ≥6:1, neutral `foreground/70` ≥12:1 — all ≥ floor (4.5 text / 3 non-text). Dark keeps today's values, which already passed at the closing gate. |

### Light theme

| # | Dimension | Score | Rendered evidence (measured / reasoned) |
|---|---|---|---|
| 1 | Rhythm | MATCHED | Identical grid to dark — no spacing changed in the re-theme; all chip padding/gaps remain 8pt/4px multiples. |
| 2 | Hierarchy | MATCHED | Once light, `text-foreground` card titles (~15:1) dominate; the darkened chip labels (`-700/-800`, 4.5–6:1) sit as the supporting legend layer they should — darker ink than dark-theme but still visually subordinate to the title by size. Neutral chips (`foreground/70`) recede correctly. Size+whitespace still lead; hierarchy holds through the flip (spine §5). |
| 3 | Token-adherence | MATCHED | Every raw accent has a deliberate `light dark:` pair from the same hue ramp — no arbitrary hex, hue identity preserved (Flutter still sky, Firebase still amber). Neutral chips are semantic `foreground` tokens. Tinted `-500/10` fills kept (read on both). No default purple-as-accent, no third *action* accent, no glassmorphism, no colored left-border card. |
| 4 | Alignment | MATCHED | Same single repeated chip primitive as dark — the light legend is visibly the *same chips re-inked*, not a new design (principle 1: converge on our brand across themes). |
| 5 | Contrast | MATCHED | **Computed over palette hex on the tinted light surface (`bg-{c}-500/10` over `--surface` `oklch(0.965)` ≈ `#f5f3ef`):** sky-700 **4.88**, emerald-700 **4.54**, blue-700 **5.44**, teal-700 **4.54**, violet-700 **5.71**, purple-700 **5.62**, amber-**800** **5.98**, cyan-**800** **6.03** — every label ≥ 4.5:1 text floor ✓. Neutral `foreground/70` ~10:1 ✓. Icons (share the shade) ≥3:1 ✓. **The naïve keep-`-300` path was verified to FAIL** (`emerald-300`/`amber-300` on the light tinted surface ≈ **1.3:1**) — which is exactly why the shade swaps are mandatory, not cosmetic. **No pair below floor.** (Borders are decorative, not floor-gated — §2e.) |

**Drift diagnosis:** The single drift across all four files is the same **theme-blindness** the
warsztat panel had — dark-only chips (`text-{c}-300/200`) authored before the light theme existed, so
when this sprint shipped the warm light palette the badge *fills* survived (a 10% wash reads on both)
but the *ink* inverted into illegibility (~1.3:1). The fix is surgical and identical in shape to
`pilot-warsztat.md`: keep the fills, give every accent text/icon a contrast-chosen `light dark:` pair,
and demote the genuinely-neutral chips to `foreground` tokens. Because the change is colour-only and
reuses the exact chip primitive/spacing/semantics, no rhythm/hierarchy/alignment risk is introduced —
the whole gap-test reduces to "does every re-picked light shade clear 4.5:1 on its tinted surface",
which the computed ratios confirm (with amber + cyan forced to `-800`, emerald + teal a thin `-700`
pass flagged for the eyeball). No remaining PARTIAL/MISSED in either theme under the static gate; only
the on-screen eyeball (muddiness of the thin passes, border feel, reflow) is deferred to the TODO.

---

## Rules restated at the tail (drift control)

- **Four charter traits:** *sharp not cold* (real dark-ink chip labels on the light board, not a grey
  wash; crisp edges kept) · *structured not rigid* (identical chip padding/rhythm, one primitive) ·
  *warm not soft* (the warm off-white surface + the retained tinted fills add temperature; no
  glassmorphism, edges kept) · *confident not loud* (the *brand action* accent stays emerald/amber and
  is untouched — the many chip hues are a categorical legend, spent on meaning/data, not decoration).
- **Anti-slop tail:** no default purple *as brand accent* (purple here is only the Unity stack's fixed
  categorical hue, kept identical both themes — not the brand accent) · no centered-hero→three-cards
  (untouched) · no colored left-border cards (chips use full tinted fills + a hairline, not a spine
  stripe) · no all-caps decoration (mono eyebrows are the existing idiom, kept) · no glassmorphism
  (solid tinted chips) · no Inter-everywhere (fonts untouched) · **converge on OUR brand** — the light
  legend is the same chips re-inked, not a new look.
- **Token surface:** only approved tokens + opacity modifiers (`foreground/x`, `border-border`,
  `bg-foreground/x`) and the palette hue ramps for the categorical chips via explicit `light dark:`
  pairs; no arbitrary hex. One *action* accent (emerald/amber) unchanged; the chip hues are data.

---

## Open Questions

1. **emerald + teal `-700` thin passes (4.54:1) — ship, or bump to `-800`?** Both clear the 4.5 text
   floor, but by <0.1 — a technical pass with no margin (a11y-floors: "prefer comfortable margins so a
   later token tweak doesn't drop below"). I specified `-700` to keep the emerald/teal chips brighter
   and closer to the coloured-legend feel, but `-800` (6.30–6.36) is the safe choice if a later
   surface-token tweak or the on-screen read makes them marginal. **Which does the developer prefer —
   the brighter `-700` (ship-with-eyeball) or the safe `-800`?** *(Matters: it's an on-screen tuning
   call the static gate can't make; affects the emerald od-zera role badge, CI/CD, E2E, Web chips.)*
2. **Chip borders — bump to `-600/40`, or leave `-500/30` for a diff-minimal change?** The `-500/30`
   borders are ~1.3:1 on light (invisible) but are **decorative, not a11y-gated** (§2e) — the tinted
   fill is the real chip boundary. I recommend `-600/40` for definition, but leaving them untouched is
   an acceptable aesthetic call that shrinks the diff. **Developer's preference?** *(Matters: purely
   aesthetic; decides whether the border half of each class changes.)*
3. **Neutral chips collapse slate/zinc/gray into one `foreground` look — is losing the per-tag hue
   difference acceptable?** Moving AGPL (slate), Next.js (zinc), and rozwoj-i-serwis (gray) to
   `text-foreground/70` makes all three read identically as "plain neutral tag". Their hue differences
   were never a meaningful signal (unlike sky=Flutter), so this is intended — but if the developer
   *wants* Next.js to keep a distinct near-black-chrome look, a `zinc-800 dark:zinc-200` pair is the
   alternative (passes at 8–12:1). I chose the token route per the token-contract's "prefer semantic
   neutral over raw palette". **Confirm the collapse is desired, or keep zinc/slate distinct?**
   *(Matters: token-adherence vs. per-tag visual distinction — a brand call.)*
