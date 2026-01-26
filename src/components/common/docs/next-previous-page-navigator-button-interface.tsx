import { Button } from "@ui/button";
import { ButtonGroup } from "@ui/button-group";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

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
			<Button variant={"outline"} disabled={!previousLink} asChild={hasPrevious}>
				{hasPrevious ? (
					<Link href={previousLink ?? "#"}>
						<PreviousContent />
					</Link>
				) : (
					<PreviousContent />
				)}
			</Button>
			<Button variant={"outline"} disabled={!nextLink} asChild={hasNext}>
				{hasNext ? (
					<Link href={nextLink ?? "#"}>
						<NextContent />
					</Link>
				) : (
					<NextContent />
				)}
			</Button>
		</ButtonGroup>
	);
}
