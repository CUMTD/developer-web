import { getApiKeys } from "@shared/actions/api-keys/get-api-keys";
import { getTosStatus } from "@shared/actions/terms-of-use/get-tos-status";
import { Button } from "@shared/shadcn/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader } from "@shared/shadcn/item";
import { KeyRound } from "lucide-react";
import Link from "next/link";

export default async function Keys() {
	const { canAccessApi } = await getTosStatus();
	const keys = canAccessApi ? await getApiKeys() : [];

	return (
		<Item variant="muted">
			<ItemContent>
				<ItemHeader>Key Count</ItemHeader>
				<ItemDescription>{canAccessApi ? keys.length.toLocaleString() : "*"}</ItemDescription>
			</ItemContent>
			{canAccessApi && (
				<ItemActions>
					<Button variant="ghost" asChild>
						<Link href="/account/keys" className="flex items-center gap-2">
							<KeyRound className="h-4 w-4" />
							Manage
						</Link>
					</Button>
				</ItemActions>
			)}
		</Item>
	);
}
