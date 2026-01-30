import type { AnyApiMethod, ApiObject } from "@t/md.generated";

/**
 * OpenAPI spec resource data
 */
export type OpenApiSpecResource = {
	uri: string;
	name: string;
	description: string;
	mimeType: string;
};

/**
 * API Index resource data
 */
export type ApiIndexResource = {
	uri: string;
	name: string;
	description: string;
	mimeType: string;
};

/**
 * Method help response
 */
export type MethodHelp = {
	object: ApiObject;
	method: AnyApiMethod;
	title: string;
	endpoint: string;
	httpMethod: string;
	pathParameters: Array<{
		name: string;
		type: string;
		required: boolean;
		description: string;
	}>;
	queryParameters: Array<{
		name: string;
		type: string;
		required: boolean;
		description: string;
	}>;
	referenceUrl: string;
	hasExampleResponse: boolean;
};
