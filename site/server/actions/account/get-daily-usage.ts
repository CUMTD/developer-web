"use server";

import { createClient } from "@server/supabase/server";
import type DailyUsageResult from "@t/daily-usage-result";
import { requireUserId } from "../_auth";

export async function getDailyUsage(): Promise<Readonly<DailyUsageResult[]>> {
	const userId = await requireUserId();
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("request_log_aggregate")
		.select("date, utc_hour, api_key, endpoint, status_code, request_count, average_response_time_ms")
		.eq("developer_id", userId);

	if (error) {
		throw new Error(error.message);
	}

	return data.map(({ date, utc_hour, api_key, endpoint, status_code, request_count, average_response_time_ms }) => {
		const utcDate = new Date(`${date}T${utc_hour.toString().padStart(2, "0")}:00:00Z`);
		return {
			utcDate,
			utcHour: utc_hour,
			localDate: new Date(utcDate),
			localHour: new Date(utcDate).getHours(),
			apiKey: api_key,
			endpoint,
			statusCode: status_code,
			requestCount: request_count,
			averageResponseTimeMs: average_response_time_ms,
		};
	});
}
