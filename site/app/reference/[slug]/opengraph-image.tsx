import OpenGraphImage from "@app/opengraph-image";
import type { Props } from "./page";

export default async function Image({ params }: Props) {
	const { slug } = await params;

	return OpenGraphImage({ route: `/${slug}` });
}
