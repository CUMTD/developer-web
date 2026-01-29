/**
 * Status of the user's Terms of Use acceptance.
 */
export enum Status {
	NeverAccepted = "NeverAccepted",
	AcceptedOldValid = "AcceptedOldValid",
	AcceptedOldInvalid = "AcceptedOldInvalid",
	AcceptedLatest = "AcceptedLatest",
}

/**
 * Terms of Use status information.
 */
export type ToSStatus = Readonly<{
	status: Status;
	canAccessApi: boolean;
	lastAcceptedAt: string | null;
}>;

/**
 * Action state for accepting the Terms of Use.
 */
export type AcceptTosActionState = { ok: true } | { ok: false; message: string };
