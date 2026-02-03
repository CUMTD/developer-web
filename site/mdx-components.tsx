import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

const customComponents: MDXComponents = {
	h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
	h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
	p: ({ children }) => <p className="mb-2">{children}</p>,
	ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
	li: ({ children }) => <li className="mb-1">{children}</li>,
	code: ({ children }) => <CodeComponent>{children}</CodeComponent>,
	table: ({ children }) => (
		<div className="overflow-x-auto mb-4">
			<table className="min-w-full border-collapse border border-border">{children}</table>
		</div>
	),
	thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
	tbody: ({ children }) => <tbody>{children}</tbody>,
	tr: ({ children }) => <tr className="border-b border-border">{children}</tr>,
	th: ({ children }) => <th className="border border-border px-4 py-2 text-left font-semibold">{children}</th>,
	td: ({ children }) => <td className="border border-border px-4 py-2">{children}</td>,
};

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
	return {
		...customComponents,
		...components,
	};
}

export function CodeComponent({ children }: { children: ReactNode }) {
	return <code className="rounded-md bg-sidebar-accent border w-full p-2 overflow-y-scroll ">{children}</code>;
}
