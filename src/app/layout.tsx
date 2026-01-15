import { ThemeProvider } from "@components/theme-provider";
import { serverEnv } from "@shared/config/env.server";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import type { Metadata, Viewport } from "next";
import { Overpass, Overpass_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "server-only";
import "./globals.css";
import NavMenu from "./NavMenu";

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
	const metadataBase = serverEnv.NEXT_PUBLIC_BASE_URL;

	return {
		title: {
			default: defaultTitle,
			template: `%s | ${defaultTitle}`,
		},
		description: defaultDescription,
		metadataBase,
		openGraph: {
			type: "website",
			...(metadataBase ? { url: metadataBase } : {}),
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

export default function RootLayout({ children }: { children: ReactNode }) {
	// const shouldInjectToolbar = process.env.NODE_ENV === "development";
	const shouldInjectToolbar = false; //todo

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${overpass.variable} ${overpassMono.variable} font-sans antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<div className="grid grid-rows-[auto_1fr] h-screen">
						<NavMenu />
						<main className="overflow-auto">{children}</main>
					</div>
					{shouldInjectToolbar && <VercelToolbar />}
					<SpeedInsights />
				</ThemeProvider>
			</body>
		</html>
	);
}
