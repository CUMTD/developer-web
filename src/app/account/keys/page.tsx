import { getApiKeys } from "@shared/actions/api-keys/get-api-keys";
import ApiKey from "./components/api-key";

export default async function KeysPage() {
	const apiKeys = await getApiKeys();

	return (
		<>
			{apiKeys.map((apiKey) => (
				<ApiKey key={apiKey.key} apiKey={apiKey} />
			))}
		</>
	);
}
