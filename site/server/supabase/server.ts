import { globalEnv } from "@env/global";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@t/supabase";
import { cookies } from "next/headers";
import "server-only";

export async function createClient() {
	const cookieStore = await cookies();

	return createServerClient<Database>(
		globalEnv.NEXT_PUBLIC_SUPABASE_URL,
		globalEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						cookiesToSet.forEach(({ name, value, options }) => {
							cookieStore.set(name, value, options);
						});
					} catch {
						// ignore in server components
					}
				},
			},
		},
	);
}
