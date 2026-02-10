import { globalEnv } from "@env/global";
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
	const logoAbsoluteUrl = `${globalEnv.NEXT_PUBLIC_BASE_URL}/mtd-white-red.svg`;

	const logoType = "Developer Resources";

	const allText = logoType + route;

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
					{/** biome-ignore lint/performance/noImgElement: must use img */}
					<img
						src={logoAbsoluteUrl}
						alt="MTD"
						style={{
							width: "1em",
							//todo
						}}
					/>
					<span style={{ fontWeight: "bold", fontSize: "50px" }}>{logoType}</span>
				</div>

				{route && (
					<span
						style={{
							display: "flex",
							color: "#a0a0a0",
							fontFamily: "OverpassMono",
							fontSize: "40px",
						}}
					>
						{route}
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
