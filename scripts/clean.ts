import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();

const dirsToClean = [".next"];

const targets = dirsToClean.map((dir) => path.join(projectRoot, dir));

try {
	for (const target of targets) {
		await fs.rm(target, { recursive: true, force: true });
		console.log(`✅ Cleaned: "${path.relative(projectRoot, target)}"`);
	}
} catch (err) {
	console.error("❌ Clean failed:", err);
	process.exit(1);
}
