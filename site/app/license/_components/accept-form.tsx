"use client";

import { acceptRequiredLicense } from "@server/actions/license/accept-required-license";
import type { AcceptLicenseActionState } from "@t/license-types";
import { Status } from "@t/license-types";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { Switch } from "@ui/switch";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

function SaveButton({ enabled }: { enabled: boolean }) {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={!enabled || pending} className="w-fit">
			{pending ? "Saving..." : "Save"}
		</Button>
	);
}

type AcceptFormProps = Readonly<{
	status: Status;
}>;

const initialState: AcceptLicenseActionState | undefined = undefined;

export default function AcceptForm({ status }: AcceptFormProps) {
	const [switchState, setSwitchState] = useState(false);

	const [state, formAction] = useActionState(acceptRequiredLicense, initialState);

	const [localMessageKey, setLocalMessageKey] = useState(0);
	useEffect(() => {
		setLocalMessageKey((k) => {
			return k + 1;
		});
	}, []);

	return (
		<form action={formAction} className="flex flex-col space-y-4">
			<div className="flex items-center space-x-2">
				<Switch
					id="accept-license"
					checked={switchState}
					onCheckedChange={(checked) => {
						setSwitchState(checked);
					}}
				/>
				<Label htmlFor="accept-license">
					I have read and accept the{" "}
					{status === Status.AcceptedOldInvalid || status === Status.AcceptedOldValid ? "latest " : ""}
					License Agreement and Terms of Use.
				</Label>
			</div>

			<SaveButton enabled={switchState} />

			{/* Feedback */}
			<div key={localMessageKey} aria-live="polite">
				{state?.ok === false ? <p className="text-sm text-destructive">{state.message}</p> : null}

				{state?.ok === true ? <p className="text-sm text-green-600">Saved.</p> : null}
			</div>
		</form>
	);
}
