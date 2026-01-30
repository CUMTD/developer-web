import Alert from "@common/alert";
import LinkButton from "@common/link-button";
import LocalTime from "@common/local-time";

type AcceptedLatestTosProps = Readonly<{
	acceptedOn: string | null;
}>;

export default function AcceptedLatestTos({ acceptedOn }: AcceptedLatestTosProps) {
	return (
		<Alert variant="success" title="Terms accepted">
			<p>
				{acceptedOn && (
					<>
						You accepted the latest Terms of Service on{" "}
						<span className="font-medium">
							<LocalTime value={acceptedOn} variant="long" />
						</span>
						.
					</>
				)}
			</p>

			<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
				<LinkButton href="/terms-of-use" variant={"outline"} className="w-full sm:w-auto">
					Read Terms
				</LinkButton>
			</div>
		</Alert>
	);
}
