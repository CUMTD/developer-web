"use server";

import { createClient } from "@server/supabase/server";
import { requireUserId } from "../_auth";

export async function isAdmin(): Promise<boolean> {
	const userId = await requireUserId();
	const supabase = await createClient();

	const { data, error } = await supabase.from("developer").select("id,admin").eq("id", userId);

	if (error) {
		throw new Error(error.message);
	}

	return data !== null && data.length === 1 && data[0].admin;
}
