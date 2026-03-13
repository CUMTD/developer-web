import NextPreviousPageNavigatorButtons from "@common/docs/next-previous-page-navigator-button-interface";
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
				entire bus service amounts of information, be sure to check out our{" "}
				<Link href="/">our GTFS and GTFS-RT feeds</Link> instead.
			</p>

			<NextPreviousPageNavigatorButtons nextLink="/reference/authentication" />
		</div>
	);
}
