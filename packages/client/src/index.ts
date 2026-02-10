import type { paths } from "@mtd.org/developer-api-types";
import createClient from "openapi-fetch";

export type MtdApiClientOptions = {
	baseUrl?: string;
	apiKey: string;
	defaultHeaders?: Record<string, string>;
};

export const createMtdApiClient = ({
	baseUrl = "https://api.mtd.dev/v3.0.0/",
	apiKey,
	defaultHeaders = {},
}: MtdApiClientOptions) => {
	const client = createClient<paths>({
		baseUrl,
		headers: { ...defaultHeaders, "X-ApiKey": apiKey },
	});

	return client;
};
