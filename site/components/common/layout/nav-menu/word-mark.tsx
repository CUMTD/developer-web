import DevLogo from "@common/dev-logo";
import Link from "next/link";

export default function WordMark() {
	return (
		<Link href={"/"} className="flex flex-row items-center gap-1">
			<DevLogo width={40} />
			<span className="text-2xl font-bold hidden md:block italic translate-y-0.5">Developer Resources</span>

			{/* <Cursor /> */}
		</Link>
	);
}
