import type { ReactNode } from "react";
import styles from "./index.module.css";

type BrushedMetalProps = Readonly<{
	children: ReactNode;
}>;

export default function BrushedMetal({ children }: BrushedMetalProps) {
	return <div className={`${styles.metal} ${styles.linear} w-fit`}>{children}</div>;
}
