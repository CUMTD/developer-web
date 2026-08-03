import type { ChartConfig } from "@ui/chart";

/**
 * Tailwind CSS chart color tokens (--chart-1 through --chart-5) used to assign
 * distinct colors to each series in a chart. Colors cycle when there are more
 * series than tokens (index % CHART_COLORS.length).
 *
 * These are CSS custom properties defined by the Tailwind theme, NOT injected
 * by ChartStyle — they are always available globally without any ChartConfig entry.
 *
 * Used by every data-builder in this section so color assignment is consistent
 * across all charts on the page.
 */
export const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

/**
 * A single row of chart data passed to Recharts.
 * The "date" key holds the x-axis label (e.g. "Jun 4" or "June 4, 8 AM").
 * All other keys are series identifiers ("endpoint-0", "endpoint-1", ...) whose
 * values are numeric counts or averages.
 */
export type ChartDatum = Record<string, string | number>;

/**
 * Metadata for one bar/line series in a chart.
 *
 * - `endpoint`: the raw source value (endpoint path, API key string, etc.) used
 *   as a stable React key and for looking up data during aggregation.
 * - `key`: the Recharts dataKey used in ChartDatum (e.g. "endpoint-0"). Also the
 *   suffix for the CSS variable injected by ChartStyle (--color-endpoint-0).
 * - `color`: the raw color value stored in ChartConfig and used by ChartStyle to
 *   inject the CSS variable referenced by `key`.
 *
 * Note: the field is named `endpoint` for historical reasons. In the API key chart
 * it holds the raw API key string; in the endpoint charts it holds the path string.
 */
export type ChartSeries = Readonly<{
	endpoint: string;
	key: string;
	color: string;
}>;

/**
 * The shape returned by every data-builder function in this section.
 * Passed directly as props to the chart components.
 *
 * - `chartData`: array of ChartDatum objects, one per time bucket (hour or day).
 *   Always has a full set of buckets even if some have zero values, so the x-axis
 *   is never missing entries.
 * - `chartConfig`: shadcn/ui ChartConfig consumed by ChartContainer. Each entry
 *   maps a series key ("endpoint-0") to its display label and color. ChartStyle
 *   reads this to inject --color-<key> CSS variables used by chart elements.
 * - `chartSeries`: ordered list of series metadata; drives rendering of Bar/Line
 *   elements in chart components.
 * - `endpointCount`: number of distinct series. Passed to the sr-only figcaption
 *   and can be used to conditionally render empty states.
 */
export type UsageChartData = Readonly<{
	chartData: ChartDatum[];
	chartConfig: ChartConfig;
	chartSeries: ChartSeries[];
	endpointCount: number;
}>;
