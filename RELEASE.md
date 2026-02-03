# Release Process

This repository uses [Changesets](https://github.com/changesets/changesets) for version management and publishing to npm. We use [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers) for secure, token-less authentication.

## How it works

1. **Adding a changeset**: When you make changes to any of the publishable packages (`@mtd/developer-api-spec`, `@mtd/developer-api-types`, `@mtd/developer-api-client`), you create a changeset file describing your changes.

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
# Select: @mtd/developer-api-types
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

For each package (`@mtd/developer-api-spec`, `@mtd/developer-api-types`, `@mtd/developer-api-client`):

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

- npm CLI version 11.5.1 or higher (automatically installed in CI)
- GitHub-hosted runners (already used)
- Workflow permissions: `id-token: write` (already configured)

### How it Works

1. GitHub Actions generates a short-lived OIDC token
2. npm verifies the token matches the registered trusted publisher
3. Publishing succeeds without any long-lived tokens

## Troubleshooting

### "No changesets present"

If you merge a PR without a changeset, no release PR will be created. Add a changeset to your next PR.

### "Published failed"

Check that:
1. Trusted publishing is configured for the package on npmjs.com
2. The workflow file name matches exactly (`release.yml`)
3. The organization and repository names match exactly

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
