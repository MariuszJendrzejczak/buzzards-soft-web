# ADR 0002 — Portfolio URL pattern

- **Status:** Accepted
- **Date:** 2026-05-15
- **Scope:** How `/portfolio/honeti` (collective subpage for 14 Honeti apps) coexists with the existing `/portfolio/[slug]` dynamic route, and how future per-app case studies (`/portfolio/honeti/<app-slug>`) are added.

## Context

The current router has:

```
app/[locale]/portfolio/[slug]/page.tsx
app/[locale]/portfolio/[slug]/cases/honeti.ts
app/[locale]/portfolio/[slug]/cases/index.ts   // CASE_META, getCaseStudy
```

`generateStaticParams` enumerates `CASE_SLUGS` × locales — so the dynamic route only matches pre-declared slugs. There is currently exactly one entry (`honeti`) producing a single case-study page.

Sprint 1 introduces a new requirement: a **collective** Honeti subpage listing all 14 apps (5 Flutter + 9 Unity), and — in a later phase — per-app pages like `/portfolio/honeti/infoshare`. The existing `cases/honeti.ts` (current single case-study card) is being refactored into the 14-app dataset; the collective view UI lands in Sprint 2.

Two options considered:

- **Option A — special slug.** Keep `[slug]/page.tsx`, branch on `slug === "honeti"` to render the collective view, and reuse `[slug]` for everything else.
- **Option B — dedicated static route.** Add `app/[locale]/portfolio/honeti/page.tsx`. Next.js prefers static segments over dynamic ones at the same level, so `[slug]` no longer needs to know about `"honeti"`.

## Decision

**Option B: a dedicated static route at `app/[locale]/portfolio/honeti/page.tsx`.** The dynamic `[slug]` route stays focused on single-case-study rendering for any future flagship case (e.g. `/portfolio/uprawnienia-budowlane`), and we remove `"honeti"` from `CASE_SLUGS` once Sprint 2 ships the collective page.

Sprint 1 keeps the existing case-study mechanism intact: the legacy `CaseStudyMeta` (previously inside `cases/honeti.ts`) moves verbatim to `cases/honeti-case.ts` so the `/portfolio/honeti` dynamic-route page keeps rendering until Sprint 2 replaces it with the static route. The 14-app dataset takes over `cases/honeti.ts` (the original filename — per session prompt) and is re-exported from `lib/portfolio/honeti-apps.ts`, so neither route mechanism collides with the other.

Per-app case studies later land as a nested dynamic segment:

```
app/[locale]/portfolio/honeti/page.tsx                // collective (Sprint 2)
app/[locale]/portfolio/honeti/[appSlug]/page.tsx      // per-app (later phase)
app/[locale]/portfolio/[slug]/page.tsx                // standalone case studies (existing)
```

## Rationale

- **No router branching on a magic string.** Option A would put `if (slug === "honeti") return <Collective />` inside the dynamic route — production code reading like a switch on a literal, easy to forget when adding a second collective view.
- **`generateStaticParams` stays clean.** Option B lets `[slug]` only enumerate real case-study slugs. With Option A we either keep `"honeti"` in `CASE_SLUGS` (and the case-study layout breaks at runtime) or we special-case the param list (mirroring the runtime branch in build-time data).
- **Per-app subpages compose naturally.** `/portfolio/honeti/infoshare` becomes `app/[locale]/portfolio/honeti/[appSlug]/page.tsx`. Under Option A this nesting would require a *third* layer of conditional dispatch inside `[slug]/page.tsx`, or a parallel `[slug]/[subSlug]/page.tsx` route that still needs to know which parent slugs accept children.
- **Static beats dynamic in Next.js routing.** When both `app/[locale]/portfolio/honeti/page.tsx` and `app/[locale]/portfolio/[slug]/page.tsx` exist, Next.js routes `/portfolio/honeti` to the static segment. No conflict, no precedence trickery.
- **Diff is small.** Option B adds one new folder; Option A adds branching to every place that touches `[slug]` (page, metadata, layout, future per-locale rewrites).

## Consequences

- The existing dynamic route at `/portfolio/honeti` (currently producing the legacy single-card case study) stays live during Sprint 1 — Sprint 2 introduces the new static route, and `"honeti"` is removed from `CASE_SLUGS` at that handover. Crossover risk: if both routes existed simultaneously, the static one wins, so the legacy view simply stops being reachable when the static page is added.
- `cases/honeti-case.ts` (legacy single-case meta, moved from the old `cases/honeti.ts`) and the new `cases/honeti.ts` (14-app dataset) coexist for one sprint. Names diverge intentionally so the case-study mechanism (untouched by Sprint 1) and the new portfolio data (added by Sprint 1) cannot get confused.
- Future flagship case studies (per planning doc: Infoshare, Uprawnienia Budowlane, Gastro Ninja Klient) can land as `cases/<slug>.ts` under the existing `[slug]` mechanism without any change — Option B does not deprecate the dynamic route, it carves out `/portfolio/honeti` as a non-case-study sibling.

## Chosen: Option B (dedicated static route), because per-app subpages compose naturally underneath it and the dynamic `[slug]` route stays a single-purpose case-study renderer.
