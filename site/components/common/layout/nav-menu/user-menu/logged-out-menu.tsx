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
				<CircleUserIcon className="mr-1 inline-block h-4 w-4" />
				Sign In
			</LinkButton>
		</NavigationMenuItem>
	);
}
