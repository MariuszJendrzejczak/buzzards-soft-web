# WarsztatFlow panel — web art direction (returned for a sprint to land — NOT globals.css/components)

> Artifact of slice `web-design-generation`. Produced by the `designer` agent against
> `~/.claude/design-standard/_core/*` + `web/*` and the DNA profile §8. Re-themes the
> "AI Native Development Workflow" flow panel (`components/portfolio/WarsztatFlow.tsx`)
> to be **theme-aware in both dark and light**. This is a **re-theming, not a re-layout** —
> stages, connectors, owner semantics, and i18n keys (`portfolio.warsztat.flow.*`) are
> unchanged. Artifact only; a separate landing step edits the `.tsx`.
>
> **The bug being fixed:** the panel core (`WarsztatFlow.tsx:167`) is a hardcoded dark
> `bg-[radial-gradient(...),linear-gradient(180deg,#0b1220,#060a13)]`, so it stays dark in
> every theme. Its interior mixes (a) theme tokens that flip (`text-foreground`,
> `text-muted-foreground`) and go dark-on-dark-panel = invisible in light mode; (b)
> fixed white-alpha overlays that only work on dark (`border-white/*`, `bg-white/*`); (c)
> fixed raw emerald/amber accents that fail WCAG on a light surface.

---

## Design intent (the one-paragraph direction)

The panel is a **schematic** — a technical flow diagram, the most "engineered" surface
on the page. In **dark** mode it keeps today's look: a deep slate schematic field with a
faint emerald-top / amber-bottom glow, emerald = agent, amber = human. In **light** mode
it becomes the *same schematic, re-inked on paper*: a warm off-white panel (a half-step
below the page so it reads as an inset board), the same two glows at much lower opacity,
the same emerald/amber semantics **re-picked to darker shades** so every label clears
its WCAG floor on the light surface, structure carried by warm hairline borders + faint
tinted fills instead of white-alpha. The through-line the re-theme must hold (principle 1,
converge-on-our-brand): **emerald still means "agent", amber still means "human", one
accent per meaning, hierarchy by the tile size + the glow, not by decoration.** Nothing
about the information design moves.

**Core mechanism:** stop hardcoding the panel background. Drive both the panel field and
every interior surface off the semantic tokens that already flip
(`bg-surface`/`bg-card`, `border-border`, `text-foreground`, `text-muted-foreground`),
replace every `bg-white/x` / `border-white/x` with `bg-foreground/x` / `border-foreground/x`
(neutral overlay that inverts correctly per theme), and give each raw emerald/amber accent
an explicit `light dark:` pair chosen for contrast. The two glow gradients and the neutral
connector stroke get light-theme values via `dark:` variants on a token-driven base.

---

## Art direction (both themes)

### The panel background treatment (the load-bearing decision)

The dark panel today = `radial(emerald .14) + radial(amber .12) + linear(#0b1220→#060a13)`.
Its **light counterpart is a warm-off-white inset board with the same two glows at ~⅓ the
opacity** — not a flat step, because the glow is what makes this a *schematic* and not a
generic card, and the charter (warm-not-soft, §3) wants temperature kept. Justification
against `design-spine.md` §5 (both-themes-first-class: "if a surface relies on dark-only
glow/opacity tricks for emphasis, give it a light-theme equivalent that isn't washed out")
and the charter (a warm accent adds temperature without crossing into "soft").

Concretely, make the background a **theme-variant utility** rather than one hardcoded
value:

- **Dark (unchanged look):**
  `radial-gradient(90% 45% at 50% -8%, rgba(16,185,129,.14), transparent 62%),`
  `radial-gradient(70% 60% at 88% 108%, rgba(245,158,11,.12), transparent 60%),`
  `linear-gradient(180deg, #0b1220, #060a13)`
  — but sourced so it only applies in `.dark` (via a `dark:` variant of the class or a
  CSS var the token layer sets). The deep `#0b1220→#060a13` is *darker than* `--surface`
  dark (`oklch 0.24`), which is deliberate and correct — the schematic reads as an
  inset well below the page. Keep it; just gate it to dark.
- **Light (new):** warm off-white field a half-step below the page, with the two glows at
  ~⅓ opacity so they tint rather than wash:
  `radial-gradient(90% 45% at 50% -8%, rgba(5,150,105,.05), transparent 62%),`
  `radial-gradient(70% 60% at 88% 108%, rgba(180,83,9,.05), transparent 60%),`
  `linear-gradient(180deg, oklch(0.965 0.006 90), oklch(0.945 0.008 90))`
  — i.e. the `--surface`→`--surface-elevated` warm neutrals as the base, the emerald-600 /
  amber-700 hues as the glow tints at 0.05 alpha. The panel sits **below** the page bg
  (`0.985`) so it reads as an inset board, mirroring the dark relationship.

  > Implementation note for the landing step: the cleanest token-faithful way is to add
  > **two brand-glow CSS vars per theme** to the token layer (e.g. `--schematic-bg`) and
  > reference `bg-[image:var(--schematic-bg)]`, OR use a `dark:` utility pair on the
  > element. Either keeps the value out of the component as a raw literal in the theme that
  > shouldn't own it. The glow rgba's are the *one sanctioned raw-color exception* here
  > (they are gradient stops, not a token surface) — flag for the token-conformance test's
  > allow-list, same category as the existing hero glow.

### Outer panel frame

- **Dark:** `border-foreground/10` (was `border-white/10` — identical render in dark,
  correct token). Keeps the hairline slate edge. Shadow unchanged
  (`shadow-[0_40px_90px_-50px_rgba(0,0,0,.8)]` reads fine on both; optionally soften to
  `/.5` in light via `dark:` — see table).
- **Light:** the same `border-foreground/10` inverts to a warm dark-hairline on the
  off-white board — a crisp inked edge (sharp-not-cold). Drop the heavy black drop-shadow
  to a light-appropriate `shadow-[0_30px_70px_-45px_rgba(23,23,23,.25)]` so the board
  doesn't float in a dark halo on paper.

### Legend text

- Flow label + legend items are currently `text-foreground/45` and `text-foreground/70`.
  These **flip correctly already** once the panel is light — the bug was only that the
  panel stayed dark. Keep them as `text-foreground/60..70` (they now read dark-on-light).
  The measured floor: `text-subtle`-tier small text clears 5.4:1 on the light surface;
  `foreground/60` is darker still, so ✓. Legend glyphs (User amber / Bot emerald) get the
  accent `light dark:` pairs below.

### START / DONE pills

- **START pill** (neutral, dashed): `border-white/20 bg-white/[0.04]` → `border-foreground/20
  bg-foreground/[0.04]`; inner play-icon circle `border-white/20 bg-white/5 text-foreground/70`
  → `border-foreground/20 bg-foreground/5 text-foreground/70`. Neutral overlay inverts
  per theme — a faint warm chip on light, a faint light chip on dark. Label stays
  `text-foreground/60`.
- **DONE pill** (emerald "success" terminal): keep it emerald-semantic but re-pick the
  emerald so it reads on both. Fill `bg-emerald-500/10 dark:bg-emerald-500/10` is fine as a
  *fill* (foreground text sits on it), but the **label + check** must clear text floor on
  light: `text-emerald-700 dark:text-emerald-300` (light 4.90:1 ✓ / dark ~10:1 ✓). Border
  `border-emerald-600/40 dark:border-emerald-500/40` (non-text ≥3:1). The emerald glow
  `shadow-[0_0_26px_-6px_rgba(16,185,129,.5)]` → gate to dark only (`dark:shadow-[…]`); in
  light use a subtler `shadow-[0_0_20px_-8px_rgba(5,150,105,.35)]` or drop it (the tinted
  fill already marks it as the terminal).

### StageTile cards (human = amber / both = neutral)

- **Neutral ("both") tile:** `border-white/10 bg-white/[0.035]` → `border-border
  bg-foreground/[0.035]` (or `bg-card/60`). Inverts to a warm hairline card on the light
  board. Title `text-foreground` and desc `text-muted-foreground` already flip correctly
  (measured: foreground 15.6:1, muted-foreground 7.0:1 on light surface ✓). Icon chest is
  the **emerald "agent-touched" glyph**: `border-emerald-500/30 bg-emerald-500/10
  text-emerald-600 dark:text-emerald-400` (light emerald-600 icon 3.37:1 as non-text ✓ /
  dark ✓).
- **Human ("human") tile:** `border-amber-500/25 bg-amber-500/[0.06]` — the **fill** is
  fine both themes (foreground text on amber/10 measured 14.3:1). Keep
  `bg-amber-500/[0.06] border-amber-600/25 dark:border-amber-500/25`. Icon chest:
  `border-amber-600/30 bg-amber-500/10 text-amber-700 dark:text-amber-400` (light
  **amber-700** icon 4.49:1 — amber-500 would be 1.9:1, unreadable; dark amber-400 ✓).

### AgentStep cards (the AFK zone interior)

- Card: `border-emerald-500/25 bg-emerald-500/[0.06]` → keep the emerald-tinted fill both
  themes (foreground text on emerald/10 = 13.9:1). Border
  `border-emerald-600/25 dark:border-emerald-500/25`. Icon chest
  `border-emerald-600/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400`
  (light emerald-600 3.37:1 non-text ✓). Title `text-foreground`, desc
  `text-muted-foreground` — flip correctly.
- **AGENT-ZONE wrapper** (`border-dashed border-emerald-500/35 bg-emerald-500/[0.05]`):
  keep dashed emerald semantic; `border-emerald-600/40 dark:border-emerald-500/35`,
  fill `bg-emerald-500/[0.05]` both. The zone **label pill** ("Praca agenta") text is
  small caps and must clear text floor: `text-emerald-700 dark:text-emerald-300`
  (light 4.90:1 ✓). The loop caption `text-emerald-300/80` → `text-emerald-700
  dark:text-emerald-300/80`. The `→` inter-step arrows `text-emerald-400/70` →
  `text-emerald-600/70 dark:text-emerald-400/70` (decorative, `aria-hidden`, still ≥3:1
  in light at emerald-600).

### OwnerBadge chips

- **human chip:** `border-amber-500/25 bg-amber-500/10 text-amber-300/90` →
  `border-amber-600/25 bg-amber-500/10 text-amber-700 dark:text-amber-300/90`. The label
  text is `text-[10px]` mono — small — so it **must** clear 4.5:1: light amber-700 4.49:1
  (prefer **amber-800** 6.34:1 for comfortable margin), dark amber-300 ✓. Recommend
  `text-amber-800 dark:text-amber-300/90`.
- **both chip:** `border-white/12 bg-white/5 text-foreground/70` → `border-foreground/12
  bg-foreground/5 text-foreground/70`. The inner User(amber)/Bot(emerald) glyphs use the
  accent pairs: `text-amber-700 dark:text-amber-400` and `text-emerald-600
  dark:text-emerald-400` (non-text icons, ≥3:1 light ✓). `text-foreground/70` label flips.

### Connector SVG strokes

Currently raw rgba by tone. Give each a **light/dark pair** (SVG `stroke` can't take a
Tailwind class here cleanly, so the landing step passes theme-aware colors — e.g. read a
CSS var, or branch on a `useTheme`/`matchMedia`, or use `currentColor` with a
theme-colored wrapper). Values (all clear the 3:1 non-text floor on their surface):

- **neutral** `rgba(148,163,184,.5)` (dark) → light `rgba(100,116,139,.7)` (slate-500 @ .7,
  ≈ 4.4:1 vs light surface ✓). Or map both to `--muted-foreground` / `--border` via
  `currentColor`.
- **agent** `rgba(52,211,153,.65)` (dark emerald-400) → light `rgba(5,150,105,.9)`
  (emerald-600, non-text ≥3:1 ✓).
- **human** `rgba(251,191,36,.65)` (dark amber-400) → light `rgba(180,83,9,.9)`
  (amber-700, non-text ≥3:1 ✓).

> Cleanest landing approach: define three CSS custom props on the panel
> (`--flow-stroke-neutral/-agent/-human`) set per theme in the token layer, and read them
> in the SVG `stroke={var(--flow-stroke-agent)}`. Keeps raw rgba out of the component and
> makes it token-driven. These are the sanctioned gradient/stroke raw-color exception.

### loopback note (inside humanReview tile)

`border-amber-500/20 bg-amber-500/[0.06] text-amber-200/80` — small mono text, must clear
4.5:1 → `text-amber-800 dark:text-amber-200/80`, `border-amber-600/20 dark:border-amber-500/20`,
fill unchanged (amber-800 on amber/10 measured 5.78:1 ✓ / dark ✓).

---

## Token / class mapping table (every current class → theme-aware replacement)

Legend: **T** = token that already flips correctly (no change needed beyond the panel going
light); **N** = neutral-overlay swap (`white`→`foreground`); **A** = accent `light dark:`
pair chosen for contrast. Ratios are measured over the token oklch / Tailwind palette hex
against the **light warm-off-white surface** (`oklch 0.965`, ≈ `#f4f2ee`); dark ratios all
pass comfortably (panel L≈0.19; emerald-300 ~10:1, amber-300 ~9:1, foreground ~18:1).

| Loc | Current class | Replacement | Kind | Light ratio (floor) |
|---|---|---|---|---|
| :167 panel bg | `bg-[radial(...16,185,129,.14),radial(...245,158,11,.12),linear(#0b1220,#060a13)]` | dark-gated gradient **+** light variant: `linear(oklch .965→.945 90)` + emerald .05 / amber .05 glows (see §Panel bg) | A/T | surface field, n/a |
| :167 | `border-white/10` | `border-foreground/10` | N | non-text edge, decorative |
| :167 | `shadow-[0_40px_90px_-50px_rgba(0,0,0,.8)]` | `dark:shadow-[…] ` + light `shadow-[0_30px_70px_-45px_rgba(23,23,23,.25)]` | A | n/a (shadow) |
| :170 | `text-foreground/45` (flow label) | `text-foreground/60` | T | ~9:1 (4.5) ✓ |
| :174,181,185 | `text-foreground/70` (legend) | unchanged | T | ~11:1 (4.5) ✓ |
| :176,182 | `text-amber-400` (legend User) | `text-amber-700 dark:text-amber-400` | A | 4.49:1 non-text (3) ✓ |
| :177,186 | `text-emerald-400` (legend Bot) | `text-emerald-600 dark:text-emerald-400` | A | 3.37:1 non-text (3) ✓ |
| :195 | `border-white/20 bg-white/[0.04]` (START) | `border-foreground/20 bg-foreground/[0.04]` | N | non-text |
| :198 | `border-white/20 bg-white/5 text-foreground/70` | `border-foreground/20 bg-foreground/5 text-foreground/70` | N/T | text ~11:1 (4.5) ✓ |
| :202 | `text-foreground/60` (START label) | unchanged | T | ~9:1 (4.5) ✓ |
| :33 | `border-amber-500/25 bg-amber-500/10 text-amber-300/90` (human chip) | `border-amber-600/25 bg-amber-500/10 text-amber-800 dark:text-amber-300/90` | A | **6.34:1** small text (4.5) ✓ |
| :36 | `text-amber-400` (human icon) | `text-amber-700 dark:text-amber-400` | A | 4.49:1 non-text (3) ✓ |
| :41 | `border-white/12 bg-white/5 text-foreground/70` (both chip) | `border-foreground/12 bg-foreground/5 text-foreground/70` | N/T | text ~11:1 (4.5) ✓ |
| :44 | `text-amber-400` (both chip User) | `text-amber-700 dark:text-amber-400` | A | 4.49:1 non-text (3) ✓ |
| :45 | `text-emerald-400` (both chip Bot) | `text-emerald-600 dark:text-emerald-400` | A | 3.37:1 non-text (3) ✓ |
| :57-62 | Connector `rgba(52,211,153,.65)` agent | dark keep / light `rgba(5,150,105,.9)` (emerald-600) — prefer `--flow-stroke-agent` var | A | ≥3:1 non-text ✓ |
| :57-62 | `rgba(251,191,36,.65)` human | dark keep / light `rgba(180,83,9,.9)` (amber-700) | A | ≥3:1 non-text ✓ |
| :57-62 | `rgba(148,163,184,.5)` neutral | dark keep / light `rgba(100,116,139,.7)` (slate-500) | A | ~4.4:1 non-text ✓ |
| :99 | `border-amber-500/25 bg-amber-500/[0.06]` (human tile) | `border-amber-600/25 bg-amber-500/[0.06] dark:border-amber-500/25` | A | fill; fg text on it 14.3:1 ✓ |
| :101 | `border-white/10 bg-white/[0.035]` (both tile) | `border-border bg-foreground/[0.035]` | T/N | fg 15.6:1 ✓ |
| :108 | `border-amber-500/30 bg-amber-500/10 text-amber-400` (human icon chest) | `border-amber-600/30 bg-amber-500/10 text-amber-700 dark:text-amber-400` | A | 4.49:1 non-text (3) ✓ |
| :109 | `border-emerald-500/30 bg-emerald-500/10 text-emerald-400` (both icon chest) | `border-emerald-600/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400` | A | 3.37:1 non-text (3) ✓ |
| :116 | `text-foreground` (title) | unchanged | T | 15.6:1 (4.5) ✓ |
| :121 | `text-muted-foreground` (desc) | unchanged | T | 7.0:1 (4.5) ✓ |
| :138 | `border-emerald-500/25 bg-emerald-500/[0.06]` (AgentStep card) | `border-emerald-600/25 bg-emerald-500/[0.06] dark:border-emerald-500/25` | A | fill; fg text 13.9:1 ✓ |
| :141 | `border-emerald-500/30 bg-emerald-500/10 text-emerald-400` (AgentStep icon) | `border-emerald-600/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400` | A | 3.37:1 non-text (3) ✓ |
| :146 | `text-foreground` / :149 `text-muted-foreground` | unchanged | T | 15.6 / 7.0:1 ✓ |
| :226 | `border-dashed border-emerald-500/35 bg-emerald-500/[0.05]` (agent zone) | `border-dashed border-emerald-600/40 bg-emerald-500/[0.05] dark:border-emerald-500/35` | A | fill/non-text ✓ |
| :228 | `border-emerald-500/30 bg-emerald-500/10 text-emerald-300` (zone label) | `border-emerald-600/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300` | A | **4.90:1** small text (4.5) ✓ |
| :232 | `text-emerald-300/80` (loop caption) | `text-emerald-700 dark:text-emerald-300/80` | A | 4.90:1 small text (4.5) ✓ |
| :248,259 | `text-emerald-400/70` (→ arrows) | `text-emerald-600/70 dark:text-emerald-400/70` | A | decorative non-text ✓ |
| :278 | `border-amber-500/20 bg-amber-500/[0.06] text-amber-200/80` (loopback) | `border-amber-600/20 bg-amber-500/[0.06] text-amber-800 dark:text-amber-200/80` | A | **5.78:1** small text (4.5) ✓ |
| :303 | `border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_26px_-6px_rgba(16,185,129,.5)]` (DONE) | `border-emerald-600/40 bg-emerald-500/10 dark:border-emerald-500/40 dark:shadow-[…]` + light `shadow-[0_0_20px_-8px_rgba(5,150,105,.35)]` | A | fill/non-text ✓ |
| :306 | `border-emerald-500/50 bg-emerald-500/20 text-emerald-300` (DONE check) | `border-emerald-600/50 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300` | A | 4.90:1 (4.5, treat as text) ✓ |
| :310 | `text-emerald-300` (DONE label) | `text-emerald-700 dark:text-emerald-300` | A | **4.90:1** small text (4.5) ✓ |

**Rule captured for all `-500/xx` fills:** the `bg-*-500/[0.05..0.10]` tinted **fills** are
kept identical across themes (a 5–10% emerald/amber wash reads as a faint tint on both a
dark and a light neutral, and foreground/dark-accent text on them measured 5.8–14.3:1).
Only **text, icons, dots, and small labels** that sit *as* the accent color need the
`light dark:` shade swap — because those are the pairs that fail on light. This keeps the
diff surgical and the two-accent semantics identical in both themes.

**Amber small-text caution:** `amber-700` on the warm off-white is 4.49:1 — a hair over the
4.5 floor when rounded, technically 4.49 (marginal). Every amber **small-text** label above
therefore uses **amber-800** (6.34:1) for a comfortable margin (a11y-floors: "prefer
comfortable margins so a later token tweak doesn't drop below"). Amber-700 is reserved for
**icons/dots** (non-text, 3:1 floor), where 4.49:1 is ample.

---

## Design-Gap-Test report

**Render substrate: static-heuristic fallback.** The Chrome debug port (9222) and dev
server (:3000) are both live, but this session has **no `chrome-devtools` MCP tools**
(`take_screenshot` / `navigate_page` are not in the toolset), so I cannot capture the
rendered oracle screenshot. Per the standard's documented fallback, the gap-test below is
reasoned statically from the token oklch/palette values, the composition against
`design-spine.md`, and **genuinely computed** WCAG ratios (script over the token values;
numbers cited inline). The visual loop must be closed on screen:

> **TODO(user): eyeball warsztat panel in dev-live-chrome** — flip dark↔light on
> `/pl/portfolio/...` (the page hosting `WarsztatFlow`), confirm the light panel reads as a
> warm inset board (not washed-out), the two glows tint without smearing, every emerald/amber
> label is legible on light, tab-focus rings are visible, and the panel reflows at 320px /
> 200% zoom. Contrast is machine-checkable and computed below; the rest needs your eyes.

### Dark theme

| # | Dimension | Score | Rendered evidence (measured / reasoned) |
|---|---|---|---|
| 1 | Rhythm | MATCHED | Re-theming touches **color only** — every gap/padding (`p-5 sm:p-8`, `mb-8`, `gap-5`, `py-3.5` connector, `p-4`/`p-5` tiles) is untouched and already on the 8pt/4px grid (DNA §1). No spacing value changes. |
| 2 | Hierarchy | MATCHED | Size+whitespace hierarchy unchanged: `text-lg` stage titles > `text-sm` desc > `text-[10..11px]` mono labels; the AFK agent-zone is the largest tile and remains the visual focus. Emphasis carried by tile size + glow, not new borders. Squint test unaffected by a color-only swap. |
| 3 | Token-adherence | MATCHED | `white/x` overlays replaced with `foreground/x` (token+opacity, allowed); accents stay the **two** brand accents (emerald=agent, amber=human) — no third accent, no purple. `text-foreground`/`muted-foreground` are semantic tokens. The gradient/stroke raw rgba are the sanctioned glow exception (same class as the hero glow), flagged for the allow-list. |
| 4 | Alignment | MATCHED | One primitive (the bordered tinted tile) repeated for every stage; connectors centered on the same axis; the `max-w-2xl` flow column unchanged. No novel look introduced — converges on the existing schematic (principle 1). |
| 5 | Contrast | MATCHED | Computed on panel L≈0.19: foreground 17.9:1, muted-foreground 7.5:1, text-subtle 5.5:1, emerald-300 label ~10:1, amber-300 label ~9:1, emerald-400 icons ~8:1 — all ≥ floor (4.5 text / 3 non-text). Dark keeps today's values, which already passed. |

### Light theme

| # | Dimension | Score | Rendered evidence (measured / reasoned) |
|---|---|---|---|
| 1 | Rhythm | MATCHED | Identical grid to dark — no spacing changed in the re-theme. All values remain 8pt/4px multiples. |
| 2 | Hierarchy | MATCHED | Once the panel goes light, `text-foreground` titles (15.6:1) and `muted-foreground` desc (7.0:1) become the dominant dark-on-light layer; the emerald/amber accents recede to ~10% marks (icons, one-word labels). Size+whitespace still lead; the AFK tile is still the biggest block. Hierarchy holds through the flip (spine §5). |
| 3 | Token-adherence | MATCHED | Neutral overlays are `foreground/x` (invert correctly to warm-dark on light). Every raw accent has a deliberate `light dark:` pair from the emerald/amber ramp — no arbitrary hex, still exactly two accents with unchanged semantics. Tinted `-500/xx` fills kept (they read on both). No purple, no third accent, no glassmorphism, no colored left-border card. |
| 4 | Alignment | MATCHED | Same single repeated tile primitive and centered connector axis as dark — the light panel is visibly the *same schematic re-inked*, not a new design (principle 1: converge on our brand across themes). |
| 5 | Contrast | MATCHED | **Computed over token values on the warm off-white panel (surface 0.965 ≈ `#f4f2ee`):** foreground 15.6:1, muted-foreground 7.0:1, text-subtle 5.4:1, `foreground/60` legend ~9:1 — text ✓. Small accent labels re-picked: emerald-700 **4.90:1**, amber-800 **6.34:1** (DONE/agent-zone/human-chip/loopback labels) — text ✓. Non-text accents: emerald-600 icon **3.37:1**, amber-700 icon **4.49:1**, connectors slate-500 ~4.4 / emerald-600 / amber-700 — all ≥3:1 ✓. Focus rings use `--ring` emerald 0.58 = **3.50:1** vs surface ✓. **No pair below floor.** The naïve keep-emerald-500/amber-500 path was verified to FAIL (emerald-500 2.27:1, amber-500 1.92:1) — which is exactly why the shade swaps are mandatory, not cosmetic. |

**Drift diagnosis:** The original panel's single drift was **theme-blindness** — a hardcoded
dark schematic hosting theme-flipping text tokens, so in light mode the panel stayed dark
while its `text-foreground` inverted to dark and vanished (the reported bug), and its
white-alpha overlays + light-500 accents had no light-theme story at all. The re-theme fixes
this at the root: the *field* now flips (token-driven surface + dark-gated glow), neutral
overlays move `white`→`foreground` so they invert correctly, and each raw accent gets a
contrast-chosen `light dark:` pair. Because the fix is color-only and reuses the exact same
tiles/connectors/spacing/semantics, no rhythm/hierarchy/alignment risk is introduced — the
whole gap-test reduces to "does every re-picked pair clear its floor on the light surface",
which the computed ratios confirm it does. There is **no remaining PARTIAL/MISSED** in either
theme under the static gate; only the on-screen eyeball (glow feel, focus visibility, reflow)
is deferred to the TODO above.

---

## Rules restated at the tail (drift control)

- **Four charter traits:** *sharp not cold* (crisp inked hairlines + real dark-on-light
  contrast on the light board, not a grey wash) · *structured not rigid* (same 8pt tiles,
  breathing kept) · *warm not soft* (the warm off-white + amber/emerald glow at low opacity
  add temperature; no glassmorphism, edges kept) · *confident not loud* (two accents, each
  spent on one meaning — emerald=agent, amber=human — not sprinkled).
- **Anti-slop tail:** no default purple (system is slate+emerald+amber) · no
  centered-hero→three-cards (this is a vertical flow schematic, untouched) · no colored
  left-border cards (emphasis by tinted fill + size, not a spine stripe) · no all-caps
  decoration (the mono eyebrows are the existing deliberate idiom, kept) · no glassmorphism
  default (solid warm surface + honest glow, no backdrop-blur) · no Inter-everywhere (fonts
  untouched) · **converge on OUR brand** — the light panel is the same schematic re-inked,
  not a new look.
- **Token surface:** only approved tokens + opacity modifiers (`foreground/x`, `border-border`,
  `bg-surface`) and the emerald/amber ramp for accents via explicit `light dark:` pairs; the
  gradient/stroke raw rgba are the single sanctioned glow exception (flag for allow-list). One
  accent per meaning.

---

## Open Questions

1. **Panel-background & connector-stroke landing mechanism** — the theme-aware panel gradient
   and the three connector strokes can't be expressed as plain Tailwind tokens on the element
   (they're gradient stops / SVG `stroke`). The cleanest token-faithful landing is to add a
   few CSS custom props to the token layer (`--schematic-bg`, `--flow-stroke-{neutral,agent,human}`,
   set per `:root`/`.dark`) and reference them. Alternatively use `dark:` utility variants inline.
   **Which does the developer/orchestrator prefer for the landing step?** This affects whether
   the token-conformance test's allow-list needs the new vars or an inline-gradient exception.
   *(Matters because it decides where the raw glow colors live and how the machine gate treats
   them.)*
2. **amber-700 vs amber-800 for small labels** — I chose amber-800 (6.34:1) over amber-700
   (4.49:1, marginal) for every amber small-text label to keep a comfortable floor margin. If
   the developer finds amber-800 too muddy/brown against the warm surface on screen, amber-700
   is a technical pass but sits right on the line. *(Matters: an on-screen tuning call the static
   gate can't make — flagged in the eyeball TODO.)*
3. **Does the light panel want the glow at all, or a flat warm step?** I specified low-opacity
   emerald/amber glows to preserve the "schematic" character and warmth (charter §3). A flatter
   `surface`→`surface-elevated` step with no glow is the more conservative alternative. Both pass
   contrast; this is an aesthetic call best made looking at the rendered light panel. *(Matters:
   affects whether glow CSS vars are needed at all — ties to Q1.)*
