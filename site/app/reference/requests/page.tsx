import NextPreviousPageNavigatorButtons from "@common/docs/next-previous-page-navigator-button-interface";
import { CloudUpload } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CodeExampleBody } from "../[slug]/_components/code-example-with-copy";

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
			<p>
				HTTP requests are how the internet transfers data. If you're viewing this website live on the internet, it was
				delivered via an HTTP request made by your browser.
			</p>

			<h2>Get the API base URL</h2>
			<CodeExampleBody mini>
				<code>https://api.mtd.dev/v3.0.0</code>
			</CodeExampleBody>
			<h2>Choose an endpoint</h2>
			<p>Check out the sidebar for all of the different kinds of data you can get.</p>
			<p>
				For this example, let's fetch departures for IU:1 #2439 using the{" "}
				<Link href="/reference/vehicles">vehicles endpoint.</Link>
			</p>
			<h2>Include Query Parameters</h2>
			<p>Some endpoints can take in query parameters that will shape the response output.</p>
			<h2>Include your API Key</h2>
			<p>
				Every request you make must contain your API key in the <code>X-ApiKey</code> header. How you include this key
				will vary by what you are using to make the HTTP request, but here are some examples:
			</p>
			<h2>Send!</h2>
			<p>Go to next page.</p>
			<NextPreviousPageNavigatorButtons nextLink="/reference/responses" previousLink="/reference/authentication" />
		</div>
	);
}
