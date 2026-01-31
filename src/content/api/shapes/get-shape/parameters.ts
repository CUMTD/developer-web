import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/shapes/{shapeId}";
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

export const queryParameters: ApiRequestParameter[] = [
	{
		name: "polyline",
		type: "boolean",
		required: false,
		description: "Returns an encoded polyline (see above) if true.",
		isPath: false,
		exampleValue: "false",
	},
];
