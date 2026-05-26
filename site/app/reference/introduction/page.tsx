import NpmPackageCard from "@app/_components/npmPackageCard";
import NextPreviousPageNavigatorButtons from "@common/docs/next-previous-page-navigator-button-interface";
import { ItemGroup } from "@ui/item";
import { BusFrontIcon, HeartIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Introduction",
	description: "API documentation introduction.",
	alternates: { canonical: "/reference/introduction" },
};

export default function IntroductionPage() {
	return (
		<div className="prose dark:prose-invert col-span-2 ">
			<div className="flex flex-row gap-5 mb-5">
				<BusFrontIcon size={50} />
				<HeartIcon size={50} />
			</div>
			<h1>Welcome aboard!</h1>
			<p>
				Here you'll find the technical documentation for the Application Programming Interface (API) provided by the
				Champaign-Urbana Mass Transit District (MTD) for accessing bus service data.
			</p>

			<p>
				Students, researchers, developers and tinkerers are welcome to use the API provided they agree to and abide by
				the <Link href="/license">Developer License Agreement and Terms of Use</Link>.
			</p>
			<h2>Have you tried our GTFS Feed?</h2>
			<p>
				This API is built for retrieving small, specific collections of service data. If you need a snapshot of the
				entire bus service or large amounts of information, be sure to check out{" "}
				<Link href="/#feeds">our GTFS and GTFS-RT feeds</Link> instead.
			</p>

			<h2 id="npm">npm Packages</h2>

			<ItemGroup className="gap-3">
				<NpmPackageCard
					name="@mtd.org/developer-api-types"
					description="API response TypeScript types."
					href="https://www.npmjs.com/package/@mtd.org/developer-api-types"
				/>
				<NpmPackageCard
					name="@mtd.org/developer-api-client"
					description="A typesafe API client."
					href="https://www.npmjs.com/package/@mtd.org/developer-api-client"
				/>
				<NpmPackageCard
					name="@mtd.org/developer-api-spec"
					description="OpenAPI specification files for the MTD API."
					href="https://www.npmjs.com/package/@mtd.org/developer-api-spec"
				/>
			</ItemGroup>
			<NextPreviousPageNavigatorButtons nextLink="/reference/authentication" />
		</div>
	);
}
