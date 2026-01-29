"use client";

import { createClient } from "@lib/supabase/client";
import { cn } from "@lib/utils";
import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@ui/field";
import { Input } from "@ui/input";
import { type ComponentPropsWithoutRef, type FormEvent, useState } from "react";
import { SocialLoginButton } from "./social-login-button";

type LoginFormProps = Readonly<
	{
		redirectUrl: string;
	} & ComponentPropsWithoutRef<"div">
>;

export function LoginForm({ className, redirectUrl, ...props }: LoginFormProps) {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [emailSent, setEmailSent] = useState(false);
	const [emailError, setEmailError] = useState<string | null>(null);

	const handleEmailLogin = async (e: FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		setEmailError(null);
		setEmailSent(false);

		if (!email || !email.includes("@")) {
			setEmailError("Please enter a valid email address");
			setIsLoading(false);
			return;
		}

		const next = redirectUrl.startsWith("/") ? redirectUrl : "/account";

		try {
			const { error } = await supabase.auth.signInWithOtp({
				email,
				options: {
					emailRedirectTo: `${window.location.origin}/account/auth/callback?next=${next}`,
				},
			});

			if (error) throw error;
			setEmailSent(true);
		} catch (error: unknown) {
			setEmailError(error instanceof Error ? error.message : "An error occurred");
		} finally {
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
					<div className="flex flex-col gap-6">
						{error && <p className="text-sm text-destructive">{error}</p>}

						{/* Email Magic Link Form */}
						<form onSubmit={handleEmailLogin}>
							<Field>
								<FieldLabel htmlFor="email">Email address</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="you@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled={isLoading || emailSent}
									required
								/>
								<FieldError>{emailError}</FieldError>
								{emailSent && (
									<FieldDescription className="text-primary">
										Check your email for a magic link to sign in!
									</FieldDescription>
								)}
								{!emailSent && <FieldDescription>We'll send you a magic link to sign in</FieldDescription>}
							</Field>
							<Button type="submit" className="mt-4 w-full" disabled={isLoading || emailSent}>
								{isLoading ? "Sending..." : emailSent ? "Email Sent!" : "Continue with Email"}
							</Button>
						</form>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background text-muted-foreground px-2">Or continue with</span>
							</div>
						</div>

						{/* Social Login Buttons */}
						<div className="flex flex-col gap-3">
							<SocialLoginButton
								provider="github"
								redirectUrl={redirectUrl}
								isLoading={isLoading}
								onLoadingChange={setIsLoading}
								onAuthError={(err: string) => setError(err)}
								className="w-full"
							/>
							<SocialLoginButton
								provider="google"
								redirectUrl={redirectUrl}
								isLoading={isLoading}
								onLoadingChange={setIsLoading}
								onAuthError={(err: string) => setError(err)}
								className="w-full"
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
