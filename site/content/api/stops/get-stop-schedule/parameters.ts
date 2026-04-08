import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/stops/{stopId}/schedule";
export const endpointTitle = "Get a stop's schedule";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "stopId",
		type: "string",
		required: true,
		description: "The id of stop, with or without a boarding point.",
		isPath: true,
	},
	{
		name: "routeId",
		type: "string",
		required: false,
		description: "Semicolon-separated list of route ids to filter by.",
		isPath: true,
	},
	{
		name: "date",
		type: "string",
		required: false,
		description: "Date in the format YYYY-MM-DD to filter by.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "stopId", type: "string", description: "The stop ID this stop time belongs to." },
	{ name: "tripId", type: "string", description: "The trip ID this stop time belongs to." },
	{ name: "routeId", type: "string | null", description: "The route ID this stop time belongs to." },
	{ name: "gtfsRouteId", type: "string | null", description: "The GTFS route ID this stop time belongs to." },
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
	{
		name: "stopSequence",
		type: "integer | string",
		description: "The sequential order of this stop within the trip, 0-indexed.",
	},
	{
		name: "arrivalTime",
		type: "string",
		description: "The scheduled arrival time at the stop. Do not display this publicly! Instead, use departureTime.",
	},
	{
		name: "arrivalPastMidnight",
		type: "boolean",
		description: "True if this arrival is past midnight on a trip that began before midnight.",
	},
	{
		name: "departureTime",
		type: "string",
		description:
			"The scheduled departure time from the stop. This is the time shown in public-facing passenger information.",
	},
	{
		name: "departurePastMidnight",
		type: "boolean",
		description: "True if this departure is past midnight on a trip that began before midnight.",
	},
	{ name: "stopHeadsign", type: "string | null", description: "Stop-specific headsign override, if applicable." },
];
