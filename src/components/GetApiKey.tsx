"use client";

import { Button } from "@shared/shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shared/shadcn/card";
import { Checkbox } from "@shared/shadcn/checkbox";
import { Label } from "@shared/shadcn/label";
import { ScrollArea } from "@shared/shadcn/scroll-area";
import TermsOfUse from "./TermsOfUse";

export default function GetApiKey() {
	return (
		<Card>
			<CardHeader className="text-2xl">
				<CardTitle>Developer License Agreement and Terms of Use</CardTitle>
				<CardDescription>
					Last Updated: <time dateTime="2014-09-05">September 5, 2014</time>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className=" p-5 bg-background h-[40em]">
					<TermsOfUse />
				</ScrollArea>
			</CardContent>
			<CardFooter className="justify-end flex flex-row gap-5 ">
				<Label className="flex items-center gap-3">
					<Checkbox />I accept the terms and conditions
				</Label>

				<Button>Gimmie a key!</Button>
			</CardFooter>
		</Card>
	);
}
