import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/vehicles/locations";
export const endpointTitle = "Get all vehicle locations";

export const pathParameters: ApiRequestParameter[] = [];

export const queryParameters: ApiRequestParameter[] = [];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "vehicleId", type: "string", description: "The vehicle ID." },
	{ name: "vehicleNumber", type: "string | null", description: "The vehicle number." },
	{
		name: "location",
		type: "object | null",
		description: "The current vehicle location.",
		childAttributes: [
			{ name: "latitude", type: "float", description: "Latitude coordinate." },
			{ name: "longitude", type: "float", description: "Longitude coordinate." },
		],
	},
	{
		name: "lastUpdated",
		type: "string | null",
		description: "The time the realtime vehicle position was last updated.",
	},
	{
		name: "trip",
		type: "object | null",
		description: "Trip details associated with the vehicle's assigned trip, when available.",
		childAttributes: [
			{ name: "id", type: "string", description: "Stable identifier for this trip." },
			{ name: "headsign", type: "string", description: "The headsign for this trip." },
			{
				name: "direction",
				type: "object | null",
				description: "The direction of travel for this trip.",
				childAttributes: [
					{ name: "id", type: "integer | null", description: "Direction id (0 or 1)." },
					{ name: "name", type: "string", description: "Direction display name." },
					{ name: "shortName", type: "string | null", description: "Short direction code." },
				],
			},
		],
	},
	{
		name: "route",
		type: "object | null",
		description: "Route details associated with the vehicle's assigned trip, when available.",
		childAttributes: [
			{ name: "id", type: "string", description: "Stable identifier for the route." },
			{ name: "gtfsRouteId", type: "string", description: "Stable GTFS route identifier." },
			{ name: "longName", type: "string | null", description: "Long route name." },
			{ name: "shortName", type: "string | null", description: "Short route name or number." },
			{ name: "color", type: "string | null", description: "Hex route color code without #." },
			{ name: "textColor", type: "string | null", description: "Hex text color code without #." },
		],
	},
];
