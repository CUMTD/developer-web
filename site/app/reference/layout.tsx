import type { ReactNode } from "react";
import { ReferenceLayoutClient } from "./_components/reference-layout-client";
import "./_styles/reference.css";

export default async function ReferenceLayout({ children }: { children: ReactNode }) {
	return <ReferenceLayoutClient>{children}</ReferenceLayoutClient>;
}
