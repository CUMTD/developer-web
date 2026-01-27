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

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [state, setState] = useState<CurrentUserState>({
		isLoading: true,
		isAuthenticated: false,
		user: null,
	});

	useEffect(() => {
		let mounted = true;

		const supabase = createClient();

		const setFromSession = (session: Session | null) => {
			if (!mounted) return;
			setState({
				isLoading: false,
				isAuthenticated: Boolean(session),
				user: mapSessionToUser(session),
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
