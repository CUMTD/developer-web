import { ItemGroup, ItemTitle } from "@ui/item";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaQuestionCircle } from "react-icons/fa";

type ApiAttributesContainerProps = Readonly<{
	title: string;
	children: ReactNode;
	hrefHelp?: string;
}>;

export default function ApiAttributesContainer({ title, children, hrefHelp: helpLink }: ApiAttributesContainerProps) {
	return (
		<ItemGroup className={"w-full rounded-md border border-accent"}>
			<ItemTitle className={"bg-accent font-semibold p-3 m-0! rounded-t-md w-full sticky top-0 z-50"}>
				<h3>{title}</h3>
				{helpLink && (
					<Link
						href={helpLink}
						title="What are parameters?"
						className="text-sm text-muted-foreground -translate-y-0.5 ml-auto"
					>
						<FaQuestionCircle />
					</Link>
				)}
			</ItemTitle>
			{children}
		</ItemGroup>
	);
}
