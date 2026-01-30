import { serverEnv } from "@env/server";
import { API_INDEX } from "@t/md.generated";

/**
 * Fetches the OpenAPI specification from the configured URL
 */
export async function fetchOpenApiSpec(): Promise<string> {
	const url = serverEnv.OPENAPI_SPEC_URL;

	try {
		const response = await fetch(url, {
			cache: "no-store",
		});

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
 * Returns the API Index as a JSON string
 */
export function getApiIndex(): string {
	return JSON.stringify(API_INDEX, null, 2);
}
