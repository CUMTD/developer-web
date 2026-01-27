"use client";

import { EXAMPLE_LANGUAGES } from "@content/api/languages";
import { cn } from "@lib/utils";
import { Button } from "@ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

type LanguageSelectorProps = Readonly<{
	selectedLanguage: string;
}>;

export function LanguageSelector({ selectedLanguage }: LanguageSelectorProps) {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-50 justify-between">
					<div className="flex items-center gap-2">
						{(() => {
							const selectedLanguageObj = EXAMPLE_LANGUAGES.find((language) => language.name === selectedLanguage);
							const IconComponent = selectedLanguageObj?.icon;
							return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
						})()}
						{EXAMPLE_LANGUAGES.find((language) => language.name === selectedLanguage)?.displayName}
					</div>
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-50 p-0">
				<Command>
					<CommandList>
						<CommandEmpty>No language found.</CommandEmpty>
						<CommandGroup>
							{EXAMPLE_LANGUAGES.map((language) => {
								const IconComponent = language.icon;
								return (
									<CommandItem
										key={language.name}
										value={language.name}
										onSelect={(currentValue) => {
											if (currentValue !== selectedLanguage) {
												const currentUrl = new URL(window.location.href);
												currentUrl.searchParams.set("language", currentValue);

												router.replace(currentUrl.toString(), { scroll: false });
											}
											setOpen(false);
										}}
									>
										<div className="flex items-center gap-2">
											<IconComponent className="h-4 w-4" />
											{language.displayName}
										</div>
										<Check
											className={cn("ml-auto", selectedLanguage === language.name ? "opacity-100" : "opacity-0")}
										/>
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
