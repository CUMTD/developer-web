// src/actions/tos/accept-required-tos.ts
"use server";

import { createClient } from "@shared/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { requireUserId } from "../_auth";

export async function acceptRequiredTos() {
	await requireUserId();
	const supabase = await createClient();

	const { error } = await supabase.rpc("accept_required_tos");

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath("/account/tos");
	revalidatePath("/account");
}
