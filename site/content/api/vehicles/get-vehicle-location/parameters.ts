import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/vehicles/{id}/location";
export const endpointTitle = "Get vehicle location";

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
