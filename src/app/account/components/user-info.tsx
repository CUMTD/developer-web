import UserAvatar from "@components/user-avatar";

type UserInfoProps = Readonly<{
	name: string;
	email: string | null;
	avatarUrl: string | null;
}>;

export default function UserInfo({ name, email, avatarUrl }: UserInfoProps) {
	return (
		<div className="flex flex-row items-center space-x-4">
			<UserAvatar name={name} profileImage={avatarUrl} size="xl" />
			<div>
				<div className="font-bold">{name}</div>
				{email && <div className="text-sm text-muted-foreground">{email}</div>}
			</div>
		</div>
	);
}
