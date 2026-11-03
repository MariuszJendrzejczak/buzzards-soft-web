---
scope: canon
stack: next
supersedes: none — first ratification of the web design-system method
created: 2026-08-30
---

# Canon — Next.js design-system method

> **Precedence.** hard rules + tie-breaks → `AGENTS.md` · how Next.js code is written in this
> house → `docs/canon/next/*` · finite sets → `docs/registry.md` · why one decision is what it
> is → `docs/adr/` · what we build → `context/foundation/`
>
> **Vendored — read-only.** Departures go in `docs/canon-deviations.md`.

**Newly ratified** for the Tailwind-v4 token mechanics, which had no house-level statement
before.

**Shared principles.** The method/values split and the no-literal rule (**P9**), domain
semantics (**P10**), the closed component vocabulary (**P11**) and promote-before-the-second-copy
(**P3**) live once in `docs/canon/principles.md`. This file is their CSS form.

---

## What is house and what is project

| House (here) | Project (`docs/design-system.md`) |
|---|---|
| every colour is a semantic CSS custom property in one layer | which colours, which families |
| tokens are exposed to utilities in one `@theme` mapping | which utility names exist |
| theming switches by an attribute on the root, not by class soup | which themes / accents exist |
| no colour literal outside the token layer | — |
| domain-semantic tokens are named for the domain, not the hue | which semantics exist |
| typography is one family token plus named overrides | which font, which overrides |
| the component vocabulary is a closed, named list | which components are in it |
| domain→visual mappings are one table in `model` | the actual mapping |

A project that keeps a design ADR records the *values* decision there and points here for the
method.

---

## 1. One token layer, and nothing outside it carries a literal

All design values live as CSS custom properties in a single stylesheet layer (`app/globals.css`
or its equivalent), grouped and commented so each value's **origin** — a handoff, an export, a
brand sheet — is unambiguous.

```css
:root {
  --bg: #f1f3ef;
  --surface: #ffffff;
  --text: #16201c;
  --text-2: #5b645d;
  --accent: #1f7a58;
  --accent-weak: color-mix(in srgb, var(--accent) 11%, #fff);
  --radius-card: 13px;
}
```

**No hex literal, no `rgb()`, no ad-hoc `px` radius in a component. Price: rejected review.** A
component reaches a value through a token-backed utility class or `var(--token)` — never as a
literal. Derived shades are computed **in the token layer** (`color-mix`), not by picking a
second hex that "looks close".

*Rejected:* Tailwind's default palette as the app palette — it cannot express a specified surface
ladder, and it names colours by hue (`slate-700`), which makes a theme swap a find-and-replace
across every component.

## 2. Tokens become utilities through one `@theme` mapping

Tailwind v4 exposes design tokens as utilities from `@theme`. Keep the mapping thin and
mechanical — semantic name in, utility out:

```css
@theme inline {
  --color-surface: var(--surface);
  --color-text-2:  var(--text-2);
  --color-danger-weak: var(--danger-weak);
}
```

The indirection is the point: `--surface` is *the value*, `--color-surface` is *how Tailwind
sees it*. Swapping a theme rewrites the first layer only, and every `bg-surface` in the app
follows without being touched.

**Do not introduce a second styling mechanism** — no CSS modules beside Tailwind, no inline
style objects carrying design values, no a component-local stylesheet. *Price: rejected review.*
Two mechanisms mean two answers to "what colour is this", and the loser is whoever debugs it.

## 3. Theme and variant switch on a root attribute

Light/dark (and any accent or density variant) resolve from an attribute on the root element,
with the variant declared once:

```css
@custom-variant dark (&:is([data-theme="dark"] *));

[data-theme="dark"] { --bg: #0b0d0c; --surface: #161a19; --text: #eef2ef; }
```

Consequences that are rules:

- **Both themes are first-class.** A component written against tokens is theme-correct for free;
  one written against a literal is broken in exactly one theme, and that theme is the one nobody
  screenshots.
- **The switch is one attribute write.** Persisting and applying it is `app`-layer work, never a
  feature's.
- **No `dark:` overrides carrying their own literals.** If a value differs by theme, it differs
  in the token layer.

## 4. Domain-semantic tokens are named for the domain

Values that encode a **domain** meaning — a stock level, a risk band, a sync state, a category
type — get their own tokens (`--ok-bg` / `--low-fg` / `--t-pantry-bg`), *not* a reused palette
slot and *not* a literal in the component that shows them.

**The component shows the semantic; it never computes it.** A badge does not evaluate
`quantity < threshold` inline — the domain rule produces the classification in `model`, the
component picks the token for it. This is the same rule as `architecture.md` §9, seen from the
design side.

*Why a token and not a helper function returning a colour:* a helper forces every consumer to
import it and bypasses the theme layer, so a dark variant becomes a change in N call sites
instead of one block.

## 5. Typography: one family token, named overrides only

One family, loaded through the framework's font pipeline and exposed as a token
(`--font-sans: var(--font-hanken-grotesk), system-ui, sans-serif`). Named text styles exist
**only** where a layout demands an exact size and weight; everything else uses the scale.

An ad-hoc `text-[13px] font-[550]` in a screen is the same class of defect as a hex literal.

## 6. The component vocabulary is a closed, named list

Shared components are enumerated by name in the project's `docs/design-system.md`, so two
features cannot invent two names for one control. It is a **closed registry** in the sense of
`docs/registry.md`: adding a component to the vocabulary is a deliberate act, not a side effect
of building a screen.

Vendored primitives (shadcn/ui and similar) are listed separately from house-owned components,
and are **not edited in place** — a house behaviour change wraps the primitive rather than
forking it, so the CLI can regenerate it (see `architecture.md` §8).

Adding a screen should reduce to: pick components from the vocabulary, shape the data in
`model`, compose in `pages`. **No per-screen theming.**

A reusable inner component is promoted into the vocabulary **before a second copy exists**.

## 7. Domain→visual mapping is one table, in `model`

Where an icon, tint, or label is chosen by a domain value (a type, a state, a category), that
mapping is **one table in one place in the slice's `model`** — not a `switch` scattered across
components, and not a chain of ternaries in JSX. A per-entity override, where the domain allows
one, wins over the table default.

## 8. Accessibility floors are part of the method

Non-negotiable, in both themes: text meets contrast minimums against its own surface token;
every interactive element is keyboard-reachable with a visible focus ring; state is never
carried by colour alone; an error surface is announced (`role="alert"`), not only coloured.

These are properties of the **token set and the shared components** — which is why they belong
here and not in a per-screen checklist. Get them right once in the vocabulary and every screen
inherits them.

---

## Sources

| This document | Original |
|---|---|
| Method/values split, no-literal rule, closed vocabulary, domain-mapping table | `docs/canon/flutter/design-system-method.md`, re-expressed for CSS |
| The token layer, `@theme inline` mapping, `@custom-variant` theming, `color-mix` derivations, radii + font tokens | `home_manager_web/app/globals.css` |
| Vendored-primitive handling | `cv_tracker` / `buzzards_soft_web` shadcn usage |

**Lesson carried across stacks.** The Flutter side proved this method empirically: a design ADR
written light-only later gained dark mode plus a dynamic accent, and the revision touched **the
theme file, not the widgets** — because domain semantics had been routed through a theme
extension rather than read as constants. The CSS custom-property layer is the same mechanism in
a different language, and it earns its keep the same way: the house's web app carries light,
dark, and eight accents behind one attribute, and no component knows about any of them. Rule 4
is therefore not stylistic preference; it is the thing that makes a whole-app variant a
one-block change.
