import type { ApiRequestParameter } from "src/types/DocumentationTypes";

export const parameters: ApiRequestParameter[] = [
	{
		name: "id",
		type: "string",
		required: true,
		description: "The id of a route group.",
	},
];
