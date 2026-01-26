"use server";

import { createClient } from "@server/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import "server-only";
import { z } from "zod";
import { requireUserId } from "../_auth";

const schema = z.object({
	key: z.uuid(),
});

export async function disableApiKeyAction(formData: FormData): Promise<never> {
	const userId = await requireUserId();
	const supabase = await createClient();

	const parsed = schema.parse({
		key: formData.get("key"),
	});

	const { error } = await supabase
		.from("api_key")
		.update({ is_active: false })
		.eq("key", parsed.key)
		.eq("developer_id", userId);

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath("/account");
	revalidatePath("/account/keys");
	redirect("/account/keys");
}
