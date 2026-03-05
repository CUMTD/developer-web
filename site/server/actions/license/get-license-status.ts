import assertUnreachable from "@helpers/assert-unreachable";
import {
	getLicenseAcceptanceHistory,
	type LicenseStatusResult,
} from "@server/actions/license/get-license-acceptance-history";
import { type LicenseStatus, Status } from "@t/license-types";

export { Status };

function parseLicenseStatus(statuses: LicenseStatusResult[]): Status {
	if (statuses.length === 0) {
		return Status.NeverAccepted;
	}

	if (statuses.some(({ is_current }) => is_current)) {
		return Status.AcceptedLatest;
	}

	if (statuses.some(({ is_required }) => is_required)) {
		return Status.AcceptedOldValid;
	}
	return Status.AcceptedOldInvalid;
}

function parseSimpleStatus(status: Status): boolean {
	switch (status) {
		case Status.AcceptedLatest:
		case Status.AcceptedOldValid:
			return true;
		case Status.AcceptedOldInvalid:
		case Status.NeverAccepted:
			return false;
		default:
			assertUnreachable(status);
	}
}

export async function getLicenseStatus(): Promise<LicenseStatus> {
	const licenseHistory = await getLicenseAcceptanceHistory();

	const status = parseLicenseStatus(licenseHistory);
	const simpleStatus = parseSimpleStatus(status);

	return {
		status,
		canAccessApi: simpleStatus,
		lastAcceptedAt: licenseHistory.length > 0 ? licenseHistory[0].accepted_at : null,
	};
}
