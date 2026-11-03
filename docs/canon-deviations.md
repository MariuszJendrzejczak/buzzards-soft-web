<!--
  SEED — installed once by /canon-install as docs/canon-deviations.md, then OWNED BY THE
  PROJECT. /canon-update never overwrites it, but it DOES re-check every entry when the rule
  it names has changed upstream.
-->

# Buzzards Soft web — deviations from the canon

> **Precedence.** This file overrides `docs/canon/**` **at the named point only**. Everything
> not listed here follows the canon unchanged.

`docs/canon/**` is vendored and read-only. When this project genuinely must depart from a
house rule, the departure is recorded here — never as an inline edit to the canon, which the
next `/canon-update` would silently destroy.

## How to add an entry

Each deviation names the exact rule, the departure, the reason, and its expiry. A deviation
with no expiry condition is a fork, not a deviation — either change the canon upstream (see
`/canon-harvest`) or accept it as permanent and say so explicitly.

```markdown
## {{canon file}} § {{rule}} — {{one-line summary}}

**Deviation:** what this project does instead.
**Why:** the specific constraint that forces it. "We prefer it" is not a reason.
**Scope:** which files/features this touches. Narrow it as far as it will go.
**Expires:** the condition under which this goes away, or `permanent — <reason>`.
**Recorded:** YYYY-MM-DD
```

## Active deviations

*(none yet)*

## Retired deviations

Kept, not deleted — a deviation that was removed is evidence about the rule, and the next
person to hit the same constraint should find the trail.
