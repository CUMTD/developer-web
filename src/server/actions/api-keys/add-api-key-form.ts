"use server";

import { createClient } from "@server/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUserId } from "../_auth";

export type AddApiKeyFormState = Readonly<{
	ok: boolean;
	message?: string;
	fieldErrors?: Partial<Record<"name" | "notes", string>>;
}>;

const schema = z.object({
	name: z.string().trim().min(1, "Name is required.").max(80, "Name must be 80 characters or fewer."),
	notes: z
		.string()
		.max(2000, "Notes must be 2000 characters or fewer.")
		.transform((v) => v.trim())
		.transform((v) => (v.length === 0 ? null : v))
		.nullable(),
});

function toFormString(value: FormDataEntryValue | null): string {
	if (typeof value === "string") {
		return value;
	}
	return "";
}

export async function addApiKeyFormAction(
	_prevState: AddApiKeyFormState,
	formData: FormData,
): Promise<AddApiKeyFormState> {
	const developer_id = await requireUserId(); // ensures authenticated; RLS enforces ownership

	const raw = {
		name: toFormString(formData.get("name")),
		notes: toFormString(formData.get("notes")),
	};

	const parsed = schema.safeParse({
		name: raw.name,
		notes: raw.notes.length === 0 ? null : raw.notes,
	});

	if (!parsed.success) {
		const formatted = parsed.error.format();

		const fieldErrors: NonNullable<AddApiKeyFormState["fieldErrors"]> = {};

		const nameError = formatted.name?._errors?.[0];
		if (nameError) {
			fieldErrors.name = nameError;
		}

		const notesError = formatted.notes?._errors?.[0];
		if (notesError) {
			fieldErrors.notes = notesError;
		}

		return {
			ok: false,
			message: "Please fix the highlighted fields.",
			...(Object.keys(fieldErrors).length > 0 ? { fieldErrors } : {}),
		};
	}

	const supabase = await createClient();

	const { error } = await supabase.from("api_key").insert({
		name: parsed.data.name,
		notes: parsed.data.notes,
		developer_id,
	});

	if (error) {
		return {
			ok: false,
			message: error.message,
		};
	}

	revalidatePath("/account/keys");
	redirect(`/account/keys`);
}
