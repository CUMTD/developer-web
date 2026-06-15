"use server";

import { createClient } from "@server/supabase/server";
import type AdminRequestStatsResult from "@t/admin-request-stats-result";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Fetches (date, status_code, request_count) rows from the daily aggregate for the
 * last 30 days. Admin RLS policy allows this query to return rows across all developers.
 * The caller is responsible for verifying admin access before invoking this action.
 *
 * These rows are shared by three dashboard charts:
 *   - Total daily requests (summed across all status codes)
 *   - Daily requests by status code (stacked bar)
 *   - Error responses (stacked bar, non-200 only)
 */
export async function getAdminRequestStats(): Promise<Readonly<AdminRequestStatsResult[]>> {
	const supabase = await createClient();

	const cutoff = new Date(Date.now() - THIRTY_DAYS_MS);
	const cutoffStr = cutoff.toISOString().split("T")[0];

	const { data, error } = await supabase
		.from("request_log_daily_aggregate")
		.select("date, status_code, request_count")
		.gte("date", cutoffStr);

	if (error) {
		throw new Error(error.message);
	}

	return data.map(({ date, status_code, request_count }) => ({
		date: new Date(`${date}T00:00:00`),
		statusCode: status_code,
		requestCount: request_count,
	}));
}
