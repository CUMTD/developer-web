import NextPreviousPageNavigatorButtons from "@common/docs/next-previous-page-navigator-button-interface";
import { CloudUpload } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Requests",
	description: "How to send API requests.",
	alternates: { canonical: "/reference/requests" },
};

export default function RequestsPage() {
	return (
		<div className="prose dark:prose-invert col-span-2 ">
			<div className="flex flex-row gap-5 mb-5">
				<CloudUpload size={50} />
			</div>
			<h1>Sending Requests</h1>
			<h2>Introduction to HTTP</h2>
			<p>
				<Link
					href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"
					target="_blank"
					rel="noopener noreferrer"
				>
					HTTP
				</Link>{" "}
				is a protocol for fetching resources through the internet. HTTP is the foundation of how data moves across the
				internet. Every webpage you visit, every image you view, and every video you watch is fetched by an HTTP
				request. The same goes for our API.
			</p>
			<p>
				There are many ways to make HTTP requests, whether through your web browser's URL bar, code, or user interface
				like{" "}
				<Link href={"https://www.postman.com/"} target="_blank" rel="noopener noreferrer">
					Postman
				</Link>
				.
			</p>

			<h2>Path and Query Parameters</h2>
			<p>Some endpoints take parameters that will shape the response object.</p>
			<p>
				<i>Path parameters</i> are hierarchical elements of the resource path, and are usually mandatory.
			</p>
			<p>
				<i>Query parameters</i> come after a <code>?</code> and filter or sort the results, and are usually optional.
			</p>

			<p>
				<Link href={"/reference/stops#get-stop-departures"}>Get a stop's departures</Link> is a good example, since it
				has both. The stop ID is the path parameter that identifies the resource, whereas the optional query parameters
				filter the departures.
			</p>

			<div className="grid grid-rows-2 grid-cols-3 text-center gap-3 mt-10">
				<span className="col-span-3 font-mono bg-accent p-3 rounded-xl">
					https://api.mtd.dev/stops/<span className="dark:text-purple-400 text-purple-800 underline">IT:1</span>
					/departures
					<wbr />
					<span className="dark:text-green-300 text-green-800 underline decoration-wavy">?routes=red</span>
					<span className="dark:text-red-300 text-red-800 underline decoration-dashed ">&time=60</span>
				</span>

				<span className="dark:text-purple-400 text-purple-800 underline">Path Parameter</span>
				<span className="dark:text-green-300 text-green-800 underline decoration-wavy">First Query parameter</span>
				<span className="dark:text-red-300 text-red-800 underline decoration-dashed">Second Query Paramter</span>
			</div>
			<h2>Don't forget that API Key!</h2>
			<p>
				See <Link href={"/reference/authentication"}>Authentication</Link> for how to authenticate your requests.
			</p>

			<NextPreviousPageNavigatorButtons nextLink="/reference/responses" previousLink="/reference/authentication" />
		</div>
	);
}
