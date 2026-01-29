import assertUnreachable from "@helpers/assert-unreachable";
import { getTosAcceptanceHistory, type TosStatusResult } from "@server/actions/terms-of-use/get-tos-acceptance-history";
import { Status, type ToSStatus } from "@t/terms-of-use-types";

export { Status };
export type { ToSStatus };

function parseTosStatus(statuses: TosStatusResult[]): Status {
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

export async function getTosStatus(): Promise<ToSStatus> {
	const tos = await getTosAcceptanceHistory();

	const status = parseTosStatus(tos);
	const simpleStatus = parseSimpleStatus(status);

	return {
		status,
		canAccessApi: simpleStatus,
		lastAcceptedAt: tos.length > 0 ? tos[0].accepted_at : null,
	};
}
