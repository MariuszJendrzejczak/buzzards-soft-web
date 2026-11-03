---
scope: canon
stack: next
supersedes: docs/legacy/architecture-next-js.md §"Data layer"
created: 2026-08-30
---

# Canon — Next.js data layer (TanStack Query)

> **Precedence.** hard rules + tie-breaks → `AGENTS.md` · how Next.js code is written in this
> house → `docs/canon/next/*` · finite sets → `docs/registry.md` · why one decision is what it
> is → `docs/adr/` · what we build → `context/foundation/`
>
> **Vendored — read-only.** Departures go in `docs/canon-deviations.md`.

**Derived document.** Orders decisions already taken; changes none of them. This is the web
counterpart of `docs/canon/flutter/architecture.md` decisions #3, #6 and #8 — the same
questions (who owns server state, how does a write reach another screen, how do reads stay
consistent), answered in the grain of React.

**Shared principles.** Rules that hold on more than one stack live **once**, in
`docs/canon/principles.md`; this file carries their Next.js form. §1 here is the React form of
**P7** (one owner per fact).

---

## 1. Server state belongs to TanStack Query. Client state does not.

| State | Owner |
|---|---|
| anything that came from, or goes to, the backend | TanStack Query |
| session / active scope | one provider in `entities/session` |
| form input, open dialogs, selected filter, search text | local component state |
| derived domain values | the slice's `model`, computed from query data |

**Never mirror server data into `useState` and keep it in sync by hand** (`principles.md` P7). A
`useEffect` that copies query data into local state is the React shape of the same bug the
Flutter canon bans `ref.invalidate` for: two owners of one fact, drifting.

Query hooks live in a slice's **`model`** segment and call that slice's (or the entity's)
**`api`** segment. A component never calls the backend SDK directly, and `api` never imports
React.

---

## 2. Query keys are an entity's public API — not a feature's private detail

**The rule.** For each entity, a **key factory** lives in the entity slice and is exported
through its `index.ts`:

```ts
// entities/category/model/query-keys.ts  → exported from entities/category
export const categoryKeys = {
  all:    (scope: Scope)            => [APP_ID, "categories", scope.scopeType, scope.scopeId] as const,
  detail: (scope: Scope, id: string) => [...categoryKeys.all(scope), id] as const,
};
```

**Why it must be the entity and not the feature.** A write in one feature routinely has to
invalidate another entity's cache — a cascade, an unlink, a counter. FSD forbids importing a
sibling `features/*` slice. If the key factory lives in a feature, the only remaining options
are both bad: import sideways (a rejected review), or **re-declare the other key's prefix
locally with a "must stay in sync" comment** — a duplicated literal with no mechanism to keep
it true.

Because `entities` sits **below** `features`, a key factory placed there is importable by every
feature, downward, legally. The layering already had the answer; the mistake was putting the
value on the wrong layer.

**Hand-written key literals outside a factory are forbidden. Price: rejected review.** That
includes the "no data yet" placeholder — see §3.

**Security — every key carries its tenancy scope.** The scope is part of the key, never a
module-level variable, so the cache can never serve one tenant's data to another. A key
without its scope is a data-leak bug, not a caching inefficiency.

**Keys are prefix-invalidatable and ordered general → specific.** TanStack matches by prefix
with `exact: false` (the default), so `invalidateQueries({ queryKey: categoryKeys.all(scope) })`
reaches every detail query beneath it. Design the tuple so the invalidation you need is a
prefix of the keys you want to hit.

---

## 3. Guard the query, do not fake the key

A query that depends on a not-yet-resolved session must not fire:

```ts
const scope = useActiveScope();
return useQuery({
  queryKey: categoryKeys.all(scope),   // factory, always
  queryFn:  () => fetchCategories(scope!),
  enabled:  !!scope?.scopeId,          // the guard
});
```

`enabled` is the mechanism. A hand-written placeholder key (`["app", "categories", "nil"]`) to
satisfy the type checker while the query is disabled re-introduces exactly the literal §2 bans,
in the one place nobody reviews. Make the factory accept the nullable scope, or derive the
disabled key from the factory — never type a new tuple.

---

## 4. Mutations: invalidate on settle, and name every cache you touched

The default write:

```ts
useMutation({
  mutationFn: (input) => createCategory(scope, input),
  onSettled: () => queryClient.invalidateQueries({ queryKey: categoryKeys.all(scope) }),
});
```

- **`onSettled`, not `onSuccess`.** A failed write may still have partially landed; refetching
  on both paths is what makes the cache honest.
- **A write that touches a second entity invalidates that entity's cache too**, through *its*
  exported factory. A cascade that rewrites referencing documents and invalidates only its own
  entity leaves a stale list on another screen — the web version of the stale-screen bug the
  Flutter canon's decision #6 exists to kill.
- **The cascade itself lives in the feature**, not in `entities/<x>/api` — an entity must not
  import a sibling entity (see `architecture.md` §7).

---

## 5. Optimistic updates — the full ritual or none of it

Reordering, toggling, and anything where the UI must not wait:

1. `cancelQueries` on the key — otherwise an in-flight refetch lands *after* the optimistic
   write and silently reverts it;
2. snapshot the previous value;
3. `setQueryData` with the optimistic value;
4. **`onError` → restore the snapshot**;
5. **`onSettled` → invalidate**, so the server has the last word.

**A partial ritual is worse than no optimism.** Skipping (1) produces a flicker-revert that
reproduces one time in ten; skipping (4) leaves the UI permanently showing a write that failed.
If a mutation is not worth all five steps, let it be pessimistic.

---

## 6. Reads are request/response until the product asks for live

`getDocs`-style reads fit TanStack Query directly. **Realtime subscriptions (`onSnapshot`) are
not queries** — they are subscription hooks that push into the cache; wiring a subscription into
`queryFn` gives a hook that resolves once and then lies.

Live sync is added **when the product requires it**, and the requirement is recorded in
`context/foundation/`. "Reasonable-delay sync" in a PRD means request/response; an agent
upgrading it to realtime on its own initiative is adding cost and a connection lifecycle nobody
asked for.

---

## 7. The `api` segment is the single (de)serialization boundary

One mapper per entity, in `entities/<x>/api`, in both directions:

- **Never trust the stored document.** Coerce every field with an explicit type check and a
  documented default; a malformed field is a data error, not a render crash.
- **Security — the mapper owns the wire format; the caller owns the scope.** Scope fields are
  stamped by the scope primitive in `shared/api`, not by the mapper.
- **Security — a key from data never reaches the object machinery.** Code that builds an object
  from keys or paths found in data — unflattening `"a.b.c"`, merging a stored patch — rejects
  `__proto__`, `constructor` and `prototype` as a key or a path segment, and its test feeds one
  and asserts the refusal (`principles.md` P18). *Why:* one such key assigns onto
  `Object.prototype`, and from then on every object in the running app carries a field another
  writer chose. **Price: rejected review.**
- **Security — a path segment from input is checked where the path is built**
  (`principles.md` P19). The one function in `api` that builds a document path refuses a
  segment from input that contains `/`, is `.` or `..`, or matches `__.*__`, and its test feeds
  each and asserts the refusal. *Why:* a `/` in an id moves the write into another collection,
  and a check at a form is skipped by the next script. **Price: rejected review.**
- **Security — a value copied into a document is readable by everyone that document lets in**
  (`principles.md` P20). The security rule is per document, not per field: a denormalized field
  carries only what the whole audience of the document it lands in may see.
- **Where a second client writes the same collection** — a mobile app, a CLI, a function — the
  mapper's field rules are a *contract*, and the source of that contract is named in the file
  header. A silent divergence here corrupts data for the other client, and the tests on this
  side stay green.
- **One validation contract per record shape.** When a record can be created from more than one
  entry path (a form and a script, say), both consume the *same* schema + mapper from the entity
  slice. Two entry paths with two schemas will drift; it is only a question of when.

---

## 8. Query client configuration is app-level and explicit

The `QueryClient` is created once in the FSD `app` layer and its defaults (`staleTime`,
`retry`, refetch-on-focus) are set there deliberately. Defaults chosen by silence are still
choices — and under a static export with a browser SDK, an aggressive refetch policy is a bill.

---

## Review checklist

- [ ] No query key literal outside an entity's key factory — including disabled-query keys.
- [ ] Every key carries its tenancy scope.
- [ ] Every cross-entity write invalidates the other entity's cache via *its* factory.
- [ ] No re-declared key prefix with a "keep in sync" comment.
- [ ] Optimistic updates do all five steps, or none.
- [ ] No server data mirrored into `useState`.
- [ ] `api` mappers coerce every field and import no React.
- [ ] Code that builds objects from data keys rejects `__proto__`, `constructor`, `prototype`, and a test proves it.
- [ ] Every document path is built in one `api` function that refuses a bad segment from input.

---

## Sources

| This document | Original |
|---|---|
| React Query as the server-state layer; hooks in `model` calling `api`; `onSnapshot` is not a query | `docs/legacy/architecture-next-js.md` §"Data layer" |
| Scoped key factories, `enabled` guard, cross-entity invalidation, the reorder cascade | `home_manager_web` `features/*/model/*` |
| Prefix matching semantics; the cancel → snapshot → rollback → invalidate ritual | TanStack Query v5 docs, verified 2026-08-30 |
| Coerce-every-field mapping; single validation contract across entry paths | `home_manager_web` `entities/*/api/*`; `cv_tracker` `entities/application` |
| A key from data never reaches the object machinery (§7) | canon harvest 2026-10-14, from `buzzards_cms` — an unflatten codec that assigned onto `Object.prototype` |
| A path segment from input is checked where the path is built (§7) | canon harvest 2026-10-14, from `buzzards_cms` — an id interpolated into a path unchecked; the forbidden forms from the Firestore documentation, *Best practices* / *Usage and limits* |
| A copied value is readable by the whole document's audience (§7) | canon harvest 2026-10-14, from `neatu` — `principles.md` P20 |

**Lesson from the revision history.** A live repo hit §2 the hard way. Its key factories were
written inside `features/<x>/model/queryKeys.ts`. Then a delete cascade in the *category*
feature had to invalidate the *product* cache — and because FSD forbids importing the sibling
feature, the author re-declared the product key prefix locally, with a comment reading *"must
stay in sync with `features/product-crud/model/queryKeys.ts → productKeys.all`"*. That comment
is the whole finding: a correctness-critical literal duplicated with a human promise as its only
enforcement, in a codebase whose entire architecture exists to make such couplings impossible.
The rule above — **key factories are entity-layer, exported, imported downward** — dissolves the
problem instead of documenting it. Seeing a re-declared key prefix, or a "keep in sync" comment
on any cache key, is a finding, not a style preference.
