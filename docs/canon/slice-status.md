---
scope: canon
stack: any
supersedes: the status tables previously restated in docs/WORKFLOW.md §2, slice-new, close-recap, slice-plan, slice-walker, run-sprint, setup-roadmap (SKILL + roadmap-schema), a second roadmap schema since removed, and each roadmap's dot legend
created: 2026-09-09
---

# Canon — the slice status vocabulary

> **Precedence.** hard rules + tie-breaks → `AGENTS.md` · principles that hold on more than one
> stack → `principles.md` · **the status vocabulary → this file** · how a stack writes things down →
> `docs/canon/<stack>/*` · finite sets → `docs/registry.md` · why one decision is what it is →
> `docs/adr/` · what we build → `context/foundation/`
>
> **Vendored — read-only.** Departures go in `docs/canon-deviations.md`.

**This file is the single home of the slice status vocabulary.** Every other document that
names a status points here. A skill that *writes* a status states which one it writes and
why; it does not restate the set.

*Why one place and not nine:* the set was stated in `docs/WORKFLOW.md` §2 (twice), in
`slice-new`'s inline `change.md` schema, in `close-recap`'s lifecycle reference, in
`slice-plan`, in `slice-walker`, in `run-sprint`'s advance-only rule (now `run/run-slice/references/phase-rituals.md`), in `setup-roadmap`'s
SKILL **and** in its `roadmap-schema.md` — that last one twice, as a dot table and as a
legend template, which made it a copy in **every roadmap this pipeline has ever generated** —
and in a second roadmap schema, since removed, where the legend still offered `ready`, a token this
very file retires. Copies of a closed set, with nothing to tell a maintainer the others exist.
This is `principles.md` **P8** applied to the one closed registry in this pipeline that had
not yet received it: *"a convention is a generator — it tells an agent how to make up a value
that looks right. An enumeration does not."*

**The claim has an arbiter, because a single-home claim without one is how the count reached
nine.** `scripts/check-skills.py` → `check_single_status_home` reads the tables below as data
and fails the gate on a **dot legend** (a dot rendered beside a token) or a **lifecycle
chain** (five or more arrow-joined steps each naming one token) anywhere else in the tree,
including the live `context/foundation/roadmap.md`. It is shaped after the two checks this
repository already runs for the same reason — `check_single_gate_home` and
`check_principle_definitions`.

**What legitimately still names statuses, and why it is not a copy.** A *transition map* —
the engine's status ladder (`.claude/skills/run-slice/references/engine.md` §3) — is about
what runs at each status and what artifact it leaves, which is that file's subject. An enumeration answers
*"what are the tokens?"*; a transition map answers *"what happens between them?"* Where a
document genuinely needs the enumeration in place, `<!-- status-vocabulary-ok -->` on the line
above says so out loud, which is a decision a reader can see and a reviewer can argue with.

---

## The vocabulary

Two surfaces carry a status:

| Object | Status? | Where |
|---|---|---|
| **Slice** | ✅ **source of truth** | `change.md` frontmatter → `status:` |
| **Roadmap row** | ⚠️ a **1:1 projection** of the slice | `roadmap.md` → `## At a glance` `Status` column, mirrored by the row's dot |

Execution state — *which steps are done* — is never a status. It lives in `plan.md`'s
`## Progress`, one row per step, and it is the single source of truth for that question.

<!-- SLICE-STATUS-VOCABULARY -->

| token | dot | surface | set by | meaning |
|---|---|---|---|---|
| `proposed` | ⚪ | roadmap | `/setup-roadmap` | in the backlog; no slice folder exists yet |
| `blocked` | 🔴 | roadmap | `/setup-roadmap` (`Block: yes`) | waiting on a prerequisite or a blocking unknown |
| `deferred` | ⚫ | both | the developer, on a direct request (R7) | set aside on purpose; nothing works on it until the developer brings it back |
| `new` | ⚪ | both | `/slice-new` | folder created, nothing planned yet |
| `planned` | 🔵 | both | `/slice-plan` | a reviewable plan exists |
| `plan_reviewed` | 🟣 | both | `/review-plan` | the plan was reviewed |
| `implementing` | 🟠 | both | `/run-slice` · `/run-solo` | phases are landing; at least one `## Progress` row is still `[ ]` |
| `implemented` | 🟡 | both | `/run-slice` · `/run-solo` | every `## Progress` row of the slice is `[x]` |
| `impl_reviewed` | 🟢 | both | `/run-slice` · `/run-solo` (review, engine §5) · `/review-impl` | an implementation review completed or was triaged |
| `archived` | 🟢 | slice | `/close-archive` | the folder moved under `context/archive/` |
| `done` | 🟢 | roadmap | `/close-archive` | closed — the roadmap's spelling of `archived` |

**`surface`** says where a token is legal: `slice` only in `change.md`, `roadmap` only in the
roadmap, `both` in either. `proposed` and `blocked` wrap the shared range on the roadmap side
before a slice folder exists; `archived` and `done` are the same state under two names,
because a roadmap row is not a folder and cannot be moved.

**The table's row order is the lifecycle order, and it is normative.** Reading top to bottom
is the chain a row advances along: `proposed` → `new` → `planned` → `plan_reviewed` →
`implementing` → `implemented` → `impl_reviewed` → `done` / `archived`. `blocked` and
`deferred` are orthogonal and sit on no position in it. This is stated because **R2's advance-only rule
needs an order to be evaluable** — *"already at or past the target"* is meaningless without
one — and every skill that writes a status was carrying its own copy of the chain in order
to answer that question. They point here now.

### Retired tokens

<!-- SLICE-STATUS-RETIRED -->

| token | why it is retired |
|---|---|
| `ready` | pre-dates the unified vocabulary; meant `proposed` or `plan_reviewed` depending on who wrote it |
| `planning` | pre-dates the unified vocabulary; `new` or `planned` |
| `in-progress` | pre-dates the unified vocabulary; `implementing` |
| `review` | ambiguous between `plan_reviewed` and `impl_reviewed` — the ambiguity is the reason |
| `preparing` | never in any vocabulary; invented in three slices of one project because nothing objected |

A retired token is not a synonym to be translated silently. It is a signal that the document
carrying it pre-dates this file, and the row should be read before it is corrected.

---

## The rules

### R1 — `change.md` is authoritative; the roadmap mirrors it

The slice's `status:` is the fact. The roadmap `Status` column and its dot are a projection of
that fact, kept 1:1 with the single spelling difference `done` ≡ `archived`. When the two
disagree, the slice wins and the roadmap is what gets corrected.

*Why:* the alternative is two facts, and the pipeline has already measured what that costs —
two slices in one project read `implementing` while their work was merged and marked DONE.

**Price:** the mismatch fails the verification gate. See "How this is enforced".

### R2 — Writers advance; they never downgrade and never block

Every skill that writes a status is **advance-only and best-effort**: it moves a row forward
along the chain, leaves a row that is already at or past the target alone, never touches
`blocked` or `deferred`, and never fails a run because a hand-edited table did not match.

*Why:* a run must not die over bookkeeping. This posture is right for a writer — and it is
exactly why **no writer is the arbiter**. The arbiter is the check, not the skill.

**The one sanctioned backwards move** is a phase appended to a built slice's plan: an in-scope regression
appends a new `## Phase` whose `[ ]` rows drop a slice from `implemented` / `impl_reviewed`
back to `implementing`. It is user-initiated, at a closing gate, and it is the only one.

### Note — `impl_reviewed` states the review's state, not device verification

`impl_reviewed` is legal to set while a slice still carries open `#### Manual` rows
(`.claude/framework/progress-format.md` §4). The token means what the vocabulary table above already says —
an implementation review completed or was triaged — not that every device check landed. An open
manual lane does not block the status; it blocks *ready for a pull request* instead
(`.claude/framework/progress-format.md` §4.9), stays listed in the escalation digest
(`.claude/framework/escalation-digest-format.md`), and is cleared where a human actually clears
it — walked with the developer (`/hitl-review-walk <change-id>`). Decided 2026-09-14 (source: `context/model-routing-audit-2026-09-14.md` §6), written once
here so two runs of the same pipeline stop deciding it differently — the measured case was two
slices of one project advancing to `impl_reviewed` over open manual rows while three siblings of
the same shape stayed at `implementing`, with nothing in this file to say which reading was right.

### R3 — A status is never invented, and never blank

If a token is not in the table above, it does not exist. Adding one is a change to this file
first, then to the skills that write it. A `change.md` with no `status:` line is not a
work-in-progress state; it is a defect.

*Why:* this is P8's argument, and the evidence is `preparing` — a plausible-looking word in
three slices of one project, which no reader ever objected to because objecting requires
knowing the whole set.

**Price:** a missing or invented token fails the verification gate.

### R4 — One index; the dot mirrors the token

`## At a glance` is the only place a roadmap states an item's Change ID, Outcome,
Prerequisites, refs, Status and — where the roadmap has milestones — milestone. No other table lists the items, and an item's own
`### <ID>:` block carries only what the index has no column for — what it unlocks, what is
unknown, what could go wrong. Where the index renders a dot beside a row,
the dot is a rendering of the `Status` cell and carries no independent information.

A milestone has no status token and no dot. Whether one is finished is computed from its rows each time it is needed.

*Why:* every repeat is one more surface a writer has to advance, and a surface advanced by hand
drifts. In the framework's own roadmap it already had: one row read `🟢 … done` in the index
and `🟠 … in flight` in a second table at the same moment. A status written in the index, in the
block and as a dot was three edits for every skill that moved it.

**Price:** a second table that lists the items, or a block that repeats an index column, fails
the verification gate. `/canon-update` rewrites a roadmap that predates this rule.

### R5 — The check fails; it never repairs

The arbiter reports a wrong status and stops. It does not rewrite one.

*Why:* a checker that repairs what it measures owns both sides of the measure. That is the
argument **P15** makes about gates in general, and it applies here for the same reason: the
value of the signal comes entirely from nobody being able to reach it.

### R6 — A roadmap states what is true now

No dated revision sections, no struck-out text, no "superseded" markers, no account of how a
row got the way it is. A roadmap is edited in place. How an item got there is in its slice
folder; a roadmap that is restructured is first appended, whole, to
`context/foundation/roadmap-history.md`, which nothing loads.

*Why:* the roadmap is read at the start of nearly every slice, so every line of history in it is
paid for on every one of them — and an agent that reads a decision and its later reversal in the
same file has to work out which one is in force.

**Price:** a dated revision heading, struck-out text or a superseded marker in the roadmap
fails the verification gate.

### R7 — Setting a slice aside is the developer's decision, and so is bringing it back

`deferred` is written only on a direct, live request from the developer — never because a
skill, a plan or an agent judged the work not worth doing now. One request writes both
surfaces: `change.md` gets `status: deferred` and one dated line appended under `## Notes`
saying why and which status it held — `- <date> · deferred at <status> · <why>` — and the
roadmap row mirrors it (R1). Bringing it back is again the developer's request: the status
named on that line returns, on both surfaces, and a second dated line records it.

While a slice is `deferred`:

- a runner refuses it (`.claude/skills/run-slice/references/engine.md` → *Status ladder*), and
  so do `/slice-plan` and `/review-plan`, each saying the slice is set aside and that the
  developer brings it back by asking for it. Invoking one of them is not that request;
- every writer leaves it untouched (R2);
- a briefing lists it as set aside, with no next step.

*Why:* a slice the developer decided not to work on now otherwise keeps its status and is
offered as the next step every day. The alternatives were deleting the folder, which loses
the work in it, or a note no skill reads.

**Price:** the token is legal, so the gate cannot tell a deferral the developer asked for from
one an agent decided on. The dated line under `## Notes` is the trail a reviewer reads.

---

## How this is enforced

The arbiter is a script, and it is an entry in the project's `docs/gates.json`, so it runs on
every phase commit of every run — not when someone remembers to look. **In a project that
installed this canon it is:**

```
python .claude/framework/scripts/check-slice-status.py .
```

(In the framework repository that ships it, the same script lives at
`scripts/check-slice-status.py`.) The trailing `.` names the repository root; the script also
defaults to the current directory, and it never derives its root from its own location —
installed under `.claude/framework/`, a location-derived root would point at a directory with
no `context/`, and the check would report green while checking nothing.

It reads the vocabulary table above **as data**: it locates the
`<!-- SLICE-STATUS-VOCABULARY -->` marker, parses the table under it, and refuses to run if
that file or marker is missing. It carries no built-in list of tokens, deliberately — a
fallback copy would be the second home, and the one that actually arbitrates.

A repository with no `context/` tree, no roadmap, or no slices is not a failure. It is a
project that has not started using the pipeline, and the check says so and exits 0. A root
named explicitly on the command line that does **not** exist is a different thing — a wrong
command — and is an error.

---

## Sources

**These are framework-repository paths, recorded as provenance — not links to follow from a
consuming project.** In a project that installed this canon, the skills live under
`.claude/skills/**` and the workflow under `.claude/framework/WORKFLOW.md`; the last row's
file exists only in the framework repository. The table answers *"where did this text come
from"*, and nothing in this document requires reading any of it.

| Part | Original (framework repository) |
|---|---|
| The token set, meanings and setters | `docs/WORKFLOW.md` §2 (two tables) and `slice/slice-new/SKILL.md` "change.md schema (inline reference)" |
| The two-surface / 1:1-projection rule | `docs/WORKFLOW.md` §2 opener |
| The dot legend | the `## At a glance` legend line of each roadmap, per `setup/setup-roadmap/references/roadmap-schema.md` |
| Retired tokens | `docs/WORKFLOW.md` §2 "Retired tokens", plus `preparing` observed in `context/workflow-changes-plan.md` §1.5 |
| Advance-only, best-effort | `slice/slice-new/SKILL.md` step 5, `close/close-archive/SKILL.md` "Roadmap close", `run/run-slice/references/phase-rituals.md` "Roadmap status stamp" |
| The loop-back exception | `docs/history/workflow/2026-06-13-feedback-loop-back.md` |
| The enumeration argument | `docs/canon/principles.md` P8 |
| The "may not reach the measure" argument | `docs/canon/principles.md` P15 |

**Lesson from the revision history.** `docs/WORKFLOW.md` restated this vocabulary in every
pass that touched it — 2026-08-27 rewrote the identifiers inside earlier revision blocks,
2026-08-30 rewrote them again, and each pass had to remember the other three copies by hand.
Nothing ever told a maintainer the copies existed; they were found by reading. The extra hop
this file introduces is recoverable in one click. The drift it removes was not recoverable at
all — it was only ever discovered by an audit that happened to look.
