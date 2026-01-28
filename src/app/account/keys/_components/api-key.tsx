import LinkButton from "@common/link-button";
import type { ApiKeyResult } from "@server/actions/api-keys/get-api-keys";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { KeyRoundIcon, PencilIcon } from "lucide-react";
import ApiKeyDisplay from "./api-key-display";

type ApiKeyProps = Readonly<{
	apiKey: ApiKeyResult;
}>;

export default function ApiKey({ apiKey: { key, name, notes, created_at } }: ApiKeyProps) {
	return (
		<Card className="mx-auto w-full">
			<CardHeader>
				<CardTitle className="flex flex-row items-center gap-2">
					<KeyRoundIcon size={15} />
					{name}
				</CardTitle>
				{notes && notes.length > 0 && <CardDescription>{notes}</CardDescription>}
				<CardAction>
					<LinkButton
						href={`/account/keys/${key}`}
						variant="ghost"
						linkProps={{ className: "flex items-center gap-2" }}
					>
						<PencilIcon className="h-4 w-4" />
						<span>Edit</span>
					</LinkButton>
				</CardAction>
			</CardHeader>
			<CardContent className="w-full">
				<ApiKeyDisplay apiKey={key} />
			</CardContent>
			<CardFooter>
				<p className="text-sm text-muted-foreground">Created at: {new Date(created_at).toLocaleString()}</p>
			</CardFooter>
		</Card>
	);
}
