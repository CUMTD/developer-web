import { globalEnv } from "@env/global";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import type { NextRequest } from "next/server";
import { createMcpServer } from "../../../mcp/server";

/**
 * MCP server instance (created lazily on first request)
 */
let mcpServerInstance: ReturnType<typeof createMcpServer> | null = null;
let transportInstance: WebStandardStreamableHTTPServerTransport | null = null;

/**
 * Gets or creates the MCP server instance
 */
function getMcpServer(): ReturnType<typeof createMcpServer> {
	if (!mcpServerInstance) {
		mcpServerInstance = createMcpServer(globalEnv.NEXT_PUBLIC_BASE_URL);
	}
	return mcpServerInstance;
}

/**
 * Gets or creates the transport instance
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
 * Handle POST requests (JSON-RPC calls)
 */
export async function POST(request: NextRequest): Promise<Response> {
	try {
		const transport = await getTransport();

		// Create a Web Request from Next.js request
		const url = new URL(request.url);
		const body = await request.text();

		const webRequest = new Request(url, {
			method: "POST",
			headers: request.headers,
			body,
		});

		return await transport.handleRequest(webRequest);
	} catch (error) {
		console.error("MCP POST error:", error);
		return new Response(
			JSON.stringify({
				error: {
					message: error instanceof Error ? error.message : "Internal server error",
				},
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}

/**
 * Handle GET requests (SSE streams)
 */
export async function GET(request: NextRequest): Promise<Response> {
	try {
		const transport = await getTransport();

		// Create a Web Request from Next.js request
		const url = new URL(request.url);

		const webRequest = new Request(url, {
			method: "GET",
			headers: request.headers,
		});

		return await transport.handleRequest(webRequest);
	} catch (error) {
		console.error("MCP GET error:", error);
		return new Response(
			JSON.stringify({
				error: {
					message: error instanceof Error ? error.message : "Internal server error",
				},
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}
