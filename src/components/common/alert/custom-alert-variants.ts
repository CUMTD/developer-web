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
				"border-green-300/40",
				"bg-green-50/80",
				"text-green-900",
				"dark:border-green-500/30",
				"dark:bg-green-500/10",
				"dark:text-green-100",
			),
		},
		{
			color: "blue",
			tone: "soft",
			className: cn(
				"border-blue-300/40",
				"bg-blue-50/80",
				"text-blue-900",
				"dark:border-blue-500/30",
				"dark:bg-blue-500/10",
				"dark:text-blue-100",
			),
		},
		{
			color: "yellow",
			tone: "soft",
			className: cn(
				"border-amber-300/40",
				"bg-amber-50/80",
				"text-amber-900",
				"dark:border-amber-400/30",
				"dark:bg-amber-400/10",
				"dark:text-amber-100",
			),
		},
		{
			color: "red",
			tone: "soft",
			className: cn(
				"border-red-300/40",
				"bg-red-50/80",
				"text-red-900",
				"dark:border-red-500/30",
				"dark:bg-red-500/10",
				"dark:text-red-100",
			),
		},
		{
			color: "gray",
			tone: "soft",
			className: cn(
				"border-gray-300/40",
				"bg-gray-50/80",
				"text-gray-900",
				"dark:border-gray-500/30",
				"dark:bg-gray-500/10",
				"dark:text-gray-100",
			),
		},

		// OUTLINE
		{
			color: "green",
			tone: "outline",
			className: cn(
				"border-green-400/60",
				"bg-green-50/20",
				"text-green-900",
				"dark:border-green-500/50",
				"dark:bg-green-500/5",
				"dark:text-green-100",
			),
		},
		{
			color: "blue",
			tone: "outline",
			className: cn(
				"border-blue-400/60",
				"bg-blue-50/20",
				"text-blue-900",
				"dark:border-blue-500/50",
				"dark:bg-blue-500/5",
				"dark:text-blue-100",
			),
		},
		{
			color: "yellow",
			tone: "outline",
			className: cn(
				"border-amber-400/60",
				"bg-amber-50/20",
				"text-amber-900",
				"dark:border-amber-400/50",
				"dark:bg-amber-400/5",
				"dark:text-amber-100",
			),
		},
		{
			color: "red",
			tone: "outline",
			className: cn(
				"border-red-400/60",
				"bg-red-50/20",
				"text-red-900",
				"dark:border-red-500/50",
				"dark:bg-red-500/5",
				"dark:text-red-100",
			),
		},
		{
			color: "gray",
			tone: "outline",
			className: cn(
				"border-gray-400/60",
				"bg-gray-50/20",
				"text-gray-900",
				"dark:border-gray-500/50",
				"dark:bg-gray-500/5",
				"dark:text-gray-100",
			),
		},

		// SOLID
		{
			color: "green",
			tone: "solid",
			className: cn(
				"border-green-700",
				"bg-green-600",
				"text-white",
				"dark:border-green-600",
				"dark:bg-green-700",
				"dark:text-white",
			),
		},
		{
			color: "blue",
			tone: "solid",
			className: cn(
				"border-blue-700",
				"bg-blue-600",
				"text-white",
				"dark:border-blue-600",
				"dark:bg-blue-700",
				"dark:text-white",
			),
		},
		{
			color: "yellow",
			tone: "solid",
			className: cn(
				"border-amber-500",
				"bg-amber-500",
				"text-gray-900",
				"dark:border-amber-600",
				"dark:bg-amber-600",
				"dark:text-gray-900",
			),
		},
		{
			color: "red",
			tone: "solid",
			className: cn(
				"border-red-700",
				"bg-red-600",
				"text-white",
				"dark:border-red-600",
				"dark:bg-red-700",
				"dark:text-white",
			),
		},
		{
			color: "gray",
			tone: "solid",
			className: cn(
				"border-gray-700",
				"bg-gray-600",
				"text-white",
				"dark:border-gray-600",
				"dark:bg-gray-700",
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
		{ color: "green", tone: "soft", className: cn("text-green-900", "dark:text-green-100") },
		{ color: "blue", tone: "soft", className: cn("text-blue-900", "dark:text-blue-100") },
		{ color: "yellow", tone: "soft", className: cn("text-amber-900", "dark:text-amber-100") },
		{ color: "red", tone: "soft", className: cn("text-red-900", "dark:text-red-100") },
		{ color: "gray", tone: "soft", className: cn("text-gray-900", "dark:text-gray-100") },

		{ color: "green", tone: "outline", className: cn("text-green-900", "dark:text-green-100") },
		{ color: "blue", tone: "outline", className: cn("text-blue-900", "dark:text-blue-100") },
		{ color: "yellow", tone: "outline", className: cn("text-amber-900", "dark:text-amber-100") },
		{ color: "red", tone: "outline", className: cn("text-red-900", "dark:text-red-100") },
		{ color: "gray", tone: "outline", className: cn("text-gray-900", "dark:text-gray-100") },

		// solid: container uses solid backgrounds; keep title readable
		{ color: "green", tone: "solid", className: "text-white" },
		{ color: "blue", tone: "solid", className: "text-white" },
		{ color: "yellow", tone: "solid", className: "text-gray-900" },
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
		{ color: "green", tone: "soft", className: cn("text-green-900", "dark:text-green-100") },
		{ color: "blue", tone: "soft", className: cn("text-blue-900", "dark:text-blue-100") },
		{ color: "yellow", tone: "soft", className: cn("text-amber-900", "dark:text-amber-100") },
		{ color: "red", tone: "soft", className: cn("text-red-900", "dark:text-red-100") },
		{ color: "gray", tone: "soft", className: cn("text-gray-900", "dark:text-gray-100") },

		{ color: "green", tone: "outline", className: cn("text-green-900", "dark:text-green-100") },
		{ color: "blue", tone: "outline", className: cn("text-blue-900", "dark:text-blue-100") },
		{ color: "yellow", tone: "outline", className: cn("text-amber-900", "dark:text-amber-100") },
		{ color: "red", tone: "outline", className: cn("text-red-900", "dark:text-red-100") },
		{ color: "gray", tone: "outline", className: cn("text-gray-900", "dark:text-gray-100") },

		// solid
		{ color: "green", tone: "solid", className: "text-white" },
		{ color: "blue", tone: "solid", className: "text-white" },
		{ color: "yellow", tone: "solid", className: "text-gray-900" },
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
