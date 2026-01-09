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
import { usePathname } from "next/navigation";
import type * as React from "react";

const data = {
	navMain: [
		{
			title: "Getting Started",
			url: "/reference",
			items: [
				{
					title: "Introduction",
					url: "#",
				},
				{
					title: "Getting an API Key",
					url: "#",
				},
				{
					title: "Sending HTTP Requests",
					url: "#",
				},
				{
					title: "Interpreting Responses",
					url: "#",
				},
			],
		},
		{
			title: "Objects",
			url: "/reference/objects",
			items: [
				{
					title: "Route",
					url: "#",
				},
				{
					title: "Stop",
					url: "#",
				},
				{
					title: "Trip",
					url: "#",
				},
				{
					title: "Vehicle",
					url: "#",
				},
				{
					title: "Service Alert",
					url: "#",
				},
			],
		},
		{
			title: "API Endpoints",
			url: "/reference/endpoints",
			monospacedSub: true,
			items: [
				{
					title: "/routes",
					url: "#",
				},
				{
					title: "/search",
					url: "#",
				},
				{
					title: "/service-alerts",
					url: "#",
				},
				{
					title: "/shapes",
					url: "#",
				},
				{
					title: "/stops",
					url: "#",
				},
				{
					title: "/trips",
					url: "#",
				},
				{
					title: "/vehicles",
					url: "#",
				},
			],
		},

		{
			title: "Community",
			url: "/reference/community",
			items: [
				{
					title: "Contribution Guide",
					url: "#",
				},
			],
		},
	],
};

export function ReferenceSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();

	return (
		<Sidebar {...props}>
			{/* <SidebarHeader>
				<h1>MTD API v3.0.0</h1>
			</SidebarHeader> */}
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{data.navMain.map((item) => {
							const isMainActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild isActive={isMainActive}>
										<a href={item.url} className="font-bold">
											{item.title}
										</a>
									</SidebarMenuButton>
									{item.items?.length ? (
										<SidebarMenuSub className={`${item.monospacedSub ? "font-mono" : ""} `}>
											{item.items.map((subItem) => {
												const isSubActive =
													pathname === subItem.url || (subItem.url !== "#" && pathname.startsWith(`${subItem.url}/`));
												return (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton asChild isActive={isSubActive}>
															<a href={subItem.url}>{subItem.title}</a>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												);
											})}
										</SidebarMenuSub>
									) : null}
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
