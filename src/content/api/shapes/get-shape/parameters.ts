import type { ApiRequestParameter } from "@t/documentation-types";

export const parameters: ApiRequestParameter[] = [
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
		description: "Returns an encoded polyline (see above) if true.",
	},
];
