<!--
  SEED — installed once by /canon-install as docs/registry.md, or as docs/registry/next.md in
  a repository with more than one stack, then OWNED BY THE PROJECT.
  Unlike docs/canon/**, this file is yours to edit: /canon-update never overwrites it.
  Replace {{PLACEHOLDER}}s, prune rows that do not apply, add the project's own sets.
-->

# Buzzards Soft web — closed registries

> **Precedence.** hard rules + tie-breaks → `AGENTS.md` · how Next.js code is written →
> `docs/canon/` · **finite sets → this file** · why one decision is what it is → `docs/adr/` ·
> what we build → `context/foundation/`

**A convention is a generator; a registry is an enumeration.** Everything below is a **closed**
list: if a value is not printed here, it does not exist. Adding one is not a code change — it is
an ADR, then a row here, then the code.

This is the difference between "describe the naming convention" and "print the admissible set".
Only the second makes invention mechanically impossible.

---

## 1. Error kinds

The whole set. `kind` is what selects user-facing copy; the SDK's own message never reaches a
user (`docs/canon/next/errors.md` §2).

| Kind | Means | Typical origin |
|---|---|---|
| `network` | the request could not reach the backend | offline, timeout |
| `permission` | the backend refused the caller | security rules, expired session |
| `not-found` | the addressed document does not exist | lookup by id, stale link |
| `validation` | input violated a rule | schema parse, value object |
| `conflict` | a concurrent write lost | version / transaction conflict |
| `unknown` | unmapped — a gap in the boundary classifier | fallback |
| {{PROJECT_KIND}} | {{MEANS}} | {{ORIGIN}} |

> An agent adding a seventh kind because it "felt more specific" is the failure mode this table
> prevents. `unknown` in production is a signal to fix the classifier, not to add a kind.

## 2. Error decision table

*Situation → kind → what the user sees.* The copy is per project; the shape is not.

| Situation | Kind | Surface | User sees |
|---|---|---|---|
| A list read fails | `network` | error state + retry | {{COPY}} |
| A write is refused by rules | `permission` | inline banner on the form | {{COPY}} |
| A record opened from a stale link | `not-found` | empty-with-explanation, not an error page | {{COPY}} |
| A form value fails the schema | `validation` | inline field error, no banner | field message |
| Anything unmapped | `unknown` | toast | {{COPY}} — and it is a bug report |

## 3. Query-key namespaces

The second element of every key tuple. Keys are built **only** by an entity's exported factory
(`docs/canon/next/data.md` §2).

Shape: `[{{APP_ID}}, "<namespace>", scopeType, scopeId, …]`

| Namespace | Factory | Owning entity | Invalidated by |
|---|---|---|---|
| {{NAMESPACE}} | {{FACTORY}} | `entities/{{ENTITY}}` | {{WHICH_WRITES}} |

## 4. Routes and their rendering mode

Every route, with the mode it declares. A route whose mode is unstated is a defect
(`docs/canon/next/architecture.md` §5).

| Path | `src/pages` slice | Mode | Notes |
|---|---|---|---|
| {{PATH}} | {{SLICE}} | {{static \| force-static \| dynamic}} | {{NOTES}} |

### Routes that deliberately do not exist

An agent's strongest default is to supply what is missing. A **named absence** is the only thing
that reliably suppresses it.

- {{ROUTE_THAT_DOES_NOT_EXIST}} — {{WHY_NOT}}

### Endpoints that are not Next routes

Under a static export a "backend endpoint" is a hosting rewrite to a real function. List each
one, or an agent will add an API route that cannot run.

| Public path | Rewritten to | Where it lives |
|---|---|---|
| `/api/contact` | Cloud Function `contact` (region `europe-west1`), via `firebase.json` rewrite | `functions/` (separate Firebase codebase) |

## 5. Collections and document shapes

Every backend collection this app reads or writes, and who else writes it. A collection with a
second writer has a **contract**, not just a schema.

| Collection | Entity | Mapper | Other writers |
|---|---|---|---|
| {{COLLECTION}} | `entities/{{ENTITY}}` | {{MAPPER_PATH}} | {{OTHER_CLIENTS}} |

## 6. Environment variables

Every variable the app reads, with its failure mode when absent. `NEXT_PUBLIC_*` values are
visible in the browser — note which are secrets (they must not be `NEXT_PUBLIC_*` at all).

| Variable | Used by | Absent → | Secret? |
|---|---|---|---|
| {{VAR}} | {{MODULE}} | {{FAIL_CLOSED_BEHAVIOUR}} | no |

## 7. i18n namespaces

Only where the app is multilingual. Message files must stay **key-parallel** across locales, and
one locale is the **source of truth**; the rest are translations.

Source of truth: `pl` · Locales: `pl`, `en`, `sv` (`i18n/routing.ts`, `localePrefix: "always"`) · Parallelism enforced by:
`tests/unit/i18n-*-completeness.test.ts`

| Namespace | Owning slice / route |
|---|---|
| {{NAMESPACE}} | {{OWNER}} |

## 8. Shared component vocabulary

The closed list from `docs/design-system.md`, split into vendored primitives (regenerable by the
CLI, never edited in place) and house-owned components.

| Component | Vendored / house | Wraps |
|---|---|---|
| {{COMPONENT}} | {{WHICH}} | {{PRIMITIVE}} |

## 9. Deliberately absent

Project-level negative space: features, screens and integrations that are **not** being built,
so nobody goes looking and nobody helpfully adds one.

- {{THING}} — {{WHY_NOT}}

## Sign-in

**sign-in: none yet** — `no row yet`
