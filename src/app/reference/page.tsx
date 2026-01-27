import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Reference",
	description: "API documentation reference.",
	alternates: { canonical: "/reference/introduction" },
	robots: { index: false, follow: true },
};

export default function ReferencePage() {
	redirect("/reference/introduction");
}
