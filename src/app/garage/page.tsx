import BrushedMetal from "@components/BrushedMetal";
import GarageGallery from "./GarageGallery";

export default function AppGarage() {
	return (
		<div className="max-w-[80em] mx-auto">
			<BrushedMetal text="The Garage" />
			The Garage is back! Initially launched in 2011 as the "App Garage," this is a space for fellow MTD developers to
			show off their products and share project source code.
			<GarageGallery />
		</div>
	);
}
