import LocalTime from "@components/local-time";
import { Alert, AlertDescription, AlertTitle } from "@shared/shadcn/alert";
import { Button } from "@shared/shadcn/button";
import Link from "next/link";

type AcceptedOldInvalidProps = Readonly<{
	acceptedOn: string | null;
}>;

export default function AcceptedOldInvalid({ acceptedOn }: AcceptedOldInvalidProps) {
	return (
		<Alert
			variant="destructive"
			className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50"
		>
			<AlertTitle className="text-amber-900 dark:text-amber-50 text-lg">Action required: Re-Accept Terms</AlertTitle>
			<AlertDescription className="flex flex-col gap-3 font-medium text-amber-900 dark:text-amber-50">
				<div className="space-y-2 text-sm">
					<p>
						{acceptedOn && (
							<>
								You previously accepted an older Terms of Service on{" "}
								<span className="font-medium">
									<LocalTime value={acceptedOn} options="long" />
								</span>
								, but those Terms are no longer valid.
							</>
						)}
					</p>
					<p>You must accept the latest Terms for your API keys to continue working.</p>
				</div>

				<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
					<Button asChild className="w-full sm:w-auto">
						<Link href="/terms-of-use">Read &amp; Accept Terms</Link>
					</Button>
				</div>
			</AlertDescription>
		</Alert>
	);
}
