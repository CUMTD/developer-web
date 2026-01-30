import { existsSync } from "node:fs";
import { join } from "node:path";
import { type AnyApiMethod, API_INDEX, type ApiObject } from "@t/md.generated";
import type { MethodHelp } from "./types";

/**
 * Lists all available API objects
 */
export function listObjects(): ApiObject[] {
	return Object.keys(API_INDEX) as ApiObject[];
}

/**
 * Lists all methods for a given API object
 */
export function listMethods(object: ApiObject): string[] {
	const methods = API_INDEX[object];
	if (!methods) {
		throw new Error(`Unknown API object: ${object}`);
	}
	return [...methods];
}

/**
 * Gets detailed help for a specific method
 */
export async function getMethodHelp(object: ApiObject, method: string, baseUrl: string): Promise<MethodHelp> {
	// Validate object exists
	const methods = API_INDEX[object];
	if (!methods) {
		throw new Error(`Unknown API object: ${object}`);
	}

	// Validate method exists
	if (!methods.includes(method as never)) {
		throw new Error(`Unknown method '${method}' for object '${object}'`);
	}

	// Build path to method directory
	const methodPath = join(process.cwd(), "src", "content", "api", object, method);

	// Check if method directory exists
	if (!existsSync(methodPath)) {
		throw new Error(
			`Method directory not found: ${methodPath}. This may indicate a mismatch between API_INDEX and actual file structure.`,
		);
	}

	// Try to load parameters.ts
	const parametersPath = join(methodPath, "parameters.ts");
	let title = "";
	let endpoint = "";
	let pathParameters: Array<{
		name: string;
		type: string;
		required: boolean;
		description: string;
	}> = [];
	let queryParameters: Array<{
		name: string;
		type: string;
		required: boolean;
		description: string;
	}> = [];

	if (existsSync(parametersPath)) {
		try {
			// Dynamic import the parameters
			const parametersModule = await import(parametersPath);

			title = parametersModule.endpointTitle || "";
			endpoint = parametersModule.endpoint || "";

			// Map path parameters
			if (Array.isArray(parametersModule.pathParameters)) {
				pathParameters = parametersModule.pathParameters.map(
					(param: { name: string; type: string; required: boolean; description: string }) => ({
						name: param.name,
						type: param.type,
						required: param.required,
						description: param.description,
					}),
				);
			}

			// Map query parameters
			if (Array.isArray(parametersModule.queryParameters)) {
				queryParameters = parametersModule.queryParameters.map(
					(param: { name: string; type: string; required: boolean; description: string }) => ({
						name: param.name,
						type: param.type,
						required: param.required,
						description: param.description,
					}),
				);
			}
		} catch (error) {
			console.warn(`Failed to load parameters for ${object}/${method}:`, error);
		}
	}

	// Check if example response exists
	const responsePath = join(methodPath, "response.json");
	const hasExampleResponse = existsSync(responsePath);

	// Determine HTTP method from endpoint name
	const httpMethod = method.startsWith("get-") ? "GET" : "POST";

	// Build reference URL
	const referenceUrl = `${baseUrl}/reference/${method}`;

	return {
		object,
		method: method as AnyApiMethod,
		title,
		endpoint,
		httpMethod,
		pathParameters,
		queryParameters,
		referenceUrl,
		hasExampleResponse,
	};
}
