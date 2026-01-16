export type EndpointParameter = {
	name: string;
	type: "boolean" | "string" | "integer";
	required: boolean;
	description: string;
};
