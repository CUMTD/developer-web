"use client";

import type { ApiKeyResult } from "@shared/actions/api-keys/get-api-key";
import { type UpdateApiKeyFormState, updateApiKeyFormAction } from "@shared/actions/api-keys/update-api-key-form";
import { Button } from "@shared/shadcn/button";
import { Input } from "@shared/shadcn/input";
import { Label } from "@shared/shadcn/label";
import { Textarea } from "@shared/shadcn/textarea";
import Link from "next/link";
import { useActionState } from "react";

type ApiKeyEditFormProps = Readonly<{
	apiKey: ApiKeyResult;
}>;

const initialState: UpdateApiKeyFormState = { ok: false };

export default function ApiKeyEditForm({ apiKey: { name, key, notes } }: ApiKeyEditFormProps) {
	const [{ fieldErrors, message, ok }, formAction, isPending] = useActionState(updateApiKeyFormAction, initialState);

	const nameError = fieldErrors?.name;
	const notesError = fieldErrors?.notes;

	return (
		<form action={formAction}>
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
				<Button asChild variant="destructive" className="justify-self-start mr-auto">
					<Link href={`/account/keys/${key}/delete`}>Delete</Link>
				</Button>
				<Button asChild variant="ghost">
					<Link href="/account/keys">Cancel</Link>
				</Button>

				<Button type="submit" disabled={isPending}>
					{isPending ? "Saving..." : "Save"}
				</Button>
			</div>
		</form>
	);
}
