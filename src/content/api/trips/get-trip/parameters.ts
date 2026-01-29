import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/trips/{id}";
export const endpointTitle = "Get a trip";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "id",
		type: "string",
		required: true,
		description: "The id of a trip.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
