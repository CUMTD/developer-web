import { globalEnv } from "@shared/config/env.global";
import { serverEnv } from "@shared/config/env.server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@t/supabase";
import "server-only";

export function createServiceClient() {
	const url = globalEnv.NEXT_PUBLIC_SUPABASE_URL;
	const serviceKey = serverEnv.SUPABASE_SERVICE_ROLE_KEY;

	if (!serviceKey) {
		throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
	}

	return createClient<Database>(url, serviceKey, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			detectSessionInUrl: false,
		},
	});
}
