import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/stops/{stopId}";
export const endpointTitle = "Get a stop";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "stopId",
		type: "string",
		required: true,
		description: "The id of stop, with or without a boarding point.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "type", type: "integer", description: "Stop type discriminator: 0 = Stop Group, 1 = Boarding Point." },
	{ name: "id", type: "string", description: "Stable identifier for this stop." },
	{ name: "name", type: "string", description: "Human-readable name for this stop." },
	{
		name: "stopCode",
		type: "string | null",
		description: "The 4-digit stop code displayed on bus stop signs. Used for MTD's SMS Service.",
	},
	{ name: "url", type: "string | null", description: "Link to the stop info page on MTD's website." },
	{
		name: "isAccessible",
		type: "boolean | null",
		description: "True if wheelchair boarding is possible. False if not. Null if unknown.",
	},
	{
		name: "location",
		type: "object",
		description: "Geographic location of this stop.",
		childAttributes: [
			{ name: "latitude", type: "float", description: "Latitude coordinate." },
			{ name: "longitude", type: "float", description: "Longitude coordinate." },
		],
	},
	{
		name: "isStation",
		type: "boolean",
		description: "True if this stop is a station or terminal rather than a typical street stop.",
	},
	{
		name: "city",
		type: "string | null",
		description: 'City where the stop is located. Either "Champaign", "Urbana", or "Savoy".',
	},
	{
		name: "boardingPoints",
		type: "Array of boardingPoints",
		description: "Individual boarding locations within this stop group.",
		childAttributes: [
			{
				name: "subName",
				type: "string",
				description:
					'Sub-name describing the boarding point location, e.g. "SE Corner". Usually contained in parentheses.',
			},
			{ name: "id", type: "string", description: "Stable identifier for this boarding point." },
			{ name: "name", type: "string", description: "Full name of the boarding point." },
			{
				name: "stopCode",
				type: "string | null",
				description: "The 4-digit stop code displayed on bus stop signs. Used for MTD's SMS Service.",
			},
			{ name: "url", type: "string | null", description: "Link to the boarding point info page on MTD's website." },
			{
				name: "isAccessible",
				type: "boolean | null",
				description: "True if wheelchair boarding is possible. False if not. Null if unknown.",
			},
			{
				name: "location",
				type: "object",
				description: "Geographic location of this boarding point.",
				childAttributes: [
					{ name: "latitude", type: "float", description: "Latitude coordinate." },
					{ name: "longitude", type: "float", description: "Longitude coordinate." },
				],
			},
		],
	},
];
