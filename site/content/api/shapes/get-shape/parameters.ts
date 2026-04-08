import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";

export const endpoint = "/shapes/{shapeId}";
export const endpointTitle = "Get a shape";

export const pathParameters: ApiRequestParameter[] = [
	{
		name: "shapeId",
		type: "string",
		required: true,
		description: "The id of a shape.",
		isPath: true,
	},
];

export const queryParameters: ApiRequestParameter[] = [];

export const responseAttributes: ApiResponseAttribute[] = [
	{ name: "id", type: "string", description: "Stable identifier for this shape." },
	{
		name: "shapePoints",
		type: "Array of shapePoints",
		description: "The ordered collection of points that define this shape.",
		childAttributes: [
			{
				name: "sequence",
				type: "integer | string",
				description: "The order of this point along the shape. 1-indexed.",
			},
			{
				name: "coordinates",
				type: "object",
				description: "The geographic location of this shape point.",
				childAttributes: [
					{ name: "latitude", type: "float", description: "Latitude coordinate." },
					{ name: "longitude", type: "float", description: "Longitude coordinate." },
				],
			},
			{
				name: "distanceTraveled",
				type: "float",
				description: "Cumulative distance traveled along the shape to this point, in meters.",
			},
			{
				name: "stopId",
				type: "string | null",
				description: "Stop ID served by this shape point, if any. Null if this is just a point along the line.",
			},
		],
	},
];
