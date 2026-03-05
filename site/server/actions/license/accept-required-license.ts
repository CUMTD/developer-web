"use server";

import { createClient } from "@server/supabase/server";
import type { AcceptLicenseActionState } from "@t/license-types";
import { revalidatePath } from "next/cache";
import { requireUserId } from "../_auth";

export async function acceptRequiredLicense(
	_prevState: AcceptLicenseActionState | undefined,
	_formData: FormData,
): Promise<AcceptLicenseActionState> {
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
		revalidatePath("/license");

		return { ok: true };
	} catch (err) {
		// Catch unexpected failures (auth issues, network, etc.)
		const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";

		return { ok: false, message };
	}
}
