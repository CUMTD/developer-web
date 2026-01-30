// /src/mcp/resources.ts
//
// Resource helpers for MCP server.
//
// Resources exposed:
// - openapi://spec  -> fetches YAML from configured URL (runtime truth)
// - openapi://index -> build-generated index JSON (fast lookup for tools)

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { serverEnv } from "@env/server";

const GENERATED_INDEX_PATH = join(process.cwd(), "src", "mcp", "generated", "openapi-index.json");

/**
 * Fetches the OpenAPI specification from the configured URL.
 * This is the runtime source of truth for the spec content.
 */
export async function fetchOpenApiSpec(): Promise<string> {
	const url = serverEnv.OPENAPI_SPEC_URL;

	try {
		const response = await fetch(url, { cache: "no-store" });

		if (!response.ok) {
			throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`);
		}

		return await response.text();
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Error fetching OpenAPI spec from ${url}: ${error.message}`);
		}
		throw new Error(`Unknown error fetching OpenAPI spec from ${url}`);
	}
}

/**
 * Loads the build-generated OpenAPI index JSON from disk.
 * This file is created by scripts/build-mcp.ts and should exist in normal builds.
 */
export function getOpenApiIndexJson(): string {
	try {
		const text = readFileSync(GENERATED_INDEX_PATH, "utf-8");
		return text;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(
			`Unable to read generated OpenAPI index at '${GENERATED_INDEX_PATH}'. ` +
				`Run the build script (scripts/build-mcp.ts). Details: ${message}`,
		);
	}
}
