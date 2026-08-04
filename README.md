# Nitrosend Product Challenge

A product and UX prototype for the Nitrosend Product Engineer application.

It demonstrates graded consent for agent tool calls: the current version's
`destructiveHint` boolean versus a consequence-based model (reversibility and
reach `none` / `notice` / `confirm` / `verify`). The same scripted winter-sale
conversation is shown under both, with a Current / Proposed toggle.

**Live demo:** [https://nitrosend-challenge.fly.dev](https://nitrosend-challenge.fly.dev)

## What to look for

1. **Trust proposal (`/`)** — three tool moments (Confirm, Inform, Failure) as
   current vs proposed UI. Each answers: what am I agreeing to?, has anything
   been sent?, if it failed what happened?
2. **Interactive walkthrough (`/conversation`)** — Current / Proposed toggle on
   the same scripted winter-sale send.

## Stack

- Rails 8.1 API (`backend/`)
- Vue 3, TypeScript, Vite, Pinia, Tailwind CSS (`frontend/`)

No database. Conversation state lives in the browser; the API is stateless and
grades each tool call from YAML manifests at request time.

## Structure

| Path | Role |
| --- | --- |
| `backend/` | Rails API; also serves the built SPA from `public/` |
| `frontend/` | Vue app |
| `backend/config/consent_manifest.yml` | Proposed consequence metadata |
| `backend/config/current_annotations.yml` | Current `destructiveHint` grading |
| `backend/config/conversation.yml` | Scripted demo conversation |
| `fly.toml` | Fly app config (machine stays on) |

## Local development

Requires Ruby 3.4.10 and Node 22.

```bash
cd backend && bin/setup && bin/rails server
```

```bash
cd frontend && npm install && npm run dev
```

Vite proxies `/api` to Rails on port 3000, so development is same-origin like
production. Open the URL Vite prints (often `http://localhost:5173`).

## Tests and checks

```bash
cd backend && bin/ci
```

```bash
cd frontend && npm run build
```

`bin/ci` runs setup, RuboCop, bundler-audit, Brakeman, and the Rails tests.
The frontend build type-checks before bundling. GitHub Actions runs the same
checks on every push.

## Deployment

One container (`Dockerfile`): Vite builds into `backend/public`, Thruster serves
static assets and forwards the rest to Rails. Single origin — no CORS, no
separate frontend host.

Fly keeps one machine always on (`auto_stop_machines = "off"`) so a cold link
does not wait on a boot.

```bash
fly deploy
```

App: `nitrosend-challenge` · Region: `syd` · URL:
[https://nitrosend-challenge.fly.dev](https://nitrosend-challenge.fly.dev)
