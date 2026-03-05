import Alert from "@common/alert";
import LinkButton from "@common/link-button";
import LocalTime from "@common/local-time";

type AcceptedOldValidProps = Readonly<{
	acceptedOn: string | null;
}>;

export default function AcceptedOldValid({ acceptedOn }: AcceptedOldValidProps) {
	return (
		<Alert variant="warning" title="Action required: Re-Accept License Agreement and Terms of Use">
			<p>
				{acceptedOn ? (
					<>
						You accepted a previous version of the License Agreement and Terms of Use on{" "}
						<span className="font-medium">
							<LocalTime value={acceptedOn} variant="long" />
						</span>
						.
					</>
				) : (
					<>You accepted a previous version of the License Agreement and Terms of Use.</>
				)}
			</p>
			<p>
				Your current acceptance is still valid, but will eventually stop working. Please review and accept the latest
				License Agreement and Terms of Use to ensure uninterrupted access to the API.
			</p>
			<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
				<LinkButton href="/license" className="w-full sm:w-auto">
					Read &amp; Accept License Agreement and Terms of Use
				</LinkButton>
			</div>
		</Alert>
	);
}
