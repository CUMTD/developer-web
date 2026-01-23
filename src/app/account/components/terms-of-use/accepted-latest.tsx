import LocalTime from "@components/local-time";
import { Alert, AlertDescription, AlertTitle } from "@shared/shadcn/alert";
import { Button } from "@shared/shadcn/button";
import Link from "next/link";

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
					<Button asChild className="w-full sm:w-auto">
						<Link href="/terms-of-use">Read Terms</Link>
					</Button>
				</div>
			</AlertDescription>
		</Alert>
	);
}
