import { H1, H2 } from "@components/heading";
import { getDeveloperDetails } from "@shared/actions/account/getDeveloperDetails";
import { createClient } from "@shared/lib/supabase/server";
import type { Metadata } from "next";
import { unauthorized } from "next/navigation";
import DeveloperInfo from "./components/developer-info";
import TermsOfUse from "./components/terms-of-use";
import UserInfo from "./components/user-info";

export const metadata: Metadata = {
	title: "Account",
	description: "Manage your account details and API keys.",
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
			<div className="space-y-4">
				<H1 wrapProse>Developer Info</H1>
				<UserInfo name={name} email={email} avatarUrl={avatarUrl} />
			</div>
			<DeveloperInfo developer={developerDetails} />

			<div className="space-y-4">
				<H2 wrapProse>Terms of Use</H2>
				<TermsOfUse />
			</div>
		</div>
	);
}
