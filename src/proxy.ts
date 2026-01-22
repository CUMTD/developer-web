import updateSession from "@shared/lib/supabase/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isAccountAuthPath(pathname: string) {
	if (pathname === "/account/auth") {
		return true;
	}

	if (pathname.startsWith("/account/auth/")) {
		return true;
	}

	return false;
}

export async function proxy(request: NextRequest) {
	if (isAccountAuthPath(request.nextUrl.pathname)) {
		return NextResponse.next({
			request,
		});
	}

	return await updateSession(request);
}

export const config = {
	matcher: ["/account/:path*"],
};
