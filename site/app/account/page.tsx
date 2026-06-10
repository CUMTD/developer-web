import ThemeSwitcher from "@common/account/theme-switcher";
import { LogoutButton } from "@common/auth/logout-button";
import { H2 } from "@common/typography/heading";
import getUserDisplayName from "@helpers/get-user-display-name";
import { getDeveloperDetails } from "@server/actions/account/get-developer-details";
import { getRequestsToday } from "@server/actions/account/get-requests-today";
import { createClient } from "@server/supabase/server";
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

	const developerDetails = await getDeveloperDetails();
	const requestsToday = await getRequestsToday();

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
			<div className="space-y-4 flex flex-row justify-between items-center">
				<UserInfo name={name} email={email} avatarUrl={avatarUrl} />
				<LogoutButton variant={"destructive"} />
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
