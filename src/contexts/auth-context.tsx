"use client";

import { createClient } from "@lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import type { CurrentUser, CurrentUserState } from "@t/current-user";
import { createContext, type ReactNode, useContext, useEffect, useId, useState } from "react";

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

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const instanceId = useId();

	const [state, setState] = useState<CurrentUserState>(() => {
		console.log(`[AuthProvider ${instanceId}] Initial state setup`);

		// Start with isLoading: false to prevent skeleton flash
		// The useEffect will update immediately with the actual auth state
		// This optimistic approach prevents the loading skeleton from flashing on every render
		console.log(`[AuthProvider ${instanceId}] Initializing with no loading state`);
		return {
			isLoading: false,
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
