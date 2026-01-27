import Alert from "@common/alert";
import LinkButton from "@common/link-button";
import LocalTime from "@common/local-time";

type AcceptedOldValidProps = Readonly<{
	acceptedOn: string | null;
}>;

export default function AcceptedOldValid({ acceptedOn }: AcceptedOldValidProps) {
	return (
		<Alert variant="warning" title="Action required: Re-Accept Terms">
			<p>
				{acceptedOn ? (
					<>
						You accepted a previous version of the Terms of Service on{" "}
						<span className="font-medium">
							<LocalTime value={acceptedOn} variant="long" />
						</span>
						.
					</>
				) : (
					<>You accepted a previous version of the Terms of Service.</>
				)}
			</p>
			<p>
				Your current acceptance is still valid, but will eventually stop working. Please review and accept the latest
				Terms to ensure uninterrupted access to the API.
			</p>
			<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
				<LinkButton href="/terms-of-use" className="w-full sm:w-auto">
					Read &amp; Accept Terms
				</LinkButton>
			</div>
		</Alert>
	);
}
