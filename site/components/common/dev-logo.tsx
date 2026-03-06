import type { SVGProps } from "react";

type DevLogoProps = Readonly<
	Omit<SVGProps<SVGSVGElement>, "height" | "width"> & {
		width: number | string;
	}
>;

export default function DevLogo({ width, className, ...props }: DevLogoProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 900 900"
			width={width}
			height={width}
			className={className}
			{...props}
		>
			<title>MTD Developer Logo</title>
			<g className="fill-(--dev-logo-swoosh)">
				<path d="m523.41 398.86-.09.37c187.21 61.21 367.55 39.62 350.44-95.25-42.91 136.42-353.83 94.06-350.35 94.88" />
				<path d="M862.42 413.23c-125.9 84.91-270.38 23.52-385.12-5.4-114.01-30.93-262.97-60.39-452.19 110.44 151.25-83.45 290.51-17.2 420.16 16.65 114.74 28.91 284.56 25.07 417.14-121.69" />
			</g>
			<path
				className="fill-(--dev-logo-bracket)"
				d="M603.8 375.17c24.74.59 52.65.16 80.8-2.35V207.59H530.77v65.84h73.03zm0 200.61v50.79h-73.03v65.84H684.6v-132.1c-27.79 8.14-54.96 12.99-80.8 15.48ZM275.53 358.62c9.06-1.22 19.1-2.02 29.76-2.52v-82.67h73.03v-65.84H224.49v161.36c16.89-4.58 33.9-8.03 51.04-10.33m29.76 166.58c-26.69-6.88-53.61-12.57-80.8-15.65V692.4h153.83v-65.84h-73.03V525.19Z"
			/>
		</svg>
	);
}
