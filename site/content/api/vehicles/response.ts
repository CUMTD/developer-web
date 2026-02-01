import type { ApiResponseAttribute } from "@t/documentation-types";

export const response: ApiResponseAttribute[] = [
	{
		name: "id",
		type: "string",
		description: "Unique identifier for the vehicle.",
	},
	{
		name: "vehicleNumber",
		type: "string",
		description: "The vehicle number displayed on the bus.",
	},
	{
		name: "vehicleConfigurationId",
		type: "string",
		description: "Unique identifier for the vehicle configuration.",
	},
	{
		name: "isActive",
		type: "boolean",
		description: "Whether the vehicle is currently active in service.",
	},
	{
		name: "vin",
		type: "string",
		description: "Vehicle Identification Number (VIN).",
	},
	{
		name: "licensePlateNumber",
		type: "string | null",
		description: "License plate number of the vehicle, if available.",
	},
	{
		name: "dateInService",
		type: "string",
		description: "The date the vehicle was put into service (YYYY-MM-DD).",
	},
];
