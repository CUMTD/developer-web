import NextPreviousPageNavigatorButtons from "@common/docs/next-previous-page-navigator-button-interface";
import LinkButton from "@common/link-button";
import { KeyRound, KeyRoundIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Authentication",
	description: "How to authenticate with the API.",
	alternates: { canonical: "/reference/authentication" },
};

export default function AuthenticationPage() {
	return (
		<div className="prose dark:prose-invert col-span-2  ">
			<div className="flex flex-row gap-5 mb-5">
				<KeyRound size={50} />
			</div>
			<h1>Authentication</h1>
			<p>
				Before you can make any requests to our API, you need an API key. An API key is essentially a password. You will
				need to provide your API key with every request to let us know who you are.
			</p>

			<ApiKeyNudge />

			<h2>Rate Limiting</h2>
			<p>
				Excessive requests will be rate limited. If you are trying to scrape data, be sure to first look at our static
				GTFS feed, which is a static representation of our service.
			</p>
			<NextPreviousPageNavigatorButtons nextLink="/reference/requests" previousLink="/reference/introduction" />
		</div>
	);
}

function ApiKeyNudge() {
	return (
		<LinkButton href="/account/keys" variant="secondary" className="bg-blue-800 text-white">
			Get an API Key <KeyRoundIcon />
		</LinkButton>
	);
}
