"use client";

import LinkButton from "@common/link-button";
import { updateApiKeyFormAction } from "@server/actions/api-keys/update-api-key-form";
import type { ApiKeyResult, UpdateApiKeyFormState } from "@t/api-key-types";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Textarea } from "@ui/textarea";
import { useActionState } from "react";
import DeleteApiKeyButton from "./delete-api-key-button";

type ApiKeyEditFormProps = Readonly<{
	apiKey: ApiKeyResult;
}>;

const initialState: UpdateApiKeyFormState = { ok: false };

export default function ApiKeyEditForm({ apiKey: { name, key, notes } }: ApiKeyEditFormProps) {
	const [{ fieldErrors, message, ok }, formAction, isPending] = useActionState(updateApiKeyFormAction, initialState);

	const nameError = fieldErrors?.name;
	const notesError = fieldErrors?.notes;

	return (
		<form action={formAction} className="max-w-lg">
			<input type="hidden" name="key" value={key} />

			<div className="grid gap-12 mb-12">
				<div className="grid gap-2">
					<Label htmlFor="name">Name</Label>
					<Input id="name" name="name" defaultValue={name ?? ""} aria-invalid={!!nameError} />
					{nameError ? <p className="text-sm text-destructive">{nameError}</p> : null}
				</div>

				<div className="grid gap-2">
					<Label htmlFor="notes">Notes</Label>
					<Textarea id="notes" name="notes" defaultValue={notes ?? ""} rows={12} aria-invalid={!!notesError} />
					{notesError ? <p className="text-sm text-destructive">{notesError}</p> : null}
				</div>

				{message ? <p className={ok ? "text-sm text-foreground" : "text-sm text-destructive"}>{message}</p> : null}
			</div>
			<div className="flex gap-2 justify-end">
				<DeleteApiKeyButton apiKeyName={name ?? ""} apiKeyValue={key} />
				<LinkButton href="/account/keys" variant="ghost">
					Cancel
				</LinkButton>

				<Button type="submit" disabled={isPending}>
					{isPending ? "Saving..." : "Save"}
				</Button>
			</div>
		</form>
	);
}
