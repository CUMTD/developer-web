import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/shape/{shapeId}/polyline";
export const endpointTitle = "Get an encoded polyline shape";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "shapeId",
		type: "string",
		required: true,
		description: "The id of a shape.",
		isPath: true,
		exampleValue: "[@124.0.102304247@]5",
	},
];

export const queryParameters: ApiRequestParameter[] = [];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "polyline", type: "string", description: "The shape as an encoded polyline." },
];
