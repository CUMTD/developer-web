import styles from "./BrushedMetal.module.css";

interface BrushedMetalProps {
	text: string;
}

export default function BrushedMetal({ text }: BrushedMetalProps) {
	return <div className={`${styles.metal} ${styles.linear} w-fit`}>{text}</div>;
}
