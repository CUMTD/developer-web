import type { ReactNode } from "react";
import { ReferenceLayoutClient } from "./_components/reference-layout-client";

export default async function ReferenceLayout({ children }: { children: ReactNode }) {
	return <ReferenceLayoutClient>{children}</ReferenceLayoutClient>;
}
