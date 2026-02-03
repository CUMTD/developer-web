import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/stops";
export const endpointTitle = "Get all stops";

export const pathParameters: ApiRequestParameter[] = [];

export const queryParameters: ApiRequestParameter[] = [
	{
		name: "excludeBoardingPoints",
		type: "boolean",
		description: "If true, excludes boarding points from response.",
		isPath: false,
		required: false,
		exampleValue: "false",
	},
];
