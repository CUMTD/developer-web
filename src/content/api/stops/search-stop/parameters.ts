import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/stops/search";
export const endpointTitle = "Search for a stop";

export const pathParameters: ApiRequestParameter[] = [];

export const queryParameters: ApiRequestParameter[] = [
	{
		name: "query",
		type: "string",
		required: true,
		description: "Plain text stop name query.",
		isPath: false,
		exampleValue: "union",
	},
];
