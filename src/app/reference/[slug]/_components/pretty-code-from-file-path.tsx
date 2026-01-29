import { readFile } from "node:fs/promises";
import { globalEnv } from "@env/global";
import type { ApiRequestParameter } from "@t/documentation-types";
import { CodeComponent } from "mdx-components";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { CodeExampleBody } from "./code-example-with-copy";

type PrettyCodeFromFilepathProps = Readonly<{
	filepath: string;
	language: string;
	endpoint?: string;
	apiKey?: string;
	queryParameters?: ApiRequestParameter[];
}>;

export async function PrettyCodeFromFilepath({
	filepath,
	language,
	endpoint,
	queryParameters,
}: PrettyCodeFromFilepathProps) {
	const resolvedPath = filepath.replace("@content/", "src/content/");
	const fileContent = await readFile(resolvedPath, { encoding: "utf-8" });

	var trimmedContent = fileContent.replace(/\n+$/, "");

	if (endpoint) {
		let url = `${globalEnv.NEXT_PUBLIC_MTD_API_URL}${endpoint}`;

		if (queryParameters && queryParameters.length > 0) {
			const searchParams = new URLSearchParams();

			for (const param of queryParameters) {
				const exampleValue = param.exampleValue || "example";
				searchParams.set(param.name, exampleValue);
			}

			console.log(searchParams);
			url += `?${searchParams.toString()}`;
		}

		trimmedContent = trimmedContent.replace("API_ENDPOINT", url);
	}

	const markdownWithCodeBlock = `\`\`\`${language}\n${trimmedContent}\n\`\`\``;

	const formatted = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypePrettyCode, {
			theme: "github-dark-dimmed",
			keepBackground: false,
		})
		.use(rehypeStringify)
		.process(markdownWithCodeBlock);

	return (
		<CodeComponent>
			<CodeExampleBody copyable={false}>
				<div
					className="overflow-hidden"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: necessary. page is statically rendered.
					dangerouslySetInnerHTML={{ __html: String(formatted) }}
				/>
			</CodeExampleBody>
		</CodeComponent>
	);
}
