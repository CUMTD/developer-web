import LocalTime from "@components/local-time";
import { Alert, AlertDescription, AlertTitle } from "@shared/shadcn/alert";
import { Button } from "@shared/shadcn/button";
import Link from "next/link";

type AcceptedOldValidProps = Readonly<{
	acceptedOn: string | null;
}>;

export default function AcceptedOldValid({ acceptedOn }: AcceptedOldValidProps) {
	return (
		<Alert
			variant="destructive"
			className="border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-50"
		>
			<AlertTitle className="text-yellow-900 dark:text-yellow-50 text-lg">Action required: Re-Accept Terms</AlertTitle>
			<AlertDescription className="flex flex-col gap-3 font-medium text-yellow-900 dark:text-yellow-50">
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
					<Button asChild className="w-full sm:w-auto">
						<Link href="/terms-of-use">Read &amp; Accept Terms</Link>
					</Button>
				</div>
			</AlertDescription>
		</Alert>
	);
}
