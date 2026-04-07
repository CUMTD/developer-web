import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/vehicles/{vehicleId}/location";
export const endpointTitle = "Get a vehicle location";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "vehicleId",
		type: "string",
		required: true,
		description: "The id of a vehicle.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
