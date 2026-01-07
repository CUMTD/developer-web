// ./.lintstagedrc.mjs
import path from "node:path";

const quote = (p) => `"${p}"`;

const toRepoRelative = (filenames) => {
	return filenames.map((f) => path.relative(process.cwd(), f)).map((f) => f.split(path.sep).join("/"));
};

const isIgnored = (f) => {
	return (
		f.includes("/.next/") ||
		f.includes("/dist/") ||
		f.includes("/build/") ||
		f.includes("/out/") ||
		f.includes("/coverage/")
	);
};

const biomeCheck = (filenames) => {
	const files = toRepoRelative(filenames)
		.filter((f) => {
			return !isIgnored(f);
		})
		.map(quote)
		.join(" ");

	if (!files) {
		return 'node -e "process.exit(0)"';
	}

	return `pnpm exec biome check --write --no-errors-on-unmatched --files-ignore-unknown=true --colors=off ${files}`;
};

export default {
	// Typecheck website if any website TS/TSX files are staged
	"**/*.{ts,tsx}": () => ["pnpm exec tsc -p tsconfig.json --noEmit"],
	// Format/lint staged files (skip generated output)
	"**/*.{js,jsx,ts,tsx,md,json}": biomeCheck,
};
