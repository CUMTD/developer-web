import { globalEnv } from "@shared/config/env.global";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
	return createBrowserClient(globalEnv.NEXT_PUBLIC_SUPABASE_URL, globalEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}
