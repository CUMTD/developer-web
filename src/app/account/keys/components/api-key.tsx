import type { ApiKeyResult } from "@shared/actions/api-keys/get-api-keys";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shared/shadcn/card";
import { KeyRoundIcon } from "lucide-react";
import ApiKeyDisplay from "./api-key-display";

interface ApiKeyProps {
	apiKey: ApiKeyResult;
}

export default function ApiKey({ apiKey: { key, name, notes, created_at } }: ApiKeyProps) {
	return (
		<Card className="mx-auto w-full">
			<CardHeader>
				<CardTitle className="flex flex-row items-center gap-2">
					<KeyRoundIcon size={15} />
					{name}
				</CardTitle>
				{notes && notes.length > 0 && <CardDescription>{notes}</CardDescription>}
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
