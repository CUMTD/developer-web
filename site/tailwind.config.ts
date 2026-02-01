import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
	content: ["./**/*.{ts,tsx,js,jsx,md,mdx,html}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"var(--font-sans)",
					"-apple-system",
					"BlinkMacSystemFont",
					'"Segoe UI"',
					"Roboto",
					'"Helvetica Neue"',
					"Arial",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
				],
				mono: [
					"var(--font-mono)",
					"ui-monospace",
					"SFMono-Regular",
					'"SF Mono"',
					"Menlo",
					"Consolas",
					'"Liberation Mono"',
					"monospace",
				],
			},
		},
	},
	plugins: [typography],
} satisfies Config;
