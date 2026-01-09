import { clientEnv } from "@shared/config/env.client";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
	return createBrowserClient(clientEnv.NEXT_PUBLIC_SUPABASE_URL, clientEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}
