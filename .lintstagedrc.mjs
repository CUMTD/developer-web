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

function stagedFilesUnder(filenames, prefix) {
	return (
		toRepoRelative(filenames).filter((f) => {
			return !isIgnored(f) && f.startsWith(prefix);
		}).length > 0
	);
}

export default {
	"**/*.{ts,tsx}": (filenames) => {
		const cmds = [];

		if (stagedFilesUnder(filenames, "site")) {
			cmds.push("pnpm -w exec tsc -p site/tsconfig.json --noEmit");
		}

		if (stagedFilesUnder(filenames, "packages/types/")) {
			cmds.push("pnpm -w exec tsc -p packages/types/tsconfig.json --noEmit");
		}

		if (stagedFilesUnder(filenames, "packages/spec/")) {
			cmds.push("pnpm -w exec tsc -p packages/spec/tsconfig.json --noEmit");
		}

		if (stagedFilesUnder(filenames, "packages/client/")) {
			cmds.push("pnpm -w exec tsc -p packages/client/tsconfig.json --noEmit");
		}

		if (stagedFilesUnder(filenames, "tools/")) {
			cmds.push("pnpm -w exec tsc -p tsconfig.json --noEmit");
		}

		// If TS/TSX staged but none under website/cms (rare), do nothing.
		if (cmds.length === 0) {
			cmds.push('node -e "process.exit(0)"');
		}

		return cmds;
	},
	// Format/lint staged files (skip generated output)
	"**/*.{js,jsx,ts,tsx,md,json}": biomeCheck,
};
