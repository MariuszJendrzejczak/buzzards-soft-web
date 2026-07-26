# Content Contract — generating a Buzzards site manifest

> **Audience:** an agent (or human) generating a `content-manifest.json` for one Buzzards Soft
> site. This is the **single source of truth** for what a valid manifest contains and how each
> field is derived. Phase 2's generator and Phase 3's ingest both conform to it. The canonical
> field types live in `src/entities/content-element/model/manifest.ts`; this document is the
> prose spec + derivation rules that back those types.
>
> **Hard rule — read-only source:** the generator **reads** the site and **must NOT modify the
> site's runtime** (no edits to `page.tsx`, components, or `messages/*.json`). The only artifact
> it produces is the descriptive manifest (a non-runtime sidecar). The site's storage format
> does not change.

## What the generator reads

For a single site (the pilot is `buzzards-soft`, living in `buzzards_soft_web/`):

- **`messages/{pl,en,sv}.json`** — the next-intl content trees. `pl` is the source of truth; `en`
  and `sv` are key-aligned copies. Leaves are the content strings; the key path is the machine
  backbone (e.g. `hero.headingLead`). next-intl uses **objects, not arrays**, for numeric
  collections (`education.areas.1` is object key `"1"`, not array index `1`).
- **`app/[locale]/page.tsx`** — the home route's **component composition**. This is the only place
  that carries **section identity, render order, and which sections are live** (mounted). Parked
  sections are present as commented-out imports/renders.
- **`components/sections/**`** (and `components/portfolio/**`) — the section components. Read them
  only to confirm which namespace a mounted component consumes and to disambiguate a friendly
  label; never to infer order.

## Core principle — order and `live` come from composition, never from JSON key order

**The JSON alone cannot yield the section list or its order.** Top-level namespaces in
`messages/pl.json` are a *mix* of page sections, whole sub-pages, and cross-cutting/technical
namespaces, and their key order is meaningless for display.

- **`section.order`** and the **`section.live` flag** are derived from
  `app/[locale]/page.tsx`: the **top-to-bottom render order** of the JSX and **which components
  are actually mounted** (uncommented). A section whose component is commented out / not rendered
  is **not live** and is **excluded** from the manifest (see "Parked sections").
- The **`eyebrow` "Sekcja NN" strings** (e.g. `certification.eyebrow = "Sekcja 02 · Warsztat"`)
  are **hints only** — they help a human confirm identity and pick a friendly label. They are
  **not** authoritative for order, and their numbering has gaps and duplicates because parked
  sections keep their old numbers (in the pilot, "Sekcja 02" appears on both the live
  `certification` and the parked `howIWork`; "Sekcja 05" is the parked `currentlyLearning`). When
  the eyebrow number and the render position disagree, **render position wins**.
- **Never** derive `section.order` from the position of a namespace in the JSON file.

### Pilot reference (home route, verified against `app/[locale]/page.tsx`)

The live sections, in render order, with the namespace each maps to:

| order | section id | JSON namespace(s) | component |
|---|---|---|---|
| 1 | `hero` | `hero` | `sections/hero` |
| 2 | `certification` | `certification` | `sections/certification` |
| 3 | `whatICanDeliver` | `whatICanDeliver` | `sections/work/what-i-can-deliver` |
| 4 | `portfolio` | `portfolio` | `portfolio/PortfolioSection` |
| 6 | `about` | `about` | `sections/about` |
| 7 | `education` | `education` | `sections/education` |
| 8 | `contact` | `contact`, `contactForm`, `contactInfo` | `sections/contact` |

`order` follows render position (the eyebrow numbers 6/7/8 are carried through because slot 05 is
parked). Use dense, gap-free integers if you prefer — the invariant is only that the sorted
`order` reproduces the render sequence above. One `section.id` may aggregate several sibling
namespaces (e.g. the contact section owns `contact` + `contactForm` + `contactInfo`).

## Parked / unmounted sections — exclude them

A namespace exists in the JSON but is **not** rendered by `page.tsx` (commented out or never
imported) → it is **parked**. Parked sections and all their keys are **omitted** from the
manifest entirely (no section entry, no element entries). In the pilot these are `howIWork` and
`currentlyLearning`. Cross-cutting/technical namespaces that are not page sections (`common`,
`nav`, `footer`, `language`, `rootMetadata`) and whole sub-pages not on the home route (`offer`,
`mobileOffer`, `privacyPolicy`, `notFound`) are out of scope for this manifest — the pilot map
covers the home route only.

## Friendly labels (`label: LocaleText`)

Every section and every editable element carries a human-readable `label` (a `LocaleText`, at
least `pl`; `en`/`sv` optional). Labels are what a non-technical client reads — **a cryptic key
path must never surface** (FR-002). Derive the label, in priority order, from:

1. the section/element's own **`eyebrow`** string (strip the "Sekcja NN · " prefix → the human
   name, e.g. `"Sekcja 02 · Warsztat"` → section label "Warsztat");
2. the nearest **`title`/`heading`** value that names the fragment;
3. the element's **`role`** (below) rendered as a friendly PL phrase (e.g. a split's first
   fragment → "nagłówek część 1").

A human curates the generated labels in Phase 2; the generator supplies a best first pass.
Section labels name the section ("Hero", "Warsztat", "Kontakt"); element labels name the
fragment within it ("nagłówek", "podtytuł", "przycisk główny", "nagłówek część 1").

## The `role` / `type` taxonomy

`type` is a **closed set** classifying the element's nature:

`'text' | 'richText' | 'cta' | 'aria' | 'alt' | 'meta' | 'label'`

- **`text`** — a plain content string shown to visitors (headings, paragraphs, list items).
- **`richText`** — content that carries inline styling split across sibling keys (a member of a
  split group; see below). The visible sentence is the concatenation of the group's fragments.
- **`cta`** — a call-to-action button/link label (keys like `*cta*`, `ctaPrimary`,
  `ctaSecondary`).
- **`aria`** — an accessibility string (`*Aria`, `*aria*`): technical, not client content.
- **`alt`** — image alt text (`alt`, `*Alt`): technical.
- **`meta`** — SEO metadata (`meta.title`, `meta.description`, `rootMetadata.*`): technical.
- **`label`** — a UI micro-label / affordance string (`*Label`, toast/copy affordances): technical.

`role` is a **free-form but consistent** short identifier for the fragment's job inside its
section (e.g. `heading`, `subheading`, `badge`, `trustItem`, `ctaPrimary`, `stackAria`,
`headingLead`). `role` disambiguates elements within a section and feeds label derivation; keep it
stable and descriptive. `type` is for classification/filtering, `role` is for identity.

## Technical strings → `editable:false`, hidden

Any element whose `type` is `aria`, `alt`, `meta`, or `label` is a **technical string**: set
`editable:false`. These are **hidden by default** in the map (studio-only). Detection rules
(applied to the leaf key's final segment / key path):

- final segment ends in `Aria` **or** matches `/aria/i` → `type:'aria'`.
- final segment is `alt` or ends in `Alt` → `type:'alt'`.
- key path contains `meta.title` / `meta.description`, or is under `rootMetadata` → `type:'meta'`.
- final segment ends in `Label`, or is a copy/toast affordance (`copyAria`, `copiedAria`,
  `copyToast`, `copyLabel`, …) → `type:'label'` (or `'aria'` when it also ends in `Aria`; an
  `Aria` suffix wins).

All other content leaves are `editable:true` with `type` in `{text, richText, cta}`.

Verified pilot examples of technical strings: `hero.trustAria`, `whatICanDeliver.stackAria`,
`education.*Aria`, `contactInfo.copyAria` / `copiedAria` / `copyToast`, and the `offer`/`mobileOffer`
`meta.title` / `meta.description` (the last are off-route here, but illustrate the `meta` rule).

## ICU placeholder detection (`icu: string[]`)

Scan each leaf **value** for ICU placeholders with the regex **`\{[^}]+\}`**. Record the matched
tokens (including the braces, e.g. `{package}`, `{year}`, `{label}`, `{section}`) in the element's
`icu[]` array. When a value has no placeholder, `icu` is `[]`. Placeholders must be **preserved
verbatim** downstream (the export in S-04 depends on them); recording them here lets the map and
future editors flag "this value contains a placeholder — keep it".

Verified pilot ICU values: `contactForm.orderPrefill` (`{package}`), `footer.copyright` (`{year}`),
`contactInfo.copyAria` / `copiedAria` / `copyToast` (`{label}`), `whatICanDeliver.stackAria`
(`{section}`).

## Split-group detection (`group?: { id, order }`)

A single visible sentence is sometimes **split across sibling keys** for inline styling. These
fragments must be **detected and bundled into one `group`** so the map shows one sentence, not
three rows.

**Detection** — sibling leaf keys under the same parent whose final segments match a known
**fragment family**:

- **`*Lead` / `*Highlight` / `*Trail`** — e.g. `hero.headingLead`, `hero.headingHighlight`,
  `hero.headingTrail` (verified in the pilot).
- **`*Part1` / `*Mid` / `*Post`** (and the `*Part1Pre` / `*Mid` / `*Post` and
  `*Part1` / `*Highlight` / `*Part2` variants) — e.g. `introPart1Pre` / `introMid` / `introPost`,
  `bodyPart1` / `bodyHighlight` / `bodyPart2`.

Fragments that share a **base name** (the key with the family suffix stripped, e.g. `heading`,
`intro`, `body`) and the **same parent** belong to **one group**:

- `group.id` = the shared base name (stable within the section, e.g. `heading`).
- `group.order` = the fragment's position in reading order (Lead/Part1Pre = 1, Highlight/Mid = 2,
  Trail/Post/Part2 = 3, …). Concatenating the group's members in ascending `group.order` must
  reproduce the original sentence.
- Each fragment keeps its own `keyPath`, its own `role` (the fragment key, e.g. `headingLead`),
  and `type:'richText'`. All members of a group share the same `section` and the same `group.id`.

An element that is **not** part of a split has no `group` field.

## The manifest, field by field

The generator emits a `Manifest` (see `manifest.ts` for the exact TS types + JSON schema):

```
Manifest = {
  site: string,                 // "buzzards-soft"
  contractVersion: string,      // the version of THIS contract the manifest was built against
  sections: Section[],          // live sections only, order-bearing
  elements: ElementSpec[],      // every content leaf of every live section
}

Section = {
  id: string,                   // stable section id, e.g. "hero"
  order: number,                // render position from page.tsx (NOT key order)
  label: LocaleText,            // friendly section name
  live: boolean,                // always true in the emitted manifest (parked excluded)
}

ElementSpec = {
  keyPath: string,              // dot-joined next-intl key, e.g. "hero.headingLead"
  section: string,              // Section.id this element belongs to
  order: number,                // element order within its section
  label: LocaleText,            // friendly fragment label (no cryptic key ever surfaces)
  role: string,                 // fragment identity, e.g. "headingLead"
  type: 'text'|'richText'|'cta'|'aria'|'alt'|'meta'|'label',
  editable: boolean,            // false for aria/alt/meta/label (technical), true otherwise
  group?: { id: string, order: number },  // present only for split-sentence fragments
  icu: string[],                // ICU tokens found in the leaf value (\{[^}]+\}), [] if none
}

LocaleText = { pl: string, en?: string, sv?: string }
```

### Invariants a valid manifest must satisfy

- Every `ElementSpec.section` resolves to a `Section.id` in `sections[]`.
- `sections[]` are the **live** sections only; sorted by `order` they reproduce the `page.tsx`
  render sequence. Parked sections are absent.
- Every `keyPath` corresponds to a real leaf in `messages/pl.json` (no orphan keys).
- Every technical element (`type ∈ {aria, alt, meta, label}`) has `editable:false`; every
  `editable:true` element has a non-cryptic `label` (a client can read it).
- Members of a split group share `section` + `group.id`; concatenating them by `group.order`
  reproduces the source sentence.
- `icu[]` lists exactly the `\{[^}]+\}` tokens present in the element's `pl` value.
- `count(editable:true) > 0`.

## Downstream (context, not this phase)

Phase 3 ingests `Manifest` + `messages/{pl,en,sv}.json` into a per-element Firestore model
(`ContentElementDoc` with `values: {pl,en,sv}` + the metadata copied from each `ElementSpec`;
`SectionDoc` per section), scoped by `siteId`. Those Firestore-facing shapes are also defined in
`manifest.ts`. This contract does not author any data or touch Firestore.
