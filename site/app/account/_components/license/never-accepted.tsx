import Alert from "@common/alert";
import LinkButton from "@common/link-button";

export default function NeverAccepted() {
	return (
		<Alert variant="error" title="Accept License Agreement and Terms of Use">
			<div className="space-y-2 text-sm">
				<p>
					You haven't accepted the License Agreement and Terms of Use yet. You must accept them before you can use the
					API or create API keys.
				</p>
			</div>

			<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
				<LinkButton href="/license">Read &amp; Accept License Agreement and Terms of Use</LinkButton>
			</div>
		</Alert>
	);
}
