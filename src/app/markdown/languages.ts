import type { IconType } from "react-icons/lib";
import { SiCurl, SiJavascript, SiPython, SiR, SiTypescript } from "react-icons/si";

export type ExampleLanguage = {
	displayName: string;
	name: string; // this will be used to retrieve the file!
	icon: IconType;
};

export const EXAMPLE_LANGUAGES: ExampleLanguage[] = [
	{
		displayName: "curl",
		name: "curl",
		icon: SiCurl,
	},
	{
		displayName: "TypeScript",
		name: "typescript",
		icon: SiTypescript,
	},
	{
		displayName: "JavaScript",
		name: "javascript",
		icon: SiJavascript,
	},
	{
		displayName: "Python",
		name: "python",
		icon: SiPython,
	},

	{
		displayName: "R",
		name: "r",
		icon: SiR,
	},
];
