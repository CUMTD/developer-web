import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/service-alerts/{id}";
export const endpointTitle = "Get a service alert";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "id",
		type: "string",
		required: true,
		description: "The id of a service alert.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
