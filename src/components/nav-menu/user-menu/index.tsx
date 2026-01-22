"use client";

import { useCurrentUser } from "@shared/hooks/use-current-user";
import LoggedInUserMenu from "./logged-in-menu";
import LoggedOutMenu from "./logged-out-menu";
import LoginButtonSkeleton from "./login-button-skeleton";

export default function UserProfileDisplay() {
	const { isLoading, isAuthenticated, user } = useCurrentUser();
	console.log("data", { isLoading, isAuthenticated, user });
	if (isLoading) {
		return <LoginButtonSkeleton />;
	}

	if (!isAuthenticated) {
		return <LoggedOutMenu />;
	}

	if (user === null) {
		throw new Error("User should not be null when authenticated");
	}

	return <LoggedInUserMenu user={user} />;
}
