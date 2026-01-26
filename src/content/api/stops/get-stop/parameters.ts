import type { ApiRequestParameter } from "@t/documentation-types";

export const parameters: ApiRequestParameter[] = [
	{
		name: "id",
		type: "string",
		required: true,
		description: "The id of a stop.",
	},
];
