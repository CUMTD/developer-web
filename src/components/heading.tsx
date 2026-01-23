import { createElement, type JSX, type ReactNode } from "react";
import Prose from "./prose";

type SharedHeadingProps = {
	level: 1 | 2 | 3 | 4 | 5 | 6;
	children: ReactNode;
} & Omit<JSX.IntrinsicElements["h1"], "children">;

type WrapProseProps = {
	wrapProse: true;
	containerClassName?: string;
};

type NoWrapProseProps = {
	wrapProse?: false;
	containerClassName?: undefined;
};

type HeadingProps = Readonly<SharedHeadingProps & (WrapProseProps | NoWrapProseProps)>;

type HeadingWithoutLevelProps = Readonly<Omit<SharedHeadingProps, "level"> & (WrapProseProps | NoWrapProseProps)>;

function isWrapProseProps(props: HeadingProps): props is SharedHeadingProps & WrapProseProps {
	return props.wrapProse === true;
}

export default function Heading(props: HeadingProps) {
	const Tag = `h${props.level}` as keyof JSX.IntrinsicElements;

	if (isWrapProseProps(props)) {
		const { level, children, className, wrapProse, containerClassName, ...rest } = props;

		return <Prose className={containerClassName}>{createElement(Tag, { className, ...rest }, children)}</Prose>;
	}

	const { level, children, className, wrapProse, containerClassName, ...rest } = props;
	return createElement(Tag, { className, ...rest }, children);
}

export function H1(props: HeadingWithoutLevelProps) {
	return <Heading level={1} {...props} />;
}

export function H2(props: HeadingWithoutLevelProps) {
	return <Heading level={2} {...props} />;
}

export function H3(props: HeadingWithoutLevelProps) {
	return <Heading level={3} {...props} />;
}

export function H4(props: HeadingWithoutLevelProps) {
	return <Heading level={4} {...props} />;
}

export function H5(props: HeadingWithoutLevelProps) {
	return <Heading level={5} {...props} />;
}

export function H6(props: HeadingWithoutLevelProps) {
	return <Heading level={6} {...props} />;
}
