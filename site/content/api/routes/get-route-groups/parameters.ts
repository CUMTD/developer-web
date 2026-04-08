import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/routes/groups";
export const endpointTitle = "Get all route groups";

export const pathParameters: ApiRequestParameter[] = [];

export const queryParameters: ApiRequestParameter[] = [];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "id", type: "string", description: "Stable identifier for this route group." },
	{
		name: "sortNumber",
		type: "integer",
		description: "Number used to sort route groups in logical order. Lower numbers should appear first in a list.",
	},
	{
		name: "routeGroupName",
		type: "string",
		description: 'The route name. Examples: "Silver Limited", "Gold", "Blue".',
	},
	{
		name: "color",
		type: "string",
		description: "Hex color code used to represent this route group. # sign is omitted.",
	},
	{
		name: "textColor",
		type: "string",
		description: "Hex text color code for use on top of the route color. # sign is omitted.",
	},
	{
		name: "routes",
		type: "Array of routes",
		description: "The routes within this route group.",
		childAttributes: [
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
					{
						name: "dayPart",
						type: "string",
						description: 'The part of day. Examples: "Weekday", "Saturday", "Gameday".',
					},
					{ name: "timePart", type: "string", description: 'The time of day. Examples: "Day", "Night", "Late Night".' },
					{
						name: "daysOfWeek",
						type: "string",
						description:
							'A zero-indexed comma-separated list of ints representing the days of the week this dayType is active. Examples: "1,2,3,4,5" for weekdays only, "0,6" for weekends only.',
						enumDefinition: {
							0: "Sunday",
							1: "Monday",
							2: "Tuesday",
							3: "Wednesday",
							4: "Thursday",
							5: "Friday",
							6: "Saturday",
						},
					},
					{
						name: "sortOrder",
						type: "integer",
						description: "Number used to sort day types in logical order. Lower numbers should appear first in a list.",
					},
				],
			},
			{ name: "gtfsRoutes", type: "string[]", description: "GTFS route IDs associated with this route." },
			{ name: "routeGroupId", type: "string", description: "The ID of the route group this route belongs to." },
		],
	},
];
