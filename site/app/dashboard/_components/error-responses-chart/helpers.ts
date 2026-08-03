import type AdminRequestStatsResult from "@t/admin-request-stats-result";
import type { DashboardBarChartData } from "../dashboard-bar-chart/types";
import { buildStatusCodeChartData } from "../status-code-breakdown-chart/helpers";

/**
 * Builds chart data for the "Error Responses" stacked bar chart.
 *
 * Delegates to the shared `buildStatusCodeChartData` builder after filtering out
 * successful 200 responses, leaving only non-200 status codes (4xx, 5xx, 3xx, etc.).
 *
 * @param rows - All (date, status_code, request_count) rows for the last 30 days.
 */
export default function buildErrorResponsesChartData(
	rows: Readonly<AdminRequestStatsResult[]>,
	endDate: Date,
	dayCount: number,
): DashboardBarChartData {
	const errorRows = rows.filter(({ statusCode }) => statusCode !== 200);
	return buildStatusCodeChartData(errorRows, endDate, dayCount);
}
