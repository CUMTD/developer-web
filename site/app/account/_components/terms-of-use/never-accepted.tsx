import Alert from "@common/alert";
import LinkButton from "@common/link-button";

export default function NeverAccepted() {
	return (
		<Alert variant="error" title="Accept Terms of Use">
			<div className="space-y-2 text-sm">
				<p>
					You haven't accepted the Terms of Service yet. You must accept the Terms before you can use the API or create
					API keys.
				</p>
			</div>

			<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
				<LinkButton href="/terms-of-use">Read &amp; Accept Terms</LinkButton>
			</div>
		</Alert>
	);
}
