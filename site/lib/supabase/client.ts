import { globalEnv } from "@env/global";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@t/supabase";

export function createClient() {
	return createBrowserClient<Database>(
		globalEnv.NEXT_PUBLIC_SUPABASE_URL,
		globalEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
	);
}
