import type DailyUsageResult from "@t/daily-usage-result";
import type { ChartConfig } from "@ui/chart";

export const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export type ChartDatum = Record<string, string | number>;

export type ChartSeries = Readonly<{
	endpoint: string;
	key: string;
	color: string;
}>;

export type UsageChartData = Readonly<{
	chartData: ChartDatum[];
	chartConfig: ChartConfig;
	chartSeries: ChartSeries[];
	endpointCount: number;
}>;

export default function buildSevenDayUsageChartData(last7DaysUsage: DailyUsageResult[]): UsageChartData {
	const now = new Date();
	const last7Days: Date[] = [];

	for (let index = 6; index >= 0; index--) {
		const day = new Date(now);
		day.setDate(day.getDate() - index);
		day.setHours(0, 0, 0, 0);
		last7Days.push(day);
	}

	const dayMap = new Map<string, ChartDatum>();

	for (const day of last7Days) {
		const dateStr = day.toLocaleDateString("en-US", { month: "short", day: "numeric" });

		dayMap.set(dateStr, { date: dateStr });
	}

	const endpoints = Array.from(new Set(last7DaysUsage.map(({ endpoint }) => endpoint)));
	const chartSeries: ChartSeries[] = endpoints.map((endpoint, index) => ({
		endpoint,
		key: `endpoint-${index}`,
		color: CHART_COLORS[index % CHART_COLORS.length],
	}));

	const chartConfig: ChartConfig = Object.fromEntries(
		chartSeries.map(({ endpoint, key, color }) => [key, { label: endpoint, color }]),
	);

	for (const dayData of dayMap.values()) {
		for (const { key } of chartSeries) {
			dayData[key] = 0;
		}
	}

	const endpointToSeriesKey = new Map(chartSeries.map(({ endpoint, key }) => [endpoint, key]));

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
