import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/vehicles/configurations/{configurationId}";
export const endpointTitle = "Get a vehicle configuration";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "configurationId",
		type: "string",
		required: true,
		description: "The configurationId of a vehicle configuration.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
