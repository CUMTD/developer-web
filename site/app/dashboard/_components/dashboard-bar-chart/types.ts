import type { ChartConfig } from "@ui/chart";

/**
 * Tailwind CSS chart color tokens used to assign distinct colors to each series.
 * Colors cycle when there are more series than tokens (index % CHART_COLORS.length).
 * These are global CSS custom properties — no ChartConfig entry needed.
 */
export const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

/**
 * A single row of chart data passed to Recharts.
 * The "date" key holds the x-axis label (e.g. "Jun 4").
 * All other keys are series identifiers whose values are numeric counts.
 */
export type ChartDatum = Record<string, string | number>;

/**
 * Metadata for one bar series.
 * - `label`: the raw source label (status code string, "Active Developers", etc.) used as a stable React key.
 * - `key`: Recharts dataKey and CSS variable suffix (--color-<key>).
 * - `color`: raw CSS color stored in ChartConfig for CSS variable injection.
 */
export type ChartSeries = Readonly<{
	label: string;
	key: string;
	color: string;
}>;

/**
 * The shape returned by every dashboard chart helper and consumed by DashboardBarChart.
 */
export type DashboardBarChartData = Readonly<{
	chartData: ChartDatum[];
	chartConfig: ChartConfig;
	chartSeries: ChartSeries[];
	/** Number of distinct series; used in the sr-only accessible description. */
	seriesCount: number;
}>;
