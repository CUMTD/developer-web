import type { ApiRequestParameter } from "@t/documentation-types";

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
