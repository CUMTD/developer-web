// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: "https://a5cd1538aefa7f9985bbf2c754a4fca8@o1048537.ingest.us.sentry.io/4510794685546496",

	// Set release version for tracking errors by deployment
	// Uses Vercel's Git commit SHA when available (production/preview)
	// Falls back to "development" for local development
	release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "development",

	// Enable logs to be sent to Sentry
	enableLogs: true,

	// Enable sending user PII (Personally Identifiable Information)
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
	sendDefaultPii: false,
});
