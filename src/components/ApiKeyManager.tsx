import { createClient } from "lib/supabase/server";
import ApiKey from "./ApiKey";
import GetApiKey from "./GetApiKey";

export default async function ApiKeyManager() {
	const supabase = createClient();

	const key = true; // todo: query supabase to see if the user has a key already
	const apiKey = "29f83fbf5bf745b1bbecebf2a54c2dc8"; // dummy value

	if (key) {
		return <ApiKey apiKey={apiKey} />;
	} else {
		return <GetApiKey />;
	}
}
