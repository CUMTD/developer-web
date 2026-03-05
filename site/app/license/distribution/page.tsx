import { H1 } from "@common/typography/heading";
import Prose from "@common/typography/prose";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "License for Distribution Requirements",
	description:
		"This page outlines additional requirements that must be met for distributing applications utilizing this API.",
	alternates: { canonical: "/license/distribution" },
};

export default async function LicenseForDistributionPage() {
	return (
		<Prose>
			<H1>License for Distribution Requirements</H1>
			<p>Placeholder</p>
		</Prose>
	);
}
