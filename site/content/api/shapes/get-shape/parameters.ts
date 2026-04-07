import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/shapes/{id}";
export const endpointTitle = "Get a shape";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "shapeId",
		type: "string",
		required: true,
		description: "The id of a shape.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
