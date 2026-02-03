import { access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

/**
 * Check if OpenAPI spec files exist in packages/spec/dist.
 * This is used as the build command for @mtd/developer-api-spec.
 *
 * The spec files are committed to git, so during normal builds (CI, local development),
 * we don't need to regenerate them. To regenerate, use `pnpm run gen:force` in the spec package.
 *
 * Usage:
 *   - Default: Prints helpful message and exits 0 if files exist, 1 if missing
 *   - With --silent: Exits 0 if files exist, 1 if missing (no output)
 */

const SILENT = process.argv.includes("--silent");

const repoRoot = path.resolve(__dirname, "..");
const specDistDir = path.join(repoRoot, "packages", "spec", "dist");
const openApiJson = path.join(specDistDir, "openapi.json");
const openApiYml = path.join(specDistDir, "openapi.yml");

async function fileExists(filePath: string): Promise<boolean> {
	try {
		await access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function main() {
	const jsonExists = await fileExists(openApiJson);
	const ymlExists = await fileExists(openApiYml);

	if (jsonExists && ymlExists) {
		if (!SILENT) {
			console.log("✅ OpenAPI spec files already exist (committed to git)");
			console.log("   To regenerate from source, run: pnpm run gen:force");
		}
		process.exit(0);
	}

	if (!SILENT) {
		console.error("❌ OpenAPI spec files are missing!");
		console.error(`   Expected files:`);
		console.error(`   - ${openApiJson}`);
		console.error(`   - ${openApiYml}`);
		console.error("");
		console.error("   These files should be committed to git.");
		console.error("   To generate them, run: pnpm run gen:force");
		console.error("   (Requires network access to OPENAPI_SPEC_URL)");
	}
	process.exit(1);
}

main().catch((err) => {
	if (!SILENT) {
		console.error("❌ Error checking spec files:", err);
	}
	process.exit(1);
});
