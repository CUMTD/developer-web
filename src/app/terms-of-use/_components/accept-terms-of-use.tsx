import Alert from "@common/alert";
import LocalTime from "@common/local-time";
import { getTosStatus } from "@server/actions/terms-of-use/get-tos-status";
import { Status } from "@t/tos-status";
import AcceptForm from "./accept-form";

export default async function AcceptTermsOfUse() {
	const tosStatus = await getTosStatus();
	const { status } = tosStatus;

	if (status === Status.AcceptedLatest) {
		const { lastAcceptedAt } = tosStatus;
		return (
			<Alert variant="success" title="Accepted">
				<p>
					{lastAcceptedAt === null ? (
						"You accepted the latest Terms of Use."
					) : (
						<>
							You accepted the latest Terms of Use on <LocalTime value={lastAcceptedAt} variant="short" />.
						</>
					)}
				</p>
			</Alert>
		);
	}

	return (
		<Alert variant="error" title="Action Required: Accept Terms of Use">
			<AcceptForm status={status} />
		</Alert>
	);
}
