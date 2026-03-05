"use server";

import { createClient } from "@server/supabase/server";
import type { Database } from "@t/supabase";
import { requireUserId } from "../_auth";

type LicenseVersionRow = Database["public"]["Tables"]["tos_version"]["Row"];
type DeveloperLicenseAcceptanceRow = Database["public"]["Tables"]["developer_tos_acceptance"]["Row"];

type LicenseVersionRowResult = Pick<
	LicenseVersionRow,
	"id" | "created_at" | "version" | "is_current" | "is_required" | "supersedes"
>;

type DeveloperLicenseAcceptanceRowResult = {
	accepted_at: DeveloperLicenseAcceptanceRow["accepted_at"];
};

export type LicenseStatusResult = Readonly<LicenseVersionRowResult & DeveloperLicenseAcceptanceRowResult>;

export async function getLicenseAcceptanceHistory(): Promise<LicenseStatusResult[]> {
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
