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

export default function buildUsageChartData(last24HoursUsage: DailyUsageResult[]): UsageChartData {
	const now = new Date();
	const last24Hours: Date[] = [];

	for (let index = 23; index >= 0; index--) {
		const hour = new Date(now);
		hour.setHours(hour.getHours() - index);
		hour.setMinutes(0, 0, 0);
		last24Hours.push(hour);
	}

	const hourMap = new Map<string, ChartDatum>();

	for (const hour of last24Hours) {
		const dateStr = hour.toLocaleDateString("en-US", { month: "long", day: "numeric" });
		const hourStr = hour.toLocaleTimeString("en-US", { hour: "numeric" });
		const key = `${dateStr}, ${hourStr}`;

		hourMap.set(key, { date: key });
	}

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
