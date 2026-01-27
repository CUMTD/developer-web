import { createClient } from "@server/supabase/server";
import { NextResponse } from "next/server";

export async function POST({ url }: Request) {
	const supabase = await createClient();
	await supabase.auth.signOut();

	const requestUrl = new URL(url);
	const redirectUrl = requestUrl.searchParams.get("redirectUrl");
	const safeRedirectUrl = redirectUrl?.startsWith("/") ? redirectUrl : "/account/auth/login";

	return NextResponse.redirect(new URL(safeRedirectUrl, requestUrl), {
		status: 303,
	});
}
