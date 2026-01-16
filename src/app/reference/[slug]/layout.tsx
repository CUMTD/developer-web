import type { ReactNode } from "react";

export default function EndpointRouteLayout({ children }: { children: ReactNode }) {
	return <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-10 max-w-440 mx-auto  ">{children}</div>;
}
