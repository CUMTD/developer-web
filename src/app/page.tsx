import buildCanonicalUrl from "@helpers/build-canonical-url";
import type { Metadata } from "next/types";
import "server-only";
import Homepage from "./_components/homepage";

const homeCanonical = buildCanonicalUrl("/");
const homeTitle = "Home";
const homeDescription = "MTD Developer API."; // TODO: Update description

export const metadata: Metadata = {
	title: homeTitle,
	description: homeDescription,
	alternates: homeCanonical ? { canonical: homeCanonical } : undefined,
	openGraph: {
		title: homeTitle,
		description: homeDescription,
		...(homeCanonical ? { url: homeCanonical } : {}),
	},
	twitter: {
		card: "summary",
		title: homeTitle,
		description: homeDescription,
	},
};

export default async function Page() {
	return <Homepage />;
}
