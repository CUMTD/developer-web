import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { Item, ItemContent, ItemGroup, ItemHeader } from "@shared/shadcn/item";
import { Separator } from "@shared/shadcn/separator";
import { notFound } from "next/navigation";
import { EXAMPLE_LANGUAGES } from "src/app/markdown/languages";
import { CodeExampleWithCopy } from "./CodeExampleWithCopy";
import { LanguageSelector } from "./LanguageSelector";

// valid API objects (anything else will be 404'd)
const VALID_API_OBJECTS = ["routes", "shapes", "trips", "stops", "vehicles", "service-alerts"] as const;

type ApiObject = (typeof VALID_API_OBJECTS)[number];

function assertValidApiObject(value: string): asserts value is ApiObject {
	if (!(VALID_API_OBJECTS as readonly string[]).includes(value)) {
		notFound();
	}
}

export async function generateStaticParams() {
	// read top level slugs (folders) from file system and generate static pages (/reference/routes, /reference/stops, etc)
	const markdownPath = join(process.cwd(), "src", "app", "markdown");
	const entries = await readdir(markdownPath, { withFileTypes: true });
	const folders = entries.filter((entry) => entry.isDirectory()).map((entry) => ({ slug: entry.name }));

	return folders;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug: apiObject } = await params;

	assertValidApiObject(apiObject);

	// read subdirectories from the slug folder: if the apiObject is "routes", return ["get-route", "get-routes"]
	const markdownPath = join(process.cwd(), "src", "app", "markdown", apiObject);
	const entries = await readdir(markdownPath, { withFileTypes: true });
	const methods = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

	const { default: ObjectDescription } = await import(`../../markdown/${apiObject}/description.mdx`);

	return (
		<>
			<div className="col-span-2" id={apiObject}>
				<ObjectDescription />
			</div>
			<Separator className="col-span-3" />

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

	return (
		<>
			<div className="col-span-2" id={method}>
				<EndpointDescription />
			</div>
			<div className="flex flex-col gap-5">
				<div>
					<ItemGroup>
						<Item>
							<ItemHeader className="text-xl">
								Example
								<div>
									<LanguageSelector selectedLanguage={selectedLanguage} />
								</div>
							</ItemHeader>
							<ItemContent>
								<CodeExampleWithCopy>
									<CodeExample />
								</CodeExampleWithCopy>
							</ItemContent>
						</Item>
						<Item>
							<ItemHeader className="text-xl">Response</ItemHeader>
							<ItemContent>
								<ResponseObject />
							</ItemContent>
						</Item>
					</ItemGroup>
				</div>
			</div>
			<Separator className="col-span-3" />
		</>
	);
}
