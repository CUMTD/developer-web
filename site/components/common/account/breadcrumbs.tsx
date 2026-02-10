import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@ui/breadcrumb";
import { Fragment } from "react";

type BreadcrumbItemModel = Readonly<{
	href: string;
	label: string;
}>;

type BreadcrumbsProps = Readonly<{
	items: ReadonlyArray<BreadcrumbItemModel>;
}>;

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{items.map((item, index) => {
					return (
						<Fragment key={`${item.href}-${item.label}`}>
							{index < items.length - 1 ? (
								<>
									<BreadcrumbItem>
										<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
								</>
							) : (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							)}
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
