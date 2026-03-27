"use client";

import { AuthProvider } from "@contexts/auth-context";
import { CursorProvider } from "@contexts/cursor-context";
import { ViewportProvider } from "@contexts/viewport-context";
import type { ReactNode } from "react";

export function ClientProviders({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<AuthProvider>
			<CursorProvider>
				<ViewportProvider>{children}</ViewportProvider>
			</CursorProvider>
		</AuthProvider>
	);
}
