import { Card, CardDescription, CardHeader } from "@shared/shadcn/card";

export default function GarageGallery() {
	return (
		<div className="grid grid-cols-3 gap-3">
			<GarageCard />
			<GarageCard />
			<GarageCard />
		</div>
	);
}

function GarageCard() {
	return (
		<Card>
			<CardHeader>
				Title
				<CardDescription>Person Lastname</CardDescription>
			</CardHeader>
		</Card>
	);
}
