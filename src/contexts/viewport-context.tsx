"use client";

import debounce from "@helpers/debounce";
import type { ViewportState } from "@t/viewport";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const RESIZE_DEBOUNCE_MS = 100;

const ViewportContext = createContext<ViewportState | undefined>(undefined);

export function ViewportProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [state, setState] = useState<ViewportState>(() => {
		// On client: initialize with actual values to avoid flash
		// On server: use defaults for SSR consistency
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
			const newState = {
				isMobile: window.innerWidth < MOBILE_BREAKPOINT,
				width: window.innerWidth,
				height: window.innerHeight,
			};

			// Only update if values actually changed to prevent unnecessary re-renders
			setState((prevState) => {
				if (
					prevState.isMobile === newState.isMobile &&
					prevState.width === newState.width &&
					prevState.height === newState.height
				) {
					return prevState; // Return same object reference to prevent re-render
				}
				return newState;
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
