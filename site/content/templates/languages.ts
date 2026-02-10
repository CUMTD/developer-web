import type { IconType } from "react-icons/lib";
import { SiCurl, SiJavascript, SiPython, SiR, SiTypescript } from "react-icons/si";

export const EXAMPLE_LANGUAGES = [
	{ displayName: "curl", filename: "curl.sh", name: "bash", icon: SiCurl },
	{ displayName: "TypeScript", filename: "typescript.ts", name: "ts", icon: SiTypescript },
	{ displayName: "JavaScript", filename: "javascript.js", name: "js", icon: SiJavascript },
	{ displayName: "Python", filename: "python.py", name: "python", icon: SiPython },
	{ displayName: "R", filename: "r.r", name: "r", icon: SiR },
] as const satisfies ReadonlyArray<{
	displayName: string;
	filename: string;
	name: string;
	icon: IconType;
}>;

export type ExampleLanguage = (typeof EXAMPLE_LANGUAGES)[number];
export type ExampleLanguageName = ExampleLanguage["name"];
