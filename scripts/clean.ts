import fs from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const args = process.argv.slice(2);

const CLEAN_NODE_MODULES = args.includes("--with-modules");

const dirs = args.filter((a) => !a.startsWith("--"));

if (dirs.length === 0) {
	console.error("Clean failed: Please provide at least one directory to clean.");
	process.exit(1);
}

const targets: string[] = dirs.map((dir) => path.join(cwd, dir));

if (CLEAN_NODE_MODULES) {
	targets.push(path.join(cwd, "node_modules"));
}

try {
	for (const target of targets) {
		await fs.rm(target, { recursive: true, force: true });
		console.log(`Cleaned: "${path.relative(cwd, target)}"`);
	}
} catch (err) {
	console.error("Clean failed:", err);
	process.exit(1);
}
