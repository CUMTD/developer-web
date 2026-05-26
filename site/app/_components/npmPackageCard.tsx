import CopyTextButton from "@common/copy-text-button";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@ui/item";
import Link from "next/link";
import { FaNpm } from "react-icons/fa";

interface npmPackageCardProps {
	name: string;
	description: string;
	href: string;
}

export default function NpmPackageCard({ name, description, href }: npmPackageCardProps) {
	return (
		<Item className="border-2 border-accent">
			<ItemContent>
				<ItemTitle>
					{name}{" "}
					<Link href={href} target="_blank" rel="noopener noreferrer" aria-label="NPM website">
						<FaNpm size={25} className="text-muted-foreground underline decoration-dotted" />
					</Link>
				</ItemTitle>

				<ItemDescription className="mt-0! mb-3!">{description}</ItemDescription>

				<CopyTextButton text={`npm install ${name}`} />
			</ItemContent>
		</Item>
	);
}
