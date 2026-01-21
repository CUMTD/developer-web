"use client";

import UserProfileDisplay from "@components/ProfileDisplay";
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
import type * as React from "react";
import WordMark from "./WordMark";

export default function NavMenu() {
	const isMobile = useIsMobile();

	return (
		<header className="flex flex-row justify-between lg:px-8 px-5 p-5 row-span-1 sticky top-0 bg-sidebar z-50    ">
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
						<NavigationMenuContent>
							<ul className="grid w-[300px] gap-4">
								<li>
									<NavigationMenuLink asChild>
										<Link href="/reference/introduction">
											<div className="font-medium">Developer API Reference</div>
											<div className="text-muted-foreground">Learn how to use the API.</div>
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href="/guides">
											<div className="font-medium">Guides</div>
											<div className="text-muted-foreground">A handful of examples on using transit data.</div>
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href="#">
											<div className="font-medium flex flex-row gap-2 align-middle">
												Swagger UI <ExternalLink />
											</div>
											<div className="text-muted-foreground">OpenAPI Definition for power users.</div>
										</Link>
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>

					{/* <NavigationMenuItem>
						<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
							<Link href="/garage">App Garage</Link>
						</NavigationMenuLink>
					</NavigationMenuItem> */}

					<NavigationMenuItem>
						<UserProfileDisplay />
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}

function _ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href}>
					<div className="text-sm leading-none font-medium">{title}</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}
