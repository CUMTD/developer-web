import { serverEnv } from "@shared/config/env.server";

export default function buildCanonicalUrl(pathname: string, baseUrl?: string): string | undefined {
	if (!pathname) {
		return undefined;
	}

	const resolvedBaseUrl = baseUrl ?? serverEnv.NEXT_PUBLIC_BASE_URL;
	const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

	try {
		return new URL(normalizedPath, resolvedBaseUrl).toString();
	} catch {
		return undefined;
	}
}
