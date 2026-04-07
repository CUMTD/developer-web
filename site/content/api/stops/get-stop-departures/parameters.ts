import type { ApiRequestParameter } from "@t/documentation-types";

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
		exampleValue: "30",
	},
];
