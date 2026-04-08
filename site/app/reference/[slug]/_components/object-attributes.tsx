import ApiAttributeItem from "@common/docs/api-attribute-item";
import ApiAttributesContainer from "@common/docs/api-attributes-container";
import type { ApiResponseAttribute } from "@t/documentation-types";
import { ItemSeparator } from "@ui/item";
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
			<ApiAttributesContainer title={title}>
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
			</ApiAttributesContainer>
		</>
	);
}
