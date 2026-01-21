import ApiKeyManager from "@components/ApiKeyManager";
import { getApiKeys } from "@shared/actions/api-keys/get-api-keys";
import { createClient } from "@shared/lib/supabase/server";
import { Button } from "@shared/shadcn/button";
import { CurrentUserAvatar } from "@shared/shadcn/current-user-avatar";
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia } from "@shared/shadcn/item";
import { redirect } from "next/navigation";

export default async function AccountPage() {
	const supabase = await createClient();
	const { data } = await supabase.auth.getClaims();
	const apiKeys = await getApiKeys();

	async function handleSignOut() {
		"use server";
		const supabase = await createClient();
		await supabase.auth.signOut();
		return redirect("/");
	}

	return (
		<div className="p-5 max-w-7xl w-full mx-auto flex flex-col gap-5 ">
			<div className="flex flex-row justify-between items-center">
				<Item className="text-4xl">
					<ItemMedia variant={"image"}>
						<CurrentUserAvatar />
					</ItemMedia>
					<ItemContent>
						<ItemHeader className="font-bold">{data?.claims.user_metadata?.full_name}</ItemHeader>
						<ItemDescription>{data?.claims.email}</ItemDescription>
					</ItemContent>
				</Item>
				<form action={handleSignOut}>
					<Button variant={"destructive"}>Sign Out</Button>
				</form>
			</div>
			<ApiKeyManager apiKeys={apiKeys} />
		</div>
	);
}
