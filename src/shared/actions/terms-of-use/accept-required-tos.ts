// src/actions/tos/accept-required-tos.ts
"use server";

import { createClient } from "@shared/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { requireUserId } from "../_auth";

export async function acceptRequiredTos() {
	await requireUserId();
	const supabase = await createClient();

	const result = await supabase.rpc("accept_required_tos");
	const { error } = result;

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath("/account");
	revalidatePath("/account/keys");
	revalidatePath("/terms-of-use");
}
