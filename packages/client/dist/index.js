import createClient from "openapi-fetch";
export const createMtdApiClient = ({ baseUrl, apiKey, defaultHeaders = {} }) => {
    const client = createClient({
        baseUrl,
        headers: { ...defaultHeaders, "X-ApiKey": apiKey },
    });
    return client;
};
