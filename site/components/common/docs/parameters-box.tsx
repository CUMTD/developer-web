import type { ApiRequestParameter } from "@t/documentation-types";
import { Item, ItemGroup, ItemTitle } from "@ui/item";
import ApiAttributeItem from "./api-attribute-item";

type EndpointParametersProps = Readonly<{
	parameters: ApiRequestParameter[];
	type: "path" | "query";
}>;

export default function ParametersBox({ type, parameters }: EndpointParametersProps) {
	return (
		<ItemGroup className="flex  w-full rounded-md border border-accent">
			<ItemTitle className="bg-accent font-semibold p-3 m-0! rounded-t-md w-full sticky top-0">
				<h3>{type === "path" ? "Path Parameters" : "Query Parameters"}</h3>
			</ItemTitle>
			{parameters.length === 0 && <Item className="text-muted-foreground">No {type} parameters.</Item>}
			{parameters.map((param) => {
				return <ApiAttributeItem key={param.name} attribute={param} required={param.required} showOptional />;
			})}
		</ItemGroup>
	);
}
