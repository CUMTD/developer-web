"use client";

import UserMenu from "@components/nav-menu/user-menu";
import { useIsMobile } from "@shared/hooks/use-mobile";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@shared/shadcn/navigation-menu";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import WordMark from "./word-mark";

export default function NavMenu() {
	const isMobile = useIsMobile();

	return (
		<header className="flex flex-row justify-between lg:px-8 px-5 p-5 row-span-1 sticky top-0 bg-sidebar z-50">
			<WordMark />
			<NavigationMenu viewport={isMobile}>
				<NavigationMenuList className="flex-wrap">
					<NavigationMenuItem>
						<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
							<Link href="/">Home</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>

					<NavigationMenuItem className="hidden md:block">
						<NavigationMenuTrigger>Documentation</NavigationMenuTrigger>

						<NavigationMenuContent className="absolute right-0 left-auto top-full mt-2 z-50">
							<div className="w-[min(420px,calc(100vw-1rem))] p-2">
								<ul className="grid gap-2">
									<li>
										<NavigationMenuLink asChild>
											<Link
												href="/reference/introduction"
												className="block rounded-md px-3 py-2 hover:bg-accent focus:bg-accent outline-none"
											>
												<div className="font-medium">Developer API Reference</div>
												<div className="text-muted-foreground">Learn how to use the API.</div>
											</Link>
										</NavigationMenuLink>
									</li>

									<li>
										<NavigationMenuLink asChild>
											<Link
												href="/guides"
												className="block rounded-md px-3 py-2 hover:bg-accent focus:bg-accent outline-none"
											>
												<div className="font-medium">Guides</div>
												<div className="text-muted-foreground">A handful of examples on using transit data.</div>
											</Link>
										</NavigationMenuLink>
									</li>

									<li>
										<NavigationMenuLink asChild>
											<Link
												href="#"
												className="block rounded-md px-3 py-2 hover:bg-accent focus:bg-accent outline-none"
											>
												<div className="font-medium flex flex-row gap-2 items-center">
													Swagger UI <ExternalLink className="h-4 w-4" />
												</div>
												<div className="text-muted-foreground">OpenAPI Definition for power users.</div>
											</Link>
										</NavigationMenuLink>
									</li>
								</ul>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>

					<UserMenu />
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}
