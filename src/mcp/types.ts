// /src/mcp/types.ts
//
// Shared MCP types used by server/resources/tools.
//
// Note on `exactOptionalPropertyTypes`:
// - Optional properties should be omitted when unknown.
// - Do NOT assign `undefined` to optional properties unless the type explicitly includes it.

import type { AnyApiMethod, ApiObject } from "@t/md.generated";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

export type OpenApiParameter = {
	name: string;
	in: "path" | "query" | "header" | "cookie";
	required?: boolean;
	description?: string;
	schema?: unknown;
};

export type OpenApiSecurityScheme =
	| {
			type: "apiKey";
			name: string;
			in: "header" | "query" | "cookie";
			description?: string;
	  }
	| {
			type: "http";
			scheme: string;
			bearerFormat?: string;
			description?: string;
	  }
	| {
			type: "oauth2";
			description?: string;
			flows: unknown;
	  }
	| {
			type: "openIdConnect";
			openIdConnectUrl: string;
			description?: string;
	  };

export type OpenApiIndex = {
	version: number;
	generatedAt: string;
	spec: {
		title?: string;
		version?: string;
	};
	objects: Record<
		string,
		{
			methods: string[];
		}
	>;
	methods: Record<
		string,
		{
			object: ApiObject;
			operationId: string;
			method: HttpMethod;
			path: string;
			summary?: string;
			description?: string;
			parameters: {
				path: OpenApiParameter[];
				query: OpenApiParameter[];
			};
			security?: Array<Record<string, string[]>>;
		}
	>;
	securitySchemes: Record<string, OpenApiSecurityScheme>;
};

/**
 * Method help response returned by MCP tool: get_method_help.
 *
 * This intentionally returns OpenAPI truth first, then optionally adds doc enhancements from /src/content.
 */
export type MethodHelp = {
	object: ApiObject;
	method: AnyApiMethod;

	/** OpenAPI operationId (should match `method`) */
	operationId: string;

	/** OpenAPI HTTP method */
	httpMethod: HttpMethod;

	/** OpenAPI path template, e.g. "/routes/{id}" */
	path: string;

	/** OpenAPI summary/description if present */
	summary: string;
	description: string;

	/** Parameters as described by OpenAPI (doc enhancements may add more text, but do not change the list) */
	pathParameters: OpenApiParameter[];
	queryParameters: OpenApiParameter[];

	/** Security requirement objects from OpenAPI operation (if present) */
	security: Array<Record<string, string[]>>;

	/** Convenience: primary API key header if the spec declares an apiKey scheme */
	apiKeyHeaderName: string;

	/** Documentation URLs inside your developer site */
	referenceUrl: string;

	/** Whether /src/content contains example response.json */
	hasExampleResponse: boolean;

	/**
	 * If true, extra details were loaded from /src/content.
	 * If false, result reflects OpenAPI only (docs missing or mismatched).
	 */
	enhancementsApplied: boolean;

	/** Non-fatal problems when applying /src/content enhancements */
	enhancementWarnings: string[];
};

export type ObjectHelp = {
	object: ApiObject;
	methods: AnyApiMethod[];
	descriptionText: string;
	exampleObject: unknown;
	referenceUrl: string;
};
