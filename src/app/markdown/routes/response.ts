import type { ApiResponseAttribute } from "src/types/DocumentationTypes";

export const response: ApiResponseAttribute[] = [
	{
		name: "type",
		type: "string",
		description: "Either 'stop-group' or 'boarding-point'",
	},
	{
		name: "isStation",
		type: "boolean",
		description: "Whether the stop is a station.",
	},
	{
		name: "isTimepoint",
		type: "boolean",
		description: "Whether the stop is a timepoint.",
	},
	{
		name: "city",
		type: "string",
		description: "The city where the stop is located. Either Champaign, Urbana, or Savoy.",
	},
	{
		name: "boardingPoints",
		type: "Array of boardingPoints",
		description: "Array of individual boarding points within this stop group.",
		childAttributes: [
			{
				name: "subName",
				type: "string",
				description: "Sub-name or description of the boarding point.",
			},
			{
				name: "platformCode",
				type: "string | null",
				description: "Platform code for the boarding point, if applicable.",
			},
			{
				name: "id",
				type: "string",
				description: "Unique identifier for the boarding point.",
			},
			{
				name: "name",
				type: "string",
				description: "Full name of the boarding point.",
			},
			{
				name: "stopCode",
				type: "string",
				description: "Stop code for the boarding point.",
			},
			{
				name: "url",
				type: "string",
				description: "URL for more information about the boarding point.",
			},
			{
				name: "isAccessible",
				type: "boolean",
				description: "Whether the boarding point is accessible.",
			},
			{
				name: "location",
				type: "object",
				description: "Geographic location of the boarding point.",
				childAttributes: [
					{
						name: "latitude",
						type: "float",
						description: "Latitude coordinate.",
					},
					{
						name: "longitude",
						type: "float",
						description: "Longitude coordinate.",
					},
				],
			},
		],
	},
	{
		name: "id",
		type: "string",
		description: "Unique identifier for the stop group.",
	},
	{
		name: "name",
		type: "string",
		description: "Name of the stop group.",
	},
	{
		name: "stopCode",
		type: "string",
		description: "Stop code for the stop group.",
	},
	{
		name: "url",
		type: "string",
		description: "URL for more information about the stop group.",
	},
	{
		name: "isAccessible",
		type: "boolean",
		description: "Whether the stop group is accessible.",
	},
	{
		name: "location",
		type: "object",
		description: "Geographic location of the stop group center.",
		childAttributes: [
			{
				name: "latitude",
				type: "number",
				description: "Latitude coordinate.",
			},
			{
				name: "longitude",
				type: "number",
				description: "Longitude coordinate.",
			},
		],
	},
];
