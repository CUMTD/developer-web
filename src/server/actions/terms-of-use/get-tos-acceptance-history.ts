"use server";

import { createClient } from "@server/supabase/server";
import type { Database } from "@t/supabase";
import "server-only";
import { requireUserId } from "../_auth";

type TosVersionRow = Database["public"]["Tables"]["tos_version"]["Row"];
type DeveloperTosAcceptanceRow = Database["public"]["Tables"]["developer_tos_acceptance"]["Row"];

type TosVersionRowResult = Pick<
	TosVersionRow,
	"id" | "created_at" | "version" | "is_current" | "is_required" | "supersedes"
>;

type DeveloperTosAcceptanceRowResult = {
	accepted_at: DeveloperTosAcceptanceRow["accepted_at"];
};

export type TosStatusResult = Readonly<TosVersionRowResult & DeveloperTosAcceptanceRowResult>;

export async function getTosAcceptanceHistory(): Promise<TosStatusResult[]> {
	const userId = await requireUserId();
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("developer_tos_acceptance")
		.select(`
			accepted_at,
			tos_version:tos_version_id (
				id, created_at, version, is_current, is_required, supersedes
			)
		`)
		.order("accepted_at", { ascending: false })
		.eq("developer_id", userId);

	if (error) {
		throw new Error(error.message);
	}

	return (data ?? [])
		.filter(({ tos_version }) => tos_version !== null)
		.map(({ accepted_at, tos_version: { id, created_at, version, is_current, is_required, supersedes } }) => ({
			accepted_at,
			id,
			created_at,
			version,
			is_current,
			is_required,
			supersedes,
		}));
}
