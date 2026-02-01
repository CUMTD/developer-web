// ./.lintstagedrc.mjs
import path from "node:path";

/**
 * @param {string} p
 * @returns {string}
 */
const quote = (p) => `"${p}"`;

/**
 * @param {string[]} filenames
 * @returns {string[]}
 */
const toRepoRelative = (filenames) => {
	return filenames.map((f) => path.relative(process.cwd(), f)).map((f) => f.split(path.sep).join("/"));
};

/**
 * @param {string} f
 * @returns {boolean}
 */
const isIgnored = (f) => {
	return (
		f.includes("/.next/") ||
		f.includes("/dist/") ||
		f.includes("/build/") ||
		f.includes("/out/") ||
		f.includes("/coverage/")
	);
};

/**
 * @param {string[]} filenames
 * @returns {string}
 */
function biomeCheck(filenames) {
	const filesArray = toRepoRelative(filenames).filter((f) => {
		return !isIgnored(f);
	});

	console.log("Biome checking files:", filesArray);

	const files = filesArray.map(quote).join(" ");

	if (!files) {
		return 'node -e "process.exit(0)"';
	}

	return `pnpm -w exec biome check --write --no-errors-on-unmatched --files-ignore-unknown=true --colors=off .`;
}

/**
 * @param {string[]} filenames
 * @param {string} prefix
 * @returns {boolean}
 */
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

		// If TS/TSX staged but none under website/cms (rare), do nothing.
		if (cmds.length === 0) {
			cmds.push('node -e "process.exit(0)"');
		}

		return cmds;
	},
	"**/*.{js,jsx,ts,tsx,md,json}": biomeCheck,
};
