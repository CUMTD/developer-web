import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/vehicles";
export const endpointTitle = "Get all vehicles";

export const pathParameters: ApiRequestParameter[] = [];

export const queryParameters: ApiRequestParameter[] = [];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "id", type: "string", description: "Stable identifier for this vehicle." },
	{ name: "vehicleNumber", type: "string | null", description: "The number displayed on the side of the vehicle." },
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
