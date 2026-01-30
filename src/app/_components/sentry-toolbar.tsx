"use client";
import { useSentryToolbar } from "@sentry/toolbar";

const isDevelopment = process.env.NODE_ENV !== "production";

type SentryToolbarProps = Readonly<{
	organizationSlug: string;
	projectIdOrSlug: string;
}>;

export default function SentryToolbar({ organizationSlug, projectIdOrSlug }: SentryToolbarProps) {
	useSentryToolbar({
		// Remember to conditionally enable the Toolbar.
		// This will reduce network traffic for users
		// who do not have credentials to login to Sentry.
		enabled: isDevelopment,
		initProps: {
			organizationSlug,
			projectIdOrSlug,
			environment: process.env.NODE_ENV || "development",
			placement: "bottom-right-corner",
		},
	});

	return null;
}
