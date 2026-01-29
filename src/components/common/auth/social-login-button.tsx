"use client";

import { createClient } from "@lib/supabase/client";
import { Button } from "@ui/button";
import type { ComponentPropsWithoutRef, FormEvent } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

type Provider = "github" | "google";

type SocialLoginButtonProps = Readonly<
	{
		provider: Provider;
		redirectUrl: string;
		isLoading: boolean;
		onLoadingChange: (loading: boolean) => void;
		onAuthError: (error: string) => void;
	} & Omit<ComponentPropsWithoutRef<typeof Button>, "onClick" | "type">
>;

const providerConfig = {
	github: {
		icon: FaGithub,
		label: "Continue with GitHub",
	},
	google: {
		icon: FaGoogle,
		label: "Continue with Google",
	},
} as const;

export function SocialLoginButton({
	provider,
	redirectUrl,
	isLoading,
	onLoadingChange,
	onAuthError,
	...props
}: SocialLoginButtonProps) {
	const config = providerConfig[provider];
	const Icon = config.icon;

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		onLoadingChange(true);
		onAuthError("");

		const next = redirectUrl.startsWith("/") ? redirectUrl : "/account";

		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider,
				options: {
					redirectTo: `${window.location.origin}/account/auth/oauth?next=${next}`,
				},
			});

			if (error) throw error;
		} catch (error: unknown) {
			onAuthError(error instanceof Error ? error.message : "An error occurred");
			onLoadingChange(false);
		}
	};

	return (
		<Button type="button" onClick={handleLogin} disabled={isLoading} {...props}>
			<Icon className="h-4 w-4" />
			{isLoading ? "Logging in..." : config.label}
		</Button>
	);
}
