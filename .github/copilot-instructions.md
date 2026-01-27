# GitHub Copilot Instructions for CUMTD/developer-web

## Project Overview

This project is a web application for 3rd party developers to interact with MTD's Open API.
It contains instructions, reference documentation, and features for account and API key management.

## Technical Stack

- **Language**: TypeScript
- **Framework**: Next.js 16 (App Router; no Pages Router) with React 19
- **UI**: React (per repository version)
- **Component Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Linting & Formatting**: Biome
- **Hosting**: Vercel
- **Database**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth
- **Analytics**: Plausible
- **Schema Validation**: Zod (v4+)

---

## Architecture & Folder Structure

This project uses a **layer-first** architecture with **explicit boundaries**. Respect these boundaries strictly.

### High-level rules

- Routes orchestrate; they do not contain business logic.
- UI components are reusable and client-safe.
- All server-only logic lives in `src/server`.
- Content is rendered by routes, not embedded inside them.

### Target Tree

Don't deviate from this structure without explicit approval.

```txt
src/
  app/                        # App Router routes only
    ...

  components/
    ui/                       # shadcn primitives ONLY
    common/                   # reusable app-specific UI

  content/
    api/                      # MDX and metadata

  contexts/                   # React contexts

  env/
    schema.ts                 # Zod env schemas
    global.ts                 # NEXT_PUBLIC_* only
    server.ts                 # server-only env

  hooks/                      # shared React hooks

  lib/
    utils/                    # cn(), small UI helpers
    temporal/                 # other client-safe libraries

  server/                     # server-only
    actions/                  # server actions by domain
    auth/                     # auth/session helpers
    supabase/                 # Supabase server clients

  types/                      # generated + handwritten types
```

---

## Coding Standards

### Formatting & Style

- Use **tabs** for indentation.
- Always use **semicolons**.
- Always wrap control blocks (`if`, `else`, `for`, `while`, `do`) with curly braces.
- Use **template literals** instead of string concatenation.
- Run Biome before committing; code must pass without warnings.
- Prefer specific imports over namespace imports. (e.g., `import { useState } from "react"` not `import * as React from "react"`).
- Use `import type` for type-only imports (e.g., `import type { Foo } from "bar"`).

### Functions & Components

- React components must be **named functions** and **default exported**.
- Prefer **named functions** over arrow functions for callbacks and handlers.
- Arrow functions are acceptable for **inline lambdas** and simple expressions.
- Prefer early returns and guard clauses (still using braces).
- Prefer explicit return types on exported functions.

**Example – Component**

```ts
export default function ApiKeyList(): JSX.Element {
	return <div>API Keys</div>;
}
```

### Async & Data Handling

- Use `async` / `await`; do not use `.then()` / `.catch()`.
- Prefer destructuring for objects and arrays.
- Use optional chaining (`?.`) and nullish coalescing (`??`) where appropriate.

### Types & Immutability

- Avoid `any`; use specific types, generics, or `unknown`.
- Prefer `type` over `interface` unless required.
- Wrap React props in `Readonly<>`.
- Infer types from schemas when possible.

**Example – Zod Schema + Type**

```ts
import { z } from "zod";

export const apiKeySchema = z.object({
	id: z.uuid(),
	name: z.string(),
	createdAt: z.string().datetime(),
});

export type ApiKey = z.infer<typeof apiKeySchema>;
```

---

## Next.js & Server Rules

- Use **App Router only** (no Pages Router).
- Pages and layouts must include appropriate metadata. At minimum, set the `title`, `description`, and `alternates.canonical`.
- Prefer server components by default.
- Add `"use client"` **only when necessary**.

### Server-only Rules

- Do not import server-only modules into client components.
- Client components must never access Supabase server clients.
- Server Actions must:
  - Live in `src/server/actions`
  - Use the `"use server"` directive

**Example – Server Action**

```ts
"use server";

export async function createApiKey(userId: string): Promise<void> {
	// server-side logic only
}
```

---

## Do Not Touch

- Do not modify pnpm-lock.yaml unless adding/removing dependencies is required.
- Do not hand-edit `src/types/supabase.ts` (generated).
- Do not hand-edit `src/types/md.generated.ts` (generated).

---


## Accessibility & UI

- Target **WCAG 2.2 AA** compliance.
- Prefer semantic HTML elements.
- Ensure all form controls have labels.
- Avoid div-only interactive elements without roles.
- Support both light and dark themes.

---

## Linting & Tooling

- Run:
  - `biome check --write`
  - `tsc -p tsconfig.json --noEmit`
- Do not disable lint rules unless absolutely necessary.
- If a rule is disabled, include a clear justification.

---

## Documentation

- Document public functions, components, and server actions using TypeScript doc comments.
- Update README or docs when adding significant features.

---

## Pull Requests

- Keep PRs focused and minimal.
- One feature or fix per PR.
- Reference related issues when applicable.
- Always run `pnpm run ci:verify` before submitting.

---

## Security & Privacy

- Never commit secrets.
- Validate and sanitize all user input.

## MCP Tool Usage

Tooling rules (MCP / Agent mode):

1) Minimize enabled tools:
   - Use the fewest MCP tools possible to complete the task.
   - Prefer enabling a single MCP server’s tools at a time (e.g., Next DevTools OR Supabase), not everything.
   - If multiple MCP servers are required, enable them sequentially and disable the previous server’s tools once finished.

2) Next DevTools MCP:
   - For any session/task involving Next.js project inspection, routing, builds, logs, or Next-specific debugging, call `next-devtools` -> `init` first.
   - Only after `init` completes, use other Next DevTools tools.

3) Supabase / GitHub / Vercel MCP:
   - Only use these tools when they are required for the request.
     - Supabase: schema inspection, table metadata, read-only SQL queries, Supabase docs.
     - Supabase is read-only: do not attempt inserts/updates/migrations.
     - GitHub: issues/PR context, repo search, Actions logs.
     - Vercel: deployment/platform info (VS Code only; OAuth).
   - If not needed, do not invoke them.
