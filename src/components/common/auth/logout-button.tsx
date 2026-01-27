import { Button } from "@ui/button";
import type { ComponentProps } from "react";

type LogoutButtonProps = Readonly<
	{
		variant?: ComponentProps<typeof Button>["variant"];
	} & Omit<ComponentProps<"button">, "type">
>;

export function LogoutButton({ variant = "ghost", className = "w-full justify-start", ...rest }: LogoutButtonProps) {
	return (
		<form action="/account/auth/logout" method="POST">
			<Button type="submit" variant={variant} className={className} {...rest}>
				Logout
			</Button>
		</form>
	);
}
