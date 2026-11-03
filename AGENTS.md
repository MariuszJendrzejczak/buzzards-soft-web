<!--
  TEMPLATE — installed by /canon-install as the repo's AGENTS.md, then personalized.
  Replace every {{PLACEHOLDER}}. Delete lines that do not apply. Target: 60–120 lines for one
  stack; each further stack adds its own blocks.
  This file is the ONLY always-on layer. It points; it does not restate.
  If you find yourself copying a rule out of docs/canon/**, stop — link it instead.

  Blocks between a pair of marker lines hold what is this stack's own; the text outside them is
  the same in every application template (docs/canon/README.md → Seeds are stack-suffixed). A
  repository with one stack removes the marker lines and keeps every other line. A repository
  with more than one takes the text outside the blocks once, and the blocks of every stack
  under the same headings.

  On a Next.js repository, `next dev` writes its own block, marked BEGIN:nextjs-agent-rules,
  into this file. Leave it in place and commit it; deleting it only recreates an uncommitted
  change.
-->

# Buzzards Soft web — agent instructions

The Buzzards Soft marketing site — a trilingual (PL / EN / SV), statically-exported Next.js App Router single-page site on Firebase Hosting, whose contact form relays through one Cloud Function.

## Precedence — read this before resolving any conflict

**hard rules + tie-breaks** → this file · **how Next.js code is written in this house** →
`@docs/canon/` · **finite sets (query keys, routes, env, error kinds)** → `@docs/registry.md` ·
**why one specific decision is what it is** → `docs/adr/` · **what we build and in what order**
→ `context/foundation/`

Ownership is partitioned by *kind of decision*, not by file. Two documents cannot both own a
question. `docs/canon-deviations.md` overrides `docs/canon/**` at the named point only.
`docs/legacy/` is **historical** — rationale only, never canon.

## Hard rules — each one carries its price

- **Never merge a PR, never open one on your own, never write `main`, never push to a shared
  branch** without an explicit live user command. Work ends at "ready for a pull request"; a PR
  is opened only when the user asks for it in the session ("wystaw PR"), and then work ends at
  "PR open — here is the link". *No directive lifts this.*
- **Never edit `docs/canon/**`.** It is vendored and is overwritten by `/canon-update`.
  Departures go in `docs/canon-deviations.md`. *Price: your change is silently destroyed.*
- **Read the installed Next.js docs** (`node_modules/next/dist/docs/`) before writing routing,
  caching or rendering code. The version here is `16.2.6`; your training data is not.
- **Rendering mode: static export (`output: 'export'` in `next.config.ts`).** No SSR, no route handlers and no server actions at runtime; anything that needs a server is a Firebase Hosting rewrite to a Cloud Function in `functions/`. *Price: a build that fails
  at the last gate.* Route modes are listed in `@docs/registry.md`.
- **Never import upward or sideways.** A slice imports only from a layer strictly below, only
  through its `index.ts`. *Price: rejected review.*
- **Never write a query-key literal.** Keys come from the entity's exported factory and carry
  the tenancy scope. *Price: rejected review.*
- **Never show an SDK error message to a user.** Copy is chosen by error `kind` from the
  decision table in `@docs/registry.md`. *Price: rejected review.*
- **Never mirror server data into `useState`.** TanStack Query owns server state. *Price:
  rejected review.*
- **Never put a colour, radius or font literal in a component.** Tokens only. *Price: rejected
  review.*
- **Never invent a value that belongs to a closed registry** — query-key namespaces, routes,
  env vars, error kinds, collection names. If it is not in `@docs/registry.md`, it does not
  exist; adding one is an ADR.
- **`npm run lint` is a real gate here** — the Flutter "never run the lint sweep" rule does
  **not** transfer to this stack.

## Talking to a person

- **Every question, decision or briefing you write for a person follows
  `.claude/framework/hitl-communication.md`.** Write for someone who has read none of the plans
  and reports: replace an identifier with what it says. A decision states what it is about, the
  problem, what you propose and why, the other options with their cost, and what happens if it
  is left. One question per message; a write no invocation or skill procedure already
  authorizes is asked as *go / stop*.

## Canon

- `@docs/canon/principles.md` — the rules that hold on more than one stack, stated once
- `@docs/canon/next/architecture.md` — FSD layers, the App Router integration, rendering mode
- `@docs/canon/next/data.md` — TanStack Query, key factories, invalidation, mapping
- `@docs/canon/next/errors.md` — the `api` boundary, error kinds, what the user sees
- `@docs/canon/next/testing.md` — what must have tests, and which commands verify
- `@docs/canon/next/design-system-method.md` — tokens, theming, component vocabulary
- `@docs/canon/branching.md` — branch topology, release, lockfile discipline

Project layer, not vendored: `docs/architecture-guide.md` (this repo's layer set, slice
inventory, file ownership) · `docs/design-system.md` (this repo's tokens and component
vocabulary) · `docs/registry.md` · `docs/adr/`.

## Commands

**The verification gate is not written here.** It lives in `docs/gates.json` —
`validation.commands`, an ordered array run in array order where any non-zero exit fails, and
`userOnly`, the commands reserved for the human. That file is the **only** place in this
repository that enumerates them; a second copy here is a second thing to edit, and the copy that
gets edited is the one an agent happens to read.

Everything else about running this project:

```bash
npm run dev          # the dev server — not a gate
```

Report which commands actually ran — an un-run gate is never "green"
(`docs/canon/principles.md` P14), and a gate you weakened to pass is not green either (**P15**).
Node is pinned to `24`; validate any lockfile change under that version.

## File ownership — who may write what

A slice owns `src/{{LAYER}}/<its-slice>/**` outright. Shared files are **append-only**: add your
entry, never restructure someone else's.

| Shared file | Owner | How others contribute |
|---|---|---|
| `messages/{pl,en,sv}.json` | PL is the source of truth | add the key in all three files, key-parallel |

Promoting a component into the shared kit happens **before a second copy exists**, and adds it
to the vocabulary in `docs/design-system.md`.

## Deliberately absent — do not go looking, do not supply it

- Next.js API routes and server actions — the export is static; `/api/contact` is a `firebase.json` rewrite to the `contact` function.

## Known tracked debt — do not re-report

- {{TRACKED_DEBT}} — scheduled as {{ROADMAP_ID}}. A reviewer must **not** reject it.

<!--
  Deliberately NOT in this file: "Current State", "Next up", feature inventories, folder
  listings. That genre drifts within weeks and is owned by context/foundation/roadmap.md and
  by the code. If you are tempted to add it here, add it there.
-->
