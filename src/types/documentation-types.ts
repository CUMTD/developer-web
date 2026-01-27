type ApiDataType = "boolean" | "string" | "integer" | "float" | string;

export type ApiRequestParameter = {
	name: string;
	type: ApiDataType;
	required: boolean;
	description: string;
	isPath: boolean;
	exampleValue?: string;
};

export type ApiResponseAttribute = {
	name: string;
	type: ApiDataType;
	description: string;
	childAttributes?: ApiResponseAttribute[];
};
