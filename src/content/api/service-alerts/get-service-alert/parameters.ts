import type { ApiRequestParameter } from "@t/documentation-types";

export const endpoint = "/service-alerts/{stopId}";
export const endpointTitle = "Get a service alert";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "stopId",
		type: "string",
		required: true,
		description: "The stopId of a stop to get a service alert for.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];
