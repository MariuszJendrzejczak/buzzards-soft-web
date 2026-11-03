---
scope: canon
stack: any
supersedes: user-scope CLAUDE.md "Branching & release — default model"
created: 2026-08-30
---

# Canon — branching and release

> **Precedence.** hard rules + tie-breaks → `AGENTS.md` · how code is written in this house →
> `docs/canon/**` · finite sets → `docs/registry.md` · why one decision is what it is →
> `docs/adr/` · what we build → `context/foundation/`
>
> **Vendored — read-only.** Departures go in `docs/canon-deviations.md`.

This is the default working model for **every** repository, regardless of language, stack or
platform. It moved out of user scope and into the repo deliberately: a rule that only lives in
`~/.claude/` is invisible to every agent that is not Claude Code.

Concrete wiring — workflow names, triggers, channels — and every secret live in the repo's own
CI config, never here. This file is dry rules only.

---

## Branch topology — `feature → develop → main`

| Branch | Lifetime | Role | How you write to it |
|---|---|---|---|
| `main` | permanent | Release line. Every state could ship. | PR only — never push directly; the archive commit is the one exception (below) |
| `develop` | permanent | Integration line. Work lands and self-tests here before reaching anyone else. | PR (team) or direct push (solo) |
| `feature/<slug>`, `fix/<slug>`, `chore/<slug>` | short | One change at a time | Branch from `develop`, PR back to `develop` |
| `fix/hotfix-<slug>` | short | Production fix that cannot wait | Branch from `main`, PR to `main`, then merge `main` → `develop` to realign |

**Trunk-based fallback.** For quick or throwaway repos, `main` plus short-lived branches with
no `develop` is the sanctioned simplification. State it explicitly in the repo when used —
an unstated simplification is indistinguishable from a mistake.

**Merge strategy.** A pull request is merged with a merge commit — never by squash and never by
rebase — because the phase commits a plan's `## Progress` rows name must stay in the history of
the base branch. A repository that has to merge another way records that in
`docs/canon-deviations.md`.

---

## Release philosophy — build once, promote in the console

- **A merge `develop → main` is the deliberate "ship to testers" event.** It is what publishes
  to the internal / beta / staging channel — not every merge into `develop`.
- **The tester build *is* the production candidate.** Going public is a manual promotion in
  the release console, with staged rollout where the platform supports it — not a fresh build
  from a separate pipeline. Do not rebuild for production what testers already validated.
- **`develop` ships nothing.** Merging into it triggers no distribution, which is what keeps
  integration cheap.
- **Escape hatch (`rc-*` tag):** build an arbitrary `develop` or feature commit for testers
  without going through `main`. Same channels.
- **A version tag (`v<X.Y.Z>`) is an annotation, not a trigger.** Apply it to the promoted
  commit *after* the console promotion, purely as a record. It builds nothing.

---

## Gates

Cheap CI — lint, build, and unit plus component/widget tests — gates **pull requests**.
Expensive gates — signed release builds, deploys — are tied to the deliberate events above, not
to every push.

**E2E runs in two sizes.** The flows a pull request adds or changes run on it — locally before it
opens, and in CI. The whole suite runs on the deliberate event: in CI on the pull request from
`develop` to `main`, never locally. In a trunk-based repo, which has no such event, the whole
suite runs only when the developer starts it. *Why:* a pull request pays for the flows it
touched, and the release line is proven whole once, where nobody's machine is tied up.

---

## Security — credentials in CI

A deploy credential replaces what every user of the project receives. CI runs other people's
code on every job — every installed package, every repository script, every third-party action
— so where the credential is visible decides who can use it.

- **Build without secrets; deploy from another job.** The job that installs dependencies and
  runs repository scripts holds no secret and uploads its output as an artifact. A second job
  — which installs nothing and runs no repository script — downloads that artifact and deploys
  it with the credential.
- **A third-party action that receives a secret is pinned to a full commit SHA**, with the
  release it stands for in a comment — never a tag such as `@v4`, which its owner, or whoever
  takes the owner's account, can move. A tool such an action downloads while running is pinned
  to a version.
- **A production credential lives in a protected environment** that only the release branch
  may use, and the job that uses it also checks the ref it runs on. Without that, any pushed
  branch's workflow can read the credential, and a manual run deploys a branch no pull request
  reviewed.
- **A job that runs a pull request's code gets no secret, no write permission and no
  privileged trigger** (`pull_request_target`, `workflow_run` with secrets). Such a job that
  runs the gate takes `docs/gates.json` from the base branch, or fails when the pull request's
  copy lost an entry the base branch has — a pull request that shortens the gate otherwise
  passes on the shortened one (P15).

**Price: rejected review.**

---

## Hard rules an agent may not cross

These are user-only gates. **No directive lifts them** — not "finish", not "wrap up", not an
AFK run, not a generated prompt.

- **The agent never opens a PR on its own.** Work ends at *"ready for a pull request"*: built,
  reviewed, every decision answered, every manual check walked, the full gate green — all
  locally on the feature branch. A pull request is opened only on the developer's own message
  asking for it, and then work ends at *"PR open — here is the link"*.
- **The agent never merges a PR.** No `gh pr merge`, no equivalent.
- **The agent never writes `main`.** No merge, no push, not even a fast-forward — except the
  archive commit below, and only on the developer's word.
- **A direct push to `develop` or any shared branch happens only on an explicit, live user
  command.** A feature branch with no pull request is pushed only as a backup, and only when
  the push starts no CI run.
- **The archive commit.** A slice is archived after its merge, on the base branch, in one
  commit that holds only its bookkeeping — the slice folder moved under `context/archive/`, its
  roadmap row closed, its delivery note; when the `post-merge` hook archived it with nobody
  present, the delivery note written later is a second commit of the same kind. It never rides a feature pull request and needs none
  of its own: it reaches the base branch — `main` in a trunk-based repo — by a direct push, and
  only when the developer's own message in the session says so. A fast-forward only, never
  `--force`; a remote that refuses the push (a protected branch) leaves the commit local, and
  the developer is told. *Why:* an archive inside a feature pull request is written before the
  work it closes has landed, and a pull request of its own spends a CI run on bookkeeping.

A skill, plan or generated prompt that says "open the PR", "merge" or "promote" does not
satisfy this. Surface the ready branch, or the ready-to-merge PR, and wait.

*Why the pull request waits for the developer:* every push to an open pull request runs the
whole CI, which spends GitHub Actions minutes, and a pull request opened before the work is
closed becomes a to-do list instead of a finished hand-over. CI stays the independent check
before the merge; the local gate does not replace it.

---

## Lockfile discipline — the agent validates under the repo's pinned toolchain

Whenever work adds, removes or bumps a dependency, or otherwise rewrites a lockfile
(`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `pubspec.lock`, `packages.lock.json`),
the **agent** validates it under the version the repo pins — never the ambient local one —
before committing.

**Why.** Lockfiles are package-manager-version- and OS-sensitive, and the normal verification
loop (`lint` / `build` / `test` over a warm `node_modules`) **never does a clean install**. So
drift is invisible locally and surfaces as a CI failure — the latest and most expensive place
to catch it. Two independent failure modes have been seen together in one PR:

1. **Resolver drift** — a newer local package manager dedups a transitive dependency
   differently than CI's pinned one, so a clean install rejects the lock as out of sync.
2. **Platform pruning** — regenerating on one OS strips every other platform's optional native
   binary. The lock then passes the sync check but the build dies on CI's OS with a missing
   native module.

**How to apply, without being asked:**

- Read the repo's pin (`.nvmrc`, `engines`, `volta`, `.tool-versions`, `global.json`, the pinned SDK) and
  confirm the local runtime matches **before** any lockfile operation.
- After a dependency change, run a **clean install under the pinned runtime plus the host
  build**, then commit. The usual allow-list has no clean-install gate, so the agent adds it.
- **Never** regenerate a lockfile with a different package-manager major than CI uses, and
  **never** use a lock-only regeneration on a single OS — it drops other platforms' optional
  native binaries.
- A version manager is installed **once per machine**; the version is selected **per project**
  from the repo's pin. When no manager is present, surface that as a setup gap rather than
  working around it.

---

## Sources

Carried down from user-scope `CLAUDE.md` — sections "Branching & release — default model",
"Merging a PR is user-only", and "Lockfile changes — the AGENT validates under the repo's
pinned toolchain" — as part of the split described in `context/doc-standard-plan.md` §0: harness
policy stays in user scope, engineering rules move into the repo where every agent can read
them.

*Security — credentials in CI* was harvested 2026-10-14 from a house project whose web deploy
held its hosting credential in the job that ran `npm ci`, through actions referenced by tag,
with no protected environment — the shape the framework's own CI template had shipped
(`docs/canon/harvest-log.md`).
