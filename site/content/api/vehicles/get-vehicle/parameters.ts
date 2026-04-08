import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/vehicles/{vehicleId}";
export const endpointTitle = "Get a vehicle";

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

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "id", type: "string", description: "The number displayed on the side of the vehicle." },
	{
		name: "vehicleConfigurationId",
		type: "string",
		description: "The ID of the vehicle configuration this vehicle belongs to.",
	},
	{
		name: "isActive",
		type: "boolean",
		description:
			"True if this vehicle is currently in the active fleet. Does not indicate whether the vehicle is currently running a route.",
	},
	{ name: "vin", type: "string | null", description: "The vehicle's Vehicle Identification Number (ISO 3779)." },
	{ name: "licensePlateNumber", type: "string | null", description: "The vehicle's license plate number." },
	{
		name: "dateInService",
		type: "string | null",
		description: "The date the vehicle was put into service (YYYY-MM-DD).",
	},
];
