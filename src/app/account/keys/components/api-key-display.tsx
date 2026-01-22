"use client";

import { Button } from "@shared/shadcn/button";
import { ButtonGroup } from "@shared/shadcn/button-group";
import { Label } from "@shared/shadcn/label";
import { CheckIcon, CopyIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useId, useState } from "react";

type CopyTextProps = Readonly<{
	apiKey: string;
}>;

export default function ApiKeyDisplay({ apiKey }: CopyTextProps) {
	const [show, setShow] = useState(false);
	const [copied, setCopied] = useState(false);
	const id = useId();

	function handleCopy() {
		if (!copied) {
			navigator.clipboard.writeText(apiKey);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	}
	return (
		<div className="w-full">
			<Label htmlFor={id} className="mb-2">
				API Key
			</Label>

			<ButtonGroup className="w-full" id={id}>
				<input
					type={show ? "text" : "password"}
					autoComplete="off"
					disabled
					className="font-mono border w-full rounded-md px-2 text-muted-foreground text-xs"
					value={apiKey}
				/>
				<Button variant={"secondary"} onClick={() => setShow(!show)} className="min-w-[12ch]">
					{show ? (
						<>
							<EyeOffIcon /> Hide
						</>
					) : (
						<>
							<EyeIcon /> Show
						</>
					)}
				</Button>
				<Button variant={"secondary"} onClick={handleCopy} className="min-w-[12ch]">
					{copied ? (
						<>
							<CheckIcon /> Copied
						</>
					) : (
						<>
							<CopyIcon /> Copy
						</>
					)}
				</Button>
			</ButtonGroup>
		</div>
	);
}
