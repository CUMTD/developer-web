"use server";

import { createClient } from "@server/supabase/server";
import type AdminDeveloperActivityResult from "@t/admin-developer-activity-result";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Fetches (date, developer_id) pairs from the daily aggregate for the last 30 days.
 * Admin RLS policy allows this query to return rows across all developers.
 * The caller is responsible for verifying admin access before invoking this action.
 */
export async function getAdminDeveloperActivity(): Promise<Readonly<AdminDeveloperActivityResult[]>> {
	const supabase = await createClient();

	const cutoff = new Date(Date.now() - THIRTY_DAYS_MS);
	const cutoffStr = cutoff.toISOString().split("T")[0];

	const { data, error } = await supabase
		.from("request_log_daily_aggregate")
		.select("date, developer_id")
		.gte("date", cutoffStr);

	if (error) {
		throw new Error(error.message);
	}

	return data.map(({ date, developer_id }) => ({
		date: new Date(`${date}T00:00:00`),
		developerId: developer_id,
	}));
}
