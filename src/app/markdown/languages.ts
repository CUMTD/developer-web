import type { IconType } from "react-icons/lib";
import { SiCurl, SiJavascript, SiPython, SiR, SiTypescript } from "react-icons/si";

export const EXAMPLE_LANGUAGES = [
	{ displayName: "curl", name: "curl", icon: SiCurl },
	{ displayName: "TypeScript", name: "typescript", icon: SiTypescript },
	{ displayName: "JavaScript", name: "javascript", icon: SiJavascript },
	{ displayName: "Python", name: "python", icon: SiPython },
	{ displayName: "R", name: "r", icon: SiR },
] as const satisfies ReadonlyArray<{
	displayName: string;
	name: string;
	icon: IconType;
}>;

export type ExampleLanguage = (typeof EXAMPLE_LANGUAGES)[number];
export type ExampleLanguageName = ExampleLanguage["name"];
