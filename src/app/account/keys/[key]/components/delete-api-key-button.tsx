"use client";

import { disableApiKeyAction } from "@shared/actions/api-keys/disable-api-key";
import { useCurrentUserEmail } from "@shared/hooks/use-current-user-email";
import { Button } from "@shared/shadcn/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@shared/shadcn/dialog";
import { Input } from "@shared/shadcn/input";
import { Label } from "@shared/shadcn/label";
import { useMemo, useState } from "react";

type Props = Readonly<{
	apiKeyName: string;
	apiKeyValue: string;
}>;

export default function DeleteApiKeyButton({ apiKeyName, apiKeyValue }: Props) {
	const currentUserEmail = useCurrentUserEmail();
	const confirmString = useMemo(() => currentUserEmail ?? "Confirm", [currentUserEmail]);
	const [typedEmail, setTypedEmail] = useState("");

	const canConfirm = useMemo(() => {
		if (!confirmString) {
			return false;
		}
		return typedEmail.trim().toLowerCase() === confirmString.trim().toLowerCase();
	}, [typedEmail, confirmString]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive" type="button" className="justify-self-start mr-auto">
					Delete
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete API key</DialogTitle>
					<DialogDescription>
						This will disable the key immediately. Type
						<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{currentUserEmail}</code> to enable the
						delete button
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-2">
					<Label>Key</Label>
					<div className="rounded-md border p-3">
						<p className="font-medium">{apiKeyName || "Untitled key"}</p>
						<p className="font-mono text-xs text-muted-foreground break-all">{apiKeyValue}</p>
					</div>
				</div>

				<div className="grid gap-2">
					<Label htmlFor="confirm-email">Confirm email</Label>
					<Input
						id="confirm-email"
						autoComplete="off"
						disabled={!currentUserEmail}
						placeholder={currentUserEmail ?? ""}
						value={typedEmail}
						onChange={(e) => setTypedEmail(e.target.value)}
					/>
				</div>

				<form action={disableApiKeyAction}>
					<input type="hidden" name="key" value={apiKeyValue} />
					<DialogFooter className="mt-2">
						<Button type="submit" variant="destructive" disabled={!canConfirm}>
							Confirm delete
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
