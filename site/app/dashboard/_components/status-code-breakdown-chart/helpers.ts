import type AdminRequestStatsResult from "@t/admin-request-stats-result";
import type { ChartConfig } from "@ui/chart";
import { CHART_COLORS, type ChartDatum, type DashboardBarChartData } from "../dashboard-bar-chart/types";

/**
 * Shared builder for status-code stacked bar charts. Called by both
 * `status-code-breakdown-chart/helpers.ts` (all codes) and
 * `error-responses-chart/helpers.ts` (non-200 only).
 *
 * For each day in the last 30 days, sums `requestCount` per `statusCode`, producing
 * one stacked bar series per distinct status code. Status codes are sorted ascending
 * (2xx before 4xx before 5xx) so the legend and stacks appear in a consistent order.
 *
 * @param rows - Pre-filtered (date, status_code, request_count) rows.
 */
export function buildStatusCodeChartData(
	rows: Readonly<AdminRequestStatsResult[]>,
	endDate: Date,
	dayCount: number,
): DashboardBarChartData {
	const days: Date[] = [];

	for (let index = dayCount - 1; index >= 0; index--) {
		const day = new Date(endDate);
		day.setDate(day.getDate() - index);
		day.setHours(0, 0, 0, 0);
		days.push(day);
	}

	// Collect distinct status codes and sort ascending.
	const statusCodes = Array.from(new Set(rows.map(({ statusCode }) => statusCode))).sort((a, b) => a - b);

	const chartSeries = statusCodes.map((code, index) => ({
		label: String(code),
		key: `code-${index}`,
		color: CHART_COLORS[index % CHART_COLORS.length],
	}));

	const chartConfig: ChartConfig = Object.fromEntries(
		chartSeries.map(({ label, key, color }) => [key, { label, color }]),
	);

	const codeToKey = new Map(statusCodes.map((code, index) => [code, `code-${index}`]));

	// Pre-populate all buckets with 0 for every series.
	const dayMap = new Map<string, ChartDatum>();

	for (const day of days) {
		const dateStr = day.toLocaleDateString("en-US", { month: "short", day: "numeric" });
		const row: ChartDatum = { date: dateStr };

		for (const { key } of chartSeries) {
			row[key] = 0;
		}

		dayMap.set(dateStr, row);
	}

	for (const { date, statusCode, requestCount } of rows) {
		const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
		const seriesKey = codeToKey.get(statusCode);
		const dayData = dayMap.get(dateStr);

		if (dayData && seriesKey) {
			dayData[seriesKey] = (dayData[seriesKey] as number) + requestCount;
		}
	}

	return {
		chartData: Array.from(dayMap.values()),
		chartConfig,
		chartSeries,
		seriesCount: statusCodes.length,
	};
}
