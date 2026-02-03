"use client";

import { AuthProvider } from "@contexts/auth-context";
import { ViewportProvider } from "@contexts/viewport-context";
import type { ReactNode } from "react";

export function ClientProviders({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<AuthProvider>
			<ViewportProvider>{children}</ViewportProvider>
		</AuthProvider>
	);
}
