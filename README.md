# Nitrosend Product Challenge

A product and UX prototype created as part of the Nitrosend Product Engineer application process.

## Stack

- Rails 8.1, API only
- Vue 3, TypeScript, Vite, Pinia, Tailwind CSS

There is no database. The prototype's state lives in the browser and the API is
stateless, so Postgres would have been a dependency with nothing in it.

## Structure

- `backend` — Rails API, which also serves the built frontend
- `frontend` — Vue application

## Local development

Requires Ruby 3.4.10 and Node 22.

```bash
cd backend && bin/setup && bin/rails server
```

```bash
cd frontend && npm install && npm run dev
```

The frontend runs on port 5173 and proxies `/api` to Rails on port 3000, so both
are same-origin in development as well as in production.

## Tests and checks

```bash
cd backend && bin/rails test && bin/rubocop && bin/brakeman
```

```bash
cd frontend && npm run build
```

The frontend build type-checks before bundling, so a type error fails the build.
CI runs all of the above on every push.

## Deployment

One container, built by the `Dockerfile`: Vite compiles the frontend into
`backend/public`, and Thruster serves those files and forwards everything else
to Rails. A single origin means no CORS and no separate frontend host.

It runs on Fly, configured in `fly.toml` to keep one machine always on. Fly
stops idle machines by default, which leaves the first visitor after a quiet
period waiting on a boot.

```bash
fly deploy
```
