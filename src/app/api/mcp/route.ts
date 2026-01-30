// /src/app/api/mcp/route.ts
import { globalEnv } from "@env/global";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import type { NextRequest } from "next/server";
import { createMcpServer } from "../../../mcp/server";

/**
 * MCP server instance (created lazily on first request).
 *
 * This route hosts the MCP server over:
 * - POST: JSON-RPC calls
 * - GET:  SSE streams
 *
 * The MCP server depends on a build-time generated file:
 *   /src/mcp/generated/openapi-index.json
 *
 * Ensure your build runs the generator first:
 *   pnpm tsx scripts/build-mcp.ts
 *
 * If that file is missing at runtime, this handler returns a helpful error message.
 */
let mcpServerInstance: ReturnType<typeof createMcpServer> | null = null;
let transportInstance: WebStandardStreamableHTTPServerTransport | null = null;

/**
 * Gets or creates the MCP server instance.
 *
 * We pass NEXT_PUBLIC_BASE_URL (runtime base URL for your docs site) so MCP responses can
 * provide stable reference links like `${baseUrl}/reference/<operationId>`.
 */
function getMcpServer(): ReturnType<typeof createMcpServer> {
	if (!mcpServerInstance) {
		mcpServerInstance = createMcpServer(globalEnv.NEXT_PUBLIC_BASE_URL);
	}
	return mcpServerInstance;
}

/**
 * Gets or creates the transport instance.
 *
 * We connect once and reuse the transport across requests.
 *
 * NOTE: In serverless environments, this may be reinitialized across invocations.
 * In long-lived Node runtimes (dev server / dedicated server), it will persist.
 */
async function getTransport(): Promise<WebStandardStreamableHTTPServerTransport> {
	if (!transportInstance) {
		const server = getMcpServer();

		transportInstance = new WebStandardStreamableHTTPServerTransport({
			// Stateless mode - don't set sessionIdGenerator
		});

		await server.connect(transportInstance);
	}
	return transportInstance;
}

/**
 * Builds a Web-standard Request object from the Next.js request.
 *
 * The MCP SDK transport expects a standard Request.
 */
async function toWebRequest(request: NextRequest): Promise<Request> {
	const url = new URL(request.url);

	if (request.method === "POST") {
		const body = await request.text();
		return new Request(url, {
			method: "POST",
			headers: request.headers,
			body,
		});
	}

	return new Request(url, {
		method: "GET",
		headers: request.headers,
	});
}

/**
 * Normalizes errors into a JSON response payload.
 */
function toErrorResponse(error: unknown): Response {
	const message = error instanceof Error ? error.message : "Internal server error";

	// Provide a useful hint if it looks like the generated OpenAPI index is missing.
	const hint =
		message.includes("openapi-index.json") || message.includes("build-mcp")
			? "Missing generated MCP index. Run: pnpm tsx scripts/build-mcp.ts"
			: undefined;

	return new Response(
		JSON.stringify({
			error: {
				message,
				...(hint ? { hint } : {}),
			},
		}),
		{
			status: 500,
			headers: { "Content-Type": "application/json" },
		},
	);
}

/**
 * Handle POST requests (JSON-RPC calls).
 */
export async function POST(request: NextRequest): Promise<Response> {
	try {
		const transport = await getTransport();
		const webRequest = await toWebRequest(request);
		return await transport.handleRequest(webRequest);
	} catch (error) {
		console.error("MCP POST error:", error);
		return toErrorResponse(error);
	}
}

/**
 * Handle GET requests (SSE streams).
 */
export async function GET(request: NextRequest): Promise<Response> {
	try {
		const transport = await getTransport();
		const webRequest = await toWebRequest(request);
		return await transport.handleRequest(webRequest);
	} catch (error) {
		console.error("MCP GET error:", error);
		return toErrorResponse(error);
	}
}
