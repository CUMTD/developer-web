import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{ts,tsx,js,jsx,md,mdx,html}"],
	theme: {
		extend: {},
	},
	plugins: [typography],
} satisfies Config;
