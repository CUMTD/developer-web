import Breadcrumbs from "@common/account/breadcrumbs";
import ObfuscatedKey from "@common/obfuscated-key";
import { H1, H2 } from "@common/typography/heading";
import { getApiKey } from "@server/actions/api-keys/get-api-key";
import { getLicenseStatus } from "@server/actions/license/get-license-status";
import type { Metadata } from "next";
import { notFound, unauthorized } from "next/navigation";
import ApiKeyEditForm from "./_components/api-key-edit-form";

type ApiKeyPageProps = Readonly<{
	params: Promise<{
		key: string;
	}>;
}>;

type MetaParams = Readonly<{ params: Promise<{ key: string }> }>;

export async function generateMetadata({ params }: MetaParams): Promise<Metadata> {
	const { key } = await params;
	return {
		title: "Edit Key",
		description: "Edit an API key.",
		alternates: { canonical: `/account/keys/${key}` },
		robots: { index: false, follow: false },
	};
}

export default async function ApiKeyPage({ params }: ApiKeyPageProps) {
	const { key } = await params;
	const { canAccessApi } = await getLicenseStatus();

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
