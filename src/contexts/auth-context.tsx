"use client";

import type { CurrentUserState } from "@hooks/use-current-user";
import { mapSessionToUser } from "@hooks/use-current-user";
import { createClient } from "@lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext<CurrentUserState | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [state, setState] = useState<CurrentUserState>({
		isLoading: true,
		isAuthenticated: false,
		user: null,
	});

	useEffect(() => {
		const supabase = createClient();

		const setFromSession = (session: Session | null) => {
			setState({
				isLoading: false,
				isAuthenticated: Boolean(session),
				user: mapSessionToUser(session),
			});
		};

		const load = async () => {
			const { data, error } = await supabase.auth.getSession();
			if (error) {
				console.error(error);
			}

			setFromSession(data.session);
		};

		void load();

		const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
			setFromSession(session);
		});

		return () => {
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
