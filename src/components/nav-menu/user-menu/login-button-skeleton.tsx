import { NavigationMenuItem } from "@shared/shadcn/navigation-menu";
import { Skeleton } from "@shared/shadcn/skeleton";

export default function LoginButtonSkeleton() {
	return (
		<NavigationMenuItem>
			<Skeleton className="h-9 w-28 rounded-md" />
		</NavigationMenuItem>
	);
}
