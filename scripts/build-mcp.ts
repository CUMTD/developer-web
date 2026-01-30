// /scripts/build-mcp.ts
//
// Build-time generator for MCP OpenAPI index.
//
// Goals:
// - OpenAPI spec is source of truth for operations (path/method/params/auth).
// - md.generated is source of truth for doc folder structure (object/method).
// - Throw at build time if they diverge, so MCP stays consistent as the API evolves.
//
// Usage:
//   OPENAPI_SPEC_URL=https://example.com/v3.0.0.yml pnpm tsx scripts/build-mcp.ts
//   (Fallback) OPENAPI_SPEC_PATH=./v3.0.0.yml pnpm tsx scripts/build-mcp.ts
// Defaults:
//   If OPENAPI_SPEC_URL is provided, the spec is fetched over HTTP(S).
//   Otherwise OPENAPI_SPEC_PATH is used and defaults to "./v3.0.0.yml".
//
// Output:
//   Writes to: ./src/mcp/generated/openapi-index.json

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import YAML from "yaml";
import { API_INDEX, type ApiObject } from "../src/types/md.generated";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

type OpenApiParameter = {
	name: string;
	in: "path" | "query" | "header" | "cookie";
	required?: boolean;
	description?: string;
	schema?: unknown;
};

type OpenApiOperation = {
	operationId: string;
	method: HttpMethod;
	path: string;
	summary?: string;
	description?: string;
	tags?: string[];
	parameters: OpenApiParameter[];
	security?: Array<Record<string, string[]>>;
};

type OpenApiSecurityScheme =
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

type GeneratedIndex = {
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

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function isHttpMethodKey(key: string): key is Lowercase<HttpMethod> {
	return (
		key === "get" ||
		key === "post" ||
		key === "put" ||
		key === "patch" ||
		key === "delete" ||
		key === "head" ||
		key === "options"
	);
}

function toHttpMethod(key: Lowercase<HttpMethod>): HttpMethod {
	return key.toUpperCase() as HttpMethod;
}

function getOpenApiParameters(operation: Record<string, unknown>): OpenApiParameter[] {
	const params = operation.parameters;
	if (!Array.isArray(params)) {
		return [];
	}

	const out: OpenApiParameter[] = [];
	for (const p of params) {
		if (!isRecord(p)) {
			continue;
		}
		const name = p.name;
		const _in = p.in;
		if (typeof name !== "string") {
			continue;
		}
		if (_in !== "path" && _in !== "query" && _in !== "header" && _in !== "cookie") {
			continue;
		}

		const param: OpenApiParameter = { name, in: _in };
		if (typeof p.required === "boolean") {
			param.required = p.required;
		}
		if (typeof p.description === "string") {
			param.description = p.description;
		}
		if (p.schema !== undefined) {
			param.schema = p.schema;
		}
		out.push(param);
	}

	return out;
}

function buildMethodToObject(): Map<string, ApiObject> {
	const map = new Map<string, ApiObject>();
	for (const object of Object.keys(API_INDEX) as ApiObject[]) {
		for (const method of API_INDEX[object]) {
			// If this ever collides, it means the same operationId appears under multiple objects.
			// That should be treated as a mismatch.
			if (map.has(method)) {
				throw new Error(`Duplicate method '${method}' found in API_INDEX under multiple objects.`);
			}
			map.set(method, object);
		}
	}
	return map;
}

async function main(): Promise<void> {
	const specUrl = process.env.OPENAPI_SPEC_URL;
	const specPath = resolve(process.env.OPENAPI_SPEC_PATH ?? "./v3.0.0.yml");
	const outPath = resolve("./src/mcp/generated/openapi-index.json");

	let raw: string;
	let specSourceForLog: string;

	if (typeof specUrl === "string" && specUrl.trim().length > 0) {
		const res = await fetch(specUrl);
		if (!res.ok) {
			throw new Error(`Failed to fetch OpenAPI spec from URL '${specUrl}': ${res.status} ${res.statusText}`);
		}
		raw = await res.text();
		specSourceForLog = specUrl;
	} else {
		raw = readFileSync(specPath, "utf-8");
		specSourceForLog = specPath;
	}

	const parsed = YAML.parse(raw) as unknown;

	if (!isRecord(parsed)) {
		throw new Error(`OpenAPI spec at '${specPath}' did not parse into an object.`);
	}

	const methodToObject = buildMethodToObject();

	// Extract security schemes (optional, but useful for MCP help output)
	const securitySchemes: Record<string, OpenApiSecurityScheme> = {};
	if (isRecord(parsed.components) && isRecord(parsed.components.securitySchemes)) {
		for (const [name, scheme] of Object.entries(parsed.components.securitySchemes)) {
			if (isRecord(scheme) && typeof scheme.type === "string") {
				// Keep a minimal, typed shape for the things we use (mainly apiKey header info).
				if (
					scheme.type === "apiKey" &&
					typeof scheme.name === "string" &&
					(scheme.in === "header" || scheme.in === "query" || scheme.in === "cookie")
				) {
					const apiKeyScheme: OpenApiSecurityScheme = {
						type: "apiKey",
						name: scheme.name,
						in: scheme.in,
					};
					if (typeof scheme.description === "string") {
						apiKeyScheme.description = scheme.description;
					}
					securitySchemes[name] = apiKeyScheme;
				} else if (scheme.type === "http" && typeof scheme.scheme === "string") {
					const httpScheme: OpenApiSecurityScheme = {
						type: "http",
						scheme: scheme.scheme,
					};
					if (typeof scheme.bearerFormat === "string") {
						httpScheme.bearerFormat = scheme.bearerFormat;
					}
					if (typeof scheme.description === "string") {
						httpScheme.description = scheme.description;
					}
					securitySchemes[name] = httpScheme;
				} else if (scheme.type === "oauth2" && isRecord(scheme.flows)) {
					const oauthScheme: OpenApiSecurityScheme = {
						type: "oauth2",
						flows: scheme.flows,
					};
					if (typeof scheme.description === "string") {
						oauthScheme.description = scheme.description;
					}
					securitySchemes[name] = oauthScheme;
				} else if (scheme.type === "openIdConnect" && typeof scheme.openIdConnectUrl === "string") {
					const oidcScheme: OpenApiSecurityScheme = {
						type: "openIdConnect",
						openIdConnectUrl: scheme.openIdConnectUrl,
					};
					if (typeof scheme.description === "string") {
						oidcScheme.description = scheme.description;
					}
					securitySchemes[name] = oidcScheme;
				}
			}
		}
	}

	// Extract operations from paths
	const operationsById = new Map<string, OpenApiOperation>();

	const paths = parsed.paths;
	if (!isRecord(paths)) {
		throw new Error(`OpenAPI spec at '${specSourceForLog}' is missing a valid 'paths' object.`);
	}

	for (const [path, pathItem] of Object.entries(paths)) {
		if (!isRecord(pathItem)) {
			continue;
		}

		for (const [maybeVerb, op] of Object.entries(pathItem)) {
			if (!isHttpMethodKey(maybeVerb)) {
				continue;
			}
			if (!isRecord(op)) {
				continue;
			}

			const operationId = op.operationId;
			if (typeof operationId !== "string" || operationId.trim().length === 0) {
				throw new Error(
					`Missing or invalid operationId for ${maybeVerb.toUpperCase()} ${path}. ` +
						`This build requires operationId on every operation.`,
				);
			}

			if (operationsById.has(operationId)) {
				const existing = operationsById.get(operationId);
				throw new Error(
					`Duplicate operationId '${operationId}' found on ` +
						`${maybeVerb.toUpperCase()} ${path} and ${existing?.method} ${existing?.path}.`,
				);
			}

			const params = getOpenApiParameters(op);
			const tags = Array.isArray(op.tags) ? op.tags.filter((t) => typeof t === "string") : undefined;

			const opOut: OpenApiOperation = {
				operationId,
				method: toHttpMethod(maybeVerb),
				path,
				parameters: params,
			};
			if (typeof op.summary === "string") {
				opOut.summary = op.summary;
			}
			if (typeof op.description === "string") {
				opOut.description = op.description;
			}
			if (tags && tags.length > 0) {
				opOut.tags = tags;
			}
			if (Array.isArray(op.security)) {
				opOut.security = op.security.filter((s) => isRecord(s)) as Array<Record<string, string[]>>;
			}

			operationsById.set(operationId, opOut);
		}
	}

	// === Build-time mismatch verification ===

	// A) Every md.generated method must exist in OpenAPI as an operationId.
	const missingInOpenApi: Array<{ object: ApiObject; method: string }> = [];
	for (const [method, object] of methodToObject.entries()) {
		if (!operationsById.has(method)) {
			missingInOpenApi.push({ object, method });
		}
	}
	if (missingInOpenApi.length > 0) {
		const lines = missingInOpenApi
			.sort((a, b) => a.object.localeCompare(b.object) || a.method.localeCompare(b.method))
			.map((m) => `- ${m.object}/${m.method}`);
		throw new Error(
			`Mismatch: md.generated contains methods missing from OpenAPI operationId.\n` +
				`Spec: ${specSourceForLog}\n` +
				`Missing:\n${lines.join("\n")}\n\n` +
				`Fix by adding operationId entries to OpenAPI, or remove/rename doc folders so md.generated matches.`,
		);
	}

	// B) Every OpenAPI operationId must exist in md.generated (so docs structure remains in sync).
	const extrasInOpenApi: string[] = [];
	for (const operationId of operationsById.keys()) {
		if (!methodToObject.has(operationId)) {
			extrasInOpenApi.push(operationId);
		}
	}
	if (extrasInOpenApi.length > 0) {
		const lines = extrasInOpenApi.sort().map((op) => `- ${op}`);
		throw new Error(
			`Mismatch: OpenAPI includes operationIds not present in md.generated.\n` +
				`Spec: ${specSourceForLog}\n` +
				`Extra operationIds:\n${lines.join("\n")}\n\n` +
				`Fix by adding corresponding doc folders under /src/content/api/<object>/<method> so md.generated includes them, ` +
				`or rename operationIds to match your docs.`,
		);
	}

	// === Validate documentation consistency (optional but recommended) ===

	const docRoot = resolve("./src/content/api");
	const docMismatches: Array<{ object: ApiObject; method: string; issue: string }> = [];

	for (const [method, object] of methodToObject.entries()) {
		const op = operationsById.get(method);
		if (!op) {
			continue; // Already caught above
		}

		const parametersPath = resolve(docRoot, object, method, "parameters.ts");
		try {
			if (readFileSync(parametersPath, "utf-8")) {
				const content = readFileSync(parametersPath, "utf-8");
				const endpointMatch = content.match(/export\s+const\s+endpoint\s*=\s*["']([^"']+)["']/);

				if (endpointMatch) {
					const docEndpoint = endpointMatch[1];
					if (docEndpoint !== op.path) {
						docMismatches.push({
							object,
							method,
							issue: `parameters.ts endpoint '${docEndpoint}' does not match OpenAPI path '${op.path}'`,
						});
					}
				}
			}
		} catch {
			// parameters.ts doesn't exist or can't be read - that's OK, docs are optional
		}
	}

	if (docMismatches.length > 0) {
		const lines = docMismatches.map((m) => `- ${m.object}/${m.method}: ${m.issue}`);
		throw new Error(
			`Documentation consistency errors found:\n${lines.join("\n")}\n\n` +
				`Fix the endpoint values in parameters.ts files to match OpenAPI paths, or update OpenAPI spec.`,
		);
	}

	// === Generate index ===

	const objects: GeneratedIndex["objects"] = {};
	const methods: GeneratedIndex["methods"] = {};

	for (const object of Object.keys(API_INDEX) as ApiObject[]) {
		objects[object] = { methods: [...API_INDEX[object]] };

		for (const methodId of API_INDEX[object]) {
			const op = operationsById.get(methodId);
			if (!op) {
				// Should never happen because mismatch checks above would have thrown.
				throw new Error(`Internal error: operation '${methodId}' unexpectedly missing from OpenAPI.`);
			}

			const pathParams = op.parameters.filter((p) => p.in === "path");
			const queryParams = op.parameters.filter((p) => p.in === "query");

			const methodOut: GeneratedIndex["methods"][string] = {
				object,
				operationId: op.operationId,
				method: op.method,
				path: op.path,
				parameters: {
					path: pathParams,
					query: queryParams,
				},
			};
			if (op.summary !== undefined) {
				methodOut.summary = op.summary;
			}
			if (op.description !== undefined) {
				methodOut.description = op.description;
			}
			if (op.security !== undefined) {
				methodOut.security = op.security;
			}
			methods[methodId] = methodOut;
		}
	}

	const specInfo = isRecord(parsed.info) ? parsed.info : undefined;

	const spec: GeneratedIndex["spec"] = {};
	if (specInfo && typeof specInfo.title === "string") {
		spec.title = specInfo.title;
	}
	if (specInfo && typeof specInfo.version === "string") {
		spec.version = specInfo.version;
	}

	const generated: GeneratedIndex = {
		version: 1,
		generatedAt: new Date().toISOString(),
		spec,
		objects,
		methods,
		securitySchemes,
	};

	mkdirSync(dirname(outPath), { recursive: true });
	writeFileSync(outPath, `${JSON.stringify(generated, null, 2)}\n`, "utf-8");

	console.log(`✅ Wrote OpenAPI index to ${outPath}`);
	console.log(`   Spec: ${specSourceForLog}`);
	console.log(`   Objects: ${Object.keys(objects).length}`);
	console.log(`   Methods: ${Object.keys(methods).length}`);
}

main().catch((err) => {
	console.error(err instanceof Error ? err.message : err);
	process.exit(1);
});
