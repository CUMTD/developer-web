"use server";

import { createClient } from "@shared/lib/supabase/server";
import type { Database } from "@t/supabase";
import { requireUserId } from "../_auth";

type ApiKeyRow = Database["public"]["Tables"]["api_key"]["Row"];
export type ApiKeyResult = Readonly<Pick<ApiKeyRow, "key" | "name" | "notes" | "created_at" | "is_active">>;

export async function getApiKey(key: string): Promise<ApiKeyResult | null> {
	const userId = await requireUserId();
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("api_key")
		.select("key,name,notes,created_at,is_active")
		.eq("developer_id", userId)
		.eq("key", key)
		.order("created_at", { ascending: false });

	if (error) {
		throw new Error(error.message);
	}

	return data?.[0] ?? null;
}
