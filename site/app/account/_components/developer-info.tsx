import LinkButton from "@common/link-button";
import type { DeveloperResult } from "@t/developer-types";
import type GetRequestsTodayResult from "@t/requests-today-result";
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader } from "@ui/item";
import { ChartLine } from "lucide-react";
import Keys from "./keys";

type DeveloperInfoProps = Readonly<{
	developer: DeveloperResult;
	requestsToday: GetRequestsTodayResult;
}>;

export default function DeveloperInfo({
	developer: { tokens_per_hour, current_tokens },
	requestsToday: { totalRequests },
}: DeveloperInfoProps) {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 ">
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

				<Item variant="muted">
					<ItemContent>
						<ItemHeader>Total Requests Today</ItemHeader>
						<ItemDescription>{totalRequests}</ItemDescription>
					</ItemContent>
					<ItemActions>
						<LinkButton variant="default" href="/account/usage" className="flex items-center gap-2">
							<ChartLine className="h-4 w-4" />
							Details
						</LinkButton>
					</ItemActions>
				</Item>
			</div>
		</div>
	);
}
