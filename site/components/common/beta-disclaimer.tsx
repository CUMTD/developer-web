import { TriangleAlert } from "lucide-react";
import Alert from "./alert";

function Title() {
	return (
		<span className="flex items-center gap-2">
			<TriangleAlert className="mb-1 size-5 shrink-0" aria-hidden="true" />
			Still In Preview
		</span>
	);
}

export default function BetaDisclaimer() {
	return (
		<Alert variant="warning" title={<Title />} tone="soft">
			<p>
				This API is currently in preview and is subject to change. Please share your feedback and report any issues you
				encounter to help us improve the API before its official release. Email us at{" "}
				<a href="mailto:developer@mtd.dev?subject=API%20Feedback">developer@mtd.dev</a>.
			</p>
		</Alert>
	);
}
