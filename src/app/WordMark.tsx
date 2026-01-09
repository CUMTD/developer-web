import Image from "next/image";
import Link from "next/link";

export default function WordMark() {
	return (
		<Link href={"/"} className="flex flex-row items-center gap-2">
			<Image priority src="/mtd.svg" alt="MTD" width={100} height={50} />
			<span className="text-2xl italic font-bold">Developer Resources</span>
		</Link>
	);
}
