// src/actions/_auth.ts
"use server";

import { createClient } from "@server/supabase/server";

export async function requireUserId(): Promise<string> {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();

	if (error) {
		throw new Error(error.message);
	}
	if (!data.user) {
		throw new Error("Unauthorized");
	}

	return data.user.id;
}
