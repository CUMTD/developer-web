import type AdminRequestStatsResult from "@t/admin-request-stats-result";
import type { ChartConfig } from "@ui/chart";
import { CHART_COLORS, type ChartDatum, type DashboardBarChartData } from "../dashboard-bar-chart/types";

/**
 * Transforms raw request stats rows into chart data for the "Total Daily Requests" bar chart.
 *
 * Sums `requestCount` across all status codes and endpoints per day, producing a single
 * series that represents the platform-wide request volume.
 *
 * @param rows - All (date, status_code, request_count) rows for the last 30 days.
 */
export default function buildDailyRequestsChartData(
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

	const dayMap = new Map<string, number>();

	for (const day of days) {
		const dateStr = day.toLocaleDateString("en-US", { month: "short", day: "numeric" });
		dayMap.set(dateStr, 0);
	}

	for (const { date, requestCount } of rows) {
		const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

		if (dayMap.has(dateStr)) {
			dayMap.set(dateStr, (dayMap.get(dateStr) ?? 0) + requestCount);
		}
	}

	const seriesKey = "requests";
	const color = CHART_COLORS[0];

	const chartData: ChartDatum[] = Array.from(dayMap.entries()).map(([dateStr, count]) => ({
		date: dateStr,
		[seriesKey]: count,
	}));

	const chartConfig: ChartConfig = {
		[seriesKey]: { label: "Total Requests", color },
	};

	return {
		chartData,
		chartConfig,
		chartSeries: [{ label: "Total Requests", key: seriesKey, color }],
		seriesCount: 1,
	};
}
