"use server";

import { createClient } from "@server/supabase/server";
import type { Database } from "@t/supabase";
import "server-only";
import { requireUserId } from "../_auth";

type DeveloperRow = Database["public"]["Tables"]["developer"]["Row"];
export type DeveloperResult = Pick<
	DeveloperRow,
	"id" | "created_at" | "name" | "tokens_per_hour" | "current_tokens" | "last_token_count_update" | "is_active"
>;

export async function getDeveloperDetails(): Promise<Readonly<DeveloperResult>> {
	const userId = await requireUserId();
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("developer")
		.select("id,created_at,name,tokens_per_hour,current_tokens,last_token_count_update,is_active")
		.eq("id", userId);

	if (error) {
		throw new Error(error.message);
	}
	if (data.length > 1) {
		throw new Error("Multiple developer records found for the user");
	}
	if (data.length === 0) {
		throw new Error("No developer record found for the user");
	}
	return data[0];
}
