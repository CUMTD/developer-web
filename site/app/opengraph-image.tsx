import { ImageResponse } from "next/og";
export const dynamicParams = false;
export const dynamic = "force-static";

async function loadGoogleFont(font: string, text: string, weight = 400, style: "normal" | "italic" = "normal") {
	const fontVariant = style === "italic" ? `ital,wght@1,${weight}` : `wght@${weight}`;
	const url = `https://fonts.googleapis.com/css2?family=${font}:${fontVariant}&text=${encodeURIComponent(text)}`;
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
const LOGO_SIZE = 120;
// TODO: adapt this function so it works app-wide
export default async function Image({ route }: OpenGraphImageProps) {
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
					gap: "5px",

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
						viewBox="0 0 900 900"
						width={LOGO_SIZE}
						height={LOGO_SIZE}
						role="img"
						aria-label="MTD"
					>
						{/* <title>MTD Developer Logo</title> */}
						<g style={{ fill: "#e10027" }}>
							<path d="m523.41 398.86-.09.37c187.21 61.21 367.55 39.62 350.44-95.25-42.91 136.42-353.83 94.06-350.35 94.88" />
							<path d="M862.42 413.23c-125.9 84.91-270.38 23.52-385.12-5.4-114.01-30.93-262.97-60.39-452.19 110.44 151.25-83.45 290.51-17.2 420.16 16.65 114.74 28.91 284.56 25.07 417.14-121.69" />
						</g>
						<path
							style={{ fill: "white" }}
							d="M603.8 375.17c24.74.59 52.65.16 80.8-2.35V207.59H530.77v65.84h73.03zm0 200.61v50.79h-73.03v65.84H684.6v-132.1c-27.79 8.14-54.96 12.99-80.8 15.48ZM275.53 358.62c9.06-1.22 19.1-2.02 29.76-2.52v-82.67h73.03v-65.84H224.49v161.36c16.89-4.58 33.9-8.03 51.04-10.33m29.76 166.58c-26.69-6.88-53.61-12.57-80.8-15.65V692.4h153.83v-65.84h-73.03V525.19Z"
						/>
					</svg>
					{/* <svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 630 350"
						width="140"
						height="78"
						role="img"
						aria-label="MTD"
					>

						<path
							fill="#e10027"
							d="M604 255.9c-70.4 47.4-151.1 13.2-215.3-3-63.7-17.3-147-33.7-252.7 61.7 84.5-46.6 162.4-9.6 234.8 9.3 64.1 16.1 159 14 233.2-68"
						/>
						<path fill="#e10027" d="M414.5 247.8l-.1.2c104.7 34.2 205.5 22.1 195.9-53.2-24 76.2-197.8 52.6-195.8 53" />
						<path
							fill="#fff"
							d="M557.4 103.9c0-24.3-11.7-37.2-45.9-37.2h-7l-18.7 107.7H505c34.3.1 52.4-24.8 52.4-70.5M500.7 223h-81.1l36-204.8h58.8c67 0 102.4 25.5 102.4 80.5 0 73.1-35.1 124.3-116.1 124.3M431.4 67.6h-56.8L347.1 223h-57.6L317 67.6h-55.9l8.8-49.4h170.3zM183.8 119.7l-69 103.2-31.1-104.7c-2 15.8-5 35.7-8.5 55.9L66.4 223H13.2L49.5 18.2h51.3l31.9 103 68.7-103h52.4L217.4 223h-53.3l8.8-48.9c3.6-20.1 7.1-38.6 10.9-54.4"
						/>
					</svg> */}
					<span style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "50px" }}>{logoType}</span>
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
					data: await loadGoogleFont("Overpass", allText, 400, "normal"),
					style: "normal",
					weight: 400,
				},
				{
					name: "Overpass",
					data: await loadGoogleFont("Overpass", allText, 400, "italic"),
					style: "italic",
					weight: 400,
				},
				{
					name: "Overpass",
					data: await loadGoogleFont("Overpass", allText, 700, "normal"),
					style: "normal",
					weight: 700,
				},
				{
					name: "Overpass",
					data: await loadGoogleFont("Overpass", allText, 700, "italic"),
					style: "italic",
					weight: 700,
				},
				{
					name: "OverpassMono",
					data: await loadGoogleFont("Overpass+Mono", allText, 400, "normal"),
					style: "normal",
					weight: 400,
				},
			],
		},
	);
}
