// /src/mcp/tools.ts
//
// MCP tool implementations.
// OpenAPI index (generated at build time) is used for operation truth.
// /src/content is used only for optional enhancements (examples, extra descriptions).
//
// This file is designed to be stable as APIs evolve:
// - Add/rename operations in OpenAPI + docs -> run build script -> MCP stays in sync.
// - If docs are missing or mismatched, MCP still returns OpenAPI-based help.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { type AnyApiMethod, API_INDEX, type ApiMethod, type ApiObject } from "@t/md.generated";
import type { MethodHelp, ObjectHelp, OpenApiIndex, OpenApiParameter } from "./types";

const GENERATED_INDEX_PATH = join(process.cwd(), "src", "mcp", "generated", "openapi-index.json");
const CONTENT_API_ROOT = join(process.cwd(), "src", "content", "api");

let cachedIndex: OpenApiIndex | null = null;

function loadOpenApiIndex(): OpenApiIndex {
	if (cachedIndex) {
		return cachedIndex;
	}

	const raw = readFileSync(GENERATED_INDEX_PATH, "utf-8");
	const parsed = JSON.parse(raw) as unknown;

	// We keep validation light here; build-time script guarantees shape.
	cachedIndex = parsed as OpenApiIndex;
	return cachedIndex;
}

function safeReadText(path: string): string {
	return readFileSync(path, "utf-8");
}

function safeReadJson(path: string): unknown {
	return JSON.parse(readFileSync(path, "utf-8")) as unknown;
}

function getDocMethodDir(object: ApiObject, method: string): string {
	return join(CONTENT_API_ROOT, object, method);
}

/**
 * Lists all available API objects based on md.generated.
 * This also implicitly means "docs folder exists for this object".
 */
export function listObjects(): ApiObject[] {
	return Object.keys(API_INDEX) as ApiObject[];
}

/**
 * Lists all methods for a given API object.
 */
export function listMethods<T extends ApiObject>(object: T): ApiMethod<T>[] {
	const methods = API_INDEX[object];
	if (!methods) {
		throw new Error(`Unknown API object: ${object}`);
	}
	return [...methods] as ApiMethod<T>[];
}

/**
 * Returns object-level help:
 * - list of methods
 * - object.json example (if present)
 * - description.mdx (if present)
 */
export function getObjectHelp(object: ApiObject, baseUrl: string): ObjectHelp {
	// Validate object exists
	const methods = API_INDEX[object];
	if (!methods) {
		throw new Error(`Unknown API object: ${object}`);
	}

	const objDir = join(CONTENT_API_ROOT, object);
	const descriptionPath = join(objDir, "description.mdx");
	const objectJsonPath = join(objDir, "object.json");

	const descriptionText = existsSync(descriptionPath) ? safeReadText(descriptionPath) : "";
	const exampleObject = existsSync(objectJsonPath) ? safeReadJson(objectJsonPath) : {};

	return {
		object,
		methods: [...methods] as AnyApiMethod[],
		descriptionText,
		exampleObject,
		referenceUrl: `${baseUrl}/reference/${object}`,
	};
}

function extractApiKeyHeaderName(index: OpenApiIndex, operationId: string): string {
	// Default to your documented header if we can’t infer it.
	const fallback = "X-ApiKey";

	const op = index.methods[operationId];
	if (!op) {
		return fallback;
	}

	// If the operation has security requirements, try to find an apiKey scheme.
	// If not specified, OpenAPI spec might use top-level security; keep it simple.
	const securityReqs = op.security ?? [];
	for (const sec of securityReqs) {
		for (const schemeName of Object.keys(sec)) {
			const scheme = index.securitySchemes[schemeName];
			if (scheme && scheme.type === "apiKey") {
				return scheme.name;
			}
		}
	}

	// Look for any apiKey scheme in the spec as a fallback.
	for (const scheme of Object.values(index.securitySchemes)) {
		if (scheme.type === "apiKey") {
			return scheme.name;
		}
	}

	return fallback;
}

/**
 * Reads /src/content/api/<object>/<method>/parameters.ts and extracts endpoint + title.
 * This is intentionally “string parsing” (not TS AST) to keep dependencies/complexity low.
 */
function parseDocParametersFile(content: string): { endpoint: string; endpointTitle: string } {
	const endpointMatch = content.match(/export\s+const\s+endpoint\s*=\s*["']([^"']+)["']/);
	const titleMatch = content.match(/export\s+const\s+endpointTitle\s*=\s*["']([^"']+)["']/);

	return {
		endpoint: endpointMatch ? endpointMatch[1] : "",
		endpointTitle: titleMatch ? titleMatch[1] : "",
	};
}

function stringifyParamList(params: OpenApiParameter[]): string[] {
	return params.map((p) => {
		const required = p.required ? "required" : "optional";
		return `${p.name} (${p.in}, ${required})`;
	});
}

/**
 * Gets detailed help for a specific method:
 * - Always uses generated OpenAPI index as the source of truth.
 * - Optionally loads doc enhancements if present and consistent.
 */
export function getMethodHelp<T extends ApiObject>(object: T, method: ApiMethod<T>, baseUrl: string): MethodHelp {
	const index = loadOpenApiIndex();

	const methodId = method as string;
	const op = index.methods[methodId];

	if (!op) {
		// This means build output is stale or missing.
		throw new Error(
			`OpenAPI index missing method '${methodId}' for object '${object}'. ` +
				`Rebuild /src/mcp/generated/openapi-index.json.`,
		);
	}

	// Sanity: ensure the index agrees about object ownership.
	if (op.object !== object) {
		throw new Error(
			`OpenAPI index mismatch: method '${methodId}' is mapped to object '${op.object}', ` +
				`but caller requested object '${object}'. Rebuild openapi-index.json.`,
		);
	}

	const warnings: string[] = [];

	// Load doc enhancements (optional)
	const docDir = getDocMethodDir(object, methodId);
	const parametersPath = join(docDir, "parameters.ts");
	const responsePath = join(docDir, "response.json");

	let enhancementsApplied = false;

	if (existsSync(docDir)) {
		// If folder exists, try to apply enhancements safely.
		if (existsSync(parametersPath)) {
			try {
				const docParamsText = safeReadText(parametersPath);
				const parsedDoc = parseDocParametersFile(docParamsText);

				// If docs declare an endpoint, sanity check it matches OpenAPI.
				// If it mismatches, we keep OpenAPI truth and report the warning.
				if (parsedDoc.endpoint && parsedDoc.endpoint !== op.path) {
					warnings.push(
						`Doc endpoint mismatch: parameters.ts endpoint '${parsedDoc.endpoint}' does not match OpenAPI path '${op.path}'. ` +
							`Enhancements were not applied.`,
					);
				} else {
					enhancementsApplied = true;
				}

				// EndpointTitle is a “nice to have”; do not affect enhancement application.
				if (parsedDoc.endpointTitle && !enhancementsApplied) {
					warnings.push(
						`Doc endpointTitle was found ('${parsedDoc.endpointTitle}') but endpoint mismatch prevented applying doc enhancements.`,
					);
				}
			} catch (error) {
				const message = error instanceof Error ? error.message : "Unknown error";
				warnings.push(`Failed reading/parsing parameters.ts: ${message}`);
			}
		} else {
			warnings.push(`Doc parameters.ts not found at ${parametersPath}. Returning OpenAPI-only help.`);
		}
	} else {
		warnings.push(`Doc folder not found at ${docDir}. Returning OpenAPI-only help.`);
	}

	const hasExampleResponse = existsSync(responsePath);

	// Normalize optional OpenAPI strings into always-present strings for MCP responses.
	const summary = op.summary ?? "";
	const description = op.description ?? "";

	// Extract an api key header name if possible.
	const apiKeyHeaderName = extractApiKeyHeaderName(index, methodId);

	// Provide a nice reference URL for humans/tools.
	const referenceUrl = `${baseUrl}/reference/${methodId}`;

	// Helpful extra warnings when OpenAPI params look incomplete vs what you expect.
	if (op.parameters.path.length === 0 && op.path.includes("{")) {
		warnings.push(
			`OpenAPI path '${op.path}' includes '{...}' but no path parameters were found on the operation. ` +
				`Check the OpenAPI parameters section for this operation.`,
		);
	}

	// Additional debugging context for yourself:
	if (warnings.length > 0) {
		warnings.push(`Debug: OpenAPI path params: ${stringifyParamList(op.parameters.path).join(", ") || "(none)"}`);
		warnings.push(`Debug: OpenAPI query params: ${stringifyParamList(op.parameters.query).join(", ") || "(none)"}`);
	}

	return {
		object,
		method: method as AnyApiMethod,
		operationId: op.operationId,
		httpMethod: op.method,
		path: op.path,
		summary,
		description,
		pathParameters: op.parameters.path,
		queryParameters: op.parameters.query,
		security: op.security ?? [],
		apiKeyHeaderName,
		referenceUrl,
		hasExampleResponse,
		enhancementsApplied,
		enhancementWarnings: warnings,
	};
}
