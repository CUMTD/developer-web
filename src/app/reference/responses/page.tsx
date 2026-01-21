import NextPreviousPageNavigatorButtons from "@components/NextPreviousPageNavigatorButtons";
import { CloudDownload } from "lucide-react";

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
				If your API call was successful, response data will be under <code>result</code>. If your call was not
				successful (whether by user or server error), error details will be provided under <code>error</code> in
				addition to the proper{" "}
				<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status">HTTP status code</a>.
			</p>
			<h2>Successful Response</h2>
			<Sample />

			<h2>Unsuccessful Response</h2>
			<Sample />
			<NextPreviousPageNavigatorButtons previousLink="/reference/requests" />
		</div>
	);
}
