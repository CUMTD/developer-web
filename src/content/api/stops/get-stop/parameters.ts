import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/stops/{stopId}";
export const endpointTitle = "Get a stop";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "stopId",
		type: "string",
		required: true,
		description: "The stopId of a stop.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
