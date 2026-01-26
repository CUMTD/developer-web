import Breadcrumbs from "@common/account/breadcrumbs";
import { H1 } from "@common/typography/heading";
import { getApiKeys } from "@server/actions/api-keys/get-api-keys";
import { getTosStatus } from "@server/actions/terms-of-use/get-tos-status";
import { Button } from "@ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import ApiKey from "./_components/api-key";
import CannotAccess from "./_components/cannot-access";

export const metadata: Metadata = {
	title: "Keys",
	description: "Manage your API keys.",
};

export default async function KeysPage() {
	const { canAccessApi } = await getTosStatus();
	const apiKeys = canAccessApi ? await getApiKeys() : [];

	return (
		<>
			<div className="w-full flex items-center">
				<H1 containerClassName="flex-1" wrapProse>
					API Keys
				</H1>
				{canAccessApi && (
					<div className="flex flex-1 justify-end">
						<Button asChild variant="default">
							<Link href="/account/keys/add">Add Key</Link>
						</Button>
					</div>
				)}
			</div>
			<Breadcrumbs
				items={[
					{ href: "/account", label: "Account" },
					{ href: "/account/keys", label: "API Keys" },
				]}
			/>
			{canAccessApi ? (
				<>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
						{apiKeys.map((apiKey) => (
							<ApiKey key={apiKey.key} apiKey={apiKey} />
						))}
					</div>
					{apiKeys.length === 0 && <p className="text-muted-foreground w-full text-center">No API Keys.</p>}
				</>
			) : (
				<CannotAccess />
			)}
		</>
	);
}
