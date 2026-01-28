# Developer Website

[mtd.dev][site]

## Repository structure & philosophy

This project uses a **layer-first** structure with **explicit boundaries** between:

- **Routes** (`src/app`) — only routing, layouts, route handlers, and route-local UI.
- **UI** (`src/components`) — shared UI split into:
  - `ui/` = *shadcn primitives only*
  - `common/` = app-specific reusable UI (navigation, auth widgets, etc.)
- **Server** (`src/server`) — all server-only code (Supabase server clients, server actions, auth helpers).
- **Content** (`src/content`) — non-route content (MDX/docs data) that routes *render*.
- **Hooks / Lib / Helpers** — shared client-safe utilities.

### Target tree

```txt
src/
  app/                        # Next.js App Router (routes only)
    ...                       # pages/layouts/route handlers, plus route-local components if needed

  components/
    ui/                       # shadcn components ONLY
    common/                   # non-shadcn reusable UI (nav, auth UI, providers, etc.)

  content/
    api/                      # MDX and metadata

  contexts/                   # React contexts

  env/
    schema.ts                 # Zod schemas for env
    global.ts                 # NEXT_PUBLIC_* only
    server.ts                 # server-only env

  hooks/                      # shared React hooks

  lib/
    utils/                    # cn(), small helpers used by UI
    temporal/                 # (optional) other shared libs safe for client

  server/                     # everything in this folder should `import "server-only";
    actions/                  # server actions grouped by domain
    auth/                     # requireUserId(), session helpers
    supabase/                 # server-only supabase client factories and middleware

  types/                      # generated + hand-written types
```

[site]: https://mtd.dev
