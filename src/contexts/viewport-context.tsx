"use client";

import debounce from "@helpers/debounce";
import type { ViewportState } from "@t/viewport";
import { createContext, type ReactNode, useContext, useEffect, useId, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const RESIZE_DEBOUNCE_MS = 100;

const ViewportContext = createContext<ViewportState | undefined>(undefined);

export function ViewportProvider({ children }: Readonly<{ children: ReactNode }>) {
	// Generate unique ID for this component instance
	const instanceId = useId();

	const [state, setState] = useState<ViewportState>(() => {
		console.log(`[ViewportProvider ${instanceId}] Initial state setup`);
		// On client: initialize with actual values to avoid flash
		// On server: use defaults for SSR consistency
		if (typeof window !== "undefined") {
			const initial = {
				isMobile: window.innerWidth < MOBILE_BREAKPOINT,
				width: window.innerWidth,
				height: window.innerHeight,
			};
			console.log(`[ViewportProvider ${instanceId}] Client-side init:`, initial);
			return initial;
		}
		console.log(`[ViewportProvider ${instanceId}] Server-side init`);
		return {
			isMobile: false,
			width: undefined,
			height: undefined,
		};
	});

	useEffect(() => {
		console.log(`[ViewportProvider ${instanceId}] Effect: Setting up event listeners`);

		const updateViewport = (source: string) => {
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
					console.log(`[ViewportProvider ${instanceId}] Skipping update from ${source} - values unchanged`);
					return prevState; // Return same object reference to prevent re-render
				}
				console.log(`[ViewportProvider ${instanceId}] Updating state from ${source}`, {
					prev: prevState,
					new: newState,
				});
				return newState;
			});
		};

		// Use matchMedia for more efficient mobile breakpoint detection
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const handleMobileChange = () => {
			console.log(`[ViewportProvider ${instanceId}] matchMedia change event`);
			updateViewport("matchMedia");
		};

		// Debounce resize events to avoid excessive state updates
		const [debouncedResize, teardownDebounce] = debounce<void, void>(() => {
			updateViewport("resize");
		}, RESIZE_DEBOUNCE_MS);

		const handleResize = () => {
			console.log(`[ViewportProvider ${instanceId}] resize event`);
			void debouncedResize(undefined);
		};

		mql.addEventListener("change", handleMobileChange);
		window.addEventListener("resize", handleResize);

		// No initial update needed - state is already initialized with correct values!
		console.log(`[ViewportProvider ${instanceId}] Event listeners attached, current state:`, state);

		return () => {
			console.log(`[ViewportProvider ${instanceId}] Cleanup: Removing event listeners`);
			mql.removeEventListener("change", handleMobileChange);
			window.removeEventListener("resize", handleResize);
			teardownDebounce();
		};
	}, [instanceId, state]);

	console.log(`[ViewportProvider ${instanceId}] Render`, state);
	return <ViewportContext.Provider value={state}>{children}</ViewportContext.Provider>;
}

export function useViewport(): ViewportState {
	const context = useContext(ViewportContext);
	if (context === undefined) {
		throw new Error("useViewport must be used within a ViewportProvider");
	}
	return context;
}
