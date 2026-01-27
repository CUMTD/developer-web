import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/routes/groups/{id}";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "id",
		type: "string",
		required: true,
		description: "The id of a route group.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
