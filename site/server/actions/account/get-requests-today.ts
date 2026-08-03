"use server";

import { createClient } from "@server/supabase/server";
import type GetRequestsTodayResult from "@t/requests-today-result";
import { requireUserId } from "../_auth";

export async function getRequestsToday(): Promise<Readonly<GetRequestsTodayResult>> {
	const userId = await requireUserId();
	const supabase = await createClient();

	const todayUtc = new Date().toISOString().slice(0, 10);

	const { data, error } = await supabase
		.from("request_log_aggregate")
		.select("api_key,endpoint,request_count")
		.eq("developer_id", userId)
		.eq("date", todayUtc);

	if (error) {
		throw new Error(error.message);
	}

	const totalRequests = data.reduce((sum, row) => sum + row.request_count, 0);
	const methodsUsed = new Set(data.map((row) => row.endpoint)).size;
	const apiKeysUsed = new Set(data.map((row) => row.api_key)).size;

	return { totalRequests, methodsUsed, apiKeysUsed };
}
