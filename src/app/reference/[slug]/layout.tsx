import type { ReactNode } from "react";

export default function EndpointRouteLayout({ children }: { children: ReactNode }) {
	return <div className="grid grid-cols-3 h-full gap-10 max-w-440 mx-auto p-10">{children}</div>;
}
