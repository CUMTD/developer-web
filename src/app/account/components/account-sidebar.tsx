import { Card } from "@shared/shadcn/card";
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@shared/shadcn/sidebar";

export default function AccountSidebar() {
	return (
		<Card className="h-fit">
			<SidebarHeader>{/* user block / title */}</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<p>Bar</p>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<p>Foo</p>
			</SidebarFooter>
		</Card>
	);
}
