import { ReferenceSidebar } from "@shared/shadcn/app-sidebar";

import { SidebarInset, SidebarProvider } from "@shared/shadcn/sidebar";
import type { ReactNode } from "react";

export default async function ReferenceLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<ReferenceSidebar collapsible="none" className="lg:px-3 px-1" />
			<SidebarInset className="p-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-15 max-w-400 mx-auto  ">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
