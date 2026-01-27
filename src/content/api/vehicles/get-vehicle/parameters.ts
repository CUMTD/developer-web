import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/vehicles/{id}";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "id",
		type: "string",
		required: true,
		description: "The id of a vehicle.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
