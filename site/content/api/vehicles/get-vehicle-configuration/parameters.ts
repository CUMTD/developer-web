import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/vehicles/configurations/{vehicleConfigurationId}";
export const endpointTitle = "Get a vehicle configuration";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "vehicleConfigurationId",
		type: "string",
		required: true,
		description: "The id of a vehicle configuration.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
