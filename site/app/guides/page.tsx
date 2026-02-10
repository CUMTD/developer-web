import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Guides",
	description: "Developer guides and tutorials.",
	alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
	return <div>Guides</div>;
}
