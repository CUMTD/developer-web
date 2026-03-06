import UserAvatar from "@common/account/user-avatar";
import { type CurrentUser, isUnknownUser } from "@t/current-user";
import { NavigationMenuItem, NavigationMenuLink } from "@ui/navigation-menu";

function getDisplayName(currentUser: CurrentUser) {
	if (isUnknownUser(currentUser)) {
		return currentUser.name;
	}
	return currentUser.name.split(" ")[0];
}

export default function LoggedInUserMenu({ user }: Readonly<{ user: CurrentUser }>) {
	const name = getDisplayName(user);
	const { profileImageUrl } = user;

	return (
		<NavigationMenuItem>
			<NavigationMenuLink href="/account">
				<div className="flex flex-row gap-2 items-center">
					<UserAvatar profileImage={profileImageUrl} name={name} size="sm" />
					<span className="font-medium hidden md:block">{name}</span>
				</div>
			</NavigationMenuLink>
		</NavigationMenuItem>
	);
}
