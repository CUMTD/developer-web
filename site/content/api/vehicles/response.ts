import type { ApiResponseAttribute } from "@t/documentation-types";

export const response: ApiResponseAttribute[] = [
	{
		name: "id",
		type: "string",
		description: "The vehicle number displayed on the side of the vehicle.",
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
		name: "dateInService",
		type: "string",
		description: "The date the vehicle was put into service (YYYY-MM-DD).",
	},
];
