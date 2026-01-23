import { H1, H2 } from "@components/heading";
import ObfuscatedKey from "@components/obfuscated-key";
import { getApiKey } from "@shared/actions/api-keys/get-api-key";
import { getTosStatus } from "@shared/actions/terms-of-use/get-tos-status";
import { notFound, unauthorized } from "next/navigation";
import Breadcrumbs from "../../components/breadcrumbs";
import ApiKeyEditForm from "./components/api-key-edit-form";

type ApiKeyPageProps = Readonly<{
	params: Promise<{
		key: string;
	}>;
}>;

export default async function ApiKeyPage({ params }: ApiKeyPageProps) {
	const { key } = await params;
	const apiKey = await getApiKey(key);
	const { canAccessApi } = await getTosStatus();

	if (!canAccessApi) {
		unauthorized();
	}

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
