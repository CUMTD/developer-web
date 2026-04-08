import type { ApiResponseAttribute } from "@t/documentation-types";

export const response: ApiResponseAttribute[] = [
	{
		name: "id",
		type: "string",
		description: "Unique identifier for the trip.",
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
		type: "object | null",
		description: "The direction of travel for this trip, if applicable.",
		childAttributes: [
			{
				name: "id",
				type: "integer | null",
				description: "Direction id (0 or 1).",
			},
			{
				name: "name",
				type: "string",
				description: "Direction display name.",
			},
			{
				name: "shortName",
				type: "string | null",
				description: "Abbreviated direction name.",
			},
		],
	},
	{
		name: "route",
		type: "object | null",
		description: "Route details associated with this trip.",
		childAttributes: [
			{
				name: "id",
				type: "string",
				description: "Stable identifier for the route.",
			},
			{
				name: "routeGroupId",
				type: "string | null",
				description: "Stable identifier for the route group this route belongs to.",
			},
			{
				name: "gtfsRouteId",
				type: "string",
				description: "Id of the route in the GTFS feed's routes.txt file.",
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
