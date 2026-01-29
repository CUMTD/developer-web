// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
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

	// Performance monitoring - traces user interactions and page loads
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/tracing/
	tracesSampleRate: isDevelopment ? 1.0 : 0.1,

	// Add optional integrations for additional features
	integrations: [
		Sentry.replayIntegration({
			// Mask all text and user input for privacy
			maskAllText: true,
			blockAllMedia: true,
		}),
		Sentry.browserTracingIntegration(),
		Sentry.feedbackIntegration({
			colorScheme: "system",
		}),
	],

	// Enable logs to be sent to Sentry
	enableLogs: true,

	// Define how likely Replay events are sampled.
	// This sets the sample rate to be 5%. You may want this to be 100% while
	// in development and sample at a lower rate in production
	replaysSessionSampleRate: isDevelopment ? 1.0 : 0.05,

	// Define how likely Replay events are sampled when an error occurs.
	replaysOnErrorSampleRate: 1.0,

	// Enable sending user PII (Personally Identifiable Information)
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
	sendDefaultPii: false,

	// Filter and enhance errors before sending to Sentry
	beforeSend(event, hint) {
		// Filter out certain errors that are not actionable
		const error = hint.originalException;

		// Filter out network errors from ad blockers
		if (error && typeof error === "object" && "message" in error) {
			const message = String(error.message);
			if (message.includes("Failed to fetch") || message.includes("NetworkError") || message.includes("Load failed")) {
				// Could be ad blocker or network issue, reduce noise
				return null;
			}
		}

		// Filter out ResizeObserver errors (common browser quirk)
		if (event.exception?.values?.[0]?.value?.includes("ResizeObserver")) {
			return null;
		}

		return event;
	},

	// Ignore certain errors that are known to be noisy
	ignoreErrors: [
		// Browser quirks
		"ResizeObserver loop limit exceeded",
		"ResizeObserver loop completed with undelivered notifications",
		// Generic error from Safari/iOS
		"Non-Error promise rejection captured",
		// Chrome extensions
		"Extension context invalidated",
		// Known Next.js errors
		"cancelled",
	],

	// Ignore errors from certain URLs (third-party scripts)
	denyUrls: [
		// Chrome extensions
		/extensions\//i,
		/^chrome:\/\//i,
		/^chrome-extension:\/\//i,
		// Firefox extensions
		/^moz-extension:\/\//i,
	],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
