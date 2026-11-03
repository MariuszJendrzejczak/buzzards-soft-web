---
scope: canon
stack: next
supersedes: docs/legacy/architecture-next-js.md
created: 2026-08-30
---

# Canon — Next.js architecture (App Router + Feature-Sliced Design)

> **Precedence.** hard rules + tie-breaks → `AGENTS.md` · how Next.js code is written in this
> house → `docs/canon/next/*` · finite sets → `docs/registry.md` · why one specific decision is
> what it is → `docs/adr/` · what we build and in what order → `context/foundation/`
>
> **Vendored — read-only.** Installed by `/canon-install`, replaced wholesale by
> `/canon-update`. Project departures go in `docs/canon-deviations.md`, never inline here.

**Derived document.** This orders and generalizes decisions already taken across the house's
Next.js repos; it **changes none of them**. The prior project-neutral template is frozen at
`docs/legacy/architecture-next-js.md`.

**Shared principles.** Rules that hold on more than one stack live **once**, in
`docs/canon/principles.md`. This file does not re-argue them — it carries their Next.js form and
links back.

---

## Shape in one paragraph

**Feature-Sliced Design on the App Router.** Every layer lives under `src/`; the root `app/`
directory is Next routing *only* and each route file is a thin re-export. Dependencies flow one
way through six layers, and a slice is reachable only through its `index.ts`. Server state
belongs to TanStack Query; the Firebase (or other backend) client is initialized once in
`shared/api`. Rendering mode is **declared, not discovered** — the house default is a fully
prerendered app, so an agent's reflex to reach for SSR, Server Actions or request-time Route
Handlers is usually wrong here.

**Why FSD and not a Clean-Architecture clone of the Flutter apps.** React does not pay for a DI
container or an interface-per-repository the way Flutter does; ported literally, that ceremony
multiplies across features for no benefit — the backend is not going to be swapped, and the
Firebase SDK mocks fine without an interface. FSD is the web-native expression of the same
one-directional dependency discipline.

*Rejected:* **strict CA clone** (ceremony without payoff, and it forces Flutter vocabulary onto
React code); **a pragmatic CA-shaped middle** — undocumented, unteachable, and it drifts,
because nothing outside the repo says what the layers mean.

**Mental-model bridge to the Flutter canon:** FSD `entities` ≈ `domain`, segment `model` ≈
`application`, segment `api` ≈ `infrastructure`, segment `ui` ≈ `presentation`. The house is
unified at the *doc-shape* level, not the layer vocabulary.

---

## 0. Read the installed Next.js before writing Next.js

Next.js ships breaking changes between majors, and the version in this repo may not be the one
in an agent's training data. `next dev` itself writes an `AGENTS.md` block saying so.

- **Before writing route, caching, or rendering code, read the guide in
  `node_modules/next/dist/docs/`** — resolved from the file that names it, since in a monorepo
  `next` may not be visible from the repo root.
- **The generated `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md` is not yours to
  delete.** `next dev` re-adds it; removing it from a diff only recreates the uncommitted
  change. Commit it with your work and keep the tree clean.
- A remembered API is a hypothesis. **Price of guessing: a build that fails at the last gate**,
  after the expensive part of the work is done.

---

## 1. The one rule — the heart of FSD

Import a slice **only through its public API** (`index.ts`), and **only from a layer strictly
below**.

```
app → pages → widgets → features → entities → shared
```

`features` may use `entities` and `shared`. `entities` knows nothing about `features`. `shared`
imports nothing above it. **Sibling slices in the same layer never import each other.**

**A cross-layer or sibling import is a rejected review.** It is not a style preference: the
whole method is the acyclic import graph, and one upward import turns the tree into a
dependency soup that no amount of folder naming rescues.

Reaching into a slice's internals (`@/features/x/model/thing`) instead of its `index.ts` is the
same violation wearing a longer path.

---

## 2. Layers

| Layer | Holds | Forbidden |
|---|---|---|
| **app** | app init, providers (query client, session), global styles + token layer, routing wiring | business logic, feature UI |
| **pages** | composition of one route's view; re-exported by the root `app/` route | reusable logic — push it down |
| **widgets** | large self-sufficient blocks composing several features/entities | route-specific glue (that is `pages`) |
| **features** | one user interaction that delivers value (create X, invite Y, set status) | cross-feature imports; routing; entity↔entity data rules |
| **entities** | business entities — types, pure logic, data access, entity UI, **query keys** | knowledge of any feature; importing a sibling entity |
| **shared** | UI kit, helpers, the backend client, config | business logic; any upward import |

**Progressive adoption is sanctioned, and must be stated.** A small app may run
`shared / entities / features / app` and add `widgets` / `pages` when composition grows.
Which layers are adopted **now** is recorded in the project's `docs/architecture-guide.md` —
an unstated omission is indistinguishable from a mistake.

---

## 3. Slices and segments

Within a layer, split by **domain** into slices; within a slice, split by **technical role**
into segments:

```
features/create-household/
  ui/        React components ("use client" where they touch browser or SDK APIs)
  model/     state, hooks, TanStack Query hooks, derived state, validation
  api/       backend calls + document↔entity mapping
  lib/       local pure helpers
  index.ts   PUBLIC API — the only thing other slices may import
```

Not every slice needs every segment. `entities/<x>` is typically `model` (types + pure logic) +
`api` (data access) + optional `ui`.

**A slice's `index.ts` is a curated surface, not a barrel of everything.** Exporting the whole
internals through `index.ts` satisfies the letter of rule 1 and destroys its purpose.

---

## 4. App Router integration — the load-bearing trick

FSD's `app` layer collides with Next's required root `app/` routing directory. The resolution
(per the official FSD Next.js guide, and identical in every house repo):

```
app/                    Next routing ONLY — each file is a thin re-export
  <route>/page.tsx      export { SomePage as default, metadata } from '@/pages/<slice>'
pages/                  EMPTY folder + README — REQUIRED
middleware.ts           stays at the repo root (also instrumentation.* if used)
src/
  app/                  FSD app layer (providers, global setup)
  pages/                FSD pages layer
  widgets/  features/  entities/  shared/
```

- **The empty root `pages/` with a README is required, not decorative.** Without it Next picks
  up `src/pages` as the legacy Pages Router and the build breaks. **Price: a broken build that
  looks like an FSD problem and is not.** The README exists so nobody "cleans up" an empty
  folder.
- **Root `app/<route>/page.tsx` is a one-line re-export.** All composition lives in the
  `src/pages` slice. Route-level config (`dynamic`, `generateStaticParams`, `metadata`) stays
  on the route file, because that is where Next reads it.
- **Route Handlers** live as an `api-routes` segment in the FSD `app` layer, re-exported from
  the root `app/api/`.

---

## 5. Rendering mode is declared, and the declaration is a constraint

The house default is a **fully prerendered app** — `output: 'export'`, or `force-static` on
every route — served from static hosting with the backend SDK running in the browser. This is
not an accident of scaffolding; it is what every house Next.js app currently does, and it
**removes a whole class of features an agent will otherwise reach for by reflex**.

Under a static export, these do **not** exist at runtime (verified against the current Next.js
docs, not from memory):

request-time Route Handlers · Server Actions · rewrites / redirects / headers from
`next.config` · middleware as a request-time gate · ISR · Draft Mode · intercepting routes ·
dynamic routes without `generateStaticParams` · the default image-optimization loader.

Consequences that are house rules:

- **Every route declares its mode**, and the project's `docs/registry.md` route table records
  it. A route whose mode is unstated is a defect.
- **A "backend endpoint" under a static export is a hosting rewrite to a real function**, not a
  Next API route. Wire it in the hosting config and record it in the registry.
- **A build-time-only Route Handler must carry `export const dynamic = 'force-static'`** — Next
  errors out on any other setting under `output: 'export'`.
- **Anything that must run per-request is a Cloud Function / server, not a page.** Proposing a
  Server Action in a static-export repo is a finding.
- **Security: every response carries the security headers, and under a static export the
  hosting config declares them.** At least: no framing by another origin
  (`Content-Security-Policy: frame-ancestors 'none'` and `X-Frame-Options: DENY`),
  `X-Content-Type-Options: nosniff`, and a `Referrer-Policy`. A full content-security policy
  is a decision of its own, taken with what the app loads. *Why:* the framework cannot set a
  header under a static export, so a hosting block without them serves every page frameable by
  any site — a signed-in user can be made to click through a page they cannot see. The rule
  binds from the first line: it is a few lines of config. **Price: rejected review.**

A project that genuinely needs SSR records that in `docs/canon-deviations.md` **before** the
first dynamic route lands, not after the deploy surfaces it.

---

## 6. The backend client is initialized once, in `shared/api`

`shared/api/<backend>/` owns initialization and exports the handles (`auth`, `db`, `storage`)
through its `index.ts`. No slice constructs its own client.

**Browser-only SDK calls must not run during prerender.** Under a static export the build
*executes* module top-level code; an SDK initializer that reads env at import time throws at
build time with an error that names the SDK, not the real cause. Initialize lazily or guard for
the browser.

**Price: a green local dev server and a red build.** This is the single most expensive Next.js
mistake in this house, because it appears only at the last gate.

**Security — tenant scope.** Multi-tenant reads and writes go through a **scope primitive** in
`shared/api` (a `withScope` / `scopedQuery` style helper), never by hand-assembling a path in
a feature. The scope also travels in the query key — see `docs/canon/next/data.md`.

---

## 7. Where a rule lives when two features need it

This is the question FSD makes sharp, and the one that gets answered wrong.

| The thing | Lives in | Because |
|---|---|---|
| entity types + pure rules | `entities/<x>/model` | no feature owns them |
| a document↔entity mapper | `entities/<x>/api` | one (de)serialization boundary per entity |
| **query keys for an entity** | `entities/<x>` (exported) | any feature may import downward |
| a cross-entity cascade | the **feature** that triggers it | `entities` must not import a sibling entity |
| a helper two features share | `shared/lib` | promoted **before** the second copy exists |

**Do not solve a sibling-import problem by duplicating the value with a "keep in sync"
comment.** That is the drift the layering exists to prevent — see the lesson at the foot of
`docs/canon/next/data.md`, where exactly this happened. Push the shared value **down** a layer
instead; the direction is always down, never sideways.

---

## 8. shadcn/ui: the CLI's aliases win, and that is fine

The shadcn CLI writes primitives to `src/components/ui/` and `cn` to `src/lib/utils.ts` — fixed
alias targets that sit outside the FSD tree.

**Do not fight the CLI.** Treat `src/components/ui` as the shared UI kit (it is `shared/ui` in
everything but path), vendor the primitives verbatim, and exclude them from lint/format
churn. Re-homing them means every `npx shadcn add` re-creates the old path and the repo grows
two vocabularies for one button.

The project's `docs/design-system.md` records which primitives are vendored and which
house-owned components wrap them.

*Rejected:* rewriting each generated primitive into `shared/ui` — it survives exactly until the
next component is added.

---

## 9. Component health — what a component may and may not do

The React form of `principles.md` **P1** (no domain logic in the view), **P2** (no O(N) on the
render path) and **P3** (promote before the second copy). The reasons and the prices are stated
there once; what follows is what they look like here.

- **Domain logic lives in the slice's `model`** (or an entity's pure logic); the component
  consumes ready-to-render values. Permitted in a component: render guards, layout and
  animation state, and narrowing driven purely by transient UI state (search text, selected
  filter or sort).
- **Derivation is memoized off the render body**, not recomputed on every render; formatting is
  windowed to visible rows.
- **`"use client"` is placed at the smallest boundary that needs it**, not at the top of a page
  that then drags the whole subtree into the client bundle. *(Next-specific — not a shared
  principle.)*
- **A reusable inner component is promoted to the shared kit before a second copy exists**, and
  added to the vocabulary in `docs/design-system.md`.

P1 is enforced by a guard (`principles.md` P1). **This stack has not written its list of refused
shapes or its guard yet**; until it does, a breach of P1 found in review blocks the change, and no
breach is waved through as a guideline. P2 is a **review guideline, not a blocking lint**. P3 is
checkable, and is checked.

---

## 10. Feature workflow — always this order

1. **Entity** — types and pure rules in `entities/<x>/model`; the mapper and scoped data access
   in `entities/<x>/api`; the entity's **query keys**, exported from its `index.ts`.
2. **Feature model** — TanStack Query hooks in `features/<y>/model`, calling the entity's `api`.
   Cross-entity cascades live here, not in `entities`.
3. **Feature UI** — components in `features/<y>/ui`, consuming the hooks.
4. **Composition** — `widgets` where a block spans features; `src/pages/<route>` for the route
   view.
5. **Route** — the one-line re-export in root `app/`, with its rendering-mode declaration.
6. **Tests** — see `docs/canon/next/testing.md`. Not a trailing step: the entity's pure logic
   and the slice's `api` mapping are tested as they are written.
7. **Public API** — every slice touched exports exactly what its consumers need through
   `index.ts`, and nothing more.

---

## Sources

| This document | Original |
|---|---|
| FSD choice + rejected CA clone; layers; the one rule; segments | `docs/legacy/architecture-next-js.md`; `home_manager_web/context/foundation/architecture.md` §Decision |
| The `app/` re-export, required empty root `pages/`, `middleware.ts` at root | the FSD Next.js guide, as applied in `home_manager_web` and `cv_tracker` |
| Static-export constraint list | current Next.js `output: 'export'` docs, verified 2026-08-30 |
| Browser-only SDK init / prerender hazard; shadcn alias collision; scope primitive | `cv_tracker/CLAUDE.md` "Frontend architecture" |
| Read `node_modules/next/dist/docs/`; the generated `AGENTS.md` block | the `nextjs-agent-rules` block Next writes into `AGENTS.md` |
| Component health rules | the Flutter presentation-health audit, re-expressed for React |
| Security headers in the hosting config (§5) | canon harvest 2026-10-14, from `buzzards_cms` — a static-export hosting block with no headers, found in review |

**Lesson from the revision history.** The seed template deferred `widgets` and `pages` as
"progressive adoption", and one project adopted all six layers up front while another deferred
`widgets`. Both were right — but only one **wrote down which** it had chosen, and the other's
agents had to infer the layer set from the folder listing on every task. The rule that survives
is therefore not "adopt all six" or "start small"; it is **state the adopted set in the project
guide**. The same revision history carried a harder lesson: a session provider first placed in
the `app` layer had to move to `entities/session`, because the layers *below* it consumed the
hook and FSD forbids importing upward. Placement follows the consumers, not the intuition that
"global things go on top".
