"use client";
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
} from "@ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { Fragment } from "react";

const data = {
	navMain: [
		{
			title: "Introduction",
			url: "/reference/introduction",
		},
		{
			title: "Authentication",
			url: "/reference/authentication",
		},
		{
			title: "Sending Requests",
			url: "/reference/requests",
		},
		{
			title: "Interpreting Responses",
			url: "/reference/responses",
		},
		{
			type: "header",
			title: "API Reference",
		},
		{
			title: "Routes",
			subtitle: "/routes",
			url: "/reference/routes",
			items: [
				{
					title: "Get a route",
					url: "/reference/routes#get-route",
				},
				{
					title: "Get a route group",
					url: "/reference/routes#get-route-group",
				},
				{
					title: "Get all route groups",
					url: "/reference/routes#get-route-groups",
				},
			],
		},
		{
			title: "Shapes",
			subtitle: "/shapes",
			url: "/reference/shapes",
			items: [
				{
					title: "Get a shape",
					url: "/reference/shapes#get-shape",
				},
			],
		},
		{
			title: "Trips",
			subtitle: "/trips",
			url: "/reference/trips",
			items: [
				{
					title: "Get a trip",
					url: "/reference/trips#get-trip",
				},
				{
					title: "Get all trips",
					url: "/reference/trips#get-trips",
				},
			],
		},
		{
			title: "Stops",
			subtitle: "/stops",
			url: "/reference/stops",
			items: [
				{
					title: "Get a stop",
					url: "/reference/stops#get-stop",
				},
				{
					title: "Get all stops",

					url: "/reference/stops#get-stops",
				},
				{
					title: "Get stop's schedule",
					url: "/reference/stops#get-stop-schedule",
				},
				{
					title: "Get stop's trips",
					url: "/reference/stops#get-stop-trips",
				},
				{
					title: "Get stop's routes",
					url: "/reference/stops#get-stop-routes",
				},
				{
					title: "Get stop's departures",
					url: "/reference/stops#get-stop-departures",
				},
				{
					title: "Search for a stop",
					url: "/reference/stops#search-stop",
				},
			],
		},
		{
			title: "Vehicles",
			subtitle: "/vehicles",

			url: "/reference/vehicles",
			items: [
				{
					title: "Get a vehicle",
					url: "/reference/vehicles#get-vehicle",
				},
				{
					title: "Get all vehicles",
					url: "/reference/vehicles#get-vehicles",
				},
				{
					title: "Get a vehicle's current location",
					url: "/reference/vehicles#get-vehicle-location",
				},
				{
					title: "Get a vehicle configuration",
					url: "/reference/vehicles#get-vehicle-configuration",
				},
				{
					title: "Get all vehicle configurations",
					url: "/reference/vehicles#get-vehicle-configurations",
				},
			],
		},
		{
			title: "Service Alerts",
			subtitle: "/service-alerts",

			url: "/reference/service-alerts",
			items: [
				{
					title: "Get a service alert",
					url: "/reference/service-alerts#get-service-alert",
				},
				{
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

export function ReferenceSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();

	return (
		<Sidebar {...props}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{data.navMain.map((item) => {
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
								return (
									// <Collapsible key={item.title} defaultOpen={isMainActive} className="group/collapsible">
									<SidebarMenuItem key={item.title}>
										{/* <CollapsibleTrigger asChild> */}
										<SidebarMenuButton
											asChild
											isActive={isMainActive}
											className={`font-bold rounded-xs border-0 ${isMainActive && "border-l-4 transition-[border-width] duration-150 ease-out border-accent-foreground"}`}
										>
											<Link href={item.url}>
												{item.title}
												{/* <span className="font-mono text-muted-foreground">{item.subtitle}</span> */}
												{/* <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" /> */}
											</Link>
										</SidebarMenuButton>
										{/* </CollapsibleTrigger> */}
										{/* <CollapsibleContent> */}
										<SidebarMenuSub>
											{item.items.map((subItem) => {
												const isSubActive =
													pathname === subItem.url || (subItem.url !== "#" && pathname.startsWith(`${subItem.url}/`));
												return (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton asChild isActive={isSubActive}>
															<Link href={subItem.url}>{subItem.title}</Link>
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
									<SidebarMenuButton asChild isActive={isMainActive}>
										<Link href={item.url} className="font-bold">
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
