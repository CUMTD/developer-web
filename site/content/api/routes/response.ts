import type { ApiResponseAttribute } from "@t/documentation-types";

export const response: ApiResponseAttribute[] = [
	{
		name: "id",
		type: "string",
		description: "Unique identifier for the route group.",
	},
	{
		name: "sortNumber",
		type: "integer",
		description:
			"Number used to sort the routes in a logical order. Lower numbers should be shown first on lists. This is not the route number.",
	},
	{
		name: "routeName",
		type: "string",
		description: 'The route name, e.g. "Silver Limited", "Gold", "Blue"',
	},
	{
		name: "color",
		type: "string",
		description: "Hex color code for the route group (without #).",
	},
	{
		name: "textColor",
		type: "string",
		description: "Hex color code for foreground text on the route group color (without #).",
	},
	{
		name: "routes",
		type: "Array of routes",
		description: "Array of individual routes within this route group.",
		childAttributes: [
			{
				name: "id",
				type: "string",
				description: "Unique identifier for a route.",
			},
			{
				name: "number",
				type: "string",
				description: "Route number.",
			},
			{
				name: "firstTrip",
				type: "string",
				description:
					"The time of the first trip of the day for this route. Day is arbitary and used to convey time only.",
			},
			{
				name: "lastTrip",
				type: "string",
				description:
					"The time of the last trip of the day for this route. Day is arbitary and used to convey time only.",
			},
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
						name: "daypart",
						type: "string",
						description: 'The parts of day e.g. "Weekday", "Saturday", "Gameday"',
					},
					{
						name: "timepart",
						type: "string",
						description: 'The time of day e.g. "Day", "Night", "Late Night", "Non-UI Day"',
					},
					{
						name: "daysOfWeek",
						type: "string",
						description:
							'A zero-indexed comma-separated list of ints representing the days of the week this daytype is active. 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday. Examples: "1,2,3,4,5" for weekdays only, "0,6" for weekends only.',
					},
					{
						name: "sortOrder",
						type: "integer",
						description:
							"Number used to sort the daytypes in a logical order. Lower numbers should be shown first on lists.",
					},
				],
			},
			{
				name: "gtfsRoutes",
				type: "array of strings",
				description: "Array of GTFS route IDs from routes.txt associated with this route.",
			},
		],
	},
];
