"use client";

import { type CursorMode, useCursorMode } from "@contexts/cursor-context";
import { Button } from "@ui/button";
import { ButtonGroup } from "@ui/button-group";
import { useEffect, useState } from "react";

type CursorOption = Readonly<{ value: CursorMode; label: string }>;

const options: ReadonlyArray<CursorOption> = [
	{ value: "homepage", label: "Homepage Only" },
	{ value: "all", label: "All Pages" },
	{ value: "disabled", label: "Disabled" },
];

export default function CursorSwitcher() {
	const { mode, setMode } = useCursorMode();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const currentMode: CursorMode = mounted ? mode : "homepage";

	return (
		<ButtonGroup role="radiogroup" aria-label="Cursor effect">
			{options.map(({ value, label }) => {
				const isActive = currentMode === value;

				return (
					<Button
						key={value}
						type="button"
						variant={isActive ? "default" : "outline"}
						onClick={() => setMode(value)}
						role="radio"
						aria-checked={isActive}
						aria-label={label}
					>
						<span>{label}</span>
					</Button>
				);
			})}
		</ButtonGroup>
	);
}
