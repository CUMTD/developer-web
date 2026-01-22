"use client";

import { createClient } from "@shared/lib/supabase/client";
import { Button } from "@shared/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/shadcn/card";
import { cn } from "@shared/utils";
import { type ComponentPropsWithoutRef, type FormEvent, useState } from "react";

type LoginFormProps = Readonly<
	{
		redirectUrl: string;
	} & ComponentPropsWithoutRef<"div">
>;

export function LoginForm({ className, redirectUrl, ...props }: LoginFormProps) {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSocialLogin = async (e: FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		setError(null);

		const next = redirectUrl.startsWith("/") ? redirectUrl : "/account";

		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "github",
				options: {
					redirectTo: `${window.location.origin}/account/auth/oauth?next=${next}`,
				},
			});

			if (error) throw error;
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : "An error occurred");
			setIsLoading(false);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Welcome!</CardTitle>
					<CardDescription>Sign in to your account to continue</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSocialLogin}>
						<div className="flex flex-col gap-6">
							{error && <p className="text-sm text-destructive-500">{error}</p>}
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? "Logging in..." : "Continue with GitHub"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
