import NextPreviousPageNavigatorButtons from "@components/NextPreviousPageNavigatorButtons";
import { CloudUpload } from "lucide-react";

export default function RequestsPage() {
	return (
		<div className="prose dark:prose-invert col-span-2 ">
			<div className="flex flex-row gap-5 mb-5">
				<CloudUpload size={50} />
			</div>
			<h1>Sending Requests</h1>
			<h2>Base URL</h2>
			<p>All endpoints are RESTful HTTP.</p>
			<code>https://mtd.dev/api</code>
			<h2>Choose an endpoint</h2>
			<p>For this example, let's fetch vehicle #XXXX using the vehicles endpoint.</p>
			<h2>API Key</h2>
			<p>Add your API key to the request header. Every request you make must contain this key.</p>
			<NextPreviousPageNavigatorButtons nextLink="/reference/responses" previousLink="/reference/authentication" />
		</div>
	);
}
