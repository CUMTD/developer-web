import assertUnreachable from "@helpers/assert-unreachable";
import { getLicenseStatus } from "@server/actions/license/get-license-status";
import { Status } from "@t/license-types";
import AcceptedLatestTos from "./accepted-latest";
import AcceptedOldInvalid from "./accepted-old-invalid";
import AcceptedOldValid from "./accepted-old-valid";
import NeverAccepted from "./never-accepted";

export default async function License() {
	const { status, lastAcceptedAt } = await getLicenseStatus();

	switch (status) {
		case Status.AcceptedLatest:
			return <AcceptedLatestTos acceptedOn={lastAcceptedAt} />;
		case Status.NeverAccepted:
			return <NeverAccepted />;
		case Status.AcceptedOldInvalid:
			return <AcceptedOldInvalid acceptedOn={lastAcceptedAt} />;
		case Status.AcceptedOldValid:
			return <AcceptedOldValid acceptedOn={lastAcceptedAt} />;
		default:
			return assertUnreachable(status);
	}
}
