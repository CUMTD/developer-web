# Release Process

This repository uses [Changesets](https://github.com/changesets/changesets) for version management and publishing to npm. We use [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers) for secure, token-less authentication.

## How it works

1. **Adding a changeset**: When you make changes to any of the publishable packages (`@mtd.org/developer-api-spec`, `@mtd.org/developer-api-types`, `@mtd.org/developer-api-client`), you create a changeset file describing your changes.

2. **Automatic Release PRs**: When changesets are merged to `main`, a Release PR is automatically created/updated with version bumps and changelog updates.

3. **Publishing**: When the Release PR is merged, packages are automatically built and published to npm using npm Trusted Publishing (OIDC).

## Creating a changeset

When you make changes that should be published (e.g., bug fixes, new features), run:

```bash
pnpm changeset
```

This will:
- Ask which packages have changed
- Ask what type of change (major, minor, patch)
- Ask for a summary of the changes

The command creates a markdown file in `.changeset/` that describes your changes.

### Changeset Guidelines

- **Major**: Breaking changes (e.g., removing a field, changing API contracts)
- **Minor**: New features (e.g., adding new endpoints to the spec, new types)
- **Patch**: Bug fixes, documentation updates, internal refactors

### Example Workflow

```bash
# 1. Make your changes to packages
vim packages/types/src/index.ts

# 2. Create a changeset
pnpm changeset
# Select: @mtd.org/developer-api-types
# Select: minor (new feature)
# Enter: "Add support for new route type"

# 3. Commit both your changes AND the changeset
git add packages/types/src/index.ts .changeset/*.md
git commit -m "feat(types): add support for new route type"

# 4. Push to your branch and create a PR
git push origin your-branch
```

## Release Process

### Automated (Recommended)

1. **Merge PRs with changesets to `main`**
   - The Release workflow automatically creates/updates a "Version Packages" PR
   - This PR includes version bumps and changelog updates

2. **Review and merge the Release PR**
   - Check that versions are bumped correctly
   - Review the generated changelogs
   - When merged, packages are automatically published to npm

### Manual (Emergency Only)

If you need to publish manually:

```bash
# 1. Update versions
pnpm changeset:version

# 2. Build and publish
pnpm release
```

**Note**: Manual publishing requires npm authentication and won't use Trusted Publishing.

## npm Trusted Publishing Setup

Trusted Publishing eliminates the need for long-lived npm tokens by using OIDC authentication.

### Initial Setup (One-time per package)

For each package (`@mtd.org/developer-api-spec`, `@mtd.org/developer-api-types`, `@mtd.org/developer-api-client`):

1. Go to https://www.npmjs.com/ and log in
2. Navigate to the package settings
3. Find the "Trusted Publisher" section
4. Add a new trusted publisher:
   - **Provider**: GitHub Actions
   - **Organization**: CUMTD
   - **Repository**: developer-web
   - **Workflow**: release.yml
   - **Environment**: (leave empty)

### Requirements

- npm CLI 9.5.0 or higher (Node 22 bundles npm 10.x — already satisfied)
- GitHub-hosted runners (already used)
- Workflow permissions: `id-token: write` (already configured)

### How it Works

1. GitHub Actions generates a short-lived OIDC token
2. npm verifies the token matches the registered trusted publisher
3. Publishing succeeds without any long-lived tokens

## Troubleshooting

### "No changesets present"

If you merge a PR without a changeset, no release PR will be created. Add a changeset to your next PR.

### "Published failed" / `E404 Not Found`

npm returns a **misleading `404`** (not `401`/`403`) whenever the OIDC authentication handshake fails. This does **not** mean the package is missing. The most common causes:

1. **`changesets/action` OIDC JWT conflict**: `changesets/action@v1` sets `NODE_AUTH_TOKEN` to a raw GitHub OIDC JWT and writes it into a temp `.npmrc` as `_authToken`. npm cannot use a raw GitHub JWT as an auth token — it needs to perform its own OIDC exchange. The `release` script unsets `NODE_AUTH_TOKEN` and `NPM_CONFIG_USERCONFIG` before calling `changeset publish`, giving npm a clean slate to exchange the OIDC token natively. **Do not remove the `unset` commands from the `release` script.**

2. **`registry-url` in `setup-node` conflicts with OIDC**: If `actions/setup-node` is configured with `registry-url:`, it writes an `_authToken` entry into `.npmrc` which blocks npm's OIDC token exchange. The release workflow intentionally omits `registry-url` for this reason — do not add it back.

3. **Trusted Publisher configuration mismatch**: Verify on npmjs.com that each package has a Trusted Publisher with exactly: Provider = GitHub Actions, Org = `CUMTD`, Repo = `developer-web`, Workflow = `release.yml`, Environment = _(empty)_.

> **Do not** add `NPM_TOKEN` or `NODE_AUTH_TOKEN` to the release workflow env — OIDC requires these to be absent when npm performs its exchange.

### "Version conflicts"

If you manually edited version numbers in `package.json`, changesets may conflict. Let changesets manage all version numbers.

## Best Practices

1. **Always create changesets**: For any change to publishable packages
2. **Write clear summaries**: Your changeset summary becomes the changelog entry
3. **Group related changes**: Multiple changesets can exist for a single release
4. **Don't manually edit versions**: Let changesets handle version bumping
5. **Test before releasing**: Ensure CI passes before merging Release PRs

## Resources

- [Changesets Documentation](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
- [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers)
- [Changesets Action](https://github.com/changesets/action)
