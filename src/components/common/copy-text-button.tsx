"use client";

import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type CopyTextProps = Readonly<{
	text: string;
	title?: string;
}>;

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

export default function CopyTextButton({ text, title }: CopyTextProps) {
	const inputId = useId();
	const [copied, setCopied] = useState(false);
	const resetTimerRef = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (resetTimerRef.current !== null) {
				window.clearTimeout(resetTimerRef.current);
			}
		};
	}, []);

	const copyButtonClick = useCallback(async () => {
		try {
			await copyToClipboard(text);
			setCopied(true);

			if (resetTimerRef.current !== null) {
				window.clearTimeout(resetTimerRef.current);
			}

			resetTimerRef.current = window.setTimeout(() => {
				setCopied(false);
				resetTimerRef.current = null;
			}, 1500);
		} catch {
			// No UI changes on failure.
		}
	}, [text]);

	return (
		<div className="grid gap-2 w-full">
			{title && <Label htmlFor={inputId}>{title}</Label>}

			<fieldset className="inline-flex items-stretch w-full" aria-label={title ?? "Copy text"}>
				<Input
					id={inputId}
					value={text}
					readOnly
					className="font-mono w-full max-w-60 min-w-0 rounded-r-none text-sm"
					onFocus={(e) => {
						e.currentTarget.select();
					}}
				/>

				<Button
					type="button"
					variant="outline"
					onClick={copyButtonClick}
					aria-label={copied ? "Copied" : "Copy to clipboard"}
					className="w-10 shrink-0 rounded-l-none border-l-0"
				>
					{copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
				</Button>
			</fieldset>
		</div>
	);
}
