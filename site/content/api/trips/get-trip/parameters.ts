import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/trips/{id}";
export const endpointTitle = "Get a trip";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "tripId",
		type: "string",
		required: true,
		description:
			"The id of a trip. You MUST URL encode this value, as it may contain forward slashes. This is planned to be changed in the future.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "id", type: "string", description: "Stable identifier for this trip." },
	{ name: "gtfsRouteId", type: "string", description: "The GTFS route identifier for this trip." },
	{ name: "blockId", type: "string", description: "Stable identifier for the block this trip is part of." },
	{ name: "shapeId", type: "string", description: "Stable identifier for this trip's shape." },
	{ name: "headsign", type: "string", description: "The headsign displayed on the vehicle for this trip." },
	{
		name: "direction",
		type: "object | null",
		description: "The direction of travel for this trip, if applicable.",
		childAttributes: [
			{
				name: "longNames",
				type: "object",
				description:
					'An object containing the full names of the directions, keyed by direction id. Example: { "0": "North", "1": "South" }.',
			},
			{
				name: "shortNames",
				type: "object",
				description:
					'An object containing the short codes of the directions, keyed by direction id. Example: { "0": "N", "1": "S" }.',
			},
		],
	},
];
