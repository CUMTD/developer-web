import Alert from "@common/alert";
import LinkButton from "@common/link-button";
import LocalTime from "@common/local-time";

type AcceptedOldInvalidProps = Readonly<{
	acceptedOn: string | null;
}>;

export default function AcceptedOldInvalid({ acceptedOn }: AcceptedOldInvalidProps) {
	return (
		<Alert variant="warning" title="Action required: Re-Accept Terms">
			<div className="space-y-2 text-sm">
				{acceptedOn && (
					<p>
						You previously accepted an older Terms of Service on{" "}
						<span className="font-medium">
							<LocalTime value={acceptedOn} variant="long" />
						</span>
						, but those Terms are no longer valid.
					</p>
				)}
				<p>You must accept the latest Terms for your API keys to continue working.</p>
			</div>

			<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
				<LinkButton href="/terms-of-use" className="w-full sm:w-auto">
					Read &amp; Accept Terms
				</LinkButton>
			</div>
		</Alert>
	);
}
