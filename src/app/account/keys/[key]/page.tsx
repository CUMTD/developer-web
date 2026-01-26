import Breadcrumbs from "@common/account/breadcrumbs";
import ObfuscatedKey from "@common/obfuscated-key";
import { H1, H2 } from "@common/typography/heading";
import { getApiKey } from "@server/actions/api-keys/get-api-key";
import { getTosStatus } from "@server/actions/terms-of-use/get-tos-status";
import type { Metadata } from "next";
import { notFound, unauthorized } from "next/navigation";
import ApiKeyEditForm from "./_components/api-key-edit-form";

type ApiKeyPageProps = Readonly<{
	params: Promise<{
		key: string;
	}>;
}>;

export const metadata: Metadata = {
	title: "Edit Key",
	description: "Edit an API key.",
};

export default async function ApiKeyPage({ params }: ApiKeyPageProps) {
	const { key } = await params;
	const { canAccessApi } = await getTosStatus();

	if (!canAccessApi) {
		unauthorized();
	}

	const apiKey = await getApiKey(key);
	if (!apiKey) {
		notFound();
	}

	const { name } = apiKey;

	return (
		<>
			<H1 wrapProse>Edit API Key: {name}</H1>
			<Breadcrumbs
				items={[
					{ href: "/account", label: "Account" },
					{ href: "/account/keys", label: "API Keys" },
					{ href: `/account/keys/${key}`, label: name },
				]}
			/>

			<H2 wrapProse>
				<ObfuscatedKey apiKey={key} />
			</H2>
			<ApiKeyEditForm apiKey={apiKey} />
		</>
	);
}
