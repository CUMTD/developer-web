import type DailyUsageResult from "@t/daily-usage-result";
import type { ChartConfig } from "@ui/chart";
import { CHART_COLORS } from "../usage-chart/types";

/**
 * One row of data for the response time line chart. Extends the bar-chart datum
 * type by allowing `null` values. A `null` entry for a given series key on a
 * given day means that endpoint had zero traffic that day — no average can be
 * computed, so the line has a gap rather than dropping to 0 (which would be
 * semantically wrong: 0 ms would imply instant responses, not no data).
 *
 * `connectNulls` on the Line element bridges over gaps so the overall trend
 * stays readable even when some days are missing.
 */
export type ResponseTimeChartDatum = Record<string, string | number | null>;

/** One line series. See ChartSeries in usage-chart/types.ts for field semantics. */
export type ResponseTimeChartSeries = Readonly<{
	endpoint: string;
	key: string;
	color: string;
}>;

export type ResponseTimeChartData = Readonly<{
	chartData: ResponseTimeChartDatum[];
	chartConfig: ChartConfig;
	chartSeries: ResponseTimeChartSeries[];
	endpointCount: number;
}>;

/**
 * Builds 7-day weighted-average response time data for the line chart.
 *
 * WHY weighted average:
 * The source table (request_log_aggregate) stores an average per endpoint per
 * UTC hour. Naively averaging those averages across hours would give each hour
 * equal weight regardless of traffic volume. Instead, we compute a
 * request-count–weighted average so high-traffic hours dominate the daily figure.
 *
 * Formula per (day, endpoint):
 *   weighted_avg = Σ(averageResponseTimeMs_i × requestCount_i) / Σ(requestCount_i)
 *
 * This is done in two passes:
 *   1. Accumulate weighted sums and request counts keyed by "dateStr::seriesKey".
 *   2. Divide to get the final average and write back into dayMap.
 *
 * WHY null instead of 0 for missing days:
 * A 0-ms bar/line would be visually misleading. null causes Recharts to skip
 * that data point; combined with `connectNulls` on Line, the line bridges over
 * the gap rather than dipping to 0.
 *
 * @param last7DaysUsage - Rows already filtered to the last 7 days.
 */
export default function buildResponseTimeChartData(
	last7DaysUsage: DailyUsageResult[],
	endDate: Date,
): ResponseTimeChartData {
	const last7Days: Date[] = [];

	for (let index = 6; index >= 0; index--) {
		const day = new Date(endDate);
		day.setDate(day.getDate() - index);
		day.setHours(0, 0, 0, 0);
		last7Days.push(day);
	}

	const dayMap = new Map<string, ResponseTimeChartDatum>();

	for (const day of last7Days) {
		const dateStr = day.toLocaleDateString("en-US", { month: "short", day: "numeric" });
		dayMap.set(dateStr, { date: dateStr });
	}

	const endpoints = Array.from(new Set(last7DaysUsage.map(({ endpoint }) => endpoint)));
	const chartSeries: ResponseTimeChartSeries[] = endpoints.map((endpoint, index) => ({
		endpoint,
		key: `endpoint-${index}`,
		color: CHART_COLORS[index % CHART_COLORS.length],
	}));

	const chartConfig: ChartConfig = Object.fromEntries(
		chartSeries.map(({ endpoint, key, color }) => [key, { label: endpoint, color }]),
	);

	// Initialize with null (no data) — overwritten below only where rows exist.
	for (const dayData of dayMap.values()) {
		for (const { key } of chartSeries) {
			dayData[key] = null;
		}
	}

	// Pass 1: accumulate the numerator (weighted sum) and denominator (total count)
	// for each (day, series) pair. Map key format: "Jun 4::endpoint-0".
	const weightedSums = new Map<string, number>();
	const requestCounts = new Map<string, number>();

	const endpointToSeriesKey = new Map(chartSeries.map(({ endpoint, key }) => [endpoint, key]));

	for (const { localDate, requestCount, endpoint, averageResponseTimeMs } of last7DaysUsage) {
		const dateStr = localDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
		const seriesKey = endpointToSeriesKey.get(endpoint);

		if (!seriesKey || !dayMap.has(dateStr)) {
			continue;
		}

		const mapKey = `${dateStr}::${seriesKey}`;
		weightedSums.set(mapKey, (weightedSums.get(mapKey) ?? 0) + averageResponseTimeMs * requestCount);
		requestCounts.set(mapKey, (requestCounts.get(mapKey) ?? 0) + requestCount);
	}

	// Pass 2: divide to get the final weighted average, rounded to the nearest ms.
	for (const [mapKey, totalWeight] of weightedSums) {
		const [dateStr, seriesKey] = mapKey.split("::");
		const totalCount = requestCounts.get(mapKey) ?? 0;
		const dayData = dateStr ? dayMap.get(dateStr) : undefined;

		if (dayData && seriesKey && totalCount > 0) {
			dayData[seriesKey] = Math.round(totalWeight / totalCount);
		}
	}

	return {
		chartData: Array.from(dayMap.values()),
		chartConfig,
		chartSeries,
		endpointCount: endpoints.length,
	};
}
