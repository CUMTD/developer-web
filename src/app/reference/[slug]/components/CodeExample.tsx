"use client";

import { ItemHeader } from "@shared/shadcn/item";
import { useSearchParams } from "next/navigation";
import { type ReactElement, useEffect, useState } from "react";
import { EXAMPLE_LANGUAGES } from "src/app/markdown/languages";
import { CodeExampleBody } from "./CodeExampleWithCopy";
import { LanguageSelector } from "./LanguageSelector";

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
