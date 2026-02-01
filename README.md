# MTD Developer API Docs & Tools

[![CI](https://github.com/CUMTD/developer-web/actions/workflows/ci.yml/badge.svg)](https://github.com/CUMTD/developer-web/actions/workflows/ci.yml)
![GitHub deployments](https://img.shields.io/github/deployments/CUMTD/developer-web/Production?logo=vercel&logoSize=auto&label=Vercel%20Deployment&labelColor=24292E&color=28A745&link=https%3A%2F%2Fmtd.dev%2F)
![GitHub Release](https://img.shields.io/github/v/release/CUMTD/developer-web?include_prereleases&sort=date&display_name=release&logo=release&labelColor=24292E&color=28A745&cacheSeconds=3600)

This repository is a **pnpm monorepo** containing everything related to MTD's public Developer API:

- The **documentation and developer portal** (Next.js app)
- The **OpenAPI specification** package
- The **TypeScript types** package
- The **API client** package built from the spec and types
- The **tooling** used to generate and maintain those packages

---

## Repository Structure

```
/
  site/                 # Next.js documentation site & developer portal
  packages/
    spec/               # @mtd/developer-api-spec (OpenAPI spec package)
    types/              # @mtd/developer-api-types (generated TS types)
    client/             # @mtd/developer-api-client (API client)
  tools/                # Generators used to build the packages
```

The `packages/*` projects are **published to npm** and intended for external developers building against the API.

The `site` project is the public documentation and account portal hosted at https://mtd.dev.

---

## Prerequisites

- Node.js v22.x
- Corepack enabled
- pnpm (managed via Corepack)

```
corepack enable
pnpm install
```

---

## Common Workspace Commands

All commands are run from the repository root.

### Development

```
pnpm dev
```

Starts all projects that expose a dev script (primarily the `site`).

### Build Everything

```
pnpm build
```

Builds packages and the site in dependency order.

### Code Quality

```
pnpm ci:verify
pnpm lint
pnpm format
pnpm typecheck
```

### Generation

```
pnpm gen
pnpm typegen
```

Runs generators in `/tools` and type generation in relevant projects.

---

## Packages

| Package                     | Purpose                                  | Published |
|-----------------------------|------------------------------------------|-----------|
| `@mtd/developer-api-spec`   | OpenAPI spec for the public API          | Yes       |
| `@mtd/developer-api-types`  | Generated TypeScript types from the spec | Yes       |
| `@mtd/developer-api-client` | Type-safe API client                     | Yes       |

These packages are built using tooling in `/tools` and are not directly used by the `site` at runtime. The site documents how to use them.

---

## AI / Copilot Guidance

AI agents and contributors should read:

```
.github/copilot-instructions.md
```

This file defines the architectural rules and boundaries of the project.

---

## Deployment

The documentation site (`/site`) is deployed to Vercel. CI and releases are handled via GitHub Actions.

---

## License

See `LICENSE`.
