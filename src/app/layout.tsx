import { clientEnv } from "@shared/config/env.client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { Overpass, Overpass_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "server-only";
import "./globals.css";

const overpass = Overpass({
	subsets: ["latin"],
	variable: "--font-sans",
});

const overpassMono = Overpass_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const viewport: Viewport = {
	themeColor: "#002f87",
	width: "device-width",
	initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
	const defaultTitle = "MTD Developer";
	const defaultDescription = "MTD Developer API."; // TODO: Update description
	const metadataBase = clientEnv.NEXT_PUBLIC_BASE_URL;

	return {
		title: {
			default: defaultTitle,
			template: `%s | ${defaultTitle}`,
		},
		description: defaultDescription,
		metadataBase,
		openGraph: {
			type: "website",
			...(metadataBase && { url: metadataBase }),
			siteName: defaultTitle,
			title: defaultTitle,
			description: defaultDescription,
		},
		twitter: {
			card: "summary",
			title: defaultTitle,
			description: defaultDescription,
		},
	};
}

export default async function RootLayout({ children }: { children: ReactNode }) {
	const shouldInjectToolbar = process.env.NODE_ENV === "development";

	return (
		<html lang="en" className={clsx(overpass.variable, overpassMono.variable, "antialiased")}>
			<body>
				{children}
				{shouldInjectToolbar && <VercelToolbar />}
				<SpeedInsights />
			</body>
		</html>
	);
}
