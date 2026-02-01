import type { paths } from "@mtd/developer-api-types";
export type MtdApiClientOptions = {
    baseUrl: string;
    apiKey: string;
    defaultHeaders?: Record<string, string>;
};
export declare const createMtdApiClient: ({ baseUrl, apiKey, defaultHeaders }: MtdApiClientOptions) => import("openapi-fetch").Client<paths, `${string}/${string}`>;
