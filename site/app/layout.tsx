import { ThemeProvider } from "@app/_components/theme-provider";
import NavMenu from "@common/layout/nav-menu";
import { globalEnv } from "@env/global";
import { serverEnv } from "@env/server";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import type { Metadata, Viewport } from "next";
import { Overpass, Overpass_Mono } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import "server-only";
import { Toaster } from "sonner";
import { ClientProviders } from "./_components/client-providers";
import { PlausibleAnalytics } from "./_components/plausible-analytics";
import SentryToolbar from "./_components/sentry-toolbar";
import "./_styles/globals.css";

const overpass = Overpass({
	subsets: ["latin"],
	variable: "--font-sans",
	fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

const overpassMono = Overpass_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	fallback: ["ui-monospace", "SFMono-Regular", "SF Mono", "Menlo", "Consolas", "Liberation Mono", "monospace"],
});

export const viewport: Viewport = {
	themeColor: "#002f87",
	width: "device-width",
	initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
	const defaultTitle = "MTD Developer";
	const defaultDescription =
		"Developer resources provided by the Champaign-Urbana Mass Transit District. Includes GTFS feeds, an API, and documentation.";
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
			<body
				className={`${overpass.variable} ${overpassMono.variable} antialiased overflow-x-hidden md:overflow-hidden`}
			>
				<PlausibleAnalytics />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
					themes={["light", "dark", "terminal"]}
				>
					<ClientProviders>
						<div className="grid grid-rows-[auto_auto_1fr] min-h-svh md:h-screen">
							<NavMenu />
							<div className=" text-md h-min py-2 w-full bg-[linear-gradient(45deg,#f8fafc_25%,#e2e8f0_25%,#e2e8f0_50%,#f8fafc_50%,#f8fafc_75%,#e2e8f0_75%,#e2e8f0_100%)] dark:bg-[linear-gradient(45deg,#000_25%,#18181b_25%,#18181b_50%,#000_50%,#000_75%,#18181b_75%,#18181b_100%)] bg-size-[40px_40px] flex items-center justify-center">
								<span className="text-slate-900 dark:text-white px-10">
									<b>New API is in preview!</b> Subject to change. Send feedback to{" "}
									<Link className="underline font-bold" href="mailto:contact@mtd.dev?subject=API%20Feedback">
										contact@mtd.dev
									</Link>
								</span>
							</div>{" "}
							<main className="overflow-visible md:overflow-auto">{children}</main>
						</div>
					</ClientProviders>
					{shouldInjectToolbar && (
						<>
							<VercelToolbar />
							{Boolean(serverEnv.SENTRY_ORG) && Boolean(serverEnv.SENTRY_PROJECT) && (
								<SentryToolbar
									organizationSlug={serverEnv.SENTRY_ORG ?? ""}
									projectIdOrSlug={serverEnv.SENTRY_PROJECT ?? ""}
								/>
							)}
						</>
					)}
				</ThemeProvider>
				<SpeedInsights />
				<Toaster richColors duration={3_000} />
			</body>
		</html>
	);
}
