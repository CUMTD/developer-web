"use client";

import { createClient } from "@lib/supabase/client";
import { Button } from "@ui/button";
import { type ComponentPropsWithoutRef, type FormEvent, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

type Provider = "github" | "google";

type SocialLoginButtonProps = Readonly<
	{
		provider: Provider;
		redirectUrl: string;
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

export function SocialLoginButton({ provider, redirectUrl, onAuthError, ...props }: SocialLoginButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	const config = providerConfig[provider];
	const Icon = config.icon;

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		onAuthError("");

		const next = redirectUrl.startsWith("/") ? redirectUrl : "/account";

		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider,
				options: {
					redirectTo: `${window.location.origin}/account/auth/callback?next=${next}`,
				},
			});

			if (error) throw error;
		} catch (error: unknown) {
			onAuthError(error instanceof Error ? error.message : "An error occurred");
			setIsLoading(false);
		}
	};

	return (
		<Button type="button" onClick={handleLogin} disabled={isLoading} {...props}>
			<Icon className="h-4 w-4" />
			{isLoading ? "Logging in..." : config.label}
		</Button>
	);
}
