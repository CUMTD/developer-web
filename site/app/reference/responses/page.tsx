import NextPreviousPageNavigatorButtons from "@common/docs/next-previous-page-navigator-button-interface";
import { CloudDownload } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CodeExampleBody } from "../[slug]/_components/code-example-with-copy";
export const metadata: Metadata = {
	title: "Responses",
	description: "Understanding API responses.",
	alternates: { canonical: "/reference/responses" },
};

export const dynamic = "force-static";

export default async function RequestsPage() {
	const { default: Sample } = await import(`./sample.mdx`);

	return (
		<div className="prose dark:prose-invert col-span-2 ">
			<div className="flex flex-row gap-5 mb-5">
				<CloudDownload size={50} />
			</div>
			<h1>Interpreting Responses</h1>

			<p>
				After you send your API request, you'll receive a response in the form of a{" "}
				<Link
					href={
						"https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON#no_really_what_is_json"
					}
				>
					JSON object
				</Link>
				.
			</p>

			<CodeExampleBody copyable={false}>
				<Sample />
			</CodeExampleBody>

			<p>
				If there was an error in your request or processing your request, error details will be provided in the{" "}
				<code>error</code> object. Otherwise, the data you requested will be provided in the <code>result</code> object.
			</p>

			<NextPreviousPageNavigatorButtons
				message={"That's the basics! You can explore the API documentation using the sidebar."}
				previousLink="/reference/requests"
				nextLink="/reference/routes"
			/>
		</div>
	);
}
