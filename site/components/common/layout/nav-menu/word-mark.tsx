import DevLogo from "@common/dev-logo";
import Link from "next/link";
import Cursor from "./cursor";

export default function WordMark() {
	return (
		<Link href={"/"} className="flex flex-row items-center gap-2">
			<DevLogo width={60} />
			<span className="text-2xl italic font-bold hidden md:block font-mono">Developer Resources</span>
			<Cursor />
		</Link>
	);
}
