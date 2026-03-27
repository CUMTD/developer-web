"use client";

import { useCursorMode } from "@contexts/cursor-context";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cursor() {
	const { mode } = useCursorMode();
	const pathname = usePathname();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	if (mode === "disabled") {
		return null;
	}

	if (mode === "homepage" && pathname !== "/") {
		return null;
	}

	return (
		<span
			aria-hidden="true"
			role="presentation"
			className="w-[0.8ch] h-[1.4em] mt-[-0.4em]
			bg-current
			cursor-blink hidden md:block"
		/>
	);
}
