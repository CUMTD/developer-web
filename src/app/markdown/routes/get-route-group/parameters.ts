import type { EndpointParameter } from "src/types/EndpointParameter";

export const parameters: EndpointParameter[] = [
	{
		name: "id",
		type: "string",
		required: true,
		description: "The id of a route group.",
	},
];
