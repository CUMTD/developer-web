import { globalEnv } from "@shared/config/env.global";

export default function buildCanonicalUrl(pathname: string, baseUrl?: string): string | undefined {
	if (!pathname) {
		return undefined;
	}

	const resolvedBaseUrl = baseUrl ?? globalEnv.NEXT_PUBLIC_BASE_URL;
	const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

	try {
		return new URL(normalizedPath, resolvedBaseUrl).toString();
	} catch {
		return undefined;
	}
}
