import type { ReactNode } from "react";

type LayoutProps = Readonly<{
	children: ReactNode;
}>;

export default function Layout({ children }: LayoutProps) {
	return <div className="p-5 max-w-7xl w-full mx-auto flex flex-col gap-5 ">{children}</div>;
}
