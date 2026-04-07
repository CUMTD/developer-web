import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/stops/{stopId}/trips";
export const endpointTitle = "Get a stop's trips";

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
