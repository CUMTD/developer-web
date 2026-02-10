import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/vehicles";
export const endpointTitle = "Get all vehicles";

export const pathParameters: ApiRequestParameter[] = [];

export const queryParameters: ApiRequestParameter[] = [
	{
		name: "excludeInactive",
		type: "boolean",
		required: false,
		description: "If true, exclude inactive vehicles.",
		isPath: false,
		exampleValue: "false",
	},
];
