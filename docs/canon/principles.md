---
scope: canon
stack: any
supersedes: the per-stack restatements previously duplicated in flutter/* and next/*
created: 2026-08-30
---

# Canon — principles that hold on more than one stack

> **Precedence.** hard rules + tie-breaks → `AGENTS.md` · **principles that hold on more than one stack →
> this file** · how a stack writes them down → `docs/canon/<stack>/*` · finite sets →
> `docs/registry.md` · why one decision is what it is → `docs/adr/` · what we build →
> `context/foundation/`
>
> **Vendored — read-only.** Departures go in `docs/canon-deviations.md`.

**This file is the single home of every rule that is true on more than one stack.** A stack
document never re-argues a principle from here — it states the **concrete form** the principle
takes in that language, and links back. One statement, one price, one place to change it.

*Why one place and not two vocabularies:* a principle restated per stack drifts the moment one
copy is edited, and nothing detects it. The house has already paid for that once — an always-on
file and the ADR it declared canonical published contradictory error-mapping rules for months.
The concrete *check* varies by stack; the *rule* does not, and the rule is what a review argues
about.

**How to read the stack lines:** the principle is binding. Under each one, `**Applies to:**`
names its scope, and a list names, one item per stack, where a stack has written the principle's
mechanical form — that is where you look for the code shape, not for permission.

| Scope | Where the principle binds |
|---|---|
| every stack | everywhere, including a stack that is not an application |
| application stacks | every stack that builds a program a project runs or ships |
| stacks with a view layer | every stack that renders what a person sees |

**A stack outside the scope is never listed, and nothing is missing:** the principle has nothing
to bind there. **A stack inside the scope and not listed has written no form of its own:** the
principle binds it as stated here.

Which stack is of which kind is stated once, in this table; no other file repeats it.

| Stack | Canon directory | Application stack | View layer |
|---|---|---|---|
| Flutter | `flutter/` | yes | yes |
| Next.js | `next/` | yes | yes |
| .NET | `dotnet/` | yes | no |
| PostgreSQL | `postgres/` | no | no |

---

## P1 — The view layer computes nothing domain-level

Validation, routing decisions, catalog lookups, multi-step atomicity, and computed **domain**
flags belong below the view. The view consumes ready-to-render values.

**Permitted, so the rule does not over-trigger:** render guards, layout and animation state, and
narrowing driven purely by transient UI state (search text, selected filter or sort). A computed
domain flag — "low stock", "can move", "is overdue" — is **not** UI state.

*Why:* a domain rule evaluated in a view is untestable without rendering, and it is invisible to
every other surface that needs the same answer. **Price: rejected review.**

**Enforced by a guard, not by review.** A stack's mechanical form of this rule is a list of code
shapes, and a guard in the gate refuses each of them, with one refusing case per shape (P18). A
breach review finds and the guard missed is a missing shape: it is added to the list, not
argued case by case. A rule left to review held only while somebody looked, and an unattended
run with review skipped never looks.

**No structural exception.** No region, folder, file, annotation or comment makes logic in a
view legitimate. A debug or profiling screen is a view. A place set aside to keep view logic
"visible" keeps it in the view. The only tolerated breach is one the guard already found on the
day it was introduced: it is listed by file and shape, the list can only shrink, a listed file
gains no further breach, and the change that empties the list is scheduled when the list is
written.

**Applies to:** stacks with a view layer.

- Flutter → `flutter/architecture.md` §Presentation health — no logic in a view; the guard is
  `flutter/testing.md` → *The presentation guard*
- Next.js → `next/architecture.md` §9 — no logic in a component

## P2 — No O(N) work on the render path

Aggregates, ordering and counts are computed where the data changes and handed to the view
ready. Recompute is memoized off the render body; formatting is windowed to visible rows. Where
a derived value must survive a reload it is persisted as a read model.

*Why:* render-path cost is paid on every frame or every re-render, including the ones that
changed nothing.

**Applies to:** stacks with a view layer.

- Flutter → `flutter/architecture.md` §Presentation health
- Next.js → `next/architecture.md` §9

## P3 — A reusable view component is promoted before a second copy exists

Not after the third. The promotion adds it to the project's component vocabulary in
`docs/design-system.md`.

*Why:* the second copy is where divergence starts, and the divergence is discovered by a
designer, not a compiler.

**Applies to:** stacks with a view layer.

- Flutter → `flutter/design-system-method.md` §5 → `lib/shared/presentation/widgets/`
- Next.js → `next/design-system-method.md` §6 → the shared kit

## P4 — One translation boundary; an infrastructure error never crosses it

Exactly one layer turns a platform/SDK/network error into the application's own error type.
Above it, nothing inspects an SDK code, a status number, or a driver message.

*Why:* a leaked infrastructure error couples the UI to a dependency's release notes. **Price:
rejected review.**

**Applies to:** application stacks.

- Flutter → `flutter/errors.md` §1 — the repository boundary, `Exception` → sealed `Failure`
- Next.js → `next/errors.md` §1 — the `api` segment, thrown error → `AppError` `kind`
- .NET → `dotnet/errors.md` §The translation boundary is `Infrastructure` — a driver exception →
  `Error`

## P5 — The user never sees an internal error message

User-facing copy is chosen from the project's **error decision table** (`docs/registry.md`:
*situation → error kind → what the user sees*). The original error is logged once, with its
cause, at the boundary that classified it.

*Why:* internal messages leak identifiers and paths, cannot be translated, and are written for
the developer. **Price: rejected review.**

**Applies to:** application stacks.

- Flutter → `flutter/errors.md` §Reaching the user
- Next.js → `next/errors.md` §2
- .NET → `dotnet/errors.md` §Codes — the backend sends codes, never copy

## P6 — A non-rethrowing `catch` says what it absorbs and why

Swallowing is sometimes right — a secondary cleanup must not abort a primary operation. The rule
is not "never swallow"; it is that the absorbed failure and the reason it is safe are written
down at the `catch`. A silent empty `catch` is a finding.

**Applies to:** application stacks.

- Flutter → `flutter/errors.md` §Checklist
- Next.js → `next/errors.md` §4
- .NET → `dotnet/errors.md` §Three smaller rules

## P7 — One owner per fact; never mirror shared state into a second owner

Cross-screen and server-derived state has exactly one source of truth, and every consumer
subscribes to it. Copying it into a second store — a second controller, local component state, a
hand-maintained cache — creates two owners and they drift.

*Why:* it removes the entire class of bugs where one screen shows what another already changed.
**Price: rejected review.**

**Applies to:** application stacks.

- Flutter → `flutter/architecture.md` #6 — the local cache is the SSOT; `ref.invalidate` for
  cross-screen sync is forbidden
- Next.js → `next/data.md` §1 — TanStack Query owns server state; no `useState` mirror

## P8 — A closed registry is an enumeration, not a convention

If a value is not printed in the project's registry, it does not exist. The registry is
`docs/registry.md`; in a repository with more than one stack that file is an index, and the
registry is the index together with every file it points at, one per stack,
`docs/registry/<stack>.md` — a reader reads all of them. Adding one is an ADR, then a
row, then the code. This is what makes invention mechanically impossible rather than merely
discouraged.

*Why:* a convention is a generator — it tells an agent how to *make up* a value that looks
right. An enumeration does not.

**The code enforces it where the value is written.** A registered set is checked at the
constructor or writer that puts it into a persisted or compared artifact — a closed type, or a
membership check against the registered values — never by a non-empty check on a free string.
Tests that pin such an artifact use registered values only; a fixture with an invented value
teaches the next reader the wrong vocabulary. **Price: rejected review.**

**And it is enumerated once.** Any set that can grow — registry values, files a tool installs,
entries a README describes — has exactly one list. Every other place that needs the set is
generated from that list (a glob, a prefix rule, a script) or points at it; it never carries a
partial copy. Where two lists cannot be avoided, a change to one is a change to both in the same
commit, and a list that *removes* things fails safe by keeping what it does not recognise, never
by pruning whatever it omits.

*Why:* a partial copy reads as complete, so nobody extends it, and it rots silently. When the
second copy is the one that deletes, an item can be added correctly and then removed by the next
mandatory step. **Price: rejected review; a pruning list with no keep-default is a defect, not a
style point.**

**Applies to:** every stack.

- Flutter → `Failure` cases, use-case verbs, storage keys, region labels, routes
- Next.js → error kinds, query-key namespaces, routes + rendering mode, collections, env vars,
  i18n namespaces
- .NET → error codes, handler verbs, libraries shared with another toolchain
- PostgreSQL → `postgres/schema.md` §5 — a value set is a named `CHECK`, the same set as the
  registry's · `postgres/access.md` §2 — grants come from default privileges, never from a line
  per table

## P9 — Design values live in one token layer; nothing outside it carries a literal

Colours, radii, elevations and type steps are declared once, in one place, each with its origin
documented. A view reaches them through the token mechanism, never as a literal, and derived
shades are computed **in** the token layer.

**The method is house; the values are project** — the values live in the project's
`docs/design-system.md`. **Price: rejected review.**

**Applies to:** stacks with a view layer.

- Flutter → `flutter/design-system-method.md` §1–§2 — `AppColors` + `AppTheme`
- Next.js → `next/design-system-method.md` §1–§2 — CSS custom properties + `@theme`

## P10 — Domain semantics are named for the domain and computed outside the view

A colour, icon or label that encodes a **domain** meaning (a stock level, a risk band, a sync
state) gets its own named semantic — not a reused palette slot, not a literal. The view **shows**
the semantic; the classification is produced below it. The domain→visual mapping is one table in
one place, never a `switch` scattered across views.

*Why:* it is what makes a theme variant a one-file change, and it is P1 seen from the design
side.

**Applies to:** stacks with a view layer.

- Flutter → `flutter/design-system-method.md` §3, §6 — `ThemeExtension` + the icon table
- Next.js → `next/design-system-method.md` §4, §7 — domain tokens + the mapping table

## P11 — The shared component vocabulary is a closed, named list

Shared view components are enumerated by name in `docs/design-system.md`. Two features cannot
invent two names for one control. Adding to the vocabulary is a deliberate act, not a side
effect of building a screen. Adding a screen should reduce to: pick from the vocabulary, shape
the data below, compose.

**Applies to:** stacks with a view layer.

- Flutter → `flutter/design-system-method.md` §5
- Next.js → `next/design-system-method.md` §6 (+ vendored primitives listed separately)

## P12 — Mock at the contract boundary, never at your own function

Tests substitute the **dependency's** seam — the repository interface, the SDK module — and let
the code under test really run. Mocking the unit under test proves the mock works.

The corollary: a dependency that cannot be substituted is a **design defect**, not a testing
inconvenience.

**Applies to:** application stacks.

- Flutter → `flutter/testing.md` — `mocktail` against the contract; `ProviderScope(overrides:)`
- Next.js → `next/testing.md` — mock `firebase/*` or `fetch`, let the mapper run
- .NET → `dotnet/testing.md` §Tools — NSubstitute against the house's own ports

## P13 — E2E is black box

End-to-end specs drive visible UI and assert visible output. They never import production
modules and never inspect internal state. An E2E test that reaches inside is a slow, flaky unit
test wearing the wrong hat.

**Applies to:** application stacks.

- Flutter → `flutter/testing.md` §End-to-end
- Next.js → `next/testing.md` §End-to-end
- .NET → `dotnet/testing.md` §End-to-end — the public surface stands where visible UI does

## P14 — An un-run gate is never "green"

Verification is the ordered command list in the project's `docs/gates.json`, and a report names
**which** commands actually ran. Reporting a skipped gate as passing is a worse failure than a
red gate, because it spends the reviewer's trust instead of their time.

**Applies to:** every stack.

- Flutter → `flutter/testing.md` §The verification gate (note: the lint sweep is user-only there)
- Next.js → `next/testing.md` §The verification gate (note: lint **is** a gate there)
- .NET → `dotnet/testing.md` §The verification gate (note: the build **is** the lint there, with
  the analysis settings of `dotnet/architecture.md` decision 6)

## P15 — "Green" means the declared gate ran, unweakened, and passed

P14 governs the **report**: do not claim an un-run gate passed. P15 governs the **repair**: do
not change the measure in order to pass it. An agent's job is to make the work satisfy the
gate, never to make the gate satisfiable by the work.

Seven surfaces in this pipeline can be cheated, and all of them are closed:

| # | Surface | The cheat it forbids |
|---|---|---|
| 1 | a **test** | deleting, skipping, `xfail`-ing, loosening an assertion, or narrowing a suite so a failure stops being observed |
| 2 | the **report** | claiming a command ran, or omitting one that did not — P14's failure, restated here as its sibling |
| 3 | the **gate** (`docs/gates.json`) | removing or weakening an entry in `validation.commands`, or moving a failing command into `userOnly` to put it out of reach; writing, widening or narrowing `validation.scoped` — the per-area gate a runner may run after a phase, which only the developer declares and which never stands in for the full gate before a slice is declared ready; writing or changing `e2e` — whether the project runs E2E flows and how |
| 4 | the **plan**, everywhere except `## Progress` | editing any region of `plan.md` — a `### Success Criteria` bullet, an `## Overview`, a `**Contract**` — so that the work already satisfies it. `## Progress` is the **only** region any agent may mutate; a criterion or contract that turns out to be wrong is a `### Deviation` appended to `change.md`, never a rewrite of the plan |
| 5 | **`## Progress`** | flipping a row to `[x]` that was not satisfied — in particular a `#### Manual` row no human confirmed |
| 6 | a **review finding** | recording `DISMISSED` without a human choosing it. Under P15 a finding is fixed or escalated; "not applicable" is a human's call, not an agent's |
| 7 | the **review gate** (`docs/gates.json` → `review`) | removing a lens from `review.lenses`, or setting `review.adjudicator: false`, so a review reports less. `review` is developer-owned: an agent may read it and must never write it. Surface 3's sibling — 3 weakens what *verifies* the work, 7 weakens what *reviews* it |

**Narrowing where a measure applies is changing the measure.** An exclusion, a carve-out or a
waiver scoped "just for this case" is a change to the gate even when no tool is touched. It is
written as the list of everything it now admits — not as the case that motivated it — each item
is checked against the original rule's reason, and the report says which way the number moved
and by how much. An exemption argued from its clearest case and worded broadly enough to admit
others drifts toward the flattering number, because that is the direction its author had no
reason to check.

A gate that an agent may edit is not a gate — it is a note the agent left itself. This is the
precondition for every autonomous mode in this workflow: an agent may resolve findings and push
a branch unattended **only** because it cannot reach the measure.

*Why:* the measure and the thing measured must not share an owner. Every one of them is a
change that makes a red signal green while the underlying defect is untouched, and each is
individually defensible in the moment ("that test was flaky", "that criterion was unrealistic")
— which is exactly why the rule is stated once and absolutely rather than judged case by case.
**Price: the change is reverted and the run is treated as not having verified anything.**

**P15 may not appear in `docs/canon-deviations.md`.** It is the one principle no project may
relax, because a repo-local deviation from it would silently re-open every surface above — and
the deviations file is read by the same agents the rule constrains. `/canon-update` refuses an
update whose deviations file names it.

**Applies to:** every stack.

- Flutter → `flutter/testing.md` §The verification gate · `shared/EXECUTION_RULES.md` (in a
  consuming repo: `.claude/framework/EXECUTION_RULES.md`) §Build / test / lint posture
- Next.js → `next/testing.md` §The verification gate · `shared/EXECUTION_RULES.md` (in a consuming
  repo: `.claude/framework/EXECUTION_RULES.md`) §Build / test / lint posture
- .NET → `dotnet/architecture.md` decision 6 — a suppressed warning narrows the gate ·
  `dotnet/testing.md` §What must have tests — no coverage threshold

## P16 — A check asserts what the consumer receives, never a proxy its author controls

A verification inspects the value that actually reaches its consumer — the deployed artifact,
the payload as sent, the evidence as recorded — not the source text that produces it, not a
local stand-in for the real backend, and not a copy the checked process could have rewritten.
When the real thing cannot be reached, the check says so and is reported as not run.

Four shapes of the same failure, each of which passes while the property it guards is false:

| Proxy | What it cannot see |
|---|---|
| the **text** of the implementation (a grep over the file that does the work) | what the code computes or forwards at run time |
| a **stand-in** for the real system (a rules file in an emulator, a fake datastore, a stale build output) | what the deployed system does with the same input |
| **evidence the checked step may overwrite** (a regenerating command defaulting onto the artifact a later comparison reads) | anything at all — the comparison is of the output with itself |
| a **piece called outside the path that wraps it** (a hook the framework invokes, an applier behind the one endpoint that reaches it) | what the path does before and after it — a branch the framework answers first, a write the path adds |

*Why:* each proxy is cheaper than the real thing and agrees with it on the happy path, so the
check stays green exactly until the divergence that it existed to catch. That divergence then
surfaces late — at a device gate, in CI, in production — where it is most expensive.
**Price: a check run on a proxy counts as not run (P14), and a criterion written against one is
a criterion defect — recorded as a deviation under P15, never ticked as passing.**

**Applies to:** every stack.

- Flutter → `flutter/testing.md` §The verification gate
- Next.js → `next/testing.md` §What "tests pass" may not mean
- .NET → `dotnet/testing.md` §Tests that need an external runtime · `dotnet/architecture.md`
  decision 5
- PostgreSQL → `postgres/migrations.md` §6 · `postgres/querying.md` §3 · `postgres/access.md` §1,
  §5 — an empty table, an empty database and a connection as owner or superuser are stand-ins

## P17 — A reported defect is reproduced as a failing test before it is fixed

The test is written first, is observed red for the reported reason, and the fix is what turns it
green. The test stays: it is the regression guard for the defect it reproduced.

**Permitted, so the rule does not over-trigger:** a defect no automated test can reach —
rendering, feel, a device-only path — is reproduced as a written step that says what to do, what
a pass looks like and what the failure looks like, recorded before the fix. A typo or a copy
correction needs neither.

*Why:* a fix with no reproduction is verified against the author's reading of the report, not
against the report. The red run is the only moment the test is known to detect this defect — a
test written after the fix has only ever been seen green. **Price: a fix with no reproducing test
is not verified as fixing the reported defect, and is a review finding.**

**Applies to:** every stack.

- Flutter → `flutter/testing.md` §A defect starts as a failing test
- Next.js → `next/testing.md` §A defect starts as a failing test
- .NET → `dotnet/testing.md` §A defect starts as a failing test

## P18 — Every rule a guard enforces has a test that fails when that rule is broken

A guard — a validator, an access policy, a constraint, a check in a gate script — is tested rule
by rule: for each rule it enforces, one case it must refuse because of that rule, so the test
goes red when that one rule is inverted or removed. A guard with branches (`OR` in a policy, a
list of conditions) gets an accepting and a refusing case per branch, and a case named
"accepted" asserts the effect — the row changed, the value was stored — not only that nothing
threw.

**A setting a document calls a gate is a guard too.** A compiler, analyzer or lint setting
counts as a gate only once one rule it governs has been seen failing the build, and the
document that says it enforces something names every file that enforcement needs. A setting's
name promises more than its defaults deliver: a switch that turns a check on can leave every
rule under it below the severity that fails anything.

*Why:* a guard is tested on the input its author had in mind, and that input passes a guard that
accepts everything. The suite then stays green through the one change it existed for — a rule
lost in a refactor, a branch that stopped matching — and the guard is trusted on evidence that
never touched it. **Price: a guard whose rules have no refusing test is untested, and is a review
finding.**

**Applies to:** every stack.

- .NET → `dotnet/testing.md` §What must have tests — every error code a handler can return
- Next.js → `next/testing.md` §What to test, in FSD vocabulary — the coercion of each field, not
  only the happy row
- PostgreSQL → `postgres/access.md` §5 — a refusing and an accepting case per branch of a policy

## P19 — A rule on what a stored value may contain lives in the code every write passes through

A rule about the content of a value — an id's format, no control characters, a URL's scheme, a
length — is enforced in the one place that writes the value: the entity, the domain writer,
the shared loader or mapper that every path to storage goes through. A check at an entry point
— a form, a request validator, a prompt parser, a batch reader — may repeat it, for an error a
person can read; it is never the only guard. P8 states the same for a closed set of registered
values; this is the rule for everything else.

*Why:* entry points multiply — an import, a second prompt, a batch endpoint, a script — and each
one written later has to remember a rule it never sees. The first one that forgets stores a value
every reader of the artifact then trusts: a replay that will not load, a log line that lies, a
link that runs script. **Price: rejected review.**

**Security — a value other accounts are shown, or a program reads back, is constrained at its
writer.** When the value crosses to another account or into an artifact a program parses, the
content rule is a security rule, and an entry-point-only check is a finding of the security
review.

**Applies to:** application stacks.

- Next.js → `next/data.md` §7 — one validation contract per record shape, consumed by every
  entry path
- .NET → `dotnet/capabilities/web-api.md` W6 — the edge repeats a rule the domain enforces

## P20 — Security: what a read hides from a caller, every copy of it hides too

When the read path withholds a value from some callers — a field shown only to whoever may see
the thing it points to, a record outside the caller's scope — every copy of that value withholds
it the same way: a history entry, a snapshot, an export, a notification, a denormalized field
on a wider record. A copy is written for the widest audience that can read where it lands, and
carries only what that whole audience may see.

*Why:* the read path is where redaction is designed and tested, so it holds there; the copy is
written beside a write, for another purpose, by code that never asks who reads it. A reader
refused the value by the read gets it from the history instead, and every test of the read stays
green. **Price: rejected review.**

It binds from sign-in (`docs/canon/README.md` → *A security rule that depends on who the caller
is binds from sign-in*): before that there is no caller to hide anything from.

**Applies to:** application stacks.

- .NET → `dotnet/capabilities/web-api.md` W10 — the copy is checked in the handler that writes
  it, against the audience of the record it lands on
- Next.js → `next/data.md` §7 — a value copied into a document is readable by everyone the
  document's security rule lets in

---

## Sources

Extracted 2026-08-30 from the per-stack canon, where these rules had been written twice — once in
Flutter vocabulary, once in Next.js vocabulary — as the second stack landed. The stack documents
keep the mechanical form and the code; the rule, its reason and its price live here.

**Lesson from the revision history.** The first draft of the two-stack canon made the opposite
choice deliberately: state each shared rule twice, in each stack's own words, so it would be
directly checkable against the code in front of the reader. That was rejected, and correctly —
it optimizes for the reader who already has the file open, at the cost of the maintainer who has
to change a rule in two places and has no mechanism telling them the second exists. **Checkability
is recovered by the per-stack items above; drift is not recoverable at all.**


**Harvested 2026-10-01** (`/canon-harvest`, verdicts in `docs/canon/harvest-log.md`):

| Rule | Source projects |
|---|---|
| P16 | `claude-framework` (*A criterion that greps the dispatcher's file cannot verify what the dispatcher sends*), `decker_wars` (*Never default a regenerating command onto the artifact a verification compares against*), `home_storage_mobile` (*Choose the local↔cloud data-ownership model explicitly, and verify DEPLOYED rules*, rule 2) — the same rule banked independently in three repositories |
| P8 — *enumerated once* | `claude-framework` (*Point at a growing collection; never enumerate part of it* · *An install list and a prune list are two enumerations of one set*) |
| P8 — *enforced where written* | `decker_wars` (*Enforce registered closed sets at the constructor that writes the artifact*) |
| P15 — *narrowing is changing* | `claude-framework` (*An exemption is defined by everything it admits, not by the case that motivated it*) |

**Added 2026-10-07** (slice `adopt-10xdevs-m3`):

| Rule | Source |
|---|---|
| P17 | 10xDevs 4.0, module 3 |

**Reshaped 2026-10-08** (slice `canon-stack-shape`): the two-column table under each principle
became a scope line and a list of forms. The text of every rule, its reason and its price are
unchanged. **What moved is the statement of which stacks a principle binds.** Until this change the
file's title put all seventeen on every stack, and nothing said a principle bound fewer. The change
introduced three scopes and gave each principle one: P1, P2, P3, P9, P10 and P11 were scoped to
stacks with a view layer; P4, P5, P6, P7, P12 and P13 to application stacks; P8, P14, P15, P16 and
P17 to every stack. Both stacks in the table at the top sat inside all three scopes on that day, so
nothing bound differently then; it does from the first stack that sits outside one. The lesson: a
table with one column per stack gives every stack a cell under every principle, so a principle that
has no form on a stack leaves an empty cell that reads as an omission, whereas a stated scope makes
an absence mean something.

**Added 2026-10-08** (slice `canon-dotnet`): the table of stacks gained `.NET`, an application
stack with no view layer — the first stack outside a scope. **What moved is which stacks a
principle binds:** from this change P1, P2, P3, P9, P10 and P11 bind two of the three stacks,
and P4–P8 and P12–P17 bind all three. Ten principles gained a `.NET` item. P7 binds `.NET` as
stated here and has no `.NET` form. No principle's rule, reason, price or scope line changed.

**Added 2026-10-08** (slice `canon-postgres`): PostgreSQL entered the table of stacks as the first
stack that is not an application and has no view layer. **What moved is which principles bind a
stack in this canon:** P1–P7 and P9–P13 do not bind `postgres/`, while P8, P14, P15, P16 and P17
do, and it has written a form for P8 and P16. No principle's rule, reason, price or scope line
changed. The sentence by which ten files pointed at this file now reads "on more than one stack",
as this file's title has since the reshaping.

**Changed 2026-10-09** (slice `stack-selection-multi-stack`): **what moved is where a value of a
closed registry may be printed.** P8 said a value not printed in `docs/registry.md` does not exist;
it now says a value not printed in the project's registry does not exist, and that in a repository
with more than one stack the registry is the index `docs/registry.md` together with every file it
points at, `docs/registry/<stack>.md`. A repository with one stack keeps one `docs/registry.md`
and changes nothing. No principle's scope, reason or price changed.

**Harvested 2026-10-14** (`/canon-harvest`, verdicts in `docs/canon/harvest-log.md`):

| Rule | Source projects |
|---|---|
| P18 | `buzzards_cms` (*Ship a validator with one rejecting test per rule it enforces*), `neatu` (*One accepting and one refusing test per policy branch*), `claude-framework` (*Keep one fixture per documented rule that fails when the rule is inverted* · *Commit the mutants that prove a gate check as fixtures the gate runs*) — the same rule banked independently in three repositories |
| P16 — *a piece called outside the path that wraps it* | `buzzards_cms` (*Test a framework hook through the pipeline that calls it*), `neatu` (*Test a batch-applied change through the entry endpoint, history included*) |
| P19 | `decker_wars` (*Validate a typed token against the shared id rule in every prompt parser that persists it* · *Enforce one no-control-characters rule at the loader for every free-text content field*), `neatu` (*Enforce a cross-account input rule in the code that writes the entity* · *Restrict the scheme of a user-supplied URL shown to other accounts*), `claude-framework` (*Sanitise a written value against the reader's line-break set, and check a closed set at the writer*) — three repositories |
| P18 — *a setting called a gate is a guard too* | `buzzards_cms` (*Claim a build setting as a gate only after it has failed a build*), `claude-framework` (*Check a claim that a setting enforces something against the tool's defaults*) — predicted in one, confirmed on a running project in the other |
| P20 | `neatu` (*Hide a reference in every derived copy the read path hides it in*) — one repository; promoted as a principle because the same leak is open on every stack that copies a value, a Firestore denormalized field as much as a history row |
