import { H1, H2 } from "@components/heading";
import { getApiKey } from "@shared/actions/api-keys/get-api-key";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/breadcrumbs";
import ApiKeyEditForm from "./components/api-key-edit-form";

type ApiKeyPageProps = Readonly<{
	params: Promise<{
		key: string;
	}>;
}>;

function obfuscateKey(key: string) {
	return `${key.slice(0, 4)}***************************${key.slice(-4)}`;
}

export default async function ApiKeyPage({ params }: ApiKeyPageProps) {
	const { key } = await params;
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
			<H2 wrapProse> {obfuscateKey(key)}</H2>
			<ApiKeyEditForm apiKey={apiKey} />
		</>
	);
}
