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

		const topStack = document.querySelector(".app-top-stack");
		const root = document.documentElement;

		if (!(topStack instanceof HTMLElement)) {
			return () => {
				document.body.classList.remove("has-reference-layout");
				document.documentElement.classList.remove("has-reference-layout");
				root.style.removeProperty("--reference-sticky-top-offset");
			};
		}

		const updateStickyOffset = () => {
			const { height } = topStack.getBoundingClientRect();
			root.style.setProperty("--reference-sticky-top-offset", `${Math.ceil(height)}px`);
		};

		updateStickyOffset();

		const observer = new ResizeObserver(updateStickyOffset);
		observer.observe(topStack);
		window.addEventListener("resize", updateStickyOffset);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", updateStickyOffset);
			document.body.classList.remove("has-reference-layout");
			document.documentElement.classList.remove("has-reference-layout");
			root.style.removeProperty("--reference-sticky-top-offset");
		};
	}, []);

	return (
		<SidebarProvider>
			<ReferenceSidebar
				collapsible={isMobile ? "offcanvas" : "none"}
				className="reference-sidebar lg:px-3 px-1"
				data-reference-sidebar
			/>

			<SidebarInset scrollMode="viewport" className="reference-scroll-container min-h-0">
				<div className="grid grid-cols-1 lg:grid-cols-2 min-h-0 pt-2 p-5 md:p-10 gap-15 max-w-400 mx-auto ">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
