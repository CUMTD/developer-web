# MTD Developer Website

**Live Site**: [mtd.dev](https://mtd.dev)

[![CI](https://github.com/CUMTD/developer-web/actions/workflows/ci.yml/badge.svg)](https://github.com/CUMTD/developer-web/actions/workflows/ci.yml)
![GitHub deployments](https://img.shields.io/github/deployments/CUMTD/developer-web/Production?logo=vercel&logoSize=auto&label=Vercel%20Deployment&labelColor=24292E&color=28A745&link=https%3A%2F%2Fmtd.dev%2F)
![GitHub Release](https://img.shields.io/github/v/release/CUMTD/developer-web?include_prereleases&sort=date&display_name=release&logo=release&labelColor=24292E&color=28A745&cacheSeconds=3600)

MTD's Open API documentation and developer account management portal.

---

## Table of Contents

- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Project Architecture](#-project-architecture)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Code Quality](#-code-quality)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Additional Resources](#-additional-resources)
- [Support](#-support)

---

## Tech Stack

### Core Framework
- **Next.js 16** (App Router)
- **React 19** - UI library
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library built on Radix UI
- **Lucide React** - Icon library
- **next-themes** - Theme management (light/dark mode)

### Backend & Data
- **Supabase** - PostgreSQL database and authentication
  - `@supabase/supabase-js` - JavaScript client
  - `@supabase/ssr` - Server-side rendering support
- **Zod 4** - Schema and environment variable validation

### Content & Documentation
- **MDX** - Markdown with React components for API documentation
- **rehype-pretty-code** - Syntax highlighting with Shiki
- **remark-gfm** - GitHub Flavored Markdown support

### Developer Tools
- **Biome** - Linter and formatter
- **TypeScript 5.9** - Static type checking
- **Husky** - Git hooks for pre-commit validation
- **lint-staged** - Run linters on staged files
- **Commitlint** - Enforce conventional commit messages

### Analytics & Monitoring
- **Plausible Analytics** - Privacy-friendly analytics
- **Vercel Speed Insights** - Performance monitoring

### Package Management
- **pnpm 10** - Fast, disk-efficient package manager
- **Node.js 22** - Runtime environment

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js v22.x** - [Download](https://nodejs.org/)
- **pnpm 10.28.1+** - Installed automatically via Corepack (see below)
- **Git** - [Download](https://git-scm.com/)

### Supabase Access
You'll need access to MTD's Supabase project for:
- Database connection
- Authentication
- API key management
-
---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/CUMTD/developer-web.git
cd developer-web
```

### 2. Enable Corepack (for pnpm)

Node.js includes Corepack to manage package managers. From the repository root:

```bash
corepack enable
```

This ensures you're using the correct pnpm version specified in `package.json`.

### 3. Install Dependencies

```bash
pnpm install
```

This will:
- Install all npm dependencies
- Set up Husky git hooks
- Prepare the development environment

### 4. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and fill in the required values (see [Environment Variables](#-environment-variables) section).

### 5. Start the Development Server

```bash
pnpm dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

---

## Development Workflow

### Daily Development

1. **Start the dev server**: `pnpm dev`
2. **Make changes** to TypeScript, React components, or MDX files
3. **Hot reload** happens automatically
4. **Commit** your changes (git hooks will run linters automatically)

### Before Committing

Git hooks (via Husky) will automatically run:
- **Biome** - Format and lint staged files
- **TypeScript** - Type check all `.ts` and `.tsx` files
- **Commitlint** - Validate commit message format

To manually check before committing:

```bash
pnpm run ci:verify
```

### Working with the Database

When database schema changes supabase:typegen needs to be run.
This happens automatically when running `pnpm build` or `pnpm dev`.
If you need to trigger typegen manually:

```bash
# Regenerate Supabase types
pnpm run typegen:supabase
```

**Note**: Do not manually edit `src/types/supabase.ts` - it's auto-generated.

### Working with API Documentation

API documentation is written in MDX format in `src/content/api/`:

1. Add/edit MDX files in `src/content/api/`
2. Run `pnpm run typegen:md` to regenerate the content index
3. Restart dev server to see changes

---

## Project Architecture

This project uses a **layer-first** architecture with **explicit boundaries**:

### Architectural Principles

1. **Routes orchestrate, don't contain business logic**
2. **UI components are reusable and client-safe**
3. **All server-only logic lives in `src/server`**
4. **Content is rendered by routes, not embedded in them**

### Directory Structure

```
src/
  app/                        # Next.js App Router (routes only)
    account/                  # Account management pages
    garage/                   # Developer tools/playground
    guides/                   # Guide pages
    reference/                # API reference documentation
    terms-of-use/             # Terms of use page
    layout.tsx                # Root layout
    page.tsx                  # Homepage

  components/
    ui/                       # shadcn primitives ONLY (DO NOT edit manually)
    common/                   # App-specific reusable UI components
      layout/                 # Navigation, header, footer
      auth/                   # Authentication UI components

  content/
    api/                      # MDX files and metadata for API docs
      routes/                 # Route-specific documentation
      stops/                  # Stop-specific documentation
      vehicles/               # Vehicle-specific documentation
      ...

  contexts/                   # React contexts (auth, theme, etc.)

  env/
    schema.ts                 # Zod schemas for environment variables
    global.ts                 # Client-safe env vars (NEXT_PUBLIC_*)
    server.ts                 # Server-only env vars

  helpers/                    # Utility functions

  hooks/                      # Shared React hooks

  lib/
    utils/                    # UI helpers (cn(), etc.)
    temporal/                 # Date/time utilities

  server/                     # SERVER-ONLY CODE
    actions/                  # Server actions grouped by domain
      api-keys/               # API key management
      auth/                   # Authentication actions
      user/                   # User management
    auth/                     # Auth helpers (requireUserId, session)
    supabase/                 # Supabase client factories

  types/                      # Typescript types
    md.generated.ts           # Generated MDX content types (DO NOT edit)
    supabase.ts               # Generated Supabase types (DO NOT edit)
```

### Layer Rules

| Layer                                   | Purpose              | Can Import From               | Cannot Import From               |
|-----------------------------------------|----------------------|-------------------------------|----------------------------------|
| `app/`                                  | Routing & layouts    | All layers                    | None                             |
| `components/ui/` & `components/common/` | Shared UI components | `lib/`, `hooks/`, `contexts/` | `server/`, `app/`                |
| `server/`                               | Server-only logic    | `types/`, `env/server.ts`     | `components/`, client code       |
| `content/`                              | Static content       | None                          | All                              |
| `lib/` & `hooks/`                       | Utilities            | Each other                    | `server/`, `app/`, `components/` |

**Note**: Route-local components within `app/` (prefixed with `_components/`) can import from their parent route but should avoid deep coupling to other routes.

**Critical**:
- Never import from `src/server` in client components!
- All files in `/src/server/*` are server-only and cannot be used in client components.
- Types needed by both client and server are extracted to `/src/types/` (e.g., `api-key-types.ts`, `terms-of-use-types.ts`, `developer-types.ts`).
- Server actions should NOT re-export types - components should import types directly from `@t/`.

---

## Environment Variables

### Required Variables

Create a `.env` file with the following:

```bash
# Application Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_MTD_API_URL=https://api.mtd.dev

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_PROJECT_REF=your-project-ref
SUPABASE_ACCESS_TOKEN=your-access-token

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=mtd.dev
```

### Variable Categories

- **`NEXT_PUBLIC_*`** - Exposed to the browser (client-safe)
- **Without `NEXT_PUBLIC_`** - Server-only (never sent to browser)

### Validation

Environment variables are validated at build time using Zod schemas:
- `src/env/global.ts` - Client-safe variables. Can be used anywhere. No secrets should be stored here.
- `src/env/server.ts` - Server-only variables. Cannot be used in client components.
- `src/env/schema.ts` - Shared schemas

Run validation manually:

```bash
pnpm run validate:env
```

---

## Available Scripts

### Development

```bash
pnpm dev          # Start development server at localhost:3000
pnpm build        # Build for production
pnpm start        # Start production server
```

### Code Quality

```bash
pnpm run ci:verify    # Run all checks (biome + tsc) - required before PR
pnpm run lint         # Lint and auto-fix with Biome
pnpm run format       # Format code with Biome
pnpm run typecheck    # Type check with TypeScript
```

### Type Generation

```bash
pnpm run typegen:supabase  # Generate types from Supabase schema
pnpm run typegen:md        # Generate MDX content index
```

### Utilities

```bash
pnpm run clean             # Clean build artifacts
pnpm run validate:env      # Validate environment variables
```

### Pre-flight Checks

Before running dev/build, these run automatically:
- Environment validation
- MDX type generation
- Supabase type generation

---

## Code Quality

### Biome Configuration

This project uses **Biome** instead of ESLint + Prettier for:
- **Linting** - Code quality rules
- **Formatting** - Consistent code style
- **Import sorting** - Organized imports

#### Code Style Rules

- **Indentation**: Tabs (width: 2)
- **Line width**: 120 characters
- **Semicolons**: Required
- **Quotes**: Enforced by Biome
- **Control blocks**: Always use curly braces

### Type Safety

- **No `any` types** - Use specific types whenever possible. Prefer or `unknown` to `any` if types are truly not known.
- **Strict mode enabled** - TypeScript strict checks
- **Import types separately** - Use `import type` for type-only imports

### Git Hooks

Pre-commit hooks (via Husky) automatically:
1. Format and lint staged files
2. Run TypeScript type checking
3. Validate commit messages (Conventional Commits)

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]
```

Examples:
- `feat(api): add new vehicle endpoint`
- `fix(auth): resolve session expiration bug`
- `docs(readme): update installation steps`
- `chore(deps): update dependencies`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

---

## Deployment

### Hosting

The application is hosted on **Vercel** and automatically deploys:

- **Production**: `main` branch → [mtd.dev](https://mtd.dev)
- **Preview**: Pull requests → Temporary preview URLs

### Build Process

1. Install dependencies
2. Validate environment variables
3. Generate types (Supabase + MDX)
4. Build Next.js application
5. Deploy to Vercel

### CI/CD Pipeline

GitHub Actions runs on every push and PR:

- **CI Workflow** (`.github/workflows/ci.yml`):
  - Biome linting
  - TypeScript type checking
  - Automated checks

- **CodeQL** (`.github/workflows/codeql.yml`):
  - Security vulnerability scanning

### Environment Variables on Vercel

Set these in Vercel project settings:
- All `NEXT_PUBLIC_*` variables
- All `SUPABASE_*` variables
- Production URLs (replace localhost)

---

## Contributing

### Development Process

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** following the architecture guidelines

3. **Commit** with conventional commit messages

4. **Run verification**:
   ```bash
   pnpm run ci:verify
   ```

5. **Push** and create a Pull Request

### Pull Request Guidelines

- Keep PRs focused and minimal
- One feature or fix per PR
- Reference related issues
- Ensure all CI checks pass
- Request review from team members

### Code Review Checklist

- [ ] Follows layer-first architecture
- [ ] No server imports in client components
- [ ] Environment variables properly validated
- [ ] Types are explicit (no `any`)
- [ ] Biome checks pass
- [ ] TypeScript compiles without errors
- [ ] Commit messages follow conventions

### Testing Changes Locally

1. **UI Changes**: Test in both light and dark modes
2. **Auth Changes**: Test login/logout flows
3. **API Changes**: Verify with actual API calls
4. **Responsive**: Test on mobile, tablet, desktop

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Biome Documentation](https://biomejs.dev)

---

## 📞 Support

For questions or issues:
- **Bug Reports**: Create a GitHub issue
- **Feature Requests**: Create a GitHub issue with label `enhancement`

---

## License

See [LICENSE](LICENSE) file for details.

---
