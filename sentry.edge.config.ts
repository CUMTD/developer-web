// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isDevelopment = process.env.NODE_ENV === "development";

Sentry.init({
	dsn:
		process.env.NEXT_PUBLIC_SENTRY_DSN ||
		(isDevelopment
			? "https://a5cd1538aefa7f9985bbf2c754a4fca8@o1048537.ingest.us.sentry.io/4510794685546496"
			: undefined),

	// Set release version for tracking errors by deployment
	// Uses Vercel's Git commit SHA when available (production/preview)
	// Falls back to "development" for local development
	release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "development",

	// Set environment for better error categorization
	environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || "development",

	// Performance monitoring - traces edge runtime requests
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/tracing/
	tracesSampleRate: isDevelopment ? 1.0 : 0.1,

	// Enable logs to be sent to Sentry
	enableLogs: true,

	// Enable sending user PII (Personally Identifiable Information)
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
	sendDefaultPii: false,

	// Filter and enhance errors before sending to Sentry
	beforeSend(event, _hint) {
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
