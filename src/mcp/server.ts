import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
	CallToolRequestSchema,
	ListResourcesRequestSchema,
	ListToolsRequestSchema,
	ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { API_INDEX, type ApiObject } from "@t/md.generated";
import { z } from "zod";
import { fetchOpenApiSpec, getApiIndex } from "./resources";
import { getMethodHelp, listMethods, listObjects } from "./tools";

/**
 * Creates and configures the MCP server with all resources and tools
 */
export function createMcpServer(baseUrl: string): McpServer {
	const mcpServer = new McpServer(
		{
			name: "mtd-api-navigator",
			version: "1.0.0",
		},
		{
			capabilities: {
				resources: {},
				tools: {},
			},
		},
	);

	// Access the underlying server for low-level request handler registration
	const { server } = mcpServer;

	// Register resource handlers
	server.setRequestHandler(ListResourcesRequestSchema, async () => ({
		resources: [
			{
				uri: "openapi://spec",
				name: "OpenAPI Specification",
				description: "The complete OpenAPI specification for the MTD Open API (YAML format)",
				mimeType: "application/x-yaml",
			},
			{
				uri: "api://index",
				name: "API Index",
				description: "Index of all available API objects and their methods from the generated reference structure",
				mimeType: "application/json",
			},
		],
	}));

	server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
		const { uri } = request.params;

		if (uri === "openapi://spec") {
			try {
				const spec = await fetchOpenApiSpec();
				return {
					contents: [
						{
							uri,
							mimeType: "application/x-yaml",
							text: spec,
						},
					],
				};
			} catch (error) {
				const message = error instanceof Error ? error.message : "Unknown error";
				throw new Error(`Failed to fetch OpenAPI spec: ${message}`);
			}
		}

		if (uri === "api://index") {
			const index = getApiIndex();
			return {
				contents: [
					{
						uri,
						mimeType: "application/json",
						text: index,
					},
				],
			};
		}

		throw new Error(`Unknown resource URI: ${uri}`);
	});

	// Register tool handlers
	server.setRequestHandler(ListToolsRequestSchema, async () => ({
		tools: [
			{
				name: "list_objects",
				description: "Lists all available API objects (e.g., routes, stops, vehicles)",
				inputSchema: {
					type: "object",
					properties: {},
					required: [],
				},
			},
			{
				name: "list_methods",
				description: "Lists all available methods for a specific API object (e.g., get-stop, get-stops for 'stops')",
				inputSchema: {
					type: "object",
					properties: {
						object: {
							type: "string",
							description: "The API object name",
							enum: Object.keys(API_INDEX),
						},
					},
					required: ["object"],
				},
			},
			{
				name: "get_method_help",
				description:
					"Gets detailed information about a specific API method including endpoint, parameters, and response details",
				inputSchema: {
					type: "object",
					properties: {
						object: {
							type: "string",
							description: "The API object name",
							enum: Object.keys(API_INDEX),
						},
						method: {
							type: "string",
							description: "The method name",
						},
					},
					required: ["object", "method"],
				},
			},
		],
	}));

	server.setRequestHandler(CallToolRequestSchema, async (request) => {
		const { name, arguments: args } = request.params;

		switch (name) {
			case "list_objects": {
				const objects = listObjects();
				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(objects, null, 2),
						},
					],
				};
			}

			case "list_methods": {
				const schema = z.object({
					object: z.string(),
				});

				const parsed = schema.parse(args);
				const methods = listMethods(parsed.object as ApiObject);

				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(methods, null, 2),
						},
					],
				};
			}

			case "get_method_help": {
				const schema = z.object({
					object: z.string(),
					method: z.string(),
				});

				const parsed = schema.parse(args);
				const help = getMethodHelp(parsed.object as ApiObject, parsed.method, baseUrl);

				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(help, null, 2),
						},
					],
				};
			}

			default:
				throw new Error(`Unknown tool: ${name}`);
		}
	});

	return mcpServer;
}
