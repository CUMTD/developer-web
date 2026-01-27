"use client";

import { EXAMPLE_LANGUAGES } from "@content/templates/languages";
import { ItemHeader } from "@ui/item";
import { useSearchParams } from "next/navigation";
import { type ReactElement, useEffect, useState } from "react";
import { LanguageSelector } from "./language-selector";

interface CodeExampleProps {
	content: { [language: string]: ReactElement };
}

function isValidLanguage(language: string | null): language is string {
	if (!language) return false;
	return EXAMPLE_LANGUAGES.some((lang) => lang.name === language);
}

export default function CodeExample({ content }: CodeExampleProps) {
	const searchParams = useSearchParams();
	const language = searchParams.get("language");

	const [currentLanguage, setCurrentLanguage] = useState<string>(
		isValidLanguage(language) ? language : EXAMPLE_LANGUAGES[0].name,
	);

	useEffect(() => {
		const newLanguage = searchParams.get("language");

		if (isValidLanguage(newLanguage)) {
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
			{currentLanguage && content[currentLanguage] ? content[currentLanguage] : null}
		</>
	);
}
