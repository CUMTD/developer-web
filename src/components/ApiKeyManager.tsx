import type { ApiKeyResult } from "@shared/actions/api-keys/get-api-keys";
import ApiKey from "./ApiKey";

type ApiKeyManagerProps = Readonly<{
	apiKeys: ReadonlyArray<ApiKeyResult>;
}>;

export default async function ApiKeyManager({ apiKeys }: ApiKeyManagerProps) {
	// const supabase = createClient();

	return (
		<>
			{apiKeys.map((apiKey) => (
				<ApiKey key={apiKey.key} apiKey={apiKey} />
			))}
		</>
	);
}
