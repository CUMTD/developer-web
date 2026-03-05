import assertUnreachable from "@helpers/assert-unreachable";
import {
	getLicenseAcceptanceHistory,
	type TosStatusResult,
} from "@server/actions/license/get-license-acceptance-history";
import { type LicenseStatus, Status } from "@t/license-types";

export { Status };

function parseLicenseStatus(statuses: TosStatusResult[]): Status {
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
	const tos = await getLicenseAcceptanceHistory();

	const status = parseLicenseStatus(tos);
	const simpleStatus = parseSimpleStatus(status);

	return {
		status,
		canAccessApi: simpleStatus,
		lastAcceptedAt: tos.length > 0 ? tos[0].accepted_at : null,
	};
}
