import toTitleCase from "@helpers/toTitleCase";
import { Item, ItemContent, ItemHeader } from "@shared/shadcn/item";
import { Separator } from "@shared/shadcn/separator";
import type { Metadata } from "next";
import "server-only";
import { EXAMPLE_LANGUAGES } from "src/app/markdown/languages";
import { API_INDEX, type ApiObject } from "../../../types/md.generated";
import EndpointItem from "./endpoint-item";

// Disable dynamic route parameters
// This ensures that only the statically generated routes are used
export const dynamicParams = false;

// Force static generation for this page
// This ensures that the page is statically generated at build time
export const dynamic = "force-static";

export type ParamsPayload = { slug: ApiObject };
export type Props = Readonly<{
	params: Promise<ParamsPayload>;
}>;

export async function generateStaticParams(): Promise<Array<{ slug: ApiObject }>> {
	return (Object.keys(API_INDEX) as ApiObject[]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const title = toTitleCase(slug);
	return {
		title,
	};
}

export default async function Page({ params }: Props) {
	const { slug: apiObject } = await params;
	const methods = API_INDEX[apiObject];

	const { default: ObjectDescription } = await import(`../../markdown/${apiObject}/description.mdx`);
	const { default: ResponseObject } = await import(`../../markdown/${apiObject}/response.mdx`);

	return (
		<>
			<div className="col-span-1 lg:col-span-1 prose dark:prose-invert max-w-full" id={apiObject}>
				<ObjectDescription />
			</div>
			<Item className="items-start p-0 ">
				<ItemContent>
					<ItemHeader className="text-xl ">Object</ItemHeader>
					<ResponseObject />
				</ItemContent>
			</Item>
			<Separator className="col-span-1 lg:col-span-2" />

			{methods.map((method) => {
				return (
					<EndpointItem object={apiObject} method={method} selectedLanguage={EXAMPLE_LANGUAGES[0].name} key={method} />
				);
			})}
		</>
	);
}
