type CurrentUserShared = {
	email: string | null;
	profileImageUrl: string | null;
};

type UnknownCurrentUser = Readonly<
	{
		name: "Unknown User";
	} & CurrentUserShared
>;

type KnownCurrentUser = Readonly<
	{
		name: string;
	} & CurrentUserShared
>;

export type CurrentUser = KnownCurrentUser | UnknownCurrentUser;

export function isUnknownUser(user: CurrentUser): user is UnknownCurrentUser {
	return user.name === "Unknown User";
}

export type CurrentUserState = Readonly<{
	isLoading: boolean;
	isAuthenticated: boolean;
	user: CurrentUser | null;
}>;
