import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/vehicles/{vehicleId}";
export const endpointTitle = "Get a vehicle";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "vehicleId",
		type: "string",
		required: true,
		description: "The vehicleId of a vehicle.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
