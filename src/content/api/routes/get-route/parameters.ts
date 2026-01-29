import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/routes/{id}";
export const endpointTitle = "Get a route";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "id",
		type: "string",
		required: true,
		description: "The id of a route.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
