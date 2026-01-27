import type { ApiResponseAttribute } from "@t/documentation-types";

export const response: ApiResponseAttribute[] = [
	{
		name: "id",
		type: "string",
		description: "Unique identifier for the service alert.",
	},
	{
		name: "displayId",
		type: "string",
		description: "Display identifier for the service alert.",
		// todo: is this right
	},
	{
		name: "text",
		type: "string",
		description: "The alert message text to display to users.",
	},
	{
		name: "startTime",
		type: "string",
		description: "The start time of the alert in ISO 8601 format.",
	},
	{
		name: "endTime",
		type: "string",
		description: "The end time of the alert in ISO 8601 format.",
	},
	{
		name: "blockRealtime",
		type: "boolean",
		description: "Whether this alert should block realtime updates for the stops it affects.",
	},
	{
		name: "stopIds",
		type: "Array of strings",
		description: "Array of stop IDs affected by this service alert.",
	},
];
