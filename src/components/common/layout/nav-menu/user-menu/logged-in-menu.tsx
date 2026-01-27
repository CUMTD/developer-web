import UserAvatar from "@common/account/user-avatar";
import { LogoutButton } from "@common/auth/logout-button";
import { type CurrentUser, isUnknownUser } from "@t/current-user";
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "@ui/navigation-menu";
import Link from "next/link";

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
		<NavigationMenuItem className="hidden md:flex">
			<NavigationMenuTrigger>
				<div className="flex flex-row gap-2 items-center">
					<UserAvatar profileImage={profileImageUrl} name={name} size="sm" />
					<span className="font-medium">{name}</span>
				</div>
			</NavigationMenuTrigger>

			<NavigationMenuContent className="absolute right-0 left-auto top-full mt-2 z-50">
				<div className="w-[min(420px,calc(100vw-1rem))] p-2">
					<ul className="grid gap-2">
						<li>
							<NavigationMenuLink asChild>
								<Link
									href="/account"
									className="block rounded-md px-3 py-2 hover:bg-accent focus:bg-accent outline-none"
								>
									<div className="font-medium">Account</div>
									<div className="text-muted-foreground">Manage your account settings and API keys.</div>
								</Link>
							</NavigationMenuLink>
						</li>

						<li>
							<LogoutButton />
						</li>
					</ul>
				</div>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
}
