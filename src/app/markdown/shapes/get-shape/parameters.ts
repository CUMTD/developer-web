import type { EndpointParameter } from "src/types/EndpointParameter";

export const parameters: EndpointParameter[] = [
	{
		name: "id",
		type: "string",
		required: true,
		description: "The id of a shape.",
	},
	{
		name: "polyline",
		type: "boolean",
		required: false,
		description: "Returns an encoded polyline if true.",
	},
];
