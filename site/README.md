# MTD Developer Website

![GitHub deployments](https://img.shields.io/github/deployments/CUMTD/developer-web/Production?logo=vercel&logoSize=auto&label=Vercel%20Deployment&labelColor=24292E&color=28A745&link=https%3A%2F%2Fmtd.dev%2F)

**Live Site**: [mtd.dev](https://mtd.dev)

This project is the **documentation site and developer account portal** for MTD's public API.

It is a Next.js 16 (App Router) application living inside a pnpm workspace.

---

## Location in Monorepo

```
/site
```

All commands should be run from the repository root.

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Supabase
- Zod
- MDX
- Biome

---

## Getting Started

From the repository root:

```
pnpm install
pnpm dev
```

The site will be available at http://localhost:3000

---

## Architecture Overview

This project follows a **layer-first architecture**.

```
site/
  app/          # Routes only
  components/   # Reusable UI
  content/      # MDX API docs
  contexts/
  env/
  helpers/
  hooks/
  lib/
  public/
  server/       # Server-only logic
  types/        # Shared & generated types
```

### Critical Rules

- Never import from `server/` in client components
- Routes orchestrate; they do not contain business logic
- UI components are client-safe and reusable
- Generated files in `types/` must not be edited

---

## Generated Files (Do Not Edit)

- `types/supabase.ts`
- `types/md.generated.ts`

These are regenerated automatically during dev and build.

---

## Environment Variables

Copy:

```
cp .env.example .env
```

Validate:

```
pnpm run validate:env
```

---

## Useful Commands

```
pnpm dev
pnpm build
pnpm ci:verify
pnpm typegen:supabase
pnpm typegen:md
```

---

## Content Authoring

API documentation is written in:

```
site/content/api/
```

After editing MDX:

```
pnpm run typegen:md
```

---

## AI / Copilot Guidance

See:

```
.github/copilot-instructions.md
```
