import { globalEnv } from "@env/global";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/account/", "/sentry-example-page/"],
			},
		],
		sitemap: `${globalEnv.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
	};
}
