"use client";

import LinkButton from "@common/link-button";
import { type AddApiKeyFormState, addApiKeyFormAction } from "@server/actions/api-keys/add-api-key-form";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Textarea } from "@ui/textarea";
import { useActionState } from "react";

const initialState: AddApiKeyFormState = { ok: false };

export default function ApiKeyAddForm() {
	const [{ fieldErrors, message, ok }, formAction, isPending] = useActionState(addApiKeyFormAction, initialState);

	const nameError = fieldErrors?.name;
	const notesError = fieldErrors?.notes;

	return (
		<form action={formAction} className="max-w-lg">
			<div className="grid gap-12 mb-12">
				<div className="grid gap-2">
					<Label htmlFor="name">Name</Label>
					<Input id="name" name="name" aria-invalid={!!nameError} />
					{nameError ? <p className="text-sm text-destructive">{nameError}</p> : null}
				</div>

				<div className="grid gap-2">
					<Label htmlFor="notes">Notes</Label>
					<Textarea id="notes" name="notes" rows={12} aria-invalid={!!notesError} />
					{notesError ? <p className="text-sm text-destructive">{notesError}</p> : null}
				</div>

				{message ? <p className={ok ? "text-sm text-foreground" : "text-sm text-destructive"}>{message}</p> : null}
			</div>
			<div className="flex gap-2 justify-end">
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
