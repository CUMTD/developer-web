import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/routes/{routeId}";
export const endpointTitle = "Get a route";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "routeId",
		type: "string",
		required: true,
		description: "The id of a route.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
