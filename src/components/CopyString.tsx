import { Button } from "@shared/shadcn/button";
import { ButtonGroup } from "@shared/shadcn/button-group";
import { Label } from "@shared/shadcn/label";
import { CopyIcon } from "lucide-react";

interface CopyTextProps {
	text: string;
	title?: string;
}

export default function CopyTextButton({ text, title }: CopyTextProps) {
	return (
		<>
			{title && <Label htmlFor="button-group">{title}</Label>}

			<ButtonGroup id="button-group">
				<Button className="font-mono " variant={"outline"}>
					{text}
				</Button>
				<Button variant={"secondary"}>
					<CopyIcon />
				</Button>
			</ButtonGroup>
		</>
	);
}
