import type DailyUsageResult from "@t/daily-usage-result";
import type { ChartConfig } from "@ui/chart";
import { CHART_COLORS, type ChartDatum, type ChartSeries, type UsageChartData } from "./types";

/**
 * Transforms raw DailyUsageResult rows into the shape expected by UsageChart
 * for the "Last 24 Hours" view.
 *
 * Produces exactly 24 hour buckets (current hour and the 23 preceding). Each
 * bucket key is a human-readable string such as "June 4, 8 AM" — this same
 * string is used as both the Map key and the x-axis label, so bucket lookup
 * and rendering use the same format without a secondary mapping step.
 *
 * The 24-hour window is evaluated in LOCAL time (using localDate / localHour
 * from DailyUsageResult) so the chart reflects the user's timezone rather than
 * UTC. DailyUsageResult.localDate is derived from the UTC timestamp in the
 * server action and converted to local time by the JS Date constructor.
 *
 * @param last24HoursUsage - Rows already filtered to the last 24 hours
 *   (caller's responsibility). See page.tsx for the filter logic.
 */
export default function buildTwentyFourHourData(last24HoursUsage: DailyUsageResult[], endDate: Date): UsageChartData {
	const last24Hours: Date[] = [];

	// Walk backwards from endDate, creating one Date per hour bucket.
	// setMinutes(0,0,0) truncates to the top of the hour so the format string
	// matches what we'll produce from localHour during accumulation below.
	for (let index = 23; index >= 0; index--) {
		const hour = new Date(endDate);
		hour.setHours(hour.getHours() - index);
		hour.setMinutes(0, 0, 0);
		last24Hours.push(hour);
	}

	// The composite key format "June 4, 8 AM" must exactly match what is
	// reconstructed from localDate + localHour during accumulation. Both sides
	// use toLocaleDateString with { month: "long", day: "numeric" } and
	// toLocaleTimeString with { hour: "numeric" } to guarantee consistency.
	const hourMap = new Map<string, ChartDatum>();

	for (const hour of last24Hours) {
		const dateStr = hour.toLocaleDateString("en-US", { month: "long", day: "numeric" });
		const hourStr = hour.toLocaleTimeString("en-US", { hour: "numeric" });
		const key = `${dateStr}, ${hourStr}`;

		hourMap.set(key, { date: key });
	}

	// Series, config, and zero-fill: same pattern as buildSevenDayData — see
	// that file for an explanation of the ChartConfig / CSS variable mechanism.
	const endpoints = Array.from(new Set(last24HoursUsage.map(({ endpoint }) => endpoint)));
	const chartSeries: ChartSeries[] = endpoints.map((endpoint, index) => ({
		endpoint,
		key: `endpoint-${index}`,
		color: CHART_COLORS[index % CHART_COLORS.length],
	}));

	const chartConfig: ChartConfig = Object.fromEntries(
		chartSeries.map(({ endpoint, key, color }) => [key, { label: endpoint, color }]),
	);

	for (const hourData of hourMap.values()) {
		for (const { key } of chartSeries) {
			hourData[key] = 0;
		}
	}

	const endpointToSeriesKey = new Map(chartSeries.map(({ endpoint, key }) => [endpoint, key]));

	// Reconstruct the bucket key from localDate + localHour.
	// new Date(0, 0, 0, localHour) creates a throwaway Date whose only purpose
	// is to produce a locale-formatted hour string — the date component (epoch)
	// is irrelevant here.
	for (const { localDate, localHour, requestCount, endpoint } of last24HoursUsage) {
		const dateStr = localDate.toLocaleDateString("en-US", { month: "long", day: "numeric" });
		const hourStr = new Date(0, 0, 0, localHour).toLocaleTimeString("en-US", { hour: "numeric" });
		const key = `${dateStr}, ${hourStr}`;
		const seriesKey = endpointToSeriesKey.get(endpoint);
		const hourData = hourMap.get(key);

		if (hourData && seriesKey) {
			hourData[seriesKey] = (hourData[seriesKey] as number) + requestCount;
		}
	}

	return {
		chartData: Array.from(hourMap.values()),
		chartConfig,
		chartSeries,
		endpointCount: endpoints.length,
	};
}
