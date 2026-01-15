"use client";
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
} from "@shared/shadcn/sidebar";

import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

const data = {
	navMain: [
		{
			title: "Introduction",
			url: "/reference/introduction",
		},
		{
			title: "Getting an API Key",
			url: "/reference/api-key",
		},
		{
			title: "Sending HTTP Requests",
			url: "/reference/requests",
		},
		{
			title: "Interpreting Responses",
			url: "/reference/responses",
		},
		{
			title: "Routes",
			subtitle: "/routes",
			url: "/reference/routes",
			items: [
				{
					title: "Get a route",
					url: "#get-route",
				},
				{
					title: "Get all routes",
					url: "/reference/routes#get-routes",
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
					url: "#get-shape",
				},
			],
		},
		{
			title: "Trips",
			subtitle: "/trips",
			url: "/reference/trips",
			items: [
				{
					title: "Get all trips",
					url: "#get-trips",
				},
				{
					title: "Get a trip",
					url: "#get-trip",
				},
			],
		},
		{
			title: "Stops",
			subtitle: "/stops",
			url: "/reference/stops",
			items: [
				{
					title: "Get all stops",

					url: "#get-stops",
				},
				{
					title: "Get a stop",
					url: "#get-stop",
				},
				{
					title: "Get stop's schedule",
					url: "#get-stop-schedule",
				},
				{
					title: "Get stop's trips",
					url: "#get-stop-trips",
				},
				{
					title: "Get stop's routes",
					url: "#get-stop-routes",
				},
				{
					title: "Get stop's departures",

					url: "#get-departures",
				},
			],
		},
		{
			title: "Vehicles",
			subtitle: "/vehicles",

			url: "/reference/vehicles",
			items: [
				{
					title: "Get all vehicles",
					url: "#get-vehicles",
				},
				{
					title: "Get a vehicle",
					url: "#get-vehicle",
				},
				{
					title: "Get a vehicle's current location",
					url: "#get-vehicle-location",
				},
			],
		},
		{
			title: "Service Alerts",
			subtitle: "/service-alerts",

			url: "/reference/service-alerts",
			items: [
				{
					title: "Get all service alerts",
					url: "#get-service-alerts",
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
							const isMainActive = pathname === item.url || pathname.startsWith(`${item.url}/`);

							if (item.items?.length) {
								// Collapsible item with sub-items
								return (
									<Collapsible key={item.title} defaultOpen={isMainActive} className="group/collapsible">
										<SidebarMenuItem>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton isActive={isMainActive} className="font-bold">
													{item.title} <span className="font-mono text-muted-foreground">{item.subtitle}</span>
													<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
												</SidebarMenuButton>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													{item.items.map((subItem) => {
														const isSubActive =
															pathname === subItem.url ||
															(subItem.url !== "#" && pathname.startsWith(`${subItem.url}/`));
														return (
															<SidebarMenuSubItem key={subItem.title}>
																<SidebarMenuSubButton asChild isActive={isSubActive}>
																	<a href={subItem.url}>{subItem.title}</a>
																</SidebarMenuSubButton>
															</SidebarMenuSubItem>
														);
													})}
												</SidebarMenuSub>
											</CollapsibleContent>
										</SidebarMenuItem>
									</Collapsible>
								);
							} else {
								// Regular item without sub-items
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild isActive={isMainActive}>
											<a href={item.url} className="font-bold">
												{item.title} {item.subtitle}
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							}
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
