import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/stops/{stopId}/departures";
export const endpointTitle = "Get a stop's departures";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "stopId",
		type: "string",
		required: true,
		description: "The id of stop, with or without a boarding point.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [
	{
		name: "routes",
		type: "string",
		required: false,
		description: "Semicolon-separated list of route ids to filter by.",
		isPath: false,
	},
	{
		name: "time",
		type: "integer",
		required: false,
		description: "The time window from now, in minutes, to fetch departures for. Default is 30 minutes.",
		isPath: false,
		exampleValue: "8",
	},
];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "stopId", type: "string", description: "The id of the boarding point." },
	{
		name: "headsign",
		type: "string | null",
		description: "The destination headsign displayed for this departure.",
	},
	{
		name: "tripDirection",
		type: "object | null",
		description: "The direction of travel for this departure, when available.",
		childAttributes: [
			{
				name: "id",
				type: "integer | null",
				description: "Direction id for this trip when known (typically 0 or 1).",
			},
			{
				name: "name",
				type: "string",
				description: "Direction display name.",
			},
			{
				name: "shortName",
				type: "string | null",
				description: "Short direction code, when available.",
			},
		],
	},
	{
		name: "blockId",
		type: "string | null",
		description: "The block identifier associated with this departure's trip.",
	},
	{
		name: "recordedTime",
		type: "string",
		description: "The timestamp when this departure snapshot was recorded.",
	},
	{
		name: "scheduledDeparture",
		type: "string | null",
		description: "The scheduled departure time from timetable data.",
	},
	{
		name: "estimatedDeparture",
		type: "string | null",
		description: "The realtime-estimated departure time.",
	},
	{
		name: "vehicleId",
		type: "string | null",
		description: "The vehicle id currently assigned to this departure, when available.",
	},
	{
		name: "originStopId",
		type: "string | null",
		description: "The origin stop id for this trip.",
	},
	{
		name: "destinationStopId",
		type: "string | null",
		description: "The destination stop id for this trip.",
	},
	{
		name: "location",
		type: "object | null",
		description: "The current vehicle location for this departure, when available.",
		childAttributes: [
			{
				name: "latitude",
				type: "float",
				description: "Latitude coordinate.",
			},
			{
				name: "longitude",
				type: "float",
				description: "Longitude coordinate.",
			},
		],
	},
	{
		name: "shapeId",
		type: "string | null",
		description: "The shape id used by this trip.",
	},
	{
		name: "tripId",
		type: "string | null",
		description: "The trip id associated with this departure.",
	},
	{
		name: "minutesTillDeparture",
		type: "integer",
		description: "The number of minutes until departure.",
	},
	{
		name: "isRealTime",
		type: "boolean",
		description: "Whether this departure uses realtime data.",
	},
	{
		name: "isHopper",
		type: "boolean",
		description: "Whether this departure is marked as a hopper trip.",
	},
	{
		name: "destination",
		type: "string | null",
		description: "A destination label for this departure.",
	},
	{
		name: "departsIn",
		type: "string",
		description: "A human-readable departure countdown.",
	},
	{
		name: "isIStop",
		type: "boolean",
		description: "Whether the stop is an I-Stop location.",
	},
	{
		name: "uniqueId",
		type: "string",
		description: "A unique identifier for this departure record.",
	},
	{
		name: "route",
		type: "object | null",
		description: "Route details associated with this departure, when available.",
		childAttributes: [
			{
				name: "id",
				type: "string",
				description: "Stable identifier for the route.",
			},
			{
				name: "gtfsRouteId",
				type: "string",
				description: "Stable GTFS route identifier.",
			},
			{
				name: "longName",
				type: "string | null",
				description: "Long route name.",
			},
			{
				name: "shortName",
				type: "string | null",
				description: "Short route name or number.",
			},
			{
				name: "color",
				type: "string | null",
				description: "Hex route color code without #.",
			},
			{
				name: "textColor",
				type: "string | null",
				description: "Hex text color code without #.",
			},
		],
	},
];
