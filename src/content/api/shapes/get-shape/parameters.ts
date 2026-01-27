import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/shapes/{id}";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "id",
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
