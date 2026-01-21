import { getApiKeys } from "@shared/actions/api-keys/get-api-keys";
import ApiKey from "./components/api-key";

export default async function KeysPage() {
	const apiKeys = await getApiKeys();

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
			{apiKeys.map((apiKey) => (
				<ApiKey key={apiKey.key} apiKey={apiKey} />
			))}
		</div>
	);
}
