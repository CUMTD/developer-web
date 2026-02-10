"use server";

import { createClient } from "@server/supabase/server";
import type { AcceptTosActionState } from "@t/terms-of-use-types";
import { revalidatePath } from "next/cache";
import { requireUserId } from "../_auth";

export async function acceptRequiredTos(
	_prevState: AcceptTosActionState | undefined,
	_formData: FormData,
): Promise<AcceptTosActionState> {
	try {
		await requireUserId();
		const supabase = await createClient();

		const { error } = await supabase.rpc("accept_required_tos");

		if (error) {
			// Treat as an expected failure and return a user-friendly message.
			return { ok: false, message: error.message };
		}

		revalidatePath("/account");
		revalidatePath("/account/keys");
		revalidatePath("/terms-of-use");

		return { ok: true };
	} catch (err) {
		// Catch unexpected failures (auth issues, network, etc.)
		const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";

		return { ok: false, message };
	}
}
