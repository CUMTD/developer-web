import { readdir } from "node:fs/promises";
import { join } from "node:path";
import EndpointParameters from "@components/EndpointParameters";
import { Item, ItemContent, ItemGroup, ItemHeader } from "@shared/shadcn/item";
import { Separator } from "@shared/shadcn/separator";
import { notFound } from "next/navigation";
import "server-only";
import { EXAMPLE_LANGUAGES } from "src/app/markdown/languages";
import { CodeExampleWithCopy } from "./CodeExampleWithCopy";
import { LanguageSelector } from "./LanguageSelector";

async function getTopLevelReferenceDirectories() {
	const markdownPath = join(process.cwd(), "src", "app", "markdown");
	const entries = await readdir(markdownPath, { withFileTypes: true });
	const directories = entries.filter((entry) => entry.isDirectory()).map(({ name }) => name);
	return directories;
}

export async function validateSlug(slug: string): Promise<void> {
	const validSlugs = await getTopLevelReferenceDirectories();
	if (!validSlugs.includes(slug)) {
		notFound();
	}
}

export async function generateStaticParams() {
	const directories = await getTopLevelReferenceDirectories();
	return directories.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug: apiObject } = await params;

	// will return a not found if no folder exists for this slug.
	await validateSlug(apiObject);

	// read subdirectories from the slug folder: if the apiObject is "routes", return ["get-route", "get-routes"]
	const markdownPath = join(process.cwd(), "src", "app", "markdown", apiObject);
	const entries = await readdir(markdownPath, { withFileTypes: true });
	const methods = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

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

interface EndpointItemProps {
	object: string;
	method: string;
	selectedLanguage: string;
}

async function EndpointItem({ object, method, selectedLanguage }: EndpointItemProps) {
	// import the relevant .mdx files
	const { default: EndpointDescription } = await import(`../../markdown/${object}/${method}/description.mdx`);
	const { default: ResponseObject } = await import(`../../markdown/${object}/response.mdx`);
	const { default: CodeExample } = await import(`../../markdown/${object}/${method}/${selectedLanguage}.mdx`);
	const { parameters } = await import(`../../markdown/${object}/${method}/parameters.ts`);

	return (
		<>
			<div className="col-span-1 lg:col-span-1 flex flex-col gap-10" id={method}>
				<div className="[&_p]:text-muted-foreground">
					<EndpointDescription />
				</div>
				<div>
					<EndpointParameters parameters={parameters} />
				</div>
			</div>
			<ItemGroup className="flex flex-col gap-5">
				<Item className="p-0">
					<ItemHeader className="text-xl">
						Example
						<div>
							<LanguageSelector selectedLanguage={selectedLanguage} />
						</div>
					</ItemHeader>
					<ItemContent className="w-full">
						<CodeExampleWithCopy>
							<CodeExample />
						</CodeExampleWithCopy>
					</ItemContent>
				</Item>
				<Item className="p-0">
					<ItemHeader className="text-xl">Response</ItemHeader>
					<ItemContent>
						<ResponseObject />
					</ItemContent>
				</Item>
			</ItemGroup>
			<Separator className="col-span-1 lg:col-span-2" />
		</>
	);
}
