"use client";

import { Button } from "@shared/shadcn/button";
import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

interface CodeExampleWithCopyProps {
	children: React.ReactNode;
}

export function CodeExampleWithCopy({ children }: CodeExampleWithCopyProps) {
	const [copied, setCopied] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const copyCode = async () => {
		if (!containerRef.current) return;

		const codeElement = containerRef.current.querySelector("code");
		if (!codeElement) return;

		try {
			await navigator.clipboard.writeText(codeElement.textContent || "");
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy code:", err);
		}
	};

	return (
		<div ref={containerRef} className="relative">
			<Button
				variant="ghost"
				size="sm"
				onClick={copyCode}
				className="absolute top-2 right-2 z-10 h-8 w-8 p-0 "
				title="Copy code"
			>
				{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
			</Button>
			{children}
		</div>
	);
}
