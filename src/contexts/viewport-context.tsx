"use client";

import debounce from "@helpers/debounce";
import type { ViewportState } from "@t/viewport";
import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const RESIZE_DEBOUNCE_MS = 100;

const ViewportContext = createContext<ViewportState | undefined>(undefined);

export function ViewportProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [state, setState] = useState<ViewportState>({
		// Initialize with consistent values on both server and client
		// to avoid hydration mismatches. Real values are set in useEffect.
		isMobile: false,
		width: undefined,
		height: undefined,
	});

	// Guard to prevent double initialization in React StrictMode
	const initializedRef = useRef(false);

	useEffect(() => {
		// Prevent effect from running multiple times (React 18 StrictMode can cause this)
		if (initializedRef.current) {
			console.log("[ViewportProvider] Effect re-run detected, skipping initialization");
			return;
		}

		console.log("[ViewportProvider] Mount - initializing");
		initializedRef.current = true;

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
					console.log(`[ViewportProvider] Skipping update from ${source} - values unchanged`, {
						prev: prevState,
						new: newState,
					});
					return prevState; // Return same object reference to prevent re-render
				}
				console.log(`[ViewportProvider] Updating state from ${source}`, { prev: prevState, new: newState });
				return newState;
			});
		};

		// Use matchMedia for more efficient mobile breakpoint detection
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const handleMobileChange = () => {
			console.log("[ViewportProvider] matchMedia change event");
			updateViewport("matchMedia");
		};

		// Debounce resize events to avoid excessive state updates
		const [debouncedResize, teardownDebounce] = debounce<void, void>(() => {
			updateViewport("resize");
		}, RESIZE_DEBOUNCE_MS);

		const handleResize = () => {
			console.log("[ViewportProvider] resize event");
			void debouncedResize(undefined);
		};

		mql.addEventListener("change", handleMobileChange);
		window.addEventListener("resize", handleResize);

		// Set initial value in case it changed between initial render and effect
		updateViewport("initial");

		return () => {
			console.log("[ViewportProvider] Unmount");
			mql.removeEventListener("change", handleMobileChange);
			window.removeEventListener("resize", handleResize);
			teardownDebounce();
		};
	}, []);

	console.log("[ViewportProvider] Render", state);
	return <ViewportContext.Provider value={state}>{children}</ViewportContext.Provider>;
}

export function useViewport(): ViewportState {
	const context = useContext(ViewportContext);
	if (context === undefined) {
		throw new Error("useViewport must be used within a ViewportProvider");
	}
	return context;
}
