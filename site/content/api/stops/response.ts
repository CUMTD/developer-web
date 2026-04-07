import type { ApiResponseAttribute } from "@t/documentation-types";

export const response: ApiResponseAttribute[] = [
	{
		name: "type",
		type: "integer",
		description: "0 = Stop Group, 1 = Boarding Point",
	},
	{
		name: "isStation",
		type: "boolean",
		description: "Whether the stop is a station.",
	},
	{
		name: "city",
		type: "string",
		description: 'The city where the stop is located. Either "Champaign", "Urbana", or "Savoy".',
	},
	{
		name: "boardingPoints",
		type: "Array of boardingPoints",
		description: "Array of individual boarding points within this stop group.",
		childAttributes: [
			{
				name: "subName",
				type: "string",
				description:
					"Sub-name or description of the boarding point. This is usually shown in parenthesis after the stop name.",
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
				description: "4-digit stop code for the boarding point, used for SMS and https://mtd.org/stop/{code}",
			},
			{
				name: "url",
				type: "string",
				description: "URL to the boarding point's page on MTD's website.",
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
		name: "isTimepoint",
		type: "boolean",
		description:
			"Whether the stop is a timepoint. An operator may not depart from a timepoint early. Timepoints are the times published in the Maps and Schedules book.",
	},
	{
		name: "stopCode",
		type: "string",
		description: "4-digit stop code for the stop group, used for SMS and https://mtd.org/stop/{code}",
	},
	{
		name: "url",
		type: "string",
		description: "URL to the stop group's page on MTD's website.",
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
];
