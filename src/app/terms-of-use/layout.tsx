import type { ReactNode } from "react";

type LayoutProps = Readonly<{ children: ReactNode }>;

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="p-5 max-w-7xl w-full mx-auto min-h-[calc(100svh-var(--app-header-h))] flex flex-col gap-5">
			{children}
		</div>
	);
}
