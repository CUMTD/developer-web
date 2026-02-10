// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { globalEnv } from "@env/global";
import { captureConsoleIntegration, extraErrorDataIntegration, init } from "@sentry/nextjs";

const isDevelopment = process.env.NODE_ENV === "development";

init({
	dsn: globalEnv.NEXT_PUBLIC_SENTRY_DSN ?? undefined,

	// Set release version for tracking errors by deployment
	// Uses Vercel's Git commit SHA when available (production/preview)
	// Falls back to "development" for local development
	release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "development",

	// Set environment for better error categorization
	environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || "development",

	// Performance monitoring - traces server requests and database queries
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/tracing/
	tracesSampleRate: isDevelopment ? 1.0 : 0.1,

	// Configure profiling for performance insights
	// Only enabled in production with lower sample rate to manage costs
	profilesSampleRate: isDevelopment ? 1.0 : 0.1,

	// Enable logs to be sent to Sentry
	enableLogs: true,

	// Enable sending user PII (Personally Identifiable Information)
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
	sendDefaultPii: false,

	// Add server-specific integrations
	integrations: [
		// Automatically capture console logs, warnings, and errors
		captureConsoleIntegration({
			levels: ["error", "warn"],
		}),
		// Capture additional context about Node.js environment
		extraErrorDataIntegration(),
	],

	// Filter and enhance errors before sending to Sentry
	beforeSend(event) {
		// Don't send errors from health checks or monitoring endpoints
		if (event.request?.url?.includes("/api/health")) {
			return null;
		}

		// Filter out errors from the Sentry example pages in production
		if (!isDevelopment && event.request?.url?.includes("sentry-example")) {
			return null;
		}

		return event;
	},

	// Ignore certain errors that are known to be noisy
	ignoreErrors: [
		// Next.js specific errors that are handled
		"NEXT_NOT_FOUND",
		"NEXT_REDIRECT",
		// Common canceled request errors
		"AbortError",
		"CancelledError",
	],
});
