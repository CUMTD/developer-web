"use client";
import { API_INDEX, type ApiObject } from "@t/md.generated";
import { Separator } from "@ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
	useSidebar,
} from "@ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

const data: Readonly<{ navMain: NavItem[] }> = {
	navMain: [
		{
			sortOrder: 10,
			title: "Introduction",
			url: "/reference/introduction",
		},
		{
			sortOrder: 20,
			title: "Authentication",
			url: "/reference/authentication",
		},
		{
			sortOrder: 30,
			title: "Sending Requests",
			url: "/reference/requests",
		},
		{
			sortOrder: 40,
			title: "Interpreting Responses",
			url: "/reference/responses",
		},
		{
			sortOrder: 50,
			type: "header",
			title: "API Reference",
		},
		{
			sortOrder: 60,
			title: "Routes",
			subtitle: "/routes",
			url: "/reference/routes",
			items: [
				{
					sortOrder: 10,
					title: "Get a route",
					url: "/reference/routes#get-route",
				},
				{
					sortOrder: 20,
					title: "Get a route group",
					url: "/reference/routes#get-route-group",
				},
				{
					sortOrder: 30,
					title: "Get all route groups",
					url: "/reference/routes#get-route-groups",
				},
			],
		},
		{
			sortOrder: 100,
			title: "Shapes",
			subtitle: "/shapes",
			url: "/reference/shapes",
			items: [
				{
					sortOrder: 10,
					title: "Get a shape",
					url: "/reference/shapes#get-shape",
				},
			],
		},
		{
			sortOrder: 90,
			title: "Trips",
			subtitle: "/trips",
			url: "/reference/trips",
			items: [
				{
					sortOrder: 10,
					title: "Get a trip",
					url: "/reference/trips#get-trip",
				},
				{
					sortOrder: 20,
					title: "Get all trips",
					url: "/reference/trips#get-trips",
				},
			],
		},
		{
			sortOrder: 70,
			title: "Stops",
			subtitle: "/stops",
			url: "/reference/stops",
			items: [
				{
					sortOrder: 10,
					title: "Get a stop",
					url: "/reference/stops#get-stop",
				},
				{
					sortOrder: 60,
					title: "Get all stops",
					url: "/reference/stops#get-stops",
				},
				{
					sortOrder: 40,
					title: "Get stop's schedule",
					url: "/reference/stops#get-stop-schedule",
				},
				{
					sortOrder: 50,
					title: "Get stop's trips",
					url: "/reference/stops#get-stop-trips",
				},
				{
					sortOrder: 30,
					title: "Get stop's routes",
					url: "/reference/stops#get-stop-routes",
				},
				{
					sortOrder: 20,
					title: "Get stop's departures",
					url: "/reference/stops#get-stop-departures",
				},
				{
					sortOrder: 70,
					title: "Search for a stop",
					url: "/reference/stops#search-stop",
				},
			],
		},
		{
			sortOrder: 80,
			title: "Vehicles",
			subtitle: "/vehicles",

			url: "/reference/vehicles",
			items: [
				{
					sortOrder: 10,
					title: "Get a vehicle",
					url: "/reference/vehicles#get-vehicle",
				},
				{
					sortOrder: 50,
					title: "Get all vehicles",
					url: "/reference/vehicles#get-vehicles",
				},
				{
					sortOrder: 40,
					title: "Get a vehicle's current location",
					url: "/reference/vehicles#get-vehicle-location",
				},
				{
					sortOrder: 20,
					title: "Get a vehicle configuration",
					url: "/reference/vehicles#get-vehicle-configuration",
				},
				{
					sortOrder: 30,
					title: "Get all vehicle configurations",
					url: "/reference/vehicles#get-vehicle-configurations",
				},
			],
		},
		{
			sortOrder: 110,
			title: "Service Alerts",
			subtitle: "/service-alerts",

			url: "/reference/service-alerts",
			items: [
				{
					sortOrder: 10,
					title: "Get a service alert",
					url: "/reference/service-alerts#get-service-alert",
				},
				{
					sortOrder: 20,
					title: "Get all service alerts",
					url: "/reference/service-alerts#get-service-alerts",
				},
			],
		},

		// {
		// 	title: "Community",
		// 	url: "/reference/community",
		// 	items: [
		// 		{
		// 			title: "Contribution Guide",
		// 			url: "/reference/community",
		// 		},
		// 	],
		// },
	],
};

type NavSubItem = Readonly<{
	title: string;
	url: string;
	sortOrder?: number;
}>;

type NavItem = Readonly<{
	title: string;
	url?: string;
	subtitle?: string;
	items?: NavSubItem[];
	type?: "header";
	sortOrder?: number;
}>;

type ParsedNavUrl = Readonly<{
	path: string;
	hash: string | null;
}>;

function getApiObjectFromPath(path: string): ApiObject | null {
	const parts = path.split("/").filter(Boolean);
	const object = parts[1] as ApiObject | undefined;
	if (!object) {
		return null;
	}

	return object in API_INDEX ? object : null;
}

function parseNavUrl(url: string): ParsedNavUrl {
	const [path, hash] = url.split("#");
	return {
		path,
		hash: hash ? `#${hash}` : null,
	};
}

export function ReferenceSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	const { isMobile, setOpenMobile } = useSidebar();
	const [activeHash, setActiveHash] = useState<string | null>(null);
	const sortedNavItems = useMemo(() => {
		return [...data.navMain].sort((left, right) => (left.sortOrder ?? 999) - (right.sortOrder ?? 999));
	}, []);
	const handleMobileNavigate = useCallback(() => {
		if (isMobile) {
			setOpenMobile(false);
		}
	}, [isMobile, setOpenMobile]);
	const activeAnchors = useMemo(() => {
		const anchors = new Set<string>();
		for (const item of data.navMain as NavItem[]) {
			if (!item.items?.length || !item.url) {
				continue;
			}

			const { path } = parseNavUrl(item.url);
			if (pathname === path || pathname.startsWith(`${path}/`)) {
				for (const subItem of item.items) {
					const { hash } = parseNavUrl(subItem.url);
					if (hash) {
						anchors.add(hash);
					}
				}
			}
		}

		return Array.from(anchors);
	}, [pathname]);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const updateHash = () => {
			setActiveHash(window.location.hash || null);
		};

		updateHash();
		window.addEventListener("hashchange", updateHash);
		return () => window.removeEventListener("hashchange", updateHash);
	}, []);

	useEffect(() => {
		if (typeof window === "undefined" || activeAnchors.length === 0) {
			return;
		}

		const scrollContainer = document.querySelector("[data-sidebar-scroll-container]");
		const root = scrollContainer instanceof HTMLElement ? scrollContainer : null;
		const anchorElements = activeAnchors
			.map((hash) => document.getElementById(hash.replace("#", "")))
			.filter((element): element is HTMLElement => Boolean(element));

		if (anchorElements.length === 0) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const visibleEntries = entries.filter((entry) => entry.isIntersecting);
				if (visibleEntries.length === 0) {
					return;
				}

				const sortedEntries = [...visibleEntries].sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				const activeEntry = sortedEntries[0];
				const activeId = activeEntry.target.getAttribute("id");
				if (activeId) {
					setActiveHash(`#${activeId}`);
				}
			},
			{
				root,
				rootMargin: "0px 0px -70% 0px",
				threshold: [0, 0.1, 1],
			},
		);

		for (const element of anchorElements) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	}, [activeAnchors]);

	useEffect(() => {
		if (typeof window === "undefined" || !activeHash) {
			return;
		}

		if (window.location.hash === activeHash) {
			return;
		}

		const nextUrl = `${window.location.pathname}${window.location.search}${activeHash}`;
		window.history.replaceState(null, "", nextUrl);
	}, [activeHash]);

	return (
		<Sidebar {...props}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{sortedNavItems.map((item) => {
							if (item.type === "header") {
								return (
									<Fragment key={`header-${item.title}`}>
										<SidebarMenuItem key={`${item.title}-separator`}>
											<Separator className="my-3" />
										</SidebarMenuItem>
										<SidebarMenuItem
											key={item.title}
											className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
										>
											<span>{item.title}</span>
										</SidebarMenuItem>
									</Fragment>
								);
							}

							if (!item.url) {
								return null;
							}

							const isMainActive = pathname === item.url || pathname.startsWith(`${item.url}/`);

							if (item.items?.length) {
								// Collapsible item with sub-items
								const itemUrl = item.url;
								const { path: itemPath } = parseNavUrl(itemUrl);
								const object = getApiObjectFromPath(itemPath);
								const apiMethods = object ? (API_INDEX[object] as readonly string[]) : null;
								const sortedSubItems = [...item.items].sort((left, right) => {
									const leftHash = parseNavUrl(left.url).hash?.replace("#", "") ?? "";
									const rightHash = parseNavUrl(right.url).hash?.replace("#", "") ?? "";
									const leftIndex = apiMethods ? apiMethods.indexOf(leftHash) : -1;
									const rightIndex = apiMethods ? apiMethods.indexOf(rightHash) : -1;

									const leftOrder = left.sortOrder ?? (leftIndex === -1 ? 999 : leftIndex + 1);
									const rightOrder = right.sortOrder ?? (rightIndex === -1 ? 999 : rightIndex + 1);

									return leftOrder - rightOrder;
								});
								const hasActiveChild = sortedSubItems.some((subItem) => {
									const { path: subPath, hash: subHash } = parseNavUrl(subItem.url);
									return (
										Boolean(subHash) &&
										(pathname === subPath || pathname.startsWith(`${subPath}/`)) &&
										activeHash === subHash
									);
								});
								const isMainHighlighted = isMainActive || hasActiveChild;
								return (
									// <Collapsible key={item.title} defaultOpen={isMainActive} className="group/collapsible">
									<SidebarMenuItem key={item.title}>
										{/* <CollapsibleTrigger asChild> */}
										<SidebarMenuButton
											asChild
											isActive={isMainHighlighted}
											className={`rounded-xs border-0 ${isMainHighlighted ? "font-bold! border-l-4 transition-[border-width] duration-150 ease-out border-accent-foreground" : "font-normal!"}`}
										>
											<Link href={item.url} onClick={handleMobileNavigate}>
												{item.title}
												{/* <span className="font-mono text-muted-foreground">{item.subtitle}</span> */}
												{/* <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" /> */}
											</Link>
										</SidebarMenuButton>
										{/* </CollapsibleTrigger> */}
										{/* <CollapsibleContent> */}
										<SidebarMenuSub>
											{sortedSubItems.map((subItem) => {
												const { path: subPath, hash: subHash } = parseNavUrl(subItem.url);
												const isSubActive =
													Boolean(subHash) &&
													(pathname === subPath || pathname.startsWith(`${subPath}/`)) &&
													activeHash === subHash;
												return (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton
															asChild
															isActive={isSubActive}
															className={`rounded-xs ${isSubActive ? "font-bold border-l-2 transition-[border-width] duration-150 ease-out border-accent-foreground" : "font-normal"}`}
														>
															<Link href={subItem.url} onClick={handleMobileNavigate}>
																{subItem.title}
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												);
											})}
										</SidebarMenuSub>
										{/* </CollapsibleContent> */}
									</SidebarMenuItem>
									// </Collapsible>
								);
							}

							// Regular item without sub-items
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={isMainActive}
										className={`rounded-xs border-0 ${isMainActive ? "font-bold! border-l-4 transition-[border-width] duration-150 ease-out border-accent-foreground" : "font-normal!"}`}
									>
										<Link href={item.url} onClick={handleMobileNavigate}>
											{item.title} {item.subtitle}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
