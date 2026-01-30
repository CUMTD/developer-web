import { existsSync, readFileSync } from "node:fs";
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
 * Extracts endpoint information from parameters.ts file content
 */
function parseParametersFile(content: string): {
	endpoint: string;
	endpointTitle: string;
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
} {
	const result = {
		endpoint: "",
		endpointTitle: "",
		pathParameters: [] as Array<{
			name: string;
			type: string;
			required: boolean;
			description: string;
		}>,
		queryParameters: [] as Array<{
			name: string;
			type: string;
			required: boolean;
			description: string;
		}>,
	};

	// Extract endpoint using regex
	const endpointMatch = content.match(/export\s+const\s+endpoint\s*=\s*["']([^"']+)["']/);
	if (endpointMatch) {
		result.endpoint = endpointMatch[1];
	}

	// Extract endpoint title using regex
	const titleMatch = content.match(/export\s+const\s+endpointTitle\s*=\s*["']([^"']+)["']/);
	if (titleMatch) {
		result.endpointTitle = titleMatch[1];
	}

	// For path and query parameters, we'll just note if they exist
	// Since parsing the full TypeScript AST would be complex, we'll keep it simple
	const hasPathParams = content.includes("export const pathParameters");
	const hasQueryParams = content.includes("export const queryParameters");

	// Simple heuristic: count object literals in pathParameters array
	if (hasPathParams) {
		const pathParamsMatch = content.match(/export\s+const\s+pathParameters[^=]*=\s*\[([\s\S]*?)\];/);
		if (pathParamsMatch) {
			const params = pathParamsMatch[1];
			const paramMatches = params.matchAll(/\{\s*name:\s*["']([^"']+)["']/g);
			for (const match of paramMatches) {
				result.pathParameters.push({
					name: match[1],
					type: "string",
					required: true,
					description: `Path parameter: ${match[1]}`,
				});
			}
		}
	}

	if (hasQueryParams) {
		const queryParamsMatch = content.match(/export\s+const\s+queryParameters[^=]*=\s*\[([\s\S]*?)\];/);
		if (queryParamsMatch) {
			const params = queryParamsMatch[1];
			const paramMatches = params.matchAll(/\{\s*name:\s*["']([^"']+)["']/g);
			for (const match of paramMatches) {
				result.queryParameters.push({
					name: match[1],
					type: "string",
					required: false,
					description: `Query parameter: ${match[1]}`,
				});
			}
		}
	}

	return result;
}

/**
 * Gets detailed help for a specific method
 */
export function getMethodHelp(object: ApiObject, method: string, baseUrl: string): MethodHelp {
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
			const content = readFileSync(parametersPath, "utf-8");
			const parsed = parseParametersFile(content);
			title = parsed.endpointTitle;
			endpoint = parsed.endpoint;
			pathParameters = parsed.pathParameters;
			queryParameters = parsed.queryParameters;
		} catch (error) {
			console.warn(`Failed to parse parameters for ${object}/${method}:`, error);
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
