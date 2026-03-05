import Alert from "@common/alert";
import LocalTime from "@common/local-time";
import { getLicenseStatus } from "@server/actions/license/get-license-status";
import { Status } from "@t/license-types";
import AcceptForm from "./accept-form";

export default async function AcceptLicense() {
	const licenseStatus = await getLicenseStatus();
	const { status } = licenseStatus;

	if (status === Status.AcceptedLatest) {
		const { lastAcceptedAt } = licenseStatus;
		return (
			<Alert variant="success" title="Accepted">
				<p>
					{lastAcceptedAt === null ? (
						"You accepted the latest License Agreement and Terms of Use."
					) : (
						<>
							You accepted the latest License Agreement and Terms of Use on{" "}
							<LocalTime value={lastAcceptedAt} variant="short" />.
						</>
					)}
				</p>
			</Alert>
		);
	}

	return (
		<Alert variant="error" title="Action Required: Accept License Agreement and Terms of Use">
			<AcceptForm status={status} />
		</Alert>
	);
}
