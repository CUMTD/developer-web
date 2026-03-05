import Image from "next/image";
import Link from "next/link";
import Cursor from "./cursor";

export default function WordMark() {
	return (
		<Link href={"/"} className="flex flex-row items-center gap-2">
			<Image
				priority
				src="/dev-logo.svg"
				alt="MTD Developer Logo"
				width={60}
				height={60}
				className="w-15 h-15"
				placeholder="empty"
			/>
			<span className="text-2xl italic font-bold hidden md:block">Developer Resources</span>
			<Cursor />
		</Link>
	);
}
