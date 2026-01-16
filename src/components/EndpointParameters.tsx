import { Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemTitle } from "@shared/shadcn/item";
import { Separator } from "@shared/shadcn/separator";
import type { EndpointParameter } from "src/types/EndpointParameter";

interface EndpointParametersProps {
	parameters: EndpointParameter[];
}

export default function EndpointParameters({ parameters }: EndpointParametersProps) {
	return (
		<>
			<div className="mb-2">
				<h3>Parameters</h3>
			</div>
			<Separator />
			<ItemGroup className="flex  w-full">
				{parameters.length === 0 && <Item className="text-muted-foreground">No parameters.</Item>}
				{parameters.map((param) => {
					return (
						<Item asChild role="listitem" className="w-full items-start" key={param.name}>
							<ItemContent>
								<ItemHeader className="flex flex-row gap-3 justify-start">
									<ItemTitle>
										<span className="font-mono">{param.name}</span>
									</ItemTitle>
									<ItemDescription>{param.type}</ItemDescription>
									<ItemDescription>
										<span className={`${param.required && "text-destructive"} `}>
											{param.required ? "Required" : "Optional"}
										</span>
									</ItemDescription>
								</ItemHeader>
								<p className="text-muted-foreground">{param.description}</p>
							</ItemContent>
						</Item>
					);
				})}
			</ItemGroup>
		</>
	);
}
