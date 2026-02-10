import LinkButton from "@common/link-button";
import { NavigationMenuItem } from "@ui/navigation-menu";
import { CircleUserIcon } from "lucide-react";

export default function LoggedOutMenu() {
	return (
		<NavigationMenuItem>
			<LinkButton
				href="/account/auth/login"
				size="sm"
				className=""
				linkProps={{ className: "w-full flex flex-row justify-center" }}
			>
				<CircleUserIcon className="md:inline-block hidden mr-1  h-4 w-4" />
				Sign In
			</LinkButton>
		</NavigationMenuItem>
	);
}
