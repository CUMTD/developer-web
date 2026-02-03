type ApiDataType = "boolean" | "string" | "integer" | "float" | string;

// todo: use this
export type ApiEndpoint = {
	title: string;
	path: string;
	pathParameters: ApiRequestParameter[];
	queryParameters: ApiRequestParameter[];
};

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
