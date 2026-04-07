import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/vehicles/configurations";
export const endpointTitle = "Get all vehicle configurations";

export const pathParameters: ApiRequestParameter[] = [];

export const queryParameters: ApiRequestParameter[] = [];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "id", type: "string", description: "Stable identifier for this vehicle configuration." },
	{ name: "vehicleType", type: "integer", description: "The type of vehicle." },
	{ name: "year", type: "integer | string", description: "The model year." },
	{ name: "make", type: "string", description: "The vehicle manufacturer." },
	{ name: "model", type: "string", description: "The vehicle model." },
	{ name: "lengthFeet", type: "integer | string | null", description: "The vehicle length in feet." },
	{ name: "powertrain", type: "integer", description: "The powertrain type." },
];
