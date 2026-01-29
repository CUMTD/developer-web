import nextMDX from "@next/mdx";
import { withSentryConfig } from "@sentry/nextjs";
import createWithVercelToolbar from "@vercel/toolbar/plugins/next";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

const nextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	reactStrictMode: true,
	distDir: ".next",
	outputFileTracingRoot: path.join(__dirname, "./"),
	experimental: {
		authInterrupts: true,
	},
};

const withVercelToolbar = createWithVercelToolbar();
const withVercelToolBarConfig = withVercelToolbar(nextConfig);

export default withSentryConfig(withMDX(withVercelToolBarConfig), {
	// For all available options, see:
	// https://www.npmjs.com/package/@sentry/webpack-plugin#options

	org: "ridemtd",

	project: "developer-web",

	// Only print logs for uploading source maps in CI
	silent: !process.env.CI,

	// For all available options, see:
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

	// Upload a larger set of source maps for prettier stack traces (increases build time)
	widenClientFileUpload: true,

	// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
	// This can increase your server load as well as your hosting bill.
	// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
	// side errors will fail.
	tunnelRoute: "/monitoring",

	webpack: {
		// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
		// See the following for more information:
		// https://docs.sentry.io/product/crons/
		// https://vercel.com/docs/cron-jobs
		automaticVercelMonitors: true,

		// Tree-shaking options for reducing bundle size
		treeshake: {
			// Automatically tree-shake Sentry logger statements to reduce bundle size
			removeDebugLogging: true,
		},
	},
});
