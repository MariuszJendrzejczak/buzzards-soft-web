---
scope: canon
stack: next
supersedes: none — first ratification of the web error contract
created: 2026-08-30
---

# Canon — Next.js error handling

> **Precedence.** hard rules + tie-breaks → `AGENTS.md` · how Next.js code is written in this
> house → `docs/canon/next/*` · finite sets → `docs/registry.md` · why one decision is what it
> is → `docs/adr/` · what we build → `context/foundation/`
>
> **Vendored — read-only.** Departures go in `docs/canon-deviations.md`.

**Not a derived document.** Unlike its Flutter counterpart, this contract is **newly ratified**:
the house's Next.js repos handled errors ad hoc — `try` / `catch` wherever a call happened, with
the raw SDK message shown to the user. Sections 1–3 are therefore a *decision*, not a
restatement, and they are deliberately lighter than the Flutter model: React does not get a
sealed `Failure` hierarchy, because nothing here needs exhaustiveness checking. What it needs is
a **boundary** and a **closed set of user-facing kinds**.

---

**Shared principles.** The boundary rule (**P4**), "the user never sees an internal message"
(**P5**) and the documented swallow (**P6**) live once in `docs/canon/principles.md`. Sections
1, 2 and 4 below are their Next.js form — the classifier, the copy path, the `catch`.

---

## 1. The three tiers

| Tier | Speaks | Rule |
|---|---|---|
| **SDK / network** | thrown errors, `error.code` strings | Firebase, `fetch`, file APIs throw whatever they throw |
| **`api` segment** | translation | the *only* place an SDK error becomes an app error |
| **`model` / `ui`** | app errors | never inspects an SDK error code, never reads `error.message` |

**A raw SDK error must not cross the `api` boundary. Price: rejected review.**

The `api` segment catches, classifies, and rethrows (or returns) an app error carrying a **kind**
from the closed set in `docs/registry.md`. The kind is a plain string union — no class
hierarchy, no `instanceof` ladder:

```ts
export type AppErrorKind = "network" | "permission" | "not-found" | "validation" | "conflict" | "unknown";

export class AppError extends Error {
  constructor(readonly kind: AppErrorKind, message: string, readonly cause?: unknown) { super(message); }
}
```

`message` is a **developer** string for logs. It is never rendered.

---

## 2. The user never sees an SDK message

```ts
// WRONG — and this exact form ships in a live repo
toast.error("Could not add application", {
  description: error instanceof Error ? error.message : String(error),
});
```

Three costs, all real:

- it leaks internals (collection paths, rule names, sometimes an identifier) into the UI;
- it is untranslatable — the string arrives from the SDK in the SDK's language;
- it tells the user nothing actionable, because SDK copy is written for the developer.

**Rule: user-facing copy is chosen by the error's `kind`, from the project's error decision
table** (`docs/registry.md`: *situation → kind → what the user sees*). The original error is
`console.error`-ed with its cause chain, once, at the boundary that classified it.

A `kind` with no row in that table is not renderable — add the row, or classify it as `unknown`
and accept the generic copy.

---

## 3. Three surfaces, chosen by recoverability

| Situation | Surface |
|---|---|
| a read failed and can be retried | an error state **with a retry action**, in place of the content |
| a write failed | an inline banner or toast on the form that attempted it — the form stays filled |
| a field violated a rule | an inline field error, **no banner** |

**A failed write never clears the user's input. Price: rejected review.** Resetting a form on
the error path destroys work the user can no longer recover.

Empty state and error state are **different components**. "No data" rendered as an error teaches
users to distrust the app; an error rendered as "nothing here" hides a fault.

---

## 4. A deliberate swallow is documented, or it is a bug

Swallowing is sometimes right — a secondary cleanup must not abort a primary operation:

```ts
try {
  await deleteObject(ref(storage, record.cvAttachment.path));
} catch (error) {
  // A missing object is expected (already deleted). Any other Storage failure is
  // logged but must NOT abort the doc delete: the record is the source of truth,
  // a stray object is a lesser, retryable harm.
  if (!hasCode(error) || error.code !== STORAGE_OBJECT_NOT_FOUND) {
    console.error("Failed to delete CV object during record delete", error);
  }
}
```

The rule is not "never swallow". It is: **a `catch` that does not rethrow carries a comment
stating which failure it absorbs and why that is safe.** A silent empty `catch` is a finding.

---

## 5. Security rules are the gate; the UI check is a mirror

Where access control exists on both sides — a security rule and a client-side check — **the
server rule is authoritative and the client check is a convenience mirror**. The mirror:

- **fails closed.** A missing or empty env value denies access; it never defaults to allow.
- is **tested for its closed default**, not only its happy path.
- never becomes the only gate. If the rule is missing, adding a UI check does not fix it.

Any client-side check reading a `NEXT_PUBLIC_*` value is visible to the user and editable in the
browser. It shapes the UI; it protects nothing.

- **Security — a blanket rule is narrowed in the change that lands the first collection under
  it.** A rule that admits everything under a path is a placeholder; the change that adds the
  first collection there replaces it with that collection's rule and its rules tests, and a
  comment promising to narrow it later is not a plan. **Isolation is the rule's, never the
  path's:** a scope id the client puts into a path is a value the client chose, and only a rule
  that checks it against the caller isolates anything. A hosted datastore is reachable from
  outside from the day it exists, so this binds from then, sign-in or not (`docs/canon/README.md`
  → *A security rule that depends on who the caller is binds from sign-in*). **Price: rejected
  review.**
- **Security — a live datastore is never seeded through the browser SDK.** Seed data goes into
  the emulator, or into the live datastore through a separate script with an explicit
  credential, run by the developer. *Why:* the browser SDK under a script carries no signed-in
  user, so the committed rules refuse it, and the only way to make it pass is to loosen the
  published rules for everyone; a test against an in-memory fake never sees the refusal.
  **Price: rejected review.**

---

## 6. Error boundaries and the framework's own surfaces

Next's `error.tsx` / `global-error.tsx` are the **last** resort, not the error strategy: a
render that throws has already lost the user's context. Handle expected failures in `model`,
and let the boundary catch only genuine bugs.

Under a static export, an unhandled error at build time (a mapper throwing on a malformed
fixture, an SDK initialized at module scope) fails the **build**, not a request. That is a
feature: the failure is loud and early. Do not "fix" it with a `try` / `catch` around the
initialization — fix the initialization (`architecture.md` §6).

---

## Review checklist

- [ ] No SDK error object or `error.message` reaches a component or user-facing string.
- [ ] Every thrown app error carries a `kind` from the registry's closed set.
- [ ] Every `kind` shown to a user has a row in the error decision table.
- [ ] A failed write leaves the form filled.
- [ ] Every non-rethrowing `catch` says what it absorbs and why.
- [ ] Client-side access checks fail closed and are tested for it.
- [ ] No blanket rule over a path that now holds a collection; no seed through the browser SDK.

---

## Sources

| This document | Original |
|---|---|
| The `api`-boundary rule; three tiers | the Flutter canon's three-tier model, re-expressed for React |
| The leaked-SDK-message anti-pattern | `cv_tracker` `features/add-application/model/use-add-application-form.ts` |
| The documented deliberate swallow | `cv_tracker` `entities/application/api/delete-application.ts` |
| Rules-authoritative / UI-mirror-fail-closed | `cv_tracker` owner lock (NFR-01) + its emulator rules tests |
| Error decision table shape | `docs/canon/seeds/registry.next.template.md` §2 |
| Narrowing a blanket rule; isolation is the rule's; no seed through the browser SDK (§5) | canon harvest 2026-10-14, from `buzzards_cms` — a placeholder rule left after its collection landed, and a seed script that could only pass with the rules loosened |

**Lesson carried forward.** The Flutter canon's error document exists because an always-on file
published a mapping its own cited ADR called wrong, and every agent that read it wrote broken
code. The Next.js repos had the milder version of the same disease: **no** published mapping at
all, so every author invented one at the call site, and the inventions converged on the worst
option — showing the SDK's own words to the user. An absent contract is not neutral; it is a
contract that says "improvise", and improvisation is not reviewable.
