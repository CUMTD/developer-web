import ThemeSwitcher from "@common/account/theme-switcher";
import { LogoutButton } from "@common/auth/logout-button";
import { H2 } from "@common/typography/heading";
import { getDeveloperDetails } from "@server/actions/account/get-developer-details";
import { createClient } from "@server/supabase/server";
import type { Metadata } from "next";
import { unauthorized } from "next/navigation";
import DeveloperInfo from "./_components/developer-info";
import TermsOfUse from "./_components/terms-of-use";
import UserInfo from "./_components/user-info";

export const metadata: Metadata = {
	title: "Account",
	description: "Manage your account details and API keys.",
	alternates: { canonical: "/account" },
};

export default async function AccountPage() {
	const supabase = await createClient();
	const { data: authData } = await supabase.auth.getClaims();

	if (authData === null) {
		unauthorized();
	}

	const developerDetails = await getDeveloperDetails();

	const {
		claims: { user_metadata },
	} = authData;

	const name = user_metadata?.full_name ?? "Unknown User";
	const email = user_metadata?.email ?? null;
	const avatarUrl = user_metadata?.avatar_url ?? null;

	return (
		<div className="space-y-12">
			<div className="space-y-4 flex flex-row justify-between items-center">
				<UserInfo name={name} email={email} avatarUrl={avatarUrl} />
				<LogoutButton variant={"destructive"} />
			</div>
			<DeveloperInfo developer={developerDetails} />

			<div className="space-y-4">
				<H2 wrapProse>Terms of Use</H2>
				<TermsOfUse />
			</div>

			<div className="space-y-4">
				<H2 wrapProse>Theme</H2>
				<ThemeSwitcher />
			</div>
		</div>
	);
}
