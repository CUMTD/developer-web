import LinkButton from "@common/link-button";
import { ButtonGroup } from "@ui/button-group";
import { ArrowLeft, ArrowRight } from "lucide-react";

function PreviousContent({ title }: Readonly<{ title: string }>) {
	return (
		<>
			<ArrowLeft />
			{title}
		</>
	);
}

function NextContent({ title }: Readonly<{ title: string }>) {
	return (
		<>
			{title}
			<ArrowRight />
		</>
	);
}

type NextPreviousPageNavigatorButtonsInterface = Readonly<{
	nextLink?: string;
	nextLinkTitle?: string;
	previousLink?: string;
	previousLinkTitle?: string;
}>;

export default function NextPreviousPageNavigatorButtons({
	nextLink,
	nextLinkTitle,
	previousLink,
	previousLinkTitle,
}: NextPreviousPageNavigatorButtonsInterface) {
	const hasPrevious = Boolean(previousLink);
	const hasNext = Boolean(nextLink);

	return (
		<ButtonGroup className="ml-auto py-20">
			{hasPrevious && hasNext && (
				<LinkButton href={previousLink ?? "#"} variant="ghost">
					<PreviousContent title={previousLinkTitle ?? "Previous"} />
				</LinkButton>
			)}

			{hasNext && (
				<LinkButton href={nextLink ?? "#"} variant="ghost">
					<NextContent title={nextLinkTitle ?? "Next"} />
				</LinkButton>
			)}
		</ButtonGroup>
	);
}
