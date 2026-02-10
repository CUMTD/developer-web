import { access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

/**
 * Check if Supabase types file exists in site/types.
 * This is used during prebuild/predev for the site.
 *
 * The supabase types file is committed to git, so during normal builds (CI, local development),
 * we don't need to regenerate it. To regenerate, use `pnpm run typegen:supabase:force` in the site package.
 *
 * Usage:
 *   - Default: Prints helpful message and exits 0 if file exists, 1 if missing
 *   - With --silent: Exits 0 if file exists, 1 if missing (no output)
 */

const SILENT = process.argv.includes("--silent");

const cwd = process.cwd();
const supabaseTypesFile = path.join(cwd, "types", "supabase.ts");

async function fileExists(filePath: string): Promise<boolean> {
	try {
		await access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function main() {
	const exists = await fileExists(supabaseTypesFile);

	if (exists) {
		if (!SILENT) {
			console.log("✅ Supabase types file already exists (committed to git)");
			console.log("   To regenerate from Supabase, run: pnpm run typegen:supabase:force");
		}
		process.exit(0);
	}

	if (!SILENT) {
		console.error("❌ Supabase types file is missing!");
		console.error(`   Expected file: ${supabaseTypesFile}`);
		console.error("");
		console.error("   This file should be committed to git.");
		console.error("   To generate it, run: pnpm run typegen:supabase:force");
		console.error("   (Requires valid SUPABASE_PROJECT_REF and Supabase CLI auth)");
	}
	process.exit(1);
}

main().catch((err) => {
	if (!SILENT) {
		console.error("❌ Error checking Supabase types file:", err);
	}
	process.exit(1);
});
