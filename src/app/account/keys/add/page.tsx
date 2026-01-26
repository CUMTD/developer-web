import Breadcrumbs from "@common/account/breadcrumbs";
import { H1 } from "@common/typography/heading";
import { getTosStatus } from "@server/actions/terms-of-use/get-tos-status";
import { createClient } from "@server/supabase/server";
import type { Metadata } from "next";
import { unauthorized } from "next/navigation";
import ApiKeyAddForm from "./_components/api-key-add-form";

export const metadata: Metadata = {
	title: "Add Key",
	description: "Add an API key.",
	alternates: { canonical: "/account/keys/add" },
};

export default async function AddApiKeyPage() {
	const supabase = await createClient();
	const { data: authData } = await supabase.auth.getClaims();

	if (authData === null) {
		unauthorized();
	}

	const { canAccessApi } = await getTosStatus();

	if (!canAccessApi) {
		unauthorized();
	}

	return (
		<>
			<H1 wrapProse>Add API Key</H1>
			<Breadcrumbs
				items={[
					{ href: "/account", label: "Account" },
					{ href: "/account/keys", label: "API Keys" },
					{ href: "/account/keys/add", label: "Add API Key" },
				]}
			/>
			<ApiKeyAddForm />
		</>
	);
}
