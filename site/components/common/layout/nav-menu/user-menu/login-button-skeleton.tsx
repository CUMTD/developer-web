import { NavigationMenuItem } from "@ui/navigation-menu";
import { Skeleton } from "@ui/skeleton";

export default function LoginButtonSkeleton() {
	return (
		<NavigationMenuItem>
			<Skeleton className="h-2 w-[6ch] rounded-md" />
		</NavigationMenuItem>
	);
}
