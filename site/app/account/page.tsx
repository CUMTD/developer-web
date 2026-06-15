import ThemeSwitcher from "@common/account/theme-switcher";
import { LogoutButton } from "@common/auth/logout-button";
import LinkButton from "@common/link-button";
import { H2 } from "@common/typography/heading";
import getUserDisplayName from "@helpers/get-user-display-name";
import { getDeveloperDetails } from "@server/actions/account/get-developer-details";
import { getRequestsToday } from "@server/actions/account/get-requests-today";
import { isAdmin } from "@server/actions/account/is-admin";
import { createClient } from "@server/supabase/server";
import { LayoutDashboard } from "lucide-react";
import type { Metadata } from "next";
import { unauthorized } from "next/navigation";
import DeveloperInfo from "./_components/developer-info";
import License from "./_components/license";
import UserInfo from "./_components/user-info";

export const metadata: Metadata = {
	title: "Account",
	description: "Manage your account details and API keys.",
	alternates: { canonical: "/account" },
	robots: { index: false, follow: false },
};

export default async function AccountPage() {
	const supabase = await createClient();
	const { data: authData } = await supabase.auth.getClaims();

	if (authData === null) {
		unauthorized();
	}

	const [developerDetails, requestsToday, adminUser] = await Promise.all([
		getDeveloperDetails(),
		getRequestsToday(),
		isAdmin(),
	]);

	const {
		claims: { user_metadata },
	} = authData;

	const metadataEmail = typeof user_metadata?.email === "string" ? user_metadata.email : null;
	const claimsEmail = typeof authData.claims.email === "string" ? authData.claims.email : null;
	const email = metadataEmail ?? claimsEmail;
	const name = getUserDisplayName(user_metadata?.full_name, email);
	const avatarUrl = user_metadata?.avatar_url ?? null;

	return (
		<div className="space-y-12">
			<div className="space-y-4 flex flex-row justify-between items-center w-full">
				<UserInfo name={name} email={email} avatarUrl={avatarUrl} />
				<div className="flex flex-row gap-2">
					{adminUser && (
						<LinkButton href="/dashboard" variant="outline" className="m-0">
							<LayoutDashboard className="h-4 w-4" aria-hidden />
							Admin Dashboard
						</LinkButton>
					)}
					<LogoutButton variant={"destructive"} />
				</div>
			</div>
			<DeveloperInfo developer={developerDetails} requestsToday={requestsToday} />

			<div className="space-y-4">
				<H2 wrapProse>License Agreement and Terms of Use</H2>
				<License />
			</div>

			<div className="space-y-4">
				<H2 wrapProse>Theme</H2>
				<ThemeSwitcher />
			</div>
		</div>
	);
}
