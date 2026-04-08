import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/vehicles/configurations/{configurationId}";
export const endpointTitle = "Get a vehicle configuration";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "configurationId",
		type: "string",
		required: true,
		description: "The id of a vehicle configuration.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "id", type: "string", description: "Stable identifier for this vehicle configuration." },
	{
		name: "vehicleType",
		type: "integer",
		description: "The type of vehicle.",
		enumDefinition: {
			0: "Bus",
			1: "ADA Van",
			2: "C-Carts Van",
			3: "DRES Van",
			4: "Supervisor Vehicle",
			5: "Maintenance Vehicle",
			6: "Pool Car",
			7: "Tractor",
			8: "Historical",
		},
	},
	{ name: "year", type: "integer | string", description: "The model year." },
	{ name: "make", type: "string", description: "The vehicle manufacturer." },
	{ name: "model", type: "string", description: "The vehicle model." },
	{ name: "lengthFeet", type: "integer | string | null", description: "The vehicle length in feet." },
	{ name: "powertrain", type: "integer", description: "The powertrain type." },
];
