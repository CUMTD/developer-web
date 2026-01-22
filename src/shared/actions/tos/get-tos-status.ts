import { getTosAcceptanceHistory, type TosStatusResult } from "@shared/actions/tos/get-tos-acceptance-history";

export enum Status {
	NeverAccepted = "NeverAccepted",
	AcceptedOldValid = "AcceptedOldValid",
	AcceptedOldInvalid = "AcceptedOldInvalid",
	AcceptedLatest = "AcceptedLatest",
}

export type TosStatus = Readonly<{
	status: Status;
	lastAcceptedAt: string | null;
}>;

function parseTosStatus(statuses: TosStatusResult[]): Status {
	if (statuses.length === 0) {
		return Status.NeverAccepted;
	}

	if (statuses.some(({ is_required }) => is_required)) {
		if (statuses.some(({ is_current }) => is_current)) {
			return Status.AcceptedLatest;
		}
		return Status.AcceptedOldValid;
	}
	return Status.AcceptedOldInvalid;
}

export async function getTosStatus(): Promise<TosStatus> {
	const tos = await getTosAcceptanceHistory();

	const status = parseTosStatus(tos);

	return {
		status,
		lastAcceptedAt: tos.length > 0 ? tos[0].accepted_at : null,
	};
}
