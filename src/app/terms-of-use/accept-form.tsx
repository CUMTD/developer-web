"use client";

import { acceptRequiredTos } from "@shared/actions/terms-of-use/accept-required-tos";
import { Status } from "@shared/actions/terms-of-use/get-tos-status";
import { Button } from "@shared/shadcn/button";
import { Label } from "@shared/shadcn/label";
import { Switch } from "@shared/shadcn/switch";
import { useState } from "react";
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

export default function AcceptForm({ status }: AcceptFormProps) {
	const [switchState, setSwitchState] = useState(false);

	return (
		<form action={acceptRequiredTos} className="flex flex-col space-y-4">
			<div className="flex items-center space-x-2">
				<Switch
					id="accept-terms"
					checked={switchState}
					onCheckedChange={(checked) => {
						setSwitchState(checked);
					}}
				/>
				<Label htmlFor="accept-terms">
					I have read and accept the{" "}
					{status === Status.AcceptedOldInvalid || status === Status.AcceptedOldValid ? "latest" : ""} Terms of Use.
				</Label>
			</div>

			<SaveButton enabled={switchState} />
		</form>
	);
}
