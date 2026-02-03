import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/stops/{id}/departures";
export const endpointTitle = "Get realtime departures for a stop";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "id",
		type: "string",
		required: true,
		description: "The id of a stop.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [
	{
		name: "routes",
		type: "string",
		required: false,
		description: "Semicolon-separated string of Route IDs to filter results",
		isPath: false,
	},
	{
		name: "time",
		type: "integer",
		required: false,
		description: "Time in minutes to fetch departures for. Default is 30 minutes.",
		isPath: false,
		exampleValue: "30",
	},
];
