import type { ApiRequestParameter } from "@t/documentation-types";
import { Item } from "@ui/item";
import ApiAttributeItem from "./api-attribute-item";
import ApiAttributesContainer from "./api-attributes-container";

type EndpointParametersProps = Readonly<{
	parameters: ApiRequestParameter[];
	type: "path" | "query";
}>;

export default function ParametersBox({ type, parameters }: EndpointParametersProps) {
	return (
		<ApiAttributesContainer
			title={type === "path" ? "Path Parameters" : "Query Parameters"}
			hrefHelp={"/reference/requests#:~:text=Path%20and%20Query%20Parameters"}
		>
			{parameters.length === 0 && <Item className="text-muted-foreground">No {type} parameters.</Item>}
			{parameters.map((param) => {
				return <ApiAttributeItem key={param.name} attribute={param} required={param.required} showOptional />;
			})}
		</ApiAttributesContainer>
	);
}
