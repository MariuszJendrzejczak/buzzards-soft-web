---
scope: canon
stack: next
supersedes: docs/legacy/architecture-next-js.md §"Testing convention"
created: 2026-08-30
---

# Canon — Next.js testing and verification

> **Precedence.** hard rules + tie-breaks → `AGENTS.md` · how Next.js code is written in this
> house → `docs/canon/next/*` · finite sets → `docs/registry.md` · why one decision is what it
> is → `docs/adr/` · what we build → `context/foundation/`
>
> **Vendored — read-only.** Departures go in `docs/canon-deviations.md`.

**Derived document.** Orders decisions already taken; changes none of them.

**Shared principles.** Mock at the contract boundary (**P12**), E2E is black box (**P13**), an
un-run gate is never green (**P14**) and a reported defect is reproduced as a failing test before
it is fixed (**P17**) live once in `docs/canon/principles.md`. This file
carries the Next.js commands, tools and recipes.

---

## The verification gate

The gate is the project's **ordered command list**, and every command in it must exit 0 on a
clean tree. That list lives in the project's own `docs/gates.json` under
`validation.commands`: run in array order, any non-zero exit fails the gate. It is not written
here, because this file is vendored and read-only — a command list that cannot be edited by the
project it describes is the drift `docs/gates.json` exists to end, and that file is the only
one in a repository allowed to enumerate them.

What the house expects that list to **cover**, in the order CI runs it:

| Role | What it gates |
|---|---|
| lint | ESLint (flat config, `eslint-config-next` + TS) |
| build | the production build — **and the TypeScript pass**, when there is no separate `tsc` script |
| unit + component | Vitest: unit + component (RTL), jsdom |
| security rules | rules tests on the emulator, where the project has them |

Three rules an agent gets wrong by default:

<!-- gates-ok -->
- **`npm run lint` IS a gate here.** Do not carry over the Flutter rule that a lint sweep is
  user-only: that rule is about `flutter analyze` specifically, over accepted info-level debt.
  ESLint in this house is fast, clean, and part of CI — run it.
- **`build` is the type-check** unless the project defines its own. "It compiles in the editor"
  is not verification; a static export type-errors and prerender-errors at build time.
- **Build before test when any suite reads build output.** SSG suites that assert on the
  exported tree fail confusingly against a stale or absent `out/`. Follow the order CI uses,
  and if the project's order differs from lint → build → test, its `AGENTS.md` says so.

Emulator suites need the emulator (and a JDK). If it is not running locally, say the suite was
not run — do not report a gate as green because it did not execute.

**Timeouts and retries belong to the shared runner configuration, never to an individual
test.** A per-test timeout override is a local patch over a global problem: it hides which
suite is slow, it drifts from what CI uses, and the next slow test needs its own override. Set
them once in the Vitest/Playwright config, and if a test genuinely needs longer, that is a fact
about the suite worth stating there.

---

## What to test, in FSD vocabulary

Use FSD vocabulary, **not** clean-architecture framing. No "datasource", "sealed type",
"interactor", or "use-case class" — those belong to the Flutter canon and produce nonsense
names here.

| What you test | How |
|---|---|
| `entities/*` `model`, `shared/lib` — pure logic and types | plain unit tests |
| slice `model` — hooks, query hooks, derived state | hook tests (`renderHook`) |
| slice `api` — backend reads/writes and mapping | unit tests, SDK mocked **at the SDK boundary** |
| slice `ui` | React Testing Library: render, interact, assert **visible output** |
| security rules | the emulator + a rules-testing library, in the project's `tests/` tree |

**The mapper is the highest-value test in the tree.** It is the one place a malformed stored
document meets typed code, and — where a second client writes the same data — the one place a
contract with another codebase can silently break. Test the coercion of each field and its
documented default, not only the happy row — and every rule a mapper or a validator refuses on
gets a case it must refuse (`principles.md` P18).

**`ui` tests assert what a user can see.** A test that reaches for a component's internal state
or a hook's identity is a slow unit test wearing the wrong hat.

---

## Placement

- Unit and component tests are **co-located** with the code they cover: `*.test.ts(x)` beside
  the module, inside `src/`. A test that lives far from its subject is not read when the subject
  changes.
- Emulator / integration suites live in the project's `tests/` tree, because they need a
  runtime, not a module.
- A test file never imports across a slice boundary in a way production code could not. If the
  test needs an internal, the export is missing or the test is wrong.

---

## Two recipes worth stating once

**Module-load-time env.** A module that reads `process.env` at import time cannot be re-tested
by setting the env afterwards — the value is already baked. Reset the module registry and
re-import inside the test:

```ts
async function loadGuard(value: string | undefined) {
  vi.resetModules();
  if (value === undefined) delete process.env.NEXT_PUBLIC_X; else process.env.NEXT_PUBLIC_X = value;
  return (await import("./guard")).guard;
}
```

Test the **absent** case explicitly: a guard that reads an unset variable must fail closed, and
that is the case production will eventually hit.

**Mock at the SDK boundary, not at your own function.** Mocking the module under test proves
nothing. Mock `firebase/firestore` (or `fetch`) and let the real mapper run.

---

## A defect starts as a failing test

The rule is **P17** and lives in `docs/canon/principles.md`. Its form here:

- The reproducing test goes at the **cheapest layer that shows the defect** — a unit test of
  the slice's `model` or `api` before a component test, a component test before an end-to-end
  spec.
- It is run **alone**, by the project's test command narrowed to its file, before the fix and
  after it: red for the reported reason, then green. The gate still runs in full afterwards.
- A defect only a real browser or device shows is reproduced as the written step P17 permits,
  not as a test that cannot see it.

---

## Agent hooks

The hooks are installed by `/canon-install` and do nothing until the project's `docs/gates.json`
has a `hooks` key (`docs/WORKFLOW.md` §8). `onEdit` entries run after an agent edits one file
that matches (`{file}` is that file); `onFinish` entries run when an `implementer` or `tester`
agent finishes, once over the changed files that match (`{files}`). The Next.js entry is ESLint
on the edited file:

```json
"hooks": {
  "onEdit": [
    { "match": ["*.ts", "*.tsx", "*.js", "*.jsx", "*.mjs"], "command": "npx --no-install eslint --quiet {file}" }
  ],
  "onFinish": []
}
```

The seed leaves `onFinish` empty: the type check is red on a fresh checkout until the generated
Next.js types exist, and the test runner is a project fact. A project may add, at the end of the
work, a type-generation command followed by the type check — never the type check alone — and
its own related-tests command:

```json
"onFinish": [
  { "command": "npx --no-install next typegen && npx --no-install tsc --noEmit" },
  { "match": ["*.ts", "*.tsx"], "command": "npx --no-install vitest related --run {files}" }
]
```

No per-edit test entry: a test run belongs at the end of the work.

The end-of-work check runs for the `implementer` and `tester` agents only, in an interactive
session whose workspace was trusted, never under `claude -p`; a check that cannot finish inside
the hook's deadline reports what it did not run.

---

## End-to-end

A project that declares E2E in `docs/gates.json` → `e2e` runs it with **Playwright**, and every
slice that adds or changes a flow a user can walk plans a spec for it
(`.claude/framework/e2e.md`; when each size of the suite runs: `docs/canon/branching.md` →
*Gates*). Those specs are **black box**: they drive visible UI and assert visible text. They
never import production modules and never inspect cache or hook state.

---

## What "tests pass" may not mean

An agent reporting green states **which** commands ran. Common false greens in this stack:

- the build was not run, so a type error or a prerender-time throw is still waiting;
- the emulator suite was skipped for a missing emulator;
- an SSG suite read a stale `out/` from a previous build;
- only the changed package was tested in a monorepo;
- security rules were exercised from the rules file in the emulator, never against the deployed
  project — a scoped query the deployed rules reject is invisible there (`principles.md` P16).

Reporting an un-run gate as passing is a worse failure than a red gate.

---

## Sources

| This document | Original |
|---|---|
| The FSD test table and its "no clean-arch vocabulary" rule | `docs/legacy/architecture-next-js.md` §"Testing convention" |
| The command allow-list; `build` as type-check; rules tests needing a JDK | `cv_tracker/CLAUDE.md` "Verification commands" |
| Build-before-test for SSG suites | `buzzards_soft_web/CLAUDE.md` "Commands" |
| The `vi.resetModules()` env recipe and the fail-closed case | `cv_tracker` owner-lock guard tests |
| E2E black-box rule | the Flutter canon's testing document |
| A defect starts as a failing test | `docs/canon/principles.md` P17, added 2026-10-07 |
| Agent hooks | `hooks/lint-on-edit.mjs` and `hooks/check-on-finish.mjs`; the entries are the seeds `docs/canon/seeds/gates.next.template.json`, added 2026-10-08 |

**Lesson carried forward.** One project's architecture document stated the repo "currently has
no `test` script" — while `package.json` defined both `npm test` and an emulator suite. A later
dated revision corrected it. The claim had been true when written and quietly rotted, and for
the window in between every agent that read the canon believed there was nothing to run.
**Which commands verify this repo is a fact with a short half-life, so it belongs in one
machine-readable place the project owns — `docs/gates.json` — and nowhere else. Prose that
restates it is prose that will rot; this document therefore says what the gate must cover and
lets that file say what it runs.**
