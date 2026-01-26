"use client";

import { Button } from "@ui/button";
import { ButtonGroup } from "@ui/button-group";
import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { type ReactNode, useEffect, useMemo } from "react";

type ThemeOption = "light" | "dark" | "system";

const options: Readonly<Array<{ value: ThemeOption; label: string; icon: ReactNode }>> = [
	{ value: "light", label: "Light", icon: <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" /> },
	{ value: "dark", label: "Dark", icon: <Moon className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" /> },
	{ value: "system", label: "System", icon: <Computer className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" /> },
];
export default function ThemeSwitcher() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const currentTheme: ThemeOption = useMemo(
		() => (mounted ? ((theme ?? "system") as ThemeOption) : "system"),
		[mounted, theme],
	);

	return (
		<ButtonGroup role="radiogroup" aria-label="Theme">
			{options.map(({ value, label, icon }) => {
				const isActive = currentTheme === value;

				return (
					<Button
						key={value}
						type="button"
						variant={isActive ? "default" : "outline"}
						onClick={() => setTheme(value)}
						role="radio"
						aria-checked={isActive}
						aria-label={label}
					>
						{icon}
						<span>{label}</span>
					</Button>
				);
			})}
		</ButtonGroup>
	);
}
