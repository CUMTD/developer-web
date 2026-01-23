import { Alert, AlertDescription, AlertTitle } from "@shared/shadcn/alert";
import { Button } from "@shared/shadcn/button";
import Link from "next/link";

export default function CannotAccess() {
	return (
		<Alert
			variant="destructive"
			className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50"
		>
			<AlertTitle className="text-amber-900 dark:text-amber-50 text-lg">Terms of Use not Accepted</AlertTitle>
			<AlertDescription className="flex flex-col gap-3 font-medium text-amber-900 dark:text-amber-50">
				<div className="space-y-2 text-sm">
					<p>You must accept the latest Terms of Use to access your API keys.</p>
				</div>

				<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
					<Button asChild className="w-full sm:w-auto">
						<Link href="/terms-of-use">Read &amp; Accept Terms</Link>
					</Button>
				</div>
			</AlertDescription>
		</Alert>
	);
}
