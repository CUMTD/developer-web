import { H1 } from "@components/heading";
import { getApiKeys } from "@shared/actions/api-keys/get-api-keys";
import { getTosStatus } from "@shared/actions/terms-of-use/get-tos-status";
import { Button } from "@shared/shadcn/button";
import Link from "next/link";
import Breadcrumbs from "../components/breadcrumbs";
import ApiKey from "./components/api-key";
import CannotAccess from "./components/cannot-access";

export default async function KeysPage() {
	const apiKeys = await getApiKeys();
	const { canAccessApi } = await getTosStatus();

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
