import ApiAttributeItem from "@common/docs/api-attribute-item";
import type { ApiResponseAttribute } from "@t/documentation-types";
import { ItemGroup, ItemSeparator, ItemTitle } from "@ui/item";
import { Separator } from "@ui/separator";
import React from "react";

type ObjectAttributesProps = Readonly<{
	title: string;
	attributes: ApiResponseAttribute[];
}>;
export default function ObjectAttributesBox({ title, attributes }: ObjectAttributesProps) {
	return (
		<>
			<Separator />
			<ItemGroup className="border rounded-md border-accent">
				<ItemTitle className="bg-accent font-semibold p-3 m-0! rounded-t-md w-full sticky top-0 z-50">
					<h3 className="m-0!">{title}</h3>
				</ItemTitle>
				{attributes.map((attr, idx) => {
					return (
						<React.Fragment key={attr.name}>
							{idx !== 0 && <ItemSeparator className="accent h-1" />}
							<ApiAttributeItem
								attribute={attr}
								{...(attr.enumDefinition && { enumEntry: attr.enumDefinition })}
								childAttributes={attr.childAttributes ?? []}
							/>
						</React.Fragment>
					);
				})}
			</ItemGroup>
		</>
	);
}
