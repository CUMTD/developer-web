import type { Metadata } from "next/types";
import "server-only";
import Homepage from "./_components/homepage";

const homeTitle = "Home";
const homeDescription =
	"Access the MTD Open API to build apps with real-time departures and static schedule info like routes, schedules, and stops for Champaign-Urbana Mass Transit District (MTD). Get your API key, explore documentation, and start building today!";

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
