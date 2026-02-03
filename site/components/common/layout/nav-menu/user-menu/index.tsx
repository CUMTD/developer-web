"use client";

import { useAuth } from "@contexts/auth-context";
import LoggedInUserMenu from "./logged-in-menu";
import LoggedOutMenu from "./logged-out-menu";
import LoginButtonSkeleton from "./login-button-skeleton";

export default function UserProfileDisplay() {
	const { isLoading, isAuthenticated, user } = useAuth();

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
