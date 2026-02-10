import { cn } from "@lib/utils";
import { Button, type buttonVariants } from "@ui/button";
import type { VariantProps } from "class-variance-authority";
import Link, { type LinkProps } from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];

type LinkButtonProps = Readonly<
	{
		href: LinkProps["href"];
		variant?: ButtonVariant;
		size?: ButtonSize;
		linkProps?: Omit<LinkProps, "href" | "children" | "className"> & { className?: string };
		children: ReactNode;
	} & Omit<ComponentProps<"button">, "type">
>;

export default function LinkButton({
	href,
	variant = "default",
	size = "default",
	linkProps,
	children,
	...rest
}: LinkButtonProps) {
	return (
		<Button type="button" asChild variant={variant} size={size} {...rest}>
			<Link href={href} className={cn("no-underline hover:no-underline", linkProps?.className)} {...linkProps}>
				{children}
			</Link>
		</Button>
	);
}
