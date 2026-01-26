import LinkButton from "@common/link-button";
import LocalTime from "@common/local-time";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";

type AcceptedLatestTosProps = Readonly<{
	acceptedOn: string | null;
}>;

export default function AcceptedLatestTos({ acceptedOn }: AcceptedLatestTosProps) {
	return (
		<Alert>
			<AlertTitle className="text-lg">Terms accepted</AlertTitle>
			<AlertDescription className="flex flex-col gap-3">
				<div className="text-sm text-muted-foreground">
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
				</div>

				<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
					<LinkButton href="/terms-of-use" className="w-full sm:w-auto">
						Read Terms
					</LinkButton>
				</div>
			</AlertDescription>
		</Alert>
	);
}
