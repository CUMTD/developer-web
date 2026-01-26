import { cn } from "@lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const customAlertContainerVariants = cva("", {
	variants: {
		color: {
			green: "",
			blue: "",
			yellow: "",
			red: "",
			gray: "",
		},
		tone: {
			soft: "",
			outline: "",
			solid: "",
		},
	},
	compoundVariants: [
		// SOFT
		{
			color: "green",
			tone: "soft",
			className: cn(
				"border-green-200",
				"bg-green-50",
				"text-green-900",
				"dark:border-green-900",
				"dark:bg-green-950",
				"dark:text-green-50",
			),
		},
		{
			color: "blue",
			tone: "soft",
			className: cn(
				"border-blue-200",
				"bg-blue-50",
				"text-blue-900",
				"dark:border-blue-900",
				"dark:bg-blue-950",
				"dark:text-blue-50",
			),
		},
		{
			color: "yellow",
			tone: "soft",
			className: cn(
				"border-yellow-200",
				"bg-yellow-50",
				"text-yellow-900",
				"dark:border-yellow-900",
				"dark:bg-yellow-950",
				"dark:text-yellow-50",
			),
		},
		{
			color: "red",
			tone: "soft",
			className: cn(
				"border-red-200",
				"bg-red-50",
				"text-red-900",
				"dark:border-red-900",
				"dark:bg-red-950",
				"dark:text-red-50",
			),
		},
		{
			color: "gray",
			tone: "soft",
			className: cn(
				"border-gray-200",
				"bg-gray-50",
				"text-gray-900",
				"dark:border-gray-900",
				"dark:bg-gray-950",
				"dark:text-gray-50",
			),
		},

		// OUTLINE
		{
			color: "green",
			tone: "outline",
			className: cn(
				"border-green-300",
				"bg-transparent",
				"text-green-900",
				"dark:border-green-800",
				"dark:text-green-50",
			),
		},
		{
			color: "blue",
			tone: "outline",
			className: cn("border-blue-300", "bg-transparent", "text-blue-900", "dark:border-blue-800", "dark:text-blue-50"),
		},
		{
			color: "yellow",
			tone: "outline",
			className: cn(
				"border-yellow-300",
				"bg-transparent",
				"text-yellow-900",
				"dark:border-yellow-800",
				"dark:text-yellow-50",
			),
		},
		{
			color: "red",
			tone: "outline",
			className: cn("border-red-300", "bg-transparent", "text-red-900", "dark:border-red-800", "dark:text-red-50"),
		},
		{
			color: "gray",
			tone: "outline",
			className: cn("border-gray-300", "bg-transparent", "text-gray-900", "dark:border-gray-800", "dark:text-gray-50"),
		},

		// SOLID
		{
			color: "green",
			tone: "solid",
			className: cn(
				"border-green-800",
				"bg-green-800",
				"text-white",
				"dark:border-green-900",
				"dark:bg-green-900",
				"dark:text-white",
			),
		},
		{
			color: "blue",
			tone: "solid",
			className: cn(
				"border-blue-700",
				"bg-blue-700",
				"text-white",
				"dark:border-blue-800",
				"dark:bg-blue-800",
				"dark:text-white",
			),
		},
		{
			color: "yellow",
			tone: "solid",
			className: cn(
				"border-yellow-600",
				"bg-yellow-600",
				"text-black",
				"dark:border-yellow-600",
				"dark:bg-yellow-600",
				"dark:text-black",
			),
		},
		{
			color: "red",
			tone: "solid",
			className: cn(
				"border-red-700",
				"bg-red-700",
				"text-white",
				"dark:border-red-600",
				"dark:bg-red-600",
				"dark:text-white",
			),
		},
		{
			color: "gray",
			tone: "solid",
			className: cn(
				"border-gray-700",
				"bg-gray-700",
				"text-white",
				"dark:border-gray-600",
				"dark:bg-gray-600",
				"dark:text-white",
			),
		},
	],
	defaultVariants: {
		tone: "soft",
		color: "gray",
	},
});

const customAlertTitleVariants = cva("text-lg", {
	variants: {
		color: {
			green: "",
			blue: "",
			yellow: "",
			red: "",
			gray: "",
		},
		tone: {
			soft: "",
			outline: "",
			solid: "",
		},
	},
	compoundVariants: [
		// soft/outline: text color matches theme
		{ color: "green", tone: "soft", className: cn("text-green-900", "dark:text-green-50") },
		{ color: "blue", tone: "soft", className: cn("text-blue-900", "dark:text-blue-50") },
		{ color: "yellow", tone: "soft", className: cn("text-yellow-900", "dark:text-yellow-50") },
		{ color: "red", tone: "soft", className: cn("text-red-900", "dark:text-red-50") },
		{ color: "gray", tone: "soft", className: cn("text-gray-900", "dark:text-gray-50") },

		{ color: "green", tone: "outline", className: cn("text-green-900", "dark:text-green-50") },
		{ color: "blue", tone: "outline", className: cn("text-blue-900", "dark:text-blue-50") },
		{ color: "yellow", tone: "outline", className: cn("text-yellow-900", "dark:text-yellow-50") },
		{ color: "red", tone: "outline", className: cn("text-red-900", "dark:text-red-50") },
		{ color: "gray", tone: "outline", className: cn("text-gray-900", "dark:text-gray-50") },

		// solid: container uses solid backgrounds; keep title readable
		{ color: "green", tone: "solid", className: "text-white" },
		{ color: "blue", tone: "solid", className: "text-white" },
		{ color: "yellow", tone: "solid", className: "text-black" },
		{ color: "red", tone: "solid", className: "text-white" },
		{ color: "gray", tone: "solid", className: "text-white" },
	],
	defaultVariants: {
		color: "gray",
		tone: "soft",
	},
});

const customAlertDescriptionVariants = cva("flex flex-col gap-3 font-medium", {
	variants: {
		color: {
			green: "",
			blue: "",
			yellow: "",
			red: "",
			gray: "",
		},
		tone: {
			soft: "",
			outline: "",
			solid: "",
		},
	},
	compoundVariants: [
		// soft/outline
		{ color: "green", tone: "soft", className: cn("text-green-900", "dark:text-green-50") },
		{ color: "blue", tone: "soft", className: cn("text-blue-900", "dark:text-blue-50") },
		{ color: "yellow", tone: "soft", className: cn("text-yellow-900", "dark:text-yellow-50") },
		{ color: "red", tone: "soft", className: cn("text-red-900", "dark:text-red-50") },
		{ color: "gray", tone: "soft", className: cn("text-gray-900", "dark:text-gray-50") },

		{ color: "green", tone: "outline", className: cn("text-green-900", "dark:text-green-50") },
		{ color: "blue", tone: "outline", className: cn("text-blue-900", "dark:text-blue-50") },
		{ color: "yellow", tone: "outline", className: cn("text-yellow-900", "dark:text-yellow-50") },
		{ color: "red", tone: "outline", className: cn("text-red-900", "dark:text-red-50") },
		{ color: "gray", tone: "outline", className: cn("text-gray-900", "dark:text-gray-50") },

		// solid
		{ color: "green", tone: "solid", className: "text-white" },
		{ color: "blue", tone: "solid", className: "text-white" },
		{ color: "yellow", tone: "solid", className: "text-black" },
		{ color: "red", tone: "solid", className: "text-white" },
		{ color: "gray", tone: "solid", className: "text-white" },
	],
	defaultVariants: {
		color: "gray",
		tone: "soft",
	},
});

type CustomAlertContainerVariants = VariantProps<typeof customAlertContainerVariants>;
type TitleVariants = VariantProps<typeof customAlertTitleVariants>;
type DescriptionVariants = VariantProps<typeof customAlertDescriptionVariants>;

export {
	customAlertContainerVariants,
	customAlertDescriptionVariants,
	customAlertTitleVariants,
	type CustomAlertContainerVariants,
	type DescriptionVariants,
	type TitleVariants,
};
