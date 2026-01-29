import type { Metadata } from "next";
import SentryExamplePage from "./_components/example";

const isDevelopment = process.env.NODE_ENV === "development";

export const metadata: Metadata = {
	title: "sentry-example-page",
	description: "Test Sentry for your Next.js app!",
};

export default function Page() {
	return <SentryExamplePage isDevelopment={isDevelopment} />;
}
