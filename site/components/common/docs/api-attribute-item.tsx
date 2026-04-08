import type { ApiRequestParameter, ApiResponseAttribute, EnumEntry } from "@t/documentation-types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@ui/accordion";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemSeparator, ItemTitle } from "@ui/item";
import React from "react";

type ApiAttributeItemProps = Readonly<{
	attribute: ApiResponseAttribute | ApiRequestParameter;
	required?: boolean;
	showOptional?: boolean;
	childAttributes?: ApiResponseAttribute[];
	enumEntry?: EnumEntry;
}>;
export default function ApiAttributeItem({
	attribute,
	childAttributes,
	required,
	showOptional = false,
	enumEntry,
}: ApiAttributeItemProps) {
	return (
		<Item key={attribute.name}>
			<ItemContent>
				<ItemHeader className="flex flex-row gap-3 justify-start">
					<ItemTitle>
						<span className="font-mono">{attribute.name}</span>
					</ItemTitle>
					<ItemDescription className="m-0!">{attribute.type}</ItemDescription>
					<ItemDescription>
						<span className={`${required && "text-destructive"} `}>
							{required && "required"}
							{!required && showOptional && "optional"}
						</span>
					</ItemDescription>
				</ItemHeader>
				{attribute.description}
				{enumEntry && (
					<table className="text-xs w-min! mt-3">
						<tbody>
							{Object.keys(enumEntry).map((e) => {
								return (
									<tr key={e}>
										<td className="w-[1ch] font-mono">{e}</td>
										<td className="whitespace-nowrap">{(enumEntry as Record<string, string>)[e]}</td>
									</tr>
								);
							})}
							<tr></tr>
						</tbody>
					</table>
				)}
				{childAttributes && childAttributes.length > 0 && (
					<Accordion type="single" collapsible defaultValue="shipping">
						<AccordionItem value="shipping">
							<AccordionTrigger className="rounded-md border px-4 py-2 prose dark:prose-invert justify-end flex-row-reverse w-full whitespace-nowrap hover:bg-accent hover:cursor-pointer mt-2">
								Child attributes
							</AccordionTrigger>
							<AccordionContent>
								<ItemGroup className="ml-5 border-l-2">
									{childAttributes?.map((childAttr, idx) => {
										return (
											<React.Fragment key={attribute.name + childAttr.name}>
												<ApiAttributeItem
													attribute={childAttr}
													{...(childAttr.enumDefinition && { enumEntry: childAttr.enumDefinition })}
													childAttributes={childAttr.childAttributes ?? []}
												/>
												{idx !== childAttributes.length - 1 && <ItemSeparator />}
											</React.Fragment>
										);
									})}
								</ItemGroup>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				)}
			</ItemContent>
		</Item>
	);
}
