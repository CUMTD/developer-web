"use client";

import { readStorage, writeStorage } from "@helpers/local-storage";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

export type CursorMode = "homepage" | "all" | "disabled";

const STORAGE_KEY = "cursor-mode";
const DEFAULT_MODE: CursorMode = "homepage";

type CursorContextValue = Readonly<{
	mode: CursorMode;
	setMode: (mode: CursorMode) => void;
}>;

const CursorContext = createContext<CursorContextValue | undefined>(undefined);

export function CursorProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [mode, setModeState] = useState<CursorMode>(DEFAULT_MODE);

	useEffect(() => {
		const stored = readStorage(STORAGE_KEY);
		if (stored === "homepage" || stored === "all" || stored === "disabled") {
			setModeState(stored);
		}
	}, []);

	function setMode(next: CursorMode) {
		setModeState(next);
		writeStorage(STORAGE_KEY, next);
	}

	return <CursorContext.Provider value={{ mode, setMode }}>{children}</CursorContext.Provider>;
}

export function useCursorMode(): CursorContextValue {
	const context = useContext(CursorContext);
	if (context === undefined) {
		throw new Error("useCursorMode must be used within a CursorProvider");
	}
	return context;
}
