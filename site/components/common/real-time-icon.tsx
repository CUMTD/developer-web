import type { SVGProps } from "react";

type RealTimeIconProps = Readonly<
	Omit<SVGProps<SVGSVGElement>, "height" | "width"> & {
		width: number | string;
	}
>;

export default function RealTimeIcon({ width, className, ...props }: RealTimeIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 225 225"
			width={width}
			height={width}
			className={className}
			{...props}
		>
			<title>Real-Time</title>
			<path
				className="realtime-arc realtime-arc-1"
				d="M19.5 90.5c63.5 0 115 51.5 115 115"
				fill="none"
				stroke="var(--realtime-icon-stroke)"
				strokeLinecap="round"
				strokeMiterlimit="10"
				strokeWidth="29"
			/>
			<path
				className="realtime-arc realtime-arc-2"
				d="M19.5 20.5c102.2 0 185 82.8 185 185"
				fill="none"
				stroke="var(--realtime-icon-stroke)"
				strokeLinecap="round"
				strokeMiterlimit="10"
				strokeWidth="29"
			/>
		</svg>
	);
}
