import type DailyUsageResult from "@t/daily-usage-result";
import type { ChartConfig } from "@ui/chart";
import { CHART_COLORS, type ChartDatum, type ChartSeries, type UsageChartData } from "../usage-chart/types";

/**
 * Builds 7-day stacked bar chart data grouped by API key rather than endpoint.
 *
 * Structure is identical to buildSevenDayData — same time bucketing, same
 * zero-fill strategy, same ChartConfig / CSS variable mechanism. The only
 * differences are:
 *
 *  1. Groups by `apiKey` instead of `endpoint`.
 *  2. Series keys are "key-0", "key-1", ... (vs "endpoint-0") to avoid
 *     collisions if both charts are on the same page with the same ChartConfig.
 *  3. The raw API key string is stored in ChartSeries.endpoint (used internally
 *     as a React key and for data lookup), but the ChartConfig label shown in
 *     the tooltip and legend uses the key's display name (from apiKeyNames map)
 *     so the full key is never exposed in the UI.
 *
 * Because this component reuses UsageChart, no separate chart component is needed.
 *
 * @param last7DaysUsage - Rows already filtered to the last 7 days.
 * @param apiKeyNames - Map of raw API key string → display name.
 */
export default function buildApiKeyUsageChartData(
	last7DaysUsage: DailyUsageResult[],
	apiKeyNames: ReadonlyMap<string, string>,
	endDate: Date,
): UsageChartData {
	const last7Days: Date[] = [];

	for (let index = 6; index >= 0; index--) {
		const day = new Date(endDate);
		day.setDate(day.getDate() - index);
		day.setHours(0, 0, 0, 0);
		last7Days.push(day);
	}

	const dayMap = new Map<string, ChartDatum>();

	for (const day of last7Days) {
		const dateStr = day.toLocaleDateString("en-US", { month: "short", day: "numeric" });
		dayMap.set(dateStr, { date: dateStr });
	}

	// Deduplicate API keys while preserving first-seen order.
	const apiKeys = Array.from(new Set(last7DaysUsage.map(({ apiKey }) => apiKey)));

	// Raw key stored in `endpoint` field for internal use; NEVER used as a display label.
	const chartSeries: ChartSeries[] = apiKeys.map((apiKey, index) => ({
		endpoint: apiKey,
		key: `key-${index}`,
		color: CHART_COLORS[index % CHART_COLORS.length],
	}));

	const chartConfig: ChartConfig = Object.fromEntries(
		chartSeries.map(({ endpoint, key, color }) => [key, { label: apiKeyNames.get(endpoint) ?? endpoint, color }]),
	);

	// Zero-fill all day buckets before accumulating (same pattern as buildSevenDayData).
	for (const dayData of dayMap.values()) {
		for (const { key } of chartSeries) {
			dayData[key] = 0;
		}
	}

	const apiKeyToSeriesKey = new Map(chartSeries.map(({ endpoint, key }) => [endpoint, key]));

	for (const { localDate, requestCount, apiKey } of last7DaysUsage) {
		const dateStr = localDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
		const seriesKey = apiKeyToSeriesKey.get(apiKey);
		const dayData = dayMap.get(dateStr);

		if (dayData && seriesKey) {
			dayData[seriesKey] = (dayData[seriesKey] as number) + requestCount;
		}
	}

	return {
		chartData: Array.from(dayMap.values()),
		chartConfig,
		chartSeries,
		// endpointCount reused here to mean "number of distinct API keys".
		endpointCount: apiKeys.length,
	};
}
