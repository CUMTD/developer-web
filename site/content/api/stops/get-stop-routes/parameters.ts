import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/stops/{id}/routes";
export const endpointTitle = "Get all routes that serve a stop";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "id",
		type: "string",
		required: true,
		description: "The id of a stop.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
