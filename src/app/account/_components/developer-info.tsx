import { H2 } from "@common/typography/heading";
import type { DeveloperResult } from "@t/developer-types";
import { Item, ItemContent, ItemDescription, ItemHeader } from "@ui/item";
import Keys from "./keys";

type DeveloperInfoProps = Readonly<{
	developer: DeveloperResult;
}>;

export default function DeveloperInfo({ developer: { tokens_per_hour, current_tokens } }: DeveloperInfoProps) {
	return (
		<div className="space-y-4">
			<H2 wrapProse>Account Info</H2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				<Item variant="muted">
					<ItemContent>
						<ItemHeader>Maximum Requests / Hour</ItemHeader>
						<ItemDescription>{tokens_per_hour}</ItemDescription>
					</ItemContent>
				</Item>
				<Item variant="muted">
					<ItemContent>
						<ItemHeader>Current Tokens</ItemHeader>
						<ItemDescription>{current_tokens}</ItemDescription>
					</ItemContent>
				</Item>
				<Keys />
			</div>
		</div>
	);
}
