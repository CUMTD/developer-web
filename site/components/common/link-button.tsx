import { globalEnv } from "@env/global";
import { cn } from "@lib/utils";
import { Button, type buttonVariants } from "@ui/button";
import type { VariantProps } from "class-variance-authority";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ComponentProps, ReactNode } from "react";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];

type LinkButtonProps = Readonly<
	{
		href: LinkProps["href"];
		variant?: ButtonVariant;
		size?: ButtonSize;
		children: ReactNode;

		newWindow?: boolean;

		linkProps?: {
			className?: string;
			rel?: string;
			title?: string;
			id?: string;
			"aria-label"?: string;
			"aria-describedby"?: string;
		};
	} & Omit<ComponentProps<"button">, "type">
>;

function mergeRel(existingRel: string | undefined, requiredTokens: string[]): string {
	const tokens = new Set(
		(existingRel ?? "")
			.split(/\s+/)
			.map((t) => t.trim())
			.filter(Boolean),
	);

	for (const token of requiredTokens) {
		tokens.add(token);
	}

	return Array.from(tokens).join(" ");
}

function isLocalLink(href: string): boolean {
	const baseUrl = globalEnv.NEXT_PUBLIC_BASE_URL;
	return href.startsWith("/") || (baseUrl ? href.startsWith(baseUrl) : false);
}

export default function LinkButton({
	href,
	variant = "default",
	size = "default",
	newWindow = false,
	linkProps,
	children,
	...rest
}: LinkButtonProps) {
	const hrefString = href.toString();
	const isLocal = isLocalLink(hrefString);

	const className = cn("no-underline hover:no-underline", linkProps?.className);

	if (isLocal) {
		return (
			<Button type="button" asChild variant={variant} size={size} {...rest}>
				<Link href={href} className={className}>
					{children}
				</Link>
			</Button>
		);
	}

	const target = newWindow ? "_blank" : undefined;
	// always ensure noopener and noreferrer when opening in new window
	const rel = newWindow ? mergeRel(linkProps?.rel, ["noopener", "noreferrer"]) : linkProps?.rel;

	// Allow only anchor-safe props to avoid accidentally spreading Link-only props onto <a>.
	const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
		className,
		rel,
		target,
		title: linkProps?.title,
		id: linkProps?.id,
		"aria-label": linkProps?.["aria-label"],
		"aria-describedby": linkProps?.["aria-describedby"],
	};

	return (
		<Button type="button" asChild variant={variant} size={size} {...rest}>
			<a href={href.toString()} {...anchorProps}>
				{children}
			</a>
		</Button>
	);
}
