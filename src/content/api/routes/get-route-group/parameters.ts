import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/routes/groups/{routeGroupId}";
export const endpointTitle = "Get a route group";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "routeGroupId",
		type: "string",
		required: true,
		description: "The id of a route group.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
