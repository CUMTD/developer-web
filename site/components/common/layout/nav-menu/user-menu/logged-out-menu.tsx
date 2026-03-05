import LinkButton from "@common/link-button";
import { NavigationMenuItem } from "@ui/navigation-menu";
import { CircleUserIcon } from "lucide-react";

export default function LoggedOutMenu() {
	return (
		<NavigationMenuItem className="dark:text-[#63be45] dark:hover:text-white">
			<LinkButton
				variant="ghost"
				href="/account/auth/login"
				size="sm"
				linkProps={{ className: "w-full flex flex-row justify-center" }}
			>
				<CircleUserIcon className="md:inline-block hidden mr-1  h-4 w-4" />
				<span className="inline-block mt-0.5">Sign In</span>
			</LinkButton>
		</NavigationMenuItem>
	);
}
