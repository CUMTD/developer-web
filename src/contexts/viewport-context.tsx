"use client";

import type { ViewportState } from "@t/viewport";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

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

		// Listen for resize events
		const handleResize = () => {
			updateViewport();
		};

		mql.addEventListener("change", handleMobileChange);
		window.addEventListener("resize", handleResize);

		// Set initial value in case it changed between initial render and effect
		updateViewport();

		return () => {
			mql.removeEventListener("change", handleMobileChange);
			window.removeEventListener("resize", handleResize);
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
