import { Item, ItemGroup } from "@shared/shadcn/item";
import { Separator } from "@shared/shadcn/separator";
import type { ApiRequestParameter } from "src/types/DocumentationTypes";
import ApiAttributeItem from "./ApiAttributeItem";

interface EndpointParametersProps {
	parameters: ApiRequestParameter[];
}

export default function EndpointParameters({ parameters }: EndpointParametersProps) {
	// TODO: replace with ApiAttributeItem
	return (
		<>
			<div className="mb-2">
				<h3>Query Parameters</h3>
			</div>
			<Separator />
			<ItemGroup className="flex  w-full">
				{parameters.length === 0 && <Item className="text-muted-foreground">No parameters.</Item>}
				{parameters.map((param) => {
					return <ApiAttributeItem key={param.name} attribute={param} required={param.required} showOptional />;
				})}
			</ItemGroup>
		</>
	);
}
