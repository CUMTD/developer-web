import type DailyUsageResult from "@t/daily-usage-result";
import type { ChartConfig } from "@ui/chart";
import { CHART_COLORS } from "../usage-chart/types";

/**
 * One slice of the pie chart. `name` is the HTTP status code as a string
 * (e.g. "200", "404") and doubles as the label in the tooltip and legend.
 * `fill` is a direct CSS value (e.g. "var(--chart-1)") applied to the sector.
 */
export type StatusCodeDatum = Readonly<{
	name: string;
	value: number;
	fill: string;
}>;

export type StatusCodeChartData = Readonly<{
	pieData: StatusCodeDatum[];
	/**
	 * ChartConfig keyed by status code strings (e.g. "200", "404").
	 *
	 * WHY it's needed for a pie chart:
	 * shadcn's ChartLegendContent resolves display labels via getPayloadConfigFromPayload,
	 * which looks up config[item.value] where item.value is the sector name string.
	 * Without this config, the legend would render blank labels. Colors are NOT
	 * stored here (they come from pieData[].fill directly) so ChartStyle injects
	 * no CSS variables — that's fine because Recharts reads fill from the data items.
	 */
	chartConfig: ChartConfig;
	/** Sum of all request counts across all status codes; used in the sr-only description. */
	totalRequests: number;
}>;

/**
 * Aggregates request counts by HTTP status code across all endpoints for the
 * last 7 days. The resulting slices are sorted numerically (2xx before 4xx
 * before 5xx) so the pie sectors and legend appear in a consistent order.
 *
 * Unlike the bar-chart builders there is no time bucketing here — the pie shows
 * the overall distribution for the whole 7-day window, not a per-day breakdown.
 *
 * @param last7DaysUsage - Rows already filtered to the last 7 days.
 */
export default function buildStatusCodeChartData(last7DaysUsage: DailyUsageResult[]): StatusCodeChartData {
	// Aggregate total request count per status code across all endpoints and hours.
	const statusTotals = new Map<number, number>();

	for (const { statusCode, requestCount } of last7DaysUsage) {
		statusTotals.set(statusCode, (statusTotals.get(statusCode) ?? 0) + requestCount);
	}

	// Sort ascending so 200 < 301 < 404 < 500 in the legend and chart.
	const sortedEntries = Array.from(statusTotals.entries()).sort(([a], [b]) => a - b);

	const pieData: StatusCodeDatum[] = sortedEntries.map(([statusCode, count], index) => ({
		name: String(statusCode),
		value: count,
		// fill is a global Tailwind CSS variable, NOT a ChartStyle-injected variable.
		// Recharts reads fill directly from each data item for the Pie sectors.
		fill: CHART_COLORS[index % CHART_COLORS.length],
	}));

	// ChartConfig keyed by status code string so ChartLegendContent can resolve labels.
	// See StatusCodeChartData.chartConfig JSDoc above for the full explanation.
	const chartConfig: ChartConfig = Object.fromEntries(
		sortedEntries.map(([statusCode]) => [String(statusCode), { label: String(statusCode) }]),
	);

	const totalRequests = sortedEntries.reduce((sum, [, count]) => sum + count, 0);

	return { pieData, chartConfig, totalRequests };
}
