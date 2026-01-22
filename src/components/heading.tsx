import { createElement, type JSX, type ReactNode } from "react";
import Prose from "./prose";

type HeadingProps = Readonly<{
	level: 1 | 2 | 3 | 4 | 5 | 6;
	children: ReactNode;
	className?: string;
	containerClassName?: string;
}> &
	Omit<JSX.IntrinsicElements["h1"], "children" | "className">;

export default function Heading({ level, children, className, containerClassName, ...rest }: HeadingProps) {
	const Tag = `h${level}` as keyof JSX.IntrinsicElements;

	return <Prose className={containerClassName}>{createElement(Tag, { className, ...rest }, children)}</Prose>;
}

export function H1(props: Omit<HeadingProps, "level">) {
	return <Heading level={1} {...props} />;
}

export function H2(props: Omit<HeadingProps, "level">) {
	return <Heading level={2} {...props} />;
}

export function H3(props: Omit<HeadingProps, "level">) {
	return <Heading level={3} {...props} />;
}

export function H4(props: Omit<HeadingProps, "level">) {
	return <Heading level={4} {...props} />;
}

export function H5(props: Omit<HeadingProps, "level">) {
	return <Heading level={5} {...props} />;
}

export function H6(props: Omit<HeadingProps, "level">) {
	return <Heading level={6} {...props} />;
}
