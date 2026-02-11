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
	message?: string;
}>;

export default function NextPreviousPageNavigatorButtons({
	nextLink,
	nextLinkTitle,
	previousLink,
	previousLinkTitle,
	message,
}: NextPreviousPageNavigatorButtonsInterface) {
	const hasPrevious = Boolean(previousLink);
	const hasNext = Boolean(nextLink);

	return (
		<div className="ml-auto py-20 flex flex-col items-end max-w-[40ch]">
			{message && <p className="text-right text-ss m-0 p-0">{message}</p>}

			<ButtonGroup>
				{hasPrevious && (
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
		</div>
	);
}
