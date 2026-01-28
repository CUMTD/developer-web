import ApiAttributeItem from "@common/docs/api-attribute-item";
import toTitleCase from "@helpers/to-title-case";
import type { ApiResponseAttribute } from "@t/documentation-types";
import { API_INDEX, type ApiObject } from "@t/md.generated";
import { Item, ItemContent, ItemGroup, ItemHeader, ItemSeparator } from "@ui/item";
import { Separator } from "@ui/separator";
import type { Metadata } from "next";
import React from "react";
import "server-only";
import EndpointItem from "./_components/endpoint-item";
import { PrettyCodeFromFilepath } from "./_components/pretty-code-from-file-path";

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
		alternates: { canonical: `/reference/${slug}` },
	};
}

export default async function Page({ params }: Props) {
	const { slug: apiObject } = await params;
	const methods = API_INDEX[apiObject];

	const { default: ObjectDescription } = await import(`@content/api/${apiObject}/description.mdx`);
	const { response: responseAttributes } = await import(`@content/api/${apiObject}/response.ts`);

	var attributes = responseAttributes as ApiResponseAttribute[];

	return (
		<>
			<div className="col-span-1 lg:col-span-1 prose dark:prose-invert max-w-full " id={apiObject}>
				<ObjectDescription />
				<Separator className="my-10" />
				<ObjectAttributes attributes={attributes} />
			</div>
			<Item className="items-start p-0 ">
				<ItemContent className="w-full sticky top-0">
					<ItemHeader className="text-xl">Object</ItemHeader>
					<PrettyCodeFromFilepath filepath={`@content/api/${apiObject}/object.json`} language="json" />
				</ItemContent>
			</Item>
			<div className="col-span-1 lg:col-span-2">
				<h2 className="font-bold text-3xl ">API Definitions</h2>
				<Separator className="" id={methods[0]} />
			</div>

			{methods.map((method, idx) => {
				return (
					<React.Fragment key={method}>
						{idx !== 0 && <Separator className={`col-span-1 lg:col-span-2 `} id={method} />}
						<EndpointItem object={apiObject} method={method} key={method} />
					</React.Fragment>
				);
			})}
			<div className=" col-span-1 lg:col-span-2 w-full min-h-[75vh] flex flex-col gap-5 ">
				<Separator />
				<span className="text-muted-foreground text-center text-xs">* * *</span>
			</div>
		</>
	);
}

type ObjectAttributesProps = Readonly<{
	attributes: ApiResponseAttribute[];
}>;
function ObjectAttributes({ attributes }: ObjectAttributesProps) {
	return (
		<>
			<h3 className="prose dark:prose-invert font-normal">Return Object Attributes</h3>
			<ItemGroup>
				{attributes.map((attr) => {
					return (
						<React.Fragment key={attr.name}>
							<ItemSeparator />
							<ApiAttributeItem attribute={attr} childAttributes={attr.childAttributes ?? []} />
						</React.Fragment>
					);
				})}
			</ItemGroup>
		</>
	);
}
