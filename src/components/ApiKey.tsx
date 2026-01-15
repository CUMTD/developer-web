"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/shadcn/card";
import { KeyRoundIcon } from "lucide-react";
import CopyTextButton from "./CopyString";

interface ApiKeyProps {
	apiKey: string;
}

export default function ApiKey({ apiKey }: ApiKeyProps) {
	return (
		<Card className="mx-auto w-full">
			<CardHeader>
				<CardTitle className="flex flex-row items-center gap-2">
					<KeyRoundIcon size={15} />
					API Key
				</CardTitle>
				<CardDescription>
					Treat this like a password, do not share it with anyone, and do not send or upload code containing this key to
					the internet, especially GitHub.
				</CardDescription>
			</CardHeader>
			{/* <CardFooter> */}
			<CardContent className="w-full">
				<CopyTextButton apiKey text={apiKey} />
				{/* </CardFooter> */}
			</CardContent>
		</Card>
	);
}
