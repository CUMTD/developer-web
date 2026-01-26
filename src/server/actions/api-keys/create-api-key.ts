// src/actions/api-keys/create-api-key.ts
"use server";

import { createClient } from "@server/supabase/server";
import { revalidatePath } from "next/cache";
import "server-only";
import { z } from "zod";
import { requireUserId } from "../_auth";

const schema = z.object({
	name: z.string().min(1).max(80),
	notes: z.string().max(2000).optional(),
});

export async function createApiKey(input: unknown) {
	const { name, notes } = schema.parse(input);

	const userId = await requireUserId();
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("api_key")
		.insert({
			developer_id: userId,
			name,
			notes: notes ?? null,
		})
		.select("key,name,notes,created_at,is_active")
		.single();

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath("/account/keys");
	return data;
}
