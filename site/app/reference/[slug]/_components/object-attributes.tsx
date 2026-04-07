import ApiAttributeItem from "@common/docs/api-attribute-item";
import type { ApiResponseAttribute } from "@t/documentation-types";
import { ItemGroup, ItemSeparator } from "@ui/item";
import { Separator } from "@ui/separator";
import React from "react";

type ObjectAttributesProps = Readonly<{
	title: string;
	attributes: ApiResponseAttribute[];
}>;
export default function ObjectAttributes({ title, attributes }: ObjectAttributesProps) {
	return (
		<>
			<Separator />
			<h3 className="prose dark:prose-invert font-normal">{title}</h3>
			<ItemGroup>
				{attributes.map((attr) => {
					return (
						<React.Fragment key={attr.name}>
							<ItemSeparator />
							<ApiAttributeItem attribute={attr} childAttributes={attr.childAttributes ?? []} />
						</React.Fragment>
					);
				})}
			</ItemGroup>
		</>
	);
}
