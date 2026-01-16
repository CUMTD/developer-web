"use client";

import { Button } from "@shared/shadcn/button";
import { ButtonGroup } from "@shared/shadcn/button-group";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface NextPreviousPageNavigatorButtonsInterface {
	nextLink?: string;
	previousLink?: string;
}

export default function NextPreviousPageNavigatorButtons({
	nextLink,
	previousLink,
}: NextPreviousPageNavigatorButtonsInterface) {
	const router = useRouter();

	const handlePreviousClick = () => {
		if (previousLink) {
			router.push(previousLink);
		}
	};

	const handleNextClick = () => {
		if (nextLink) {
			router.push(nextLink);
		}
	};

	return (
		<ButtonGroup className="ml-auto">
			<Button variant={"outline"} onClick={handlePreviousClick} disabled={!previousLink}>
				<ArrowLeft />
				Previous
			</Button>
			<Button variant={"outline"} onClick={handleNextClick} disabled={!nextLink}>
				Next
				<ArrowRight />
			</Button>
		</ButtonGroup>
	);
}
