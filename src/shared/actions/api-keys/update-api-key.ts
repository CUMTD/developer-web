// src/actions/api-keys/update-api-key.ts
"use server";

import { createClient } from "@shared/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUserId } from "../_auth";

const schema = z
	.object({
		key: z.uuid(),
		name: z.string().min(1).max(80).optional(),
		notes: z.string().max(2000).nullable().optional(),
		isActive: z.boolean().optional(),
	})
	.refine(
		(data) =>
			typeof data.name !== "undefined" || typeof data.notes !== "undefined" || typeof data.isActive !== "undefined",
		{
			message: "No fields provided to update.",
		},
	);

export type UpdateApiKeyInput = z.infer<typeof schema>;

export async function updateApiKey(input: UpdateApiKeyInput) {
	const { key, name, notes, isActive } = schema.parse(input);

	await requireUserId();
	const supabase = await createClient();

	const patch: Partial<{
		name: string;
		notes: string | null;
		is_active: boolean;
	}> = {};

	if (typeof name !== "undefined") {
		patch.name = name;
	}
	if (typeof notes !== "undefined") {
		patch.notes = notes;
	}
	if (typeof isActive !== "undefined") {
		patch.is_active = isActive;
	}

	const { error } = await supabase.from("api_key").update(patch).eq("key", key);

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath("/account/keys");
}
