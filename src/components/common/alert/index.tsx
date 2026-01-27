import { cn } from "@lib/utils";
import { Alert } from "@ui/alert";
import type * as React from "react";
import AlertDescription from "./alert-description";
import AlertTitle from "./alert-title";
import { type CustomAlertContainerVariants, customAlertContainerVariants } from "./custom-alert-variants";

export type AlertVariant = "success" | "info" | "warning" | "error" | "neutral";
export type AlertTone = "soft" | "outline" | "solid";
export type AlertColor = "green" | "blue" | "yellow" | "red" | "gray";

const colorByVariant: Record<AlertVariant, AlertColor> = {
	success: "green",
	info: "blue",
	warning: "yellow",
	error: "red",
	neutral: "gray",
};

type AlertProps = Readonly<{
	children: React.ReactNode;

	alertDescriptionProps?: Omit<React.ComponentProps<"div">, "children">;
	alertProps?: Omit<React.ComponentProps<"div">, "children">;
	alertTitleProps?: Omit<React.ComponentProps<"div">, "children">;
	title?: React.ReactNode;
	tone?: AlertTone;
	variant?: AlertVariant;
}>;

export default function CustomAlert({
	children,
	alertDescriptionProps,
	alertProps,
	alertTitleProps,
	title,
	tone = "soft",
	variant = "neutral",
}: AlertProps) {
	const color = colorByVariant[variant];

	const alertClassName = cn(
		customAlertContainerVariants({
			color,
			tone,
		} satisfies CustomAlertContainerVariants),
		alertProps?.className,
	);

	return (
		<Alert {...alertProps} className={alertClassName}>
			{title ? (
				<AlertTitle {...alertTitleProps} color={color} tone={tone}>
					{title}
				</AlertTitle>
			) : null}

			<AlertDescription {...alertDescriptionProps} color={color} tone={tone}>
				{children}
			</AlertDescription>
		</Alert>
	);
}
