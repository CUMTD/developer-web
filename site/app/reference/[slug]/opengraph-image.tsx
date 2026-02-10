import OpenGraphImage from "@app/opengraph-image";
import type { Props } from "./page";

export default async function Image({ params }: Props) {
	const { slug } = await params;

	return (
		OpenGraphImage({ route: `/${slug}` }),
		{
			width: 1200,
			height: 630,
		}
	);
}
