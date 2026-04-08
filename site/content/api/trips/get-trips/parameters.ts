import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/trips";
export const endpointTitle = "Get all trips";

export const pathParameters: ApiRequestParameter[] = [];

export const queryParameters: ApiRequestParameter[] = [];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "id", type: "string", description: "Stable identifier for this trip." },
	{ name: "blockId", type: "string", description: "Stable identifier for the block this trip is part of." },
	{ name: "shapeId", type: "string", description: "Stable identifier for this trip's shape." },
	{ name: "headsign", type: "string", description: "The headsign displayed on the vehicle for this trip." },
	{
		name: "direction",
		type: "object | null",
		description: "The direction of travel for this trip, if applicable.",
		childAttributes: [
			{ name: "id", type: "integer | null", description: "Direction id (0 or 1)." },
			{ name: "name", type: "string", description: "Direction display name." },
			{ name: "shortName", type: "string | null", description: "Short direction code." },
		],
	},
	{
		name: "route",
		type: "object | null",
		description: "Route details associated with this trip.",
		childAttributes: [
			{ name: "id", type: "string", description: "Stable identifier for the route." },
			{ name: "routeGroupId", type: "string | null", description: "Stable identifier for the route group." },
			{ name: "gtfsRouteId", type: "string", description: "Stable GTFS route identifier." },
			{ name: "longName", type: "string | null", description: "Long route name." },
			{ name: "shortName", type: "string | null", description: "Short route name or number." },
			{ name: "color", type: "string | null", description: "Hex route color code without #." },
			{ name: "textColor", type: "string | null", description: "Hex text color code without #." },
		],
	},
];
