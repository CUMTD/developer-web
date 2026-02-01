import type { ApiResponseAttribute } from "@t/documentation-types";

export const response: ApiResponseAttribute[] = [
	{
		name: "id",
		type: "string",
		description: "Unique identifier for the trip.",
	},
	{
		name: "gtfsRouteId",
		type: "string",
		description: "The route identifier for this trip as listed in the GTFS trips.txt file.",
	},
	{
		name: "blockId",
		type: "string",
		description: "The block identifier that this trip is part of.",
	},
	{
		name: "shapeId",
		type: "string",
		description: "The shape identifier that defines the path of this trip.",
	},
	{
		name: "headsign",
		type: "string",
		description: "The destination or headsign displayed for this trip.",
	},
	{
		name: "direction",
		type: "string | null",
		description: "The direction of travel for this trip, if applicable.",
		childAttributes: [
			// todo
		],
	},
];
