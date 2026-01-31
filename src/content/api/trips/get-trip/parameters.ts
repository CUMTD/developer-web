import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/trips/{tripId}";
export const endpointTitle = "Get a trip";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "tripId",
		type: "string",
		required: true,
		description: "The tripId of a trip.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
