"use client";

import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { CopyIcon } from "lucide-react";
import { useCallback, useId } from "react";
import { toast } from "sonner";

interface CopyTextProps {
	text: string;
	title?: string;
}

async function copyToClipboard(text: string): Promise<void> {
	if (typeof window === "undefined" || typeof navigator === "undefined") {
		throw new Error("Clipboard unavailable (not in a browser).");
	}

	// Modern API
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text);
		return;
	}

	// Fallback
	const textarea = document.createElement("textarea");
	textarea.value = text;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "absolute";
	textarea.style.left = "-9999px";
	document.body.appendChild(textarea);
	textarea.select();

	const ok = document.execCommand("copy");
	document.body.removeChild(textarea);

	if (!ok) {
		throw new Error("Copy command failed.");
	}
}

export default function CopyTextButton({ text, title }: Readonly<CopyTextProps>) {
	const inputId = useId();

	const copyButtonClick = useCallback(() => {
		async function runCopy() {
			toast.promise(copyToClipboard(text), {
				loading: "Copying to clipboard...",
				success: "Copied to clipboard!",
				error: "Failed to copy to clipboard.",
			});
		}
		runCopy();
	}, [text]);

	return (
		<div className="grid gap-2 w-full">
			{title && <Label htmlFor={inputId}>{title}</Label>}

			<fieldset className="inline-flex items-stretch w-full" aria-label={title ?? "Copy text"}>
				<Input
					id={inputId}
					value={text}
					readOnly
					className="font-mono w-full max-w-60 min-w-0 rounded-r-none"
					onFocus={(e) => {
						e.currentTarget.select();
					}}
				/>

				<Button
					type="button"
					variant="outline"
					onClick={copyButtonClick}
					aria-label="Copy to clipboard"
					className="w-10 shrink-0 rounded-l-none border-l-0"
				>
					<CopyIcon aria-hidden="true" />
				</Button>
			</fieldset>
		</div>
	);
}
