import { createClient } from "@shared/lib/supabase/server";
import { Button } from "@shared/shadcn/button";
import { CurrentUserAvatar } from "@shared/shadcn/current-user-avatar";
import Link from "next/link";

export default async function UserProfile() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return (
			<Link href="/login">
				<Button>Login</Button>
			</Link>
		);
	}

	return (
		<Link href="/account">
			<CurrentUserAvatar />
		</Link>
	);
}
