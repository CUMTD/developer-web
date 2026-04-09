import { globalEnv } from "@env/global";
import { API_INDEX, type ApiObject } from "@t/md.generated";
import type { MetadataRoute } from "next";

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

type SitemapEntry = {
	url: string;
	changeFrequency: ChangeFrequency;
	priority?: number;
};

function isSitemapEntry(obj: string | SitemapEntry): obj is SitemapEntry {
	return (
		typeof obj === "object" &&
		typeof obj.url === "string" &&
		typeof obj.changeFrequency === "string" &&
		(obj.priority === undefined || typeof obj.priority === "number")
	);
}

const base = globalEnv.NEXT_PUBLIC_BASE_URL;

const staticRoutes: SitemapEntry[] = [
	{ url: "/", changeFrequency: "weekly", priority: 1.0 },
	{ url: "/reference", changeFrequency: "monthly", priority: 0.8 },
	{ url: "/reference/introduction", changeFrequency: "monthly", priority: 0.8 },
	{ url: "/reference/authentication", changeFrequency: "monthly", priority: 0.8 },
	{ url: "/reference/requests", changeFrequency: "monthly", priority: 0.8 },
	{ url: "/reference/responses", changeFrequency: "monthly", priority: 0.8 },
	{ url: "/license", changeFrequency: "monthly", priority: 0.8 },
	{ url: "/license/distribution", changeFrequency: "monthly", priority: 0.8 },
];

const dynamicReferenceRoutes = (Object.keys(API_INDEX) as ApiObject[]).map((slug) => `/reference/${slug}`);

export default function sitemap(): MetadataRoute.Sitemap {
	return [...staticRoutes, ...dynamicReferenceRoutes].map((route) => {
		if (isSitemapEntry(route)) {
			const { url, changeFrequency, priority } = route;
			return {
				url: `${base}${url}`,
				changeFrequency,
				priority,
			};
		}

		return {
			url: `${base}${route}`,
			changeFrequency: "monthly",
			priority: 0.7,
		};
	});
}
