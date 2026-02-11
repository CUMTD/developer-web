"use client";

import { ReferenceSidebar } from "@common/layout/app-sidebar";
import { useViewport } from "@contexts/viewport-context";
import { SidebarInset, SidebarProvider } from "@ui/sidebar";
import type { ReactNode } from "react";
import { useEffect } from "react";

export function ReferenceLayoutClient({ children }: Readonly<{ children: ReactNode }>) {
	const { isMobile } = useViewport();
	useEffect(() => {
		document.body.classList.add("has-reference-layout");
		document.documentElement.classList.add("has-reference-layout");

		return () => {
			document.body.classList.remove("has-reference-layout");
			document.documentElement.classList.remove("has-reference-layout");
		};
	}, []);

	return (
		<SidebarProvider>
			<ReferenceSidebar collapsible={isMobile ? "offcanvas" : "none"} className="lg:px-3 px-1" />

			<SidebarInset className="reference-scroll-container min-h-0 h-full" data-sidebar-scroll-container>
				<div className="grid grid-cols-1 lg:grid-cols-2 min-h-0 pt-2 p-5 md:p-10 gap-15 max-w-400 mx-auto ">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
