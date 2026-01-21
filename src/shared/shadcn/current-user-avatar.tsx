"use client";

import { useCurrentUserImage } from "@shared/hooks/use-current-user-image";
import { useCurrentUserName } from "@shared/hooks/use-current-user-name";
import UserAvatar from "./user-avatar";

export const CurrentUserAvatar = () => {
	const profileImage = useCurrentUserImage();
	const name = useCurrentUserName();

	return <UserAvatar profileImage={profileImage} name={name} />;
};
