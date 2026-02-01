import type { paths } from "@mtd/developer-api-types";
import createClient from "openapi-fetch";

export type MtdApiClientOptions = {
	baseUrl: string;
	apiKey: string;
	defaultHeaders?: Record<string, string>;
};

export const createMtdApiClient = ({ baseUrl, apiKey, defaultHeaders = {} }: MtdApiClientOptions) => {
	const client = createClient<paths>({
		baseUrl,
		headers: { ...defaultHeaders, "X-ApiKey": apiKey },
	});

	return client;
};
