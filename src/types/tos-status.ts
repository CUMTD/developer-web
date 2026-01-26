export enum Status {
	NeverAccepted = "NeverAccepted",
	AcceptedOldValid = "AcceptedOldValid",
	AcceptedOldInvalid = "AcceptedOldInvalid",
	AcceptedLatest = "AcceptedLatest",
}

export type ToSStatus = Readonly<{
	status: Status;
	canAccessApi: boolean;
	lastAcceptedAt: string | null;
}>;
