import { ThemeProvider } from "@app/_components/theme-provider";
import NavMenu from "@common/layout/nav-menu";
import { AuthProvider } from "@contexts/auth-context";
import { ViewportProvider } from "@contexts/viewport-context";
import { globalEnv } from "@env/global";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import type { Metadata, Viewport } from "next";
import { Overpass, Overpass_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "server-only";
import { PlausibleAnalytics } from "./_components/plausible-analytics";
import "./_styles/globals.css";

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
	const metadataBase = globalEnv.NEXT_PUBLIC_BASE_URL ? new URL(globalEnv.NEXT_PUBLIC_BASE_URL) : undefined;

	return {
		applicationName: defaultTitle,
		description: defaultDescription,
		formatDetection: {
			email: true,
			address: false,
			telephone: false,
		},
		generator: "Next.js",
		keywords: ["MTD", "API", "Developer", "Transit", "Public Transportation", "GTFS", "Open Data"],
		metadataBase,
		openGraph: {
			type: "website",
			...(metadataBase ? { url: metadataBase.toString() } : {}),
			siteName: defaultTitle,
			title: defaultTitle,
			description: defaultDescription,
		},
		referrer: "origin-when-cross-origin",
		title: {
			default: defaultTitle,
			template: `%s | ${defaultTitle}`,
		},
		twitter: {
			card: "summary",
			title: defaultTitle,
			description: defaultDescription,
		},
	};
}

export default function RootLayout({ children }: { children: ReactNode }) {
	const shouldInjectToolbar = process.env.NODE_ENV === "development";
	// const shouldInjectToolbar = false; //todo

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${overpass.variable} ${overpassMono.variable} font-sans antialiased`}>
				<PlausibleAnalytics />
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<AuthProvider>
						<ViewportProvider>
							<div className="grid grid-rows-[auto_1fr] h-screen">
								<NavMenu />
								<main className="overflow-auto">{children}</main>
							</div>
						</ViewportProvider>
					</AuthProvider>
					{shouldInjectToolbar && <VercelToolbar />}
				</ThemeProvider>
				<SpeedInsights />
			</body>
		</html>
	);
}
