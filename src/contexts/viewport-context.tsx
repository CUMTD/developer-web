"use client";

import debounce from "@helpers/debounce";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const RESIZE_DEBOUNCE_MS = 100;

type ViewportState = Readonly<{
	isMobile: boolean;
	width: number | undefined;
	height: number | undefined;
}>;

const ViewportContext = createContext<ViewportState | undefined>(undefined);

export function ViewportProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [state, setState] = useState<ViewportState>(() => {
		// Initialize with actual value on client, or default values on server
		if (typeof window !== "undefined") {
			return {
				isMobile: window.innerWidth < MOBILE_BREAKPOINT,
				width: window.innerWidth,
				height: window.innerHeight,
			};
		}
		return {
			isMobile: false,
			width: undefined,
			height: undefined,
		};
	});

	useEffect(() => {
		const updateViewport = () => {
			setState({
				isMobile: window.innerWidth < MOBILE_BREAKPOINT,
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		// Use matchMedia for more efficient mobile breakpoint detection
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const handleMobileChange = () => {
			updateViewport();
		};

		// Debounce resize events to avoid excessive state updates
		const [debouncedResize, teardownDebounce] = debounce<void, void>(() => {
			updateViewport();
		}, RESIZE_DEBOUNCE_MS);

		const handleResize = () => {
			void debouncedResize(undefined);
		};

		mql.addEventListener("change", handleMobileChange);
		window.addEventListener("resize", handleResize);

		// Set initial value in case it changed between initial render and effect
		updateViewport();

		return () => {
			mql.removeEventListener("change", handleMobileChange);
			window.removeEventListener("resize", handleResize);
			teardownDebounce();
		};
	}, []);

	return <ViewportContext.Provider value={state}>{children}</ViewportContext.Provider>;
}

export function useViewport(): ViewportState {
	const context = useContext(ViewportContext);
	if (context === undefined) {
		throw new Error("useViewport must be used within a ViewportProvider");
	}
	return context;
}
