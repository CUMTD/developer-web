import EndpointParameters from "@common/docs/endpoint-parameter";
import { EXAMPLE_LANGUAGES } from "@content/templates/languages";
import { globalEnv } from "@env/global";
import type { ApiMethod, ApiObject } from "@t/md.generated";
import { Item, ItemContent, ItemGroup, ItemHeader } from "@ui/item";
import type React from "react";
import "server-only";
import CodeExample from "./code-example";
import { PrettyCodeFromFilepath } from "./pretty-code-from-file-path";

type EndpointItemProps<T extends ApiObject> = Readonly<{
	object: T;
	method: ApiMethod<T>;
}>;

export default async function EndpointItem<T extends ApiObject>({ object, method }: EndpointItemProps<T>) {
	// import the relevant parameters
	const { pathParameters, queryParameters, endpoint, endpointTitle } = await import(
		`@content/api/${object}/${method}/parameters.ts`
	);

	// generate array of language names mapped to their example ReactElement
	const content: { [language: string]: React.ReactElement } = {};

	for (const lang of EXAMPLE_LANGUAGES) {
		try {
			// const { default: CodeExample } = await import(`@content/api/${object}/${method}/${lang.name}.mdx`);
			// content[lang.name] = <CodeExample />;
			content[lang.name] = (
				<PrettyCodeFromFilepath
					filepath={`@content/templates/${lang.filename}`}
					language={lang.name}
					endpoint={endpoint}
					queryParameters={queryParameters}
				/>
			);
		} catch (error) {
			console.warn(`Code example for ${lang.name} not found for ${object}/${method}, ${error}`);
		}
	}

	return (
		<>
			<div className="col-span-1 lg:col-span-1 flex flex-col gap-10 px-2">
				<div className="[&_p]:text-muted-foreground leading-loose ">
					<h2 className="text-2xl font-semibold">{endpointTitle}</h2>
					{/* <CodeExampleBody mini copyable>
						<code>
							{globalEnv.NEXT_PUBLIC_MTD_API_URL}
							{endpoint}
						</code>
					</CodeExampleBody> */}
				</div>
				<EndpointParameters parameters={pathParameters} type="path" />
				<EndpointParameters parameters={queryParameters} type="query" />
			</div>
			<ItemGroup className="flex flex-col gap-5">
				<Item className="p-0">
					<CodeExample content={content} endpoint={`${globalEnv.NEXT_PUBLIC_MTD_API_URL}${endpoint}`} />
				</Item>
				<Item className="p-0">
					<ItemHeader className="text-xl">Response</ItemHeader>
					<ItemContent className="w-full">
						<PrettyCodeFromFilepath filepath={`@content/api/${object}/${method}/response.json`} language="json" />
					</ItemContent>
				</Item>
			</ItemGroup>
		</>
	);
}
