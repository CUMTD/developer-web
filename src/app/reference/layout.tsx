import { ReferenceSidebar } from "@shared/shadcn/app-sidebar";

import { SidebarInset, SidebarProvider } from "@shared/shadcn/sidebar";
import type { ReactNode } from "react";

export default async function ReferenceLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<ReferenceSidebar collapsible="none" />
			<SidebarInset className="">{children}</SidebarInset>
		</SidebarProvider>
	);
}
