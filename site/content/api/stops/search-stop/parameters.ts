import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/stops/search";
export const endpointTitle = "Search for a stop";

export const pathParameters: ApiRequestParameter[] = [];

export const queryParameters: ApiRequestParameter[] = [
	{
		name: "query",
		type: "string",
		required: true,
		description: "The search query.",
		isPath: false,
		exampleValue: "union",
	},
];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "stopId", type: "string", description: "The stop ID." },
	{ name: "name", type: "string", description: "The full text name of the stop, without the sub-name." },
	{
		name: "subName",
		type: "string | null",
		description: "The sub-name of the stop, if applicable. Usually displayed within parentheses.",
	},
	{
		name: "highlightedName",
		type: "string",
		description: "The name with the matched query portion surrounded in square brackets.",
	},
	{
		name: "type",
		type: "integer",
		description: "Stop type discriminator.",
		enumDefinition: {
			0: "Stop Group",
			1: "Boarding Point",
		},
	},
	{
		name: "location",
		type: "object",
		description: "The geographic location of the stop.",
		childAttributes: [
			{ name: "latitude", type: "float", description: "Latitude coordinate." },
			{ name: "longitude", type: "float", description: "Longitude coordinate." },
		],
	},
	{ name: "city", type: "string | null", description: "The city where the stop is located." },
	{ name: "isIStop", type: "boolean", description: "Whether this is an I-Stop location." },
	{ name: "stopCode", type: "string | null", description: "The stop code identifier." },
	{ name: "accessible", type: "boolean", description: "Whether the stop is accessible." },
];
