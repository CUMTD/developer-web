import { useCurrentUserName } from "@shared/hooks/use-current-user-name";
import { Button } from "@shared/shadcn/button";
import { CurrentUserAvatar } from "@shared/shadcn/current-user-avatar";
import { useRouter } from "next/navigation";

export default function UserProfileDisplay() {
	const username = useCurrentUserName();
	const router = useRouter();

	if (username === "?") {
		return (
			<Button size={"sm"} onClick={() => router.push("/account/auth/login")}>
				Sign In
			</Button>
		);
	}
	return (
		<div className="flex flex-row gap-2">
			<Button
				onClick={() => router.push("/account")}
				className={"bg-green-800 hover:bg-green-900 hover:cursor-pointer text-white"}
				size={"sm"}
			>
				My Account
			</Button>
			<CurrentUserAvatar />
		</div>
	);
}
