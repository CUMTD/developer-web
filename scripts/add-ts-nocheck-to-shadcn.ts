import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 *
 * Prepend "// @ts-nocheck" to all .ts/.tsx files under the shadcn UI directory,
 * skipping files that already contain it.
 *
 */

import componentsConfig from "../components.json" with { type: "json" };

const componentsDir = componentsConfig.aliases.ui.replace(/^@shared\//, "src/shared/");

function patchFile(filePath: string) {
	const original = readFileSync(filePath, "utf8");

	// Handle possible BOM so startsWith works
	const text = original.startsWith("\uFEFF") ? original.slice(1) : original;

	// Already patched?
	if (/^\s*\/\/\s*@ts-nocheck/.test(text)) return;

	writeFileSync(filePath, `// @ts-nocheck\n// tailwindcss-disable suggestCanonicalClasses\n${original}`);
	console.log("patched", filePath);
}

function walk(dir: string) {
	let entries: string[];
	try {
		entries = readdirSync(dir);
	} catch {
		// Directory may not exist on first run
		return;
	}

	for (const name of entries) {
		const p = join(dir, name);
		const stats = statSync(p);
		if (stats.isDirectory()) {
			walk(p);
		} else if (/\.(ts|tsx)$/i.test(name)) {
			patchFile(p);
		}
	}
}

walk(componentsDir);
