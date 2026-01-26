import { Button } from "@ui/button";
import { NavigationMenuItem } from "@ui/navigation-menu";
import { CircleUserIcon } from "lucide-react";
import Link from "next/link";

export default function LoggedOutMenu() {
	return (
		<NavigationMenuItem>
			<Button asChild size={"sm"} className="md:min-w-28">
				<Link href="/account/auth/login" className="w-full flex flex-row justify-center">
					<CircleUserIcon className="mr-1 inline-block h-4 w-4" />
					Sign In
				</Link>
			</Button>
		</NavigationMenuItem>
	);
}
