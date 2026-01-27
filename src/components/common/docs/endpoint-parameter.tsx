import type { ApiRequestParameter } from "@t/documentation-types";
import { Item, ItemGroup } from "@ui/item";
import { Separator } from "@ui/separator";
import ApiAttributeItem from "./api-attribute-item";

interface EndpointParametersProps {
	parameters: ApiRequestParameter[];
	type: "path" | "query";
}

export default function EndpointParameters({ type, parameters }: EndpointParametersProps) {
	return (
		<div>
			<div className="mb-2">
				<h3>{type === "path" ? "Path Parameters" : "Query Parameters"}</h3>
			</div>
			<Separator />
			<ItemGroup className="flex  w-full">
				{parameters.length === 0 && <Item className="text-muted-foreground">No {type} parameters.</Item>}
				{parameters.map((param) => {
					return <ApiAttributeItem key={param.name} attribute={param} required={param.required} showOptional />;
				})}
			</ItemGroup>
		</div>
	);
}
