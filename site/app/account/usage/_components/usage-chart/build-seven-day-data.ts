import type DailyUsageResult from "@t/daily-usage-result";
import type { ChartConfig } from "@ui/chart";
import { CHART_COLORS, type ChartDatum, type ChartSeries, type UsageChartData } from "./types";

/**
 * Transforms raw DailyUsageResult rows into the shape expected by UsageChart.
 *
 * The output always contains exactly 7 day buckets (today and the 6 preceding
 * days), with each bucket pre-initialised to 0 for every endpoint series. Days
 * that have no matching rows in `last7DaysUsage` remain at 0 rather than being
 * absent, which keeps the x-axis labels stable and prevents Recharts from
 * compressing the time range.
 *
 * Series are assigned in the order they first appear in the input. Because the
 * same CHART_COLORS palette is shared across all charts, series with the same
 * index across different charts will share a color — intentional, so the legend
 * is visually consistent when multiple charts show the same endpoints.
 *
 * @param last7DaysUsage - Rows already filtered to the last 7 days (caller's
 *   responsibility). Filtering happens in page.tsx to avoid repeating the work
 *   across the several builders that all use the same window.
 */
export default function buildSevenDayData(last7DaysUsage: DailyUsageResult[], endDate: Date): UsageChartData {
	const last7Days: Date[] = [];

	// Build an ordered list of the 7 days ending at endDate (index 6 = endDate, 0 = 6 days before).
	// setHours(0,0,0,0) normalises to midnight local time so date-string comparisons
	// against localDate from DailyUsageResult are consistent.
	for (let index = 6; index >= 0; index--) {
		const day = new Date(endDate);
		day.setDate(day.getDate() - index);
		day.setHours(0, 0, 0, 0);
		last7Days.push(day);
	}

	// Pre-populate all 7 buckets. Using a Map preserves insertion order so
	// chartData comes out chronologically without a sort step.
	const dayMap = new Map<string, ChartDatum>();

	for (const day of last7Days) {
		const dateStr = day.toLocaleDateString("en-US", { month: "short", day: "numeric" });

		dayMap.set(dateStr, { date: dateStr });
	}

	// Derive the series list from whichever endpoints actually appear in the data.
	// Series keys ("endpoint-0", "endpoint-1", ...) are stable within a single
	// render; they are NOT persisted anywhere, so don't rely on them across sessions.
	const endpoints = Array.from(new Set(last7DaysUsage.map(({ endpoint }) => endpoint)));
	const chartSeries: ChartSeries[] = endpoints.map((endpoint, index) => ({
		endpoint,
		key: `endpoint-${index}`,
		color: CHART_COLORS[index % CHART_COLORS.length],
	}));

	// ChartConfig is consumed by shadcn's ChartContainer / ChartStyle, which injects
	// --color-<key> CSS variables. Chart elements reference these via
	// fill/stroke={`var(--color-${key})`}. The label is shown in tooltip + legend.
	const chartConfig: ChartConfig = Object.fromEntries(
		chartSeries.map(({ endpoint, key, color }) => [key, { label: endpoint, color }]),
	);

	// Zero-fill every series for every day bucket BEFORE accumulating so that days
	// with no traffic show a 0 bar rather than undefined (which Recharts would skip,
	// creating a gap in the x-axis).
	for (const dayData of dayMap.values()) {
		for (const { key } of chartSeries) {
			dayData[key] = 0;
		}
	}

	// Reverse lookup: raw endpoint path → series key, used during accumulation.
	const endpointToSeriesKey = new Map(chartSeries.map(({ endpoint, key }) => [endpoint, key]));

	// Accumulate request counts. A single endpoint can have multiple rows per day
	// (one per hour), so we sum rather than assign.
	for (const { localDate, requestCount, endpoint } of last7DaysUsage) {
		const dateStr = localDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
		const seriesKey = endpointToSeriesKey.get(endpoint);
		const dayData = dayMap.get(dateStr);

		if (dayData && seriesKey) {
			dayData[seriesKey] = (dayData[seriesKey] as number) + requestCount;
		}
	}

	return {
		chartData: Array.from(dayMap.values()),
		chartConfig,
		chartSeries,
		endpointCount: endpoints.length,
	};
}
