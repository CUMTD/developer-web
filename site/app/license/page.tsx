import { H1, H2 } from "@common/typography/heading";
import Prose from "@common/typography/prose";
import { createClient } from "@server/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";
import AcceptLicense from "./_components/accept-license";

export const metadata: Metadata = {
	title: "License Agreement and Terms of Use",
	description: "Read and accept the License Agreement and Terms of Use for accessing MTD data.",
	alternates: { canonical: "/license" },
};

export default async function LicensePage() {
	const supabase = await createClient();
	const { data: authData } = await supabase.auth.getClaims();

	return (
		<article>
			<Prose>
				<H1>Developer License Agreement and Terms of Use</H1>
				<H2 className="text-muted-foreground mb-4 font-light text-[1.1rem]">
					Last Updated: <time dateTime="2026-02-24">2/24/2026</time>
				</H2>

				<section>
					<p>
						The Champaign-Urbana Mass Transit District ("Licensor" or "MTD") owns and maintains certain electronic
						data, including but not limited to MTD route and schedule data, service alert data and real-time departure
						data ("MTD Data"). MTD hereby grants you ("Licensee") a non-exclusive, limited and revocable license to
						access, use, reproduce, and redistribute (in certain limited circumstances) MTD Data, subject to the
						following terms and conditions:
					</p>

					<H2 id="api-included">Application Programming Interfaces Included</H2>
					<p>
						The Application Programming Interfaces (APIs) included in this Developer License Agreement and Terms of Use
						(the “Agreement”) are as follows:
					</p>
					<ol>
						<li>
							The API located at <a href="https://api.mtd.dev/">https://api.mtd.dev/</a>; and
						</li>
						<li>
							The General Transit Feed Specification Realtime Feed (GTFS-RT) located at{" "}
							<a href="https://gtfs-rt.mtd.org/">https://gtfs-rt.mtd.org/</a>
						</li>
					</ol>

					<H2 id="terms">Terms of Use</H2>
					<p>
						By using the MTD Data, the Licensee agrees to be bound by all of the terms and conditions set forth in this
						Agreement.
					</p>

					<H2 id="license-for-use">License for Use</H2>
					<p>
						Any Licensee may use the MTD Data for personal, educational, research and/or development purposes so long as
						Licensee does not use MTD Data to create an application or any other program or product for distribution to
						the general public at scale (e.g. via Apple App Store, public website, etc.).
					</p>

					<H2 id="distribution">License for Distribution</H2>
					<p>
						Licensee may create an application or other program or product using MTD Data and distribute such program or
						product to any third party (including to the general public at scale) only if (1) such program or product
						meets and adheres at all times to certain quality standards set forth by MTD from time to time, and (2)
						Licensee receives written confirmation from MTD, in advance, that such quality standards have been met. MTD
						shall solely determine if Licensee's program or product meets MTD's quality standards, in MTD's sole
						discretion, and MTD's determination may be withdrawn or revoked at any time in MTD's sole discretion. Such
						quality standards may be revised at any time by MTD without any notice to Licensee, and are set forth at
						<Link href="/license/distribution">https://mtd.dev/license/distribution</Link>.
					</p>

					<H2 id="conditions-and-limits">Conditions and Limits on License</H2>
					<p>
						Licensee will be assigned a unique identifier or "key" by Licensor to access MTD Data. Licensee agrees to
						include that key in every copy of Licensee's programs or products distributed to Licensee's customers for
						use in accessing MTD Data or MTD servers. Licensee shall limit its uses of MTD Data to uses that assist mass
						transportation riders or that further the promotion of public transportation. This license (and Licensee's
						key) may be revoked by MTD at any time and for any reason.
					</p>

					<H2 id="ownership">Ownership</H2>
					<p>
						All right, title and interest to any copyrights, patents or other intellectual property rights embodied in
						MTD Data, including but not limited to, any new or useful art, discovery, improvement, technical development
						or invention incorporated in the MTD Data, whether or not patentable, and all related know-how, designs,
						mask works, trademarks, formulae, processes, trade secrets, ideas, artworks, software or other copyrightable
						or patentable work, are MTD's sole and exclusive property, except for any pre-existing rights belonging to a
						third party, which remain solely and exclusively the property of that party, and except for any rights of
						third parties resulting from new or derivative works that incorporate the MTD Data.
					</p>

					<H2 id="identification">Identification of MTD and MTD Data</H2>
					<p>
						Except as authorized herein, Licensee agrees to refrain from using MTD's names or logo to co-brand or market
						Licensee's programs or products. If Licensee distributes its software program to others, Licensee's program
						shall credit the Champaign-Urbana Mass Transit District for supplying the MTD Data. The credit line should
						be placed as close to the actual MTD Data information as reasonably possible. Any such credit line should
						read: "Data provided by MTD. <em>[App Name Here]</em> not affiliated with MTD". Licensee shall not use any
						terms or acronyms which could cause confusion with the MTD name (either in full or as an acronym), without
						either (1) including the above-referenced language giving credit to MTD if MTD Data was used by Licensee, or
						(2) including a disclaimer in Licensee's materials that Licensee's programs and products are not affiliated
						in any way with MTD.
					</p>

					<H2 id="disclaimer-of-warranties">Disclaimer of Warranties</H2>
					<p>
						Licensee agrees that the MTD Data is provided on an "as is" and "as available" basis.{" "}
						<strong>
							MTD disclaims all warranties, express or implied, including but not limited to implied warranties of
							merchantability, fitness for a particular purposes, accuracy of data or non-infringement.
						</strong>
						Licensee agrees that its use of MTD Data is at Licensee's sole risk. For purposes of this Agreement, MTD
						Data includes any data and/or information derived from any electronically transferred data and/or
						information received by Licensee from MTD.
					</p>

					<H2 id="no-guarantee-or-warranty-of-accuracy-or-availability-of-data">
						No Guarantee or Warranty of Accuracy or Availability of Data
					</H2>
					<p>
						MTD reserves the right at any time and from time to time to discontinue posting the MTD Data (or any part
						thereof), temporarily or permanently, with or without notice to Licensee. Licensee agrees that MTD will not
						be liable to Licensee for any inaccuracy, modification, suspension or discontinuance of the availability of
						the MTD Data. MTD reserves the right to alter, correct or modify MTD Data at any time without prior notice
						to Licensee.
					</p>

					<H2 id="indemnification">Indemnification</H2>
					<p>
						Licensee agrees to indemnify, defend and hold harmless MTD and its officers, directors, and employees from
						and against any and all fines, suits, proceedings, claims, causes of action, demands, injuries, property
						damage, money damages, expenses or liabilities of any kind or of any nature (including MTD's attorneys' fees
						and costs of defense, if applicable), whether incurred and initiated by MTD or Licensee's customers or other
						third parties, arising out of or in connection with Licensee's use and/or distribution of MTD Data, provided
						that any such third party allegation or claim is not based on the MTD Data as originally provided. MTD will
						give Licensee prompt notice of any third party claim. If MTD requests Licensee to defend MTD in any third
						party claim, MTD will have the right to participate in the settlement or defense, with its own counsel and
						at its own expense, but Licensee will have the right to control the settlement or defense, subject to MTD's
						prior approval of any settlement.
					</p>

					<H2 id="limitation-on-liability">Limitation on Liability</H2>
					<p>
						Licensee agrees that MTD and its employees, officers, directors and agents will not be liable for damages of
						any kind arising from the use of MTD Data, including but not limited to direct, indirect, incidental,
						punitive and consequential damages, regardless of whether such damages arise based upon contract,
						negligence, strict liability in tort, warranty or other legal theory.
					</p>

					<H2 id="binding-effect">Binding Effect</H2>
					<p>
						The terms of this Agreement shall be binding upon the Licensee and the MTD. None of the rights, duties or
						obligations under this Agreement may be assigned without the express written consent of MTD. Once properly
						assigned with MTD’s written consent, this Agreement shall be binding upon and inure to the benefit of the
						successors and assigns of the parties as if they were parties to this Agreement.
					</p>

					<H2 id="severability">Severability</H2>
					<p>
						To the extent a court of competent jurisdiction determines that any part or provision of this Agreement is
						unenforceable as a matter of law, such part or provision of this Agreement will be deemed severable and the
						remainder of this Agreement shall survive and remain enforceable.
					</p>

					<H2 id="applicable-law-and-forum">Applicable Law and Forum</H2>
					<p>
						The laws of the State of Illinois govern all rights and obligations under this Agreement, without giving
						effect to any principles of conflicts of laws.
					</p>
					<p>
						Any use of MTD Data shall be deemed made in the State of Illinois, USA, regardless of the location of the
						Licensee. The Licensee agrees that any dispute with the MTD arising out of any use of MTD Data or out of
						this Agreement shall be brought by the Licensee exclusively in the state court situated in Champaign County,
						State of Illinois. The Licensee hereby agrees that such venue is reasonable and appropriate.
					</p>
					<p>
						Licensee and MTD will at all times observe and comply with all applicable laws, ordinances, rules,
						regulations and executive orders of Federal, state and local government entities, now existing or
						hereinafter in effect, which may in any manner affect the performance of this Agreement. Provisions required
						by law, ordinances, rules, regulations or executive orders to be inserted herein will be deemed inserted
						herein whether or not they appear in this Agreement or, upon application by either party, this Agreement
						will forthwith be amended to literally make such insertion; however, in no event will failure to insert such
						provisions prevent the enforcement of this Agreement.
					</p>

					<H2 id="entire-agreement">Entire Agreement</H2>
					<p>
						This Agreement constitutes the complete and exclusive agreement between MTD and Licensee with respect to the
						subject matter hereof and supersedes all prior oral or written understandings, communications, or agreements
						not specifically incorporated herein. MTD reserves the right to modify or terminate this Agreement,
						including a revocation of Licensee's license(s) granted herein, at any time.
					</p>

					<H2 id="no-waiver">No Waiver</H2>
					<p>
						Waiver by MTD of strict performances of any provision of this Agreement will not be a waiver of or prejudice
						MTD's right to require strict performance of the same provision in the future or of any other provision of
						this Agreement.
					</p>

					<H2 id="disclaimer">Disclaimer</H2>
					<p>
						No provision of this Agreement, nor any act of the Licensee or the MTD shall be deemed or construed by
						either of the parties, or by third persons, to create any relationship of third party beneficiary, or of
						principal or agent, or of limited or general partnership, or of joint venture, or of any association or
						relationship involving the Licensee and MTD.
					</p>
				</section>
				{authData && (
					<section className="mt-5 mb-100">
						<H2>Acceptance</H2>
						<AcceptLicense />
					</section>
				)}
			</Prose>
		</article>
	);
}
