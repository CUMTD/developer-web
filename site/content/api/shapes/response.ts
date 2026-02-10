import type { ApiResponseAttribute } from "@t/documentation-types";

export const response: ApiResponseAttribute[] = [
	{
		name: "id",
		type: "string",
		description: "Unique identifier for the shape.",
	},
	{
		name: "shapePoints",
		type: "array of shapePoints",
		description: "Array of points that define the shape path.",
		childAttributes: [
			{
				name: "sequence",
				type: "integer",
				description: "1-indexed sequence number of the point in the shape path.",
			},
			{
				name: "coordinates",
				type: "object",
				description: "Geographic coordinates of the shape point.",
				childAttributes: [
					{
						name: "latitude",
						type: "float",
						description: "Latitude coordinate of the shape point.",
					},
					{
						name: "longitude",
						type: "float",
						description: "Longitude coordinate of the shape point.",
					},
				],
			},
			{
				name: "distanceTraveled",
				type: "float",
				description: "Distance traveled, in meters, along the shape from the first point to this point.",
			},
			{
				name: "stopId",
				type: "string | null",
				description: "Stop ID if this shape point corresponds to a stop, otherwise null.",
			},
		],
	},
];
