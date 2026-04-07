import NextPreviousPageNavigatorButtons from "@common/docs/next-previous-page-navigator-button-interface";
import LinkButton from "@common/link-button";
import { KeyRound, KeyRoundIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

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
			<h2>API Keys</h2>

			<p>
				Before you can make any API requests, you need an API key. You will need to provide your API key with every
				request to let us know who you are.
			</p>
			<em>
				An API key is essentially a password &mdash; treat it as such.{" "}
				<b>Do not commit code containing this key to version control (e.g. a GitHub repository).</b> Always store your
				key in an environment variable.
			</em>
			<ApiKeyNudge />

			<h2>Including your Key in a Request</h2>
			<p>
				API Keys should be passed using the <code>X-ApiKey</code>{" "}
				<Link
					target="_blank"
					rel="noopener noreferrer"
					href={"https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers"}
				>
					HTTP header
				</Link>{" "}
				with your API key as the value.
			</p>
			<p>This is a significant change from our previous API, in which keys were included in the URL itself.</p>

			<h2>Rate Limiting</h2>
			<p>
				Excessive requests will be rate limited. You can see your current request budget over at your{" "}
				<Link href={"/account"}>account page</Link>. Build your application to cache responses where necessary, and be
				mindful not to spam us with requests!
			</p>
			<NextPreviousPageNavigatorButtons nextLink="/reference/requests" previousLink="/reference/introduction" />
		</div>
	);
}

function ApiKeyNudge() {
	return (
		<LinkButton
			href="/account/keys"
			variant="secondary"
			className="bg-[#002f87] text-white in-[.terminal]:bg-[#1D7C33] in-[.terminal]:text-white"
		>
			Get an API Key <KeyRoundIcon />
		</LinkButton>
	);
}
