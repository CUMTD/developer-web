# Initial NPM Package Publishing Setup

This document provides step-by-step instructions for the initial setup of npm Trusted Publishing for the three packages in this repository.

## Prerequisites

- npm account with publish access to the `@mtd` scope (or create new packages)
- Two-factor authentication enabled on your npm account
- Repository admin access on GitHub

## One-Time Setup Steps

### 1. Publish Initial Versions (First Time Only)

If these packages have never been published to npm before, you need to publish them manually once:

```bash
# Build all packages
pnpm build

# Login to npm (if not already logged in)
npm login

# Publish each package individually
cd packages/spec
npm publish --access public

cd ../types
npm publish --access public

cd ../client
npm publish --access public
```

After this initial manual publish, all future releases will be automated via GitHub Actions.

### 2. Configure npm Trusted Publishing

For **each** of the three packages, follow these steps:

#### For `@mtd/developer-api-spec`:

1. Go to https://www.npmjs.com/package/@mtd/developer-api-spec/access
2. Click on "Trusted Publishers" in the left sidebar
3. Click "Add a trusted publisher"
4. Configure:
   - **Provider**: GitHub Actions
   - **Organization**: `CUMTD`
   - **Repository**: `developer-web`
   - **Workflow file**: `release.yml`
   - **Environment** (optional): leave empty

5. Click "Add"

#### For `@mtd/developer-api-types`:

1. Go to https://www.npmjs.com/package/@mtd/developer-api-types/access
2. Follow the same steps as above

#### For `@mtd/developer-api-client`:

1. Go to https://www.npmjs.com/package/@mtd/developer-api-client/access
2. Follow the same steps as above

### 3. Test the Workflow

After setting up Trusted Publishing:

1. Create a test changeset:
   ```bash
   pnpm changeset
   ```

2. Select a package (e.g., `@mtd/developer-api-spec`)
3. Select `patch` for the version bump
4. Enter a summary: "Test changeset for automated publishing"

5. Commit and push to a branch:
   ```bash
   git add .changeset/*.md
   git commit -m "add: test changeset"
   git push origin your-branch
   ```

6. Create a PR and merge it to `main`

7. The Release workflow will:
   - Create a "Version Packages" PR with version bumps
   - When you merge that PR, packages will be published to npm automatically

### 4. Verify Publishing

After merging the Release PR:

1. Check the GitHub Actions logs to ensure publishing succeeded
2. Verify the new versions are available on npm:
   - https://www.npmjs.com/package/@mtd/developer-api-spec
   - https://www.npmjs.com/package/@mtd/developer-api-types
   - https://www.npmjs.com/package/@mtd/developer-api-client

## Troubleshooting

### "Package does not exist" error

If you see this error, the package needs to be published manually first (see Step 1).

### "Trusted publisher not found" error

Double-check that:
- The workflow file is exactly `release.yml`
- The organization is exactly `CUMTD`
- The repository is exactly `developer-web`
- You configured it on the correct package

### "Permission denied" error

Ensure:
- Your npm account has publish access to the `@mtd` scope
- Two-factor authentication is enabled
- Trusted Publishing is configured correctly

### Workflow doesn't trigger

Check that:
- The PR was merged to the `main` branch
- The workflow file is in `.github/workflows/release.yml`
- The repository has the correct permissions

## Security Notes

- **No npm tokens are stored**: Trusted Publishing uses OIDC for authentication
- **Scoped to specific workflow**: Only the `release.yml` workflow can publish
- **Auditable**: All publishes are logged in GitHub Actions
- **Provenance**: npm automatically adds provenance attestations to published packages

## Additional Resources

- [npm Trusted Publishing Documentation](https://docs.npmjs.com/trusted-publishers)
- [Changesets Documentation](https://github.com/changesets/changesets)
- [GitHub OIDC Documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
