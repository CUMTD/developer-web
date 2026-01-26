import { Avatar, AvatarFallback, AvatarImage } from "@shared/shadcn/avatar";
import { cn } from "@shared/utils";

type UserAvatarProps = Readonly<{
	profileImage: string | null;
	name: string;
	size: "default" | "sm" | "lg" | "xl";
}>;

const avatarSizeClass: Record<NonNullable<UserAvatarProps["size"]>, string> = {
	sm: "h-6 w-6",
	default: "h-10 w-10",
	lg: "h-12 w-12",
	xl: "h-16 w-16",
};

export default function UserAvatar({ profileImage, name, size }: UserAvatarProps) {
	const initials = name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase();

	return (
		<Avatar className={cn(avatarSizeClass[size])}>
			{profileImage && <AvatarImage src={profileImage} alt={initials} />}
			<AvatarFallback
				className={cn(size === "sm" && "text-xs", size === "lg" && "text-base", size === "xl" && "text-lg")}
			>
				{initials}
			</AvatarFallback>
		</Avatar>
	);
}
