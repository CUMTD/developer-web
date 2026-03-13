"use client";

import { EXAMPLE_LANGUAGES } from "@content/templates/languages";
import { ItemHeader } from "@ui/item";
import { useSearchParams } from "next/navigation";
import { type ReactElement, useEffect, useState } from "react";
import { LanguageSelector } from "./language-selector";

type CodeExampleProps = Readonly<{
	content: { [language: string]: ReactElement };
	endpoint: string;
}>;

function isValidLanguage(language: string | null): language is string {
	if (!language) return false;
	return EXAMPLE_LANGUAGES.some((lang) => lang.name === language);
}

export default function CodeExample({ content, endpoint }: CodeExampleProps) {
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
			<ItemHeader className="text-xl flex flex-row flex-wrap">
				<div className="flex flex-row gap-2 white flex-wrap">
					<span className="bg-green-700 text-white rounded-sm font-semibold text-sm! px-2 pt-0.5 -translate-y-0.5 ">
						GET
					</span>
					<span className="font-mono text-sm">{endpoint}</span>
				</div>
				<div>
					<LanguageSelector selectedLanguage={currentLanguage} />
				</div>
			</ItemHeader>
			{currentLanguage && content[currentLanguage] ? content[currentLanguage] : null}
		</>
	);
}
