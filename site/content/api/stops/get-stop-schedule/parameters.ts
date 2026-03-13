import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/stops/{id}/schedule";
export const endpointTitle = "Get a stop's schedule";

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
