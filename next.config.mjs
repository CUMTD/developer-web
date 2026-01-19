import path from "node:path";
import { fileURLToPath } from "node:url";
import nextMDX from "@next/mdx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('rehype-pretty-code').Options} */
const options = {
	keepBackground: false,
};

const withMDX = nextMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: ["remark-gfm"],
		rehypePlugins: [["rehype-pretty-code", options]],
	},
});

/** @type {import("next").NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	reactStrictMode: true,
	distDir: ".next",
	outputFileTracingRoot: path.join(__dirname, "./"),
	appDir: "src",
};

export default withMDX(nextConfig);
