"use client";

import { useCurrentUser } from "@shared/hooks/use-current-user";
import { Skeleton } from "@shared/shadcn/skeleton";
import UserAvatar from "./user-avatar";

type Props = Readonly<{
	size: "sm" | "default" | "lg";
}>;

const skeletonSizeClass: Record<Props["size"], string> = {
	sm: "h-8 w-8",
	default: "h-10 w-10",
	lg: "h-12 w-12",
};

export default function CurrentUserAvatar({ size }: Props) {
	const { isAuthenticated, isLoading, user } = useCurrentUser();

	if (isLoading) {
		return <Skeleton className={`${skeletonSizeClass[size]} rounded-full`} aria-label="Loading user avatar" />;
	}

	if (!isAuthenticated || !user) {
		return null;
	}

	const { name, profileImageUrl } = user;

	return <UserAvatar profileImage={profileImageUrl} name={name} size={size} />;
}
