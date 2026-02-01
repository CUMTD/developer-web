"use client";

import { createClient } from "@lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import type { CurrentUser, CurrentUserState } from "@t/current-user";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

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

/**
 * Module-level flag to track if we've successfully loaded auth at least once.
 * This prevents showing loading state on re-initialization after the first load.
 * Does NOT cache the actual auth state - Supabase handles that via cookies.
 */
let hasLoadedAuthOnce = false;

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [state, setState] = useState<CurrentUserState>(() => {
		// After first successful load, don't show loading state on re-initialization
		// This prevents skeleton flash during navigation while still showing it on initial load
		if (hasLoadedAuthOnce) {
			return {
				isLoading: false,
				isAuthenticated: false,
				user: null,
			};
		}

		// First time: show loading state while we fetch the session
		return {
			isLoading: true,
			isAuthenticated: false,
			user: null,
		};
	});

	useEffect(() => {
		let mounted = true;

		const supabase = createClient();

		const setFromSession = (session: Session | null) => {
			if (!mounted) {
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
					return prevState;
				}
				return newState;
			});
		};

		const load = async () => {
			try {
				const { data, error } = await supabase.auth.getSession();
				if (error) {
					console.error("Auth session error:", error);
					// Still set loading to false even on error
					setFromSession(null);
					return;
				}

				setFromSession(data.session);
			} catch (error) {
				console.error("Auth initialization error:", error);
				// Ensure we exit loading state even on unexpected errors
				setFromSession(null);
			} finally {
				// Mark that we've successfully loaded auth at least once
				// This prevents showing loading state on re-initialization
				hasLoadedAuthOnce = true;
			}
		};

		void load();

		const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
			setFromSession(session);
		});

		return () => {
			mounted = false;
			subscription.subscription.unsubscribe();
		};
	}, []);

	return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth(): CurrentUserState {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
