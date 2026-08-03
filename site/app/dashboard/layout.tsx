import { isAdmin } from "@server/actions/account/is-admin";
import { createClient } from "@server/supabase/server";
import { unauthorized } from "next/navigation";
import type { ReactNode } from "react";

type LayoutProps = Readonly<{ children: ReactNode }>;

export default async function DashboardLayout({ children }: LayoutProps) {
	const supabase = await createClient();
	const { data: authData } = await supabase.auth.getClaims();

	if (authData === null) {
		unauthorized();
	}

	const admin = await isAdmin();

	if (!admin) {
		unauthorized();
	}

	return <div className="md:p-10 p-5 max-w-7xl w-full mx-auto flex flex-col gap-5">{children}</div>;
}
