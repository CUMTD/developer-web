import { cn } from "@lib/utils";
import { AlertDescription as ShadcnAlertDescription } from "@ui/alert";
import type * as React from "react";
import { forwardRef } from "react";
import { customAlertDescriptionVariants, type DescriptionVariants } from "./custom-alert-variants";
import type { AlertColor, AlertTone } from "./index";

export type AlertDescriptionProps = Readonly<
	{
		children: React.ReactNode;
		color: AlertColor;
		tone: AlertTone;
	} & Omit<React.ComponentProps<"div">, "children">
>;

const CustomAlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(function CustomAlertDescription(
	{ children, className, color, tone, ...rest },
	ref,
) {
	const variantClassName = customAlertDescriptionVariants({
		color,
		tone,
	} satisfies DescriptionVariants);

	return (
		<ShadcnAlertDescription ref={ref} {...rest} className={cn(variantClassName, className)}>
			{children}
		</ShadcnAlertDescription>
	);
});

export default CustomAlertDescription;
