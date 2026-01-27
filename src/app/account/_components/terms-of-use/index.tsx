import assertUnreachable from "@helpers/assert-unreachable";
import { getTosStatus, Status } from "@server/actions/terms-of-use/get-tos-status";
import AcceptedLatestTos from "./accepted-latest";
import AcceptedOldInvalid from "./accepted-old-invalid";
import AcceptedOldValid from "./accepted-old-valid";
import NeverAccepted from "./never-accepted";

export default async function TermsOfUse() {
	const { status, lastAcceptedAt } = await getTosStatus();

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
