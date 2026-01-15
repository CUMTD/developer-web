"use client";

import { Button } from "@shared/shadcn/button";
import { ButtonGroup } from "@shared/shadcn/button-group";
import { Label } from "@shared/shadcn/label";
import { CheckIcon, CopyIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

interface CopyTextProps {
	text: string;
	apiKey?: boolean;
	title?: string;
}

export default function CopyTextButton({ text, apiKey, title }: CopyTextProps) {
	const [show, setShow] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	if (apiKey) {
		return (
			<div className="w-full!">
				{title && <Label htmlFor="button-group">{title}</Label>}

				<ButtonGroup className="w-full" id="button-group">
					<input
						type={show ? "text" : "password"}
						autoComplete="off"
						disabled
						className="font-mono border   w-full!  rounded-md px-2 text-muted-foreground text-xs"
						value={text}
					/>
					<Button variant={"secondary"} onClick={() => setShow(!show)} className="min-w-[12ch]!">
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
	return (
		<div>
			{title && <Label htmlFor="button-group">{title}</Label>}

			<ButtonGroup id="button-group">
				<Button className="font-mono " variant={"outline"}>
					{text}
				</Button>
				<Button variant={"secondary"} onClick={handleCopy}>
					{copied ? <CheckIcon /> : <CopyIcon />}
				</Button>
			</ButtonGroup>
		</div>
	);
}
