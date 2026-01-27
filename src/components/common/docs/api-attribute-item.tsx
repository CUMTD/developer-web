import type { ApiRequestParameter, ApiResponseAttribute } from "@t/documentation-types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@ui/accordion";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemSeparator, ItemTitle } from "@ui/item";
import React from "react";

interface ApiAttributeItemProps {
	attribute: ApiResponseAttribute | ApiRequestParameter;
	required?: boolean;
	showOptional?: boolean;
	childAttributes?: ApiResponseAttribute[];
}
export default function ApiAttributeItem({
	attribute,
	childAttributes,
	required,
	showOptional = false,
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
				{childAttributes && childAttributes.length > 0 && (
					<Accordion type="single" collapsible defaultValue="shipping">
						<AccordionItem value="shipping">
							<AccordionTrigger className="rounded-md border px-4 py-2 prose dark:prose-invert justify-end flex-row-reverse w-full whitespace-nowrap hover:bg-accent hover:cursor-pointer">
								Child attributes
							</AccordionTrigger>
							<AccordionContent>
								<ItemGroup className="ml-5 border-l-2">
									{childAttributes?.map((childAttr, idx) => {
										return (
											<React.Fragment key={attribute.name + childAttr.name}>
												<ApiAttributeItem attribute={childAttr} />
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
