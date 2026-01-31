import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/vehicles/{vehicleId}/location";
export const endpointTitle = "Get vehicle location";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "vehicleId",
		type: "string",
		required: true,
		description: "The vehicleId of a vehicle to get a location for.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
