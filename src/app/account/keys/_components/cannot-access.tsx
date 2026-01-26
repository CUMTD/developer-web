import Alert from "@common/alert";
import LinkButton from "@common/link-button";

export default function CannotAccess() {
	return (
		<Alert variant="error" title="Terms of Use not Accepted">
			<div className="space-y-2 text-sm">
				<p>You must accept the latest Terms of Use to access your API keys.</p>
			</div>

			<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
				<LinkButton href="/terms-of-use" className="w-full sm:w-auto">
					Read &amp; Accept Terms
				</LinkButton>
			</div>
		</Alert>
	);
}
