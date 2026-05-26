import { globalEnv } from "@env/global";
import { API_INDEX, type ApiObject } from "@t/md.generated";
import type { MetadataRoute } from "next";

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

type SitemapEntry = {
	url: string;
	changeFrequency: ChangeFrequency;
	priority?: number;
	lastModified?: Date;
};

function isSitemapEntry(obj: string | SitemapEntry): obj is SitemapEntry {
	return (
		typeof obj === "object" &&
		typeof obj.url === "string" &&
		typeof obj.changeFrequency === "string" &&
		(obj.priority === undefined || typeof obj.priority === "number")
	);
}

const base = globalEnv.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");

/** Build-time date used as lastModified for statically generated pages. */
const buildDate = new Date();

const staticRoutes: SitemapEntry[] = [
	{ url: "/", changeFrequency: "weekly", priority: 1.0, lastModified: buildDate },
	{ url: "/reference/introduction", changeFrequency: "monthly", priority: 0.8, lastModified: buildDate },
	{ url: "/reference/authentication", changeFrequency: "monthly", priority: 0.8, lastModified: buildDate },
	{ url: "/reference/requests", changeFrequency: "monthly", priority: 0.8, lastModified: buildDate },
	{ url: "/reference/responses", changeFrequency: "monthly", priority: 0.8, lastModified: buildDate },
	{ url: "/license", changeFrequency: "monthly", priority: 0.8, lastModified: buildDate },
	{ url: "/license/distribution", changeFrequency: "monthly", priority: 0.8, lastModified: buildDate },
];

const dynamicReferenceRoutes = (Object.keys(API_INDEX) as ApiObject[]).map((slug) => `/reference/${slug}`);

export default function sitemap(): MetadataRoute.Sitemap {
	return [...staticRoutes, ...dynamicReferenceRoutes].map((route) => {
		if (isSitemapEntry(route)) {
			const { url, changeFrequency, priority, lastModified } = route;
			return {
				url: `${base}${url}`,
				changeFrequency,
				priority,
				lastModified,
			};
		}

		return {
			url: `${base}${route}`,
			changeFrequency: "monthly" as const,
			priority: 0.7,
			lastModified: buildDate,
		};
	});
}
