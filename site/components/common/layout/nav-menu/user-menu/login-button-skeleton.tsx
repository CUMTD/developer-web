import { NavigationMenuItem } from "@ui/navigation-menu";
import { Skeleton } from "@ui/skeleton";

export default function LoginButtonSkeleton() {
	return (
		<NavigationMenuItem>
			<Skeleton className="h-9 w-28 rounded-md" />
		</NavigationMenuItem>
	);
}
