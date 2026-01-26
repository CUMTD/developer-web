import EndpointParameters from "@common/docs/endpoint-parameter";
import { EXAMPLE_LANGUAGES } from "@content/api/languages";
import type { ApiMethod, ApiObject } from "@t/md.generated";
import { Item, ItemContent, ItemGroup, ItemHeader } from "@ui/item";
import type React from "react";
import "server-only";
import CodeExample from "./code-example";

type EndpointItemProps<T extends ApiObject> = Readonly<{
	object: T;
	method: ApiMethod<T>;
}>;

export default async function EndpointItem<T extends ApiObject>({ object, method }: EndpointItemProps<T>) {
	// import the relevant .mdx files
	const { default: EndpointDescription } = await import(`@content/api/${object}/${method}/description.mdx`);
	const { default: ResponseObject } = await import(`@content/api/${object}/response.mdx`);
	const { parameters } = await import(`@content/api/${object}/${method}/parameters.ts`);

	// generate array of language names mapped to their example ReactElement
	const content: { [language: string]: React.ReactElement } = {};

	for (const lang of EXAMPLE_LANGUAGES) {
		try {
			const { default: CodeExample } = await import(`@content/api/${object}/${method}/${lang.name}.mdx`);
			content[lang.name] = <CodeExample />;
		} catch (error) {
			console.warn(`Code example for ${lang.name} not found for ${object}/${method}, ${error}`);
		}
	}

	return (
		<>
			<div className="col-span-1 lg:col-span-1 flex flex-col gap-10">
				<div className="[&_p]:text-muted-foreground">
					<EndpointDescription />
				</div>
				<div>
					<EndpointParameters parameters={parameters} />
				</div>
			</div>
			<ItemGroup className="flex flex-col gap-5">
				<Item className="p-0">
					<CodeExample content={content} />
				</Item>
				<Item className="p-0">
					<ItemHeader className="text-xl">Response</ItemHeader>
					<ItemContent className="w-full">
						<ResponseObject />
					</ItemContent>
				</Item>
			</ItemGroup>
		</>
	);
}
