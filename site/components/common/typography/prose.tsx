import clsx from "clsx";
import type { ReactNode } from "react";

type ProseProps = Readonly<{
	children: ReactNode;
	className?: string | undefined;
}>;

export default function Prose({ children, className }: ProseProps) {
	const classNames = clsx("prose", "dark:prose-invert", className);
	return <div className={classNames}>{children}</div>;
}
