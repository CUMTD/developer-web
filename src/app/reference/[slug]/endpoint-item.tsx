import EndpointParameters from "@components/EndpointParameters";
import { Item, ItemContent, ItemGroup, ItemHeader } from "@shared/shadcn/item";
import { Separator } from "@shared/shadcn/separator";
import "server-only";
import type { ExampleLanguageName } from "src/app/markdown/languages";
import type { ApiMethod, ApiObject } from "../../../types/md.generated";
import { CodeExampleWithCopy } from "./CodeExampleWithCopy";
import { LanguageSelector } from "./LanguageSelector";

type EndpointItemProps<T extends ApiObject> = Readonly<{
	object: T;
	method: ApiMethod<T>;
	selectedLanguage: ExampleLanguageName;
}>;

export default async function EndpointItem<T extends ApiObject>({
	object,
	method,
	selectedLanguage,
}: EndpointItemProps<T>) {
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
