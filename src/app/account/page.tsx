import { Button } from "@shared/shadcn/button";
import { CardContent, CardHeader } from "@shared/shadcn/card";
import { CurrentUserAvatar } from "@shared/shadcn/current-user-avatar";
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia } from "@shared/shadcn/item";
import { Separator } from "@shared/shadcn/separator";
import { createClient } from "lib/supabase/server";
import { BusFrontIcon, KeyIcon } from "lucide-react";

export default async function AccountPage() {
	const supabase = await createClient();

	const { data } = await supabase.auth.getClaims();

	console.log(data);
	return (
		<div className="p-5 max-w-[80em] mx-auto flex flex-col gap-5 ">
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
				<Button variant={"destructive"}>Sign Out</Button>
			</div>
			<div className=" grid grid-cols-4 grid-rows-1  gap-5">
				<div className="col-span-1 flex flex-col gap-1">
					{/* <Button className="justify-start" variant={"ghost"}>
						<CircleUserRound />
						Profile
					</Button> */}

					<Button className="justify-start" variant={"ghost"}>
						<KeyIcon />
						API Key
					</Button>

					<Button className="justify-start" variant={"ghost"}>
						<BusFrontIcon />
						App Garage Submissions
					</Button>
				</div>
				<div className="col-span-3">
					<Separator orientation="vertical" />
					<CardHeader className="flex flex-row items-center"></CardHeader>

					<CardContent></CardContent>
				</div>
			</div>
		</div>
	);
}
