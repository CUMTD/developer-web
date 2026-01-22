import { createClient } from "@shared/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type CurrentUserShared = {
	email: string | null;
	profileImageUrl: string | null;
};

type UnknownCurrentUser = Readonly<
	{
		name: "Unknown User";
	} & CurrentUserShared
>;

type KnownCurrentUser = Readonly<
	{
		name: string;
	} & CurrentUserShared
>;

export type CurrentUser = KnownCurrentUser | UnknownCurrentUser;

export function isUnknownUser(user: CurrentUser): user is UnknownCurrentUser {
	return user.name === "Unknown User";
}

export type CurrentUserState = Readonly<{
	isLoading: boolean;
	isAuthenticated: boolean;
	user: CurrentUser | null;
}>;

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

export function useCurrentUser(): CurrentUserState {
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

	return state;
}
