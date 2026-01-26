import { readFile } from "node:fs/promises";
import { CodeComponent } from "mdx-components";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { CodeExampleBody } from "src/app/reference/[slug]/components/CodeExampleWithCopy";
import { unified } from "unified";

interface PrettyCodeFromFilepathProps {
	filepath: string;
	language: string;
}

export async function PrettyCodeFromFilepath({ filepath, language }: PrettyCodeFromFilepathProps) {
	const fileContent = await readFile(filepath, { encoding: "utf-8" });

	const markdownWithCodeBlock = `\`\`\`${language}\n${fileContent}\n\`\`\``;

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
