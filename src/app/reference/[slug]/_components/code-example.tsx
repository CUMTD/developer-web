"use client";

import { EXAMPLE_LANGUAGES } from "@content/api/languages";
import { ItemHeader } from "@ui/item";
import { useSearchParams } from "next/navigation";
import { type ReactElement, useEffect, useState } from "react";
import { CodeExampleBody } from "./code-example-with-copy";
import { LanguageSelector } from "./language-selector";

interface EndpointClientProps {
	content: { [language: string]: ReactElement };
}

export default function CodeExample({ content }: EndpointClientProps) {
	const searchParams = useSearchParams();
	const language = searchParams.get("language");

	const [currentLanguage, setCurrentLanguage] = useState<string>(language ?? EXAMPLE_LANGUAGES[0].name);

	useEffect(() => {
		const newLanguage = searchParams.get("language");
		if (newLanguage) {
			setCurrentLanguage(newLanguage);
		}
	}, [searchParams]);

	return (
		<>
			<ItemHeader className="text-xl">
				Example
				<div>
					<LanguageSelector selectedLanguage={currentLanguage} />
				</div>
			</ItemHeader>
			<CodeExampleBody>{currentLanguage && content[currentLanguage] ? content[currentLanguage] : null}</CodeExampleBody>
		</>
	);
}
