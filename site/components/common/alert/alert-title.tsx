import { cn } from "@lib/utils";
import { AlertTitle as ShadcnAlertTitle } from "@ui/alert";
import type * as React from "react";
import { forwardRef } from "react";
import { customAlertTitleVariants, type TitleVariants } from "./custom-alert-variants";
import type { AlertColor, AlertTone } from "./index";

export type AlertTitleProps = Readonly<
	{
		children?: React.ReactNode;
		color: AlertColor;
		tone: AlertTone;
	} & Omit<React.ComponentProps<"div">, "children">
>;

const CustomAlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(function CustomAlertTitle(
	{ children, className, color, tone, ...rest },
	ref,
) {
	if (!children) {
		return null;
	}

	const variantClassName = customAlertTitleVariants({
		color,
		tone,
	} satisfies TitleVariants);

	return (
		<ShadcnAlertTitle ref={ref} {...rest} className={cn(variantClassName, className)}>
			{children}
		</ShadcnAlertTitle>
	);
});

export default CustomAlertTitle;
