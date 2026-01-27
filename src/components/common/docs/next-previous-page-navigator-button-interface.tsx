import LinkButton from "@common/link-button";
import { Button } from "@ui/button";
import { ButtonGroup } from "@ui/button-group";
import { ArrowLeft, ArrowRight } from "lucide-react";

function PreviousContent() {
	return (
		<>
			<ArrowLeft />
			Previous
		</>
	);
}

function NextContent() {
	return (
		<>
			Next
			<ArrowRight />
		</>
	);
}

type NextPreviousPageNavigatorButtonsInterface = Readonly<{
	nextLink?: string;
	previousLink?: string;
}>;

export default function NextPreviousPageNavigatorButtons({
	nextLink,
	previousLink,
}: NextPreviousPageNavigatorButtonsInterface) {
	const hasPrevious = Boolean(previousLink);
	const hasNext = Boolean(nextLink);

	return (
		<ButtonGroup className="ml-auto">
			{hasPrevious ? (
				<LinkButton href={previousLink ?? "#"} variant="outline">
					<PreviousContent />
				</LinkButton>
			) : (
				<Button variant="outline" disabled>
					<PreviousContent />
				</Button>
			)}

			{hasNext ? (
				<LinkButton href={nextLink ?? "#"} variant="outline">
					<NextContent />
				</LinkButton>
			) : (
				<Button variant="outline" disabled>
					<NextContent />
				</Button>
			)}
		</ButtonGroup>
	);
}
