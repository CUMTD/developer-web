import BrushedMetal from "@common/brushed-metal";
import type { Metadata } from "next";
import GarageGallery from "./garage-gallery";

export const metadata: Metadata = {
	title: "Garage",
	description: "Showcase of apps and projects.",
	alternates: { canonical: "/garage" },
};

export default function AppGarage() {
	return (
		<div className="max-w-[80em] mx-auto">
			<BrushedMetal>The Garage</BrushedMetal>
			The Garage is back! Initially launched in 2011 as the "App Garage," this is a space for fellow MTD developers to
			show off their products and share project source code.
			<GarageGallery />
		</div>
	);
}
