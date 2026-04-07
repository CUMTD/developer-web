import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/routes/{routeId}";
export const endpointTitle = "Get a route";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "routeId",
		type: "string",
		required: true,
		description: "The id of a route.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "id", type: "string", description: "Stable identifier for this route." },
	{ name: "number", type: "string | null", description: 'Route name number. Example: "50".' },
	{ name: "firstTrip", type: "string", description: "The time of the first trip of the day for this route." },
	{ name: "lastTrip", type: "string", description: "The time of the last trip of the day for this route." },
	{
		name: "lastTripAfterMidnight",
		type: "boolean",
		description: "True if the last trip of the day is after midnight.",
	},
	{
		name: "dayType",
		type: "object",
		description: "The days and times of day this route is active.",
		childAttributes: [
			{ name: "dayPart", type: "string", description: 'The part of day. Examples: "Weekday", "Saturday", "Gameday".' },
			{ name: "timePart", type: "string", description: 'The time of day. Examples: "Day", "Night", "Late Night".' },
			{
				name: "daysOfWeek",
				type: "string",
				description:
					"Comma-separated zero-indexed days of the week this daytype is active. 0=Sunday through 6=Saturday.",
			},
			{
				name: "sortOrder",
				type: "integer",
				description: "Number used to sort day types in logical order. Lower numbers should appear first in a list.",
			},
		],
	},
	{ name: "gtfsRoutes", type: "string[]", description: "GTFS route IDs associated with this route." },
];
