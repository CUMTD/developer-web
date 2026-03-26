import { H1, H2 } from "@common/typography/heading";
import Prose from "@common/typography/prose";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "License for Distribution Requirements",
	description:
		"This page outlines additional requirements that must be met for distributing applications utilizing this API.",
	alternates: { canonical: "/license/distribution" },
};

export default async function LicenseForDistributionPage() {
	return (
		<Prose>
			<H1>License for Distribution Requirements</H1>
			<p>
				These requirements apply to any application or product that uses MTD Data and is distributed to the general
				public under the <Link href="/license#distribution">License for Distribution</Link> section of the{" "}
				<Link href="/license">Developer License Agreement and Terms of Use</Link>. MTD may update these requirements at
				any time; it is the Licensee's responsibility to maintain compliance.
			</p>

			<H2 id="design">1. Platform Design Standards</H2>
			<p>
				Applications must follow the current, official design guidelines for their target platform (for example, Apple's{" "}
				<a href="https://developer.apple.com/design/human-interface-guidelines">Human Interface Guidelines</a> for
				iOS/macOS apps, <a href="https://m3.material.io/">Material Design</a> for Android apps, or equivalent guidelines
				for other platforms). The intent is that apps feel native, predictable, and accessible to riders — not that any
				particular visual style is required.
			</p>

			<H2 id="ownership">2. Ownership and Affiliation Clarity</H2>

			<p>
				Applications must make clear to users that they are not an official MTD product and adhere to the requirements
				in <Link href="/license#identification">Identification of MTD and MTD Data</Link> in the Agreement.
				Specifically:
			</p>

			<ul>
				<li>
					The app name, icon, and store listing must not imply MTD ownership, endorsement, or official affiliation.
				</li>
				<li>
					The app must include, in an easily discoverable location (such as an About screen or store listing
					description), the attribution line required by the Agreement: "Data provided by MTD. [App Name Here] not
					affiliated with MTD"
				</li>
				<li>
					The developer's name or organization must be accurately listed as the publisher in any app store or
					distribution channel.
				</li>
			</ul>

			<H2 id="support">3. User Support</H2>

			<p>Applications must provide users with a clear and functional support channel. At minimum, this means:</p>

			<ul>
				<li>
					A support contact (email address, support page URL, or equivalent) that is publicly listed in the app store or
					distribution channel.
				</li>
				<li>Response to user-reported issues within a reasonable timeframe.</li>
				<li>
					MTD is not responsible for support of third-party applications and must not be implied as a support contact.
				</li>
			</ul>

			<H2 id="platform-compatibility">4. Platform Version Compatibility</H2>

			<p>
				Applications must remain compatible with operating system versions in active support by their platform vendor.
				When a new major OS version is released, Licensee must provide an update restoring full compatibility within 90
				days of that release. MTD may grant extensions on a case-by-case basis upon written request.
			</p>

			<H2 id="active-maintenance">5. Active Maintenance</H2>

			<p>
				Licensees are expected to actively maintain their applications. An application will be considered abandoned if
				any of the following occur:
			</p>

			<ul>
				<li>
					No update has been published in <strong>24 months</strong>, or
				</li>
				<li>
					A platform compatibility break (as described in <Link href="#platform-compatibility">Section 4</Link>) has not
					been addressed within the required timeframe, or
				</li>
				<li>
					The app's support channel (as described in <Link href="#support">Section 3</Link>) has become non-functional
					and has not been restored within <strong>30 days</strong> of MTD's notice.
				</li>
			</ul>

			<p>MTD reserves the right to revoke a Licensee's key upon a finding of abandonment.</p>

			<H2 id="listing-accuracy">6. App Store and Distribution Channel Listing Accuracy</H2>

			<p>
				App store listings and any other public-facing distribution materials must accurately represent the
				application's functionality. Listings must not make claims about data accuracy, real-time reliability, or
				service coverage that exceed what MTD guarantees under this Agreement. MTD's name may only appear in the listing
				in accordance with the attribution and affiliation requirements in <Link href="#ownership">Section 2</Link> and
				the main Agreement.
			</p>

			<H2 id="privacy-policy">7. Privacy Policy</H2>

			<p>
				Any application that collects, transmits, or stores user data — including but not limited to location data,
				usage patterns, or account information — must maintain a publicly accessible privacy policy. The privacy policy
				must accurately describe what data is collected, how it is used, and with whom it is shared. The privacy policy
				must be linked or otherwise accessible from within the application and from any app store listing. MTD Data
				itself is not user data for purposes of this section; this requirement applies to data the Licensee collects
				about users of their application.
			</p>

			<H2 id="accessibility">8. Accessibility</H2>

			<p>
				Applications must conform to{" "}
				<strong>
					<a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2 Level AA success criteria</a>
				</strong>
				, or the equivalent accessibility standard required by the target platform, whichever is more stringent. The
				intent is that MTD transit information remains usable by riders with disabilities regardless of which
				application they use to access it. Licensees are encouraged to test with assistive technologies (such as screen
				readers) on their target platforms.
			</p>
		</Prose>
	);
}
