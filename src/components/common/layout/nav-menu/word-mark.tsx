import Image from "next/image";
import Link from "next/link";

export default function WordMark() {
	return (
		<Link href={"/"} className="flex flex-row items-center gap-2">
			<Image
				priority
				src="/mtd.svg"
				alt="MTD"
				width={60}
				height={40}
				style={{
					width: "60px",
					height: "40px",
				}}
				placeholder="empty"
			/>
			<span className="text-2xl italic font-bold">Developer</span>
		</Link>
	);
}
