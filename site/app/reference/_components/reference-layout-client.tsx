"use client";

import { ReferenceSidebar } from "@common/layout/app-sidebar";
import { useViewport } from "@contexts/viewport-context";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@ui/sidebar";
import type { ReactNode } from "react";

export function ReferenceLayoutClient({ children }: Readonly<{ children: ReactNode }>) {
	const { isMobile } = useViewport();
	return (
		<SidebarProvider>
			<ReferenceSidebar collapsible={isMobile ? "offcanvas" : "none"} className="lg:px-3 px-1" />

			<SidebarInset className="">
				{isMobile && (
					<SidebarTrigger className="top-0 left-0 sticky p-5 bg-sidebar z-50 shadow-md rounded-l-none rounded-tr-none! " />
				)}

				<div className="grid grid-cols-1 lg:grid-cols-2 h-full pt-2 p-5 md:p-10 gap-15 max-w-400 mx-auto">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
