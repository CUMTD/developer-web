import { ImageResponse } from "next/og";
export const dynamicParams = false;
export const dynamic = "force-static";

async function loadGoogleFont(font: string, text: string, weight = 400) {
	const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;
	const css = await (await fetch(url)).text();
	const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

	if (resource) {
		const response = await fetch(resource[1]);
		if (response.status === 200) {
			return await response.arrayBuffer();
		}
	}

	throw new Error("failed to load font data");
}

interface OpenGraphImageProps {
	route?: string;
}

// TODO: adapt this function so it works app-wide
export default async function Image({ route }: OpenGraphImageProps) {
	console.log("generating image");
	const logoType = "Developer Resources";
	const routeLabel = route ?? "";
	const allText = `${logoType}${routeLabel}`;

	return new ImageResponse(
		<div
			style={{
				backgroundColor: "#0a0a0a",

				color: "white",
				height: "100%",
				width: "100%",
				fontSize: 100,
				fontFamily: "Overpass",
				padding: ".5em",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				justifyContent: "center",
				gap: "10px",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "20px",

					alignItems: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "20px",
						alignItems: "center",
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 630 350"
						width="140"
						height="78"
						role="img"
						aria-label="MTD"
					>
						<title>MTD</title>
						<path
							fill="#e10027"
							d="M604 255.9c-70.4 47.4-151.1 13.2-215.3-3-63.7-17.3-147-33.7-252.7 61.7 84.5-46.6 162.4-9.6 234.8 9.3 64.1 16.1 159 14 233.2-68"
						/>
						<path fill="#e10027" d="M414.5 247.8l-.1.2c104.7 34.2 205.5 22.1 195.9-53.2-24 76.2-197.8 52.6-195.8 53" />
						<path
							fill="#fff"
							d="M557.4 103.9c0-24.3-11.7-37.2-45.9-37.2h-7l-18.7 107.7H505c34.3.1 52.4-24.8 52.4-70.5M500.7 223h-81.1l36-204.8h58.8c67 0 102.4 25.5 102.4 80.5 0 73.1-35.1 124.3-116.1 124.3M431.4 67.6h-56.8L347.1 223h-57.6L317 67.6h-55.9l8.8-49.4h170.3zM183.8 119.7l-69 103.2-31.1-104.7c-2 15.8-5 35.7-8.5 55.9L66.4 223H13.2L49.5 18.2h51.3l31.9 103 68.7-103h52.4L217.4 223h-53.3l8.8-48.9c3.6-20.1 7.1-38.6 10.9-54.4"
						/>
					</svg>
					<span style={{ fontWeight: "bold", fontSize: "50px" }}>{logoType}</span>
				</div>

				{routeLabel && (
					<span
						style={{
							display: "flex",
							color: "#a0a0a0",
							fontFamily: "OverpassMono",
							fontSize: "40px",
						}}
					>
						{routeLabel}
					</span>
				)}
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Overpass",
					data: await loadGoogleFont("Overpass", allText, 400),
					style: "normal",
					weight: 400,
				},
				{
					name: "Overpass",
					data: await loadGoogleFont("Overpass", allText, 700),
					style: "normal",
					weight: 700,
				},
				{
					name: "OverpassMono",
					data: await loadGoogleFont("Overpass+Mono", allText, 400),
					style: "normal",
					weight: 400,
				},
			],
		},
	);
}
