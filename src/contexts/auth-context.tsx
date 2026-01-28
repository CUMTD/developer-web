"use client";

import { createClient } from "@lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import type { CurrentUser, CurrentUserState } from "@t/current-user";
import { createContext, type ReactNode, useContext, useEffect, useId, useRef, useState } from "react";

function mapSessionToUser(session: Session | null): CurrentUser | null {
	if (!session) {
		return null;
	}

	const metadata = session.user.user_metadata as Record<string, unknown> | undefined;

	const nameValue = metadata?.full_name;
	const name = typeof nameValue === "string" ? nameValue : "Unknown User";

	const imageValue = metadata?.profile_image_url ?? metadata?.avatar_url;
	const profileImageUrl = typeof imageValue === "string" ? imageValue : null;

	const email = session.user.email ?? null;

	return {
		name,
		email,
		profileImageUrl,
	};
}

const AuthContext = createContext<CurrentUserState | undefined>(undefined);

// localStorage key for caching auth state
// Using localStorage instead of module-level variable to survive Fast Refresh/HMR
const STORAGE_KEY = "developer-web:auth-cache";

// Helper to get cached auth state from localStorage
function getCachedAuthState(): CurrentUserState | null {
	if (typeof window === "undefined") return null;
	try {
		const cached = localStorage.getItem(STORAGE_KEY);
		if (cached) {
			return JSON.parse(cached) as CurrentUserState;
		}
		return null;
	} catch (error) {
		console.error("[AuthProvider] Error reading from localStorage:", error);
		return null;
	}
}

// Helper to save auth state to localStorage
function setCachedAuthState(state: CurrentUserState): void {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch (error) {
		// Silently ignore localStorage errors (quota exceeded, privacy mode, etc.)
		console.warn("[AuthProvider] Error writing to localStorage:", error);
	}
}

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const instanceId = useId();
	const loadedOnceRef = useRef(false);

	const [state, setState] = useState<CurrentUserState>(() => {
		console.log(`[AuthProvider ${instanceId}] Initial state setup`);

		// Try to restore from localStorage cache
		// This survives Fast Refresh/HMR and prevents loading state flash
		const cached = getCachedAuthState();
		if (cached) {
			console.log(`[AuthProvider ${instanceId}] Restoring auth state from localStorage:`, cached);
			return cached;
		}

		// No cache: initialize with loading state
		console.log(`[AuthProvider ${instanceId}] No cached state, initializing with loading state`);
		return {
			isLoading: true,
			isAuthenticated: false,
			user: null,
		};
	});

	useEffect(() => {
		console.log(`[AuthProvider ${instanceId}] Effect: Setting up auth subscription`);
		let mounted = true;

		const supabase = createClient();

		const setFromSession = (session: Session | null) => {
			if (!mounted) {
				console.log(`[AuthProvider ${instanceId}] Ignoring update - component unmounted`);
				return;
			}

			const newState = {
				isLoading: false,
				isAuthenticated: Boolean(session),
				user: mapSessionToUser(session),
			};

			setState((prevState) => {
				// Prevent unnecessary updates
				if (
					prevState.isLoading === newState.isLoading &&
					prevState.isAuthenticated === newState.isAuthenticated &&
					prevState.user === newState.user
				) {
					console.log(`[AuthProvider ${instanceId}] Skipping update - state unchanged`);
					return prevState;
				}
				console.log(`[AuthProvider ${instanceId}] Updating state`, {
					prev: prevState,
					new: newState,
				});
				return newState;
			});
		};

		const load = async () => {
			try {
				const { data, error } = await supabase.auth.getSession();
				if (error) {
					console.error(`[AuthProvider ${instanceId}] Auth session error:`, error);
					// Still set loading to false even on error
					setFromSession(null);
					return;
				}

				setFromSession(data.session);
			} catch (error) {
				console.error(`[AuthProvider ${instanceId}] Auth initialization error:`, error);
				// Ensure we exit loading state even on unexpected errors
				setFromSession(null);
			} finally {
				// Mark that we've loaded auth state at least once
				// This prevents skeleton from showing on subsequent re-renders/navigation
				loadedOnceRef.current = true;
				console.log(`[AuthProvider ${instanceId}] Initial auth load complete`);
			}
		};

		void load();

		const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
			console.log(`[AuthProvider ${instanceId}] Auth state change event`);
			setFromSession(session);
		});

		return () => {
			console.log(`[AuthProvider ${instanceId}] Cleanup: Unsubscribing from auth changes`);
			mounted = false;
			subscription.subscription.unsubscribe();
		};
	}, [instanceId]);

	// Sync state to localStorage whenever it changes
	// This persists auth state across Fast Refresh, HMR, and navigation
	useEffect(() => {
		setCachedAuthState(state);
	}, [state]);

	console.log(`[AuthProvider ${instanceId}] Render`, state);
	return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth(): CurrentUserState {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
