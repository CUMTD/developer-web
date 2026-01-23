import LocalTime from "@components/local-time";
import { getTosStatus, Status } from "@shared/actions/terms-of-use/get-tos-status";
import { Alert, AlertDescription, AlertTitle } from "@shared/shadcn/alert";
import AcceptForm from "./accept-form";

export default async function AcceptTermsOfUse() {
	const tosStatus = await getTosStatus();
	const { status } = tosStatus;

	if (status === Status.AcceptedLatest) {
		const { lastAcceptedAt } = tosStatus;
		return (
			<Alert
				className="border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-yellow-50"
			>
				<AlertTitle className="text-green-900 dark:text-green-50 text-lg">Accepted</AlertTitle>
				<AlertDescription className="flex flex-col gap-3 font-medium text-green-900 dark:text-green-50">
					<p>
						{lastAcceptedAt === null ? (
							"You accepted the latest Terms of Use."
						) : (
							<>
								You accepted the latest Terms of Use on <LocalTime value={lastAcceptedAt} variant="short" />.
							</>
						)}
					</p>
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<Alert
			variant="destructive"
			className="border-amber-200 bg-amber-50 text-yellow-900 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-50"
		>
			<AlertTitle className="text-yellow-900 dark:text-yellow-50 text-lg">
				Action Required: Accept Terms of Use
			</AlertTitle>
			<AlertDescription className="flex flex-col gap-3 font-medium text-amber-900 dark:text-amber-50">
				<AcceptForm status={status} />
			</AlertDescription>
		</Alert>
	);
}
