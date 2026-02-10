import type { Metadata } from "next/types";
import "server-only";
import Homepage from "./_components/homepage";

const homeTitle = "Home";
const homeDescription = "MTD Developer API."; // TODO: Update description

export const metadata: Metadata = {
	description: homeDescription,
	alternates: { canonical: "/" },
	openGraph: {
		title: homeTitle,
		description: homeDescription,
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
