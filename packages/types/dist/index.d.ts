import type { components, operations, paths } from "./openapi.generated";
export type { components, operations, paths, webhooks } from "./openapi.generated";
export type ApiComponents = components;
export type ApiOperations = operations;
export type ApiPaths = paths;
export type Schemas = components["schemas"];
export type PathKey = keyof paths;
export type OperationId = keyof operations;
