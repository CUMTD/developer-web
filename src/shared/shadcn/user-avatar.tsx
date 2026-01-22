import { Avatar, AvatarFallback, AvatarImage } from "@shared/shadcn/avatar";

type UserAvatarProps = Readonly<{
	profileImage: string | null;
	name: string;
}>;

export default function UserAvatar({ profileImage, name }: UserAvatarProps) {
	const initials = name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase();

	return (
		<Avatar>
			{profileImage && <AvatarImage src={profileImage} alt={initials} />}
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
	);
}
