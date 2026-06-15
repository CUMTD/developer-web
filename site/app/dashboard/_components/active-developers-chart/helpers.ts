import type AdminDeveloperActivityResult from "@t/admin-developer-activity-result";
import type { ChartConfig } from "@ui/chart";
import { CHART_COLORS, type ChartDatum, type DashboardBarChartData } from "../dashboard-bar-chart/types";

/**
 * Transforms raw developer activity rows into chart data for the "Daily Active Developers"
 * bar chart.
 *
 * A developer is counted as "active" on a given day if they appear in at least one row
 * in `request_log_daily_aggregate` for that date. Because the table has one row per
 * (developer_id, date, endpoint, status_code), a single developer can appear many times
 * per day — we deduplicate with a Set before counting.
 *
 * @param rows - All (date, developer_id) rows for the last 30 days.
 */
export default function buildActiveDevelopersChartData(
	rows: Readonly<AdminDeveloperActivityResult[]>,
): DashboardBarChartData {
	const now = new Date();
	const last30Days: Date[] = [];

	for (let index = 29; index >= 0; index--) {
		const day = new Date(now);
		day.setDate(day.getDate() - index);
		day.setHours(0, 0, 0, 0);
		last30Days.push(day);
	}

	// Map dateStr → set of distinct developer IDs seen on that day.
	const developersByDay = new Map<string, Set<string>>();

	for (const day of last30Days) {
		const dateStr = day.toLocaleDateString("en-US", { month: "short", day: "numeric" });
		developersByDay.set(dateStr, new Set());
	}

	for (const { date, developerId } of rows) {
		const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
		developersByDay.get(dateStr)?.add(developerId);
	}

	const seriesKey = "developers";
	const color = CHART_COLORS[0];

	const chartData: ChartDatum[] = Array.from(developersByDay.entries()).map(([dateStr, devSet]) => ({
		date: dateStr,
		[seriesKey]: devSet.size,
	}));

	const chartConfig: ChartConfig = {
		[seriesKey]: { label: "Active Developers", color },
	};

	return {
		chartData,
		chartConfig,
		chartSeries: [{ label: "Active Developers", key: seriesKey, color }],
		seriesCount: 1,
	};
}
