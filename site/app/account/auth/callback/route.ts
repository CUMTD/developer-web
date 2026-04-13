// The client you created from the Server-Side Auth instructions
import { createClient } from "@server/supabase/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const tokenHash = searchParams.get("token_hash");
	const type = searchParams.get("type");

	// if "next" is in param, use it as the redirect URL
	let next = searchParams.get("next") ?? "/";
	if (!next.startsWith("/")) {
		// if "next" is not a relative URL, use the default
		next = "/";
	}

	const redirectToNext = () => {
		const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
		const isLocalEnv = process.env.NODE_ENV === "development";
		if (isLocalEnv) {
			// we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
			return NextResponse.redirect(`${origin}${next}`);
		}

		if (forwardedHost) {
			return NextResponse.redirect(`https://${forwardedHost}${next}`);
		}

		return NextResponse.redirect(`${origin}${next}`);
	};

	if (code) {
		const supabase = await createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			return redirectToNext();
		}
	}

	if (tokenHash && type) {
		const supabase = await createClient();
		const { error } = await supabase.auth.verifyOtp({
			token_hash: tokenHash,
			type: type as EmailOtpType,
		});
		if (!error) {
			return redirectToNext();
		}
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/account/auth/error`);
}
