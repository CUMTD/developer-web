"use client";

import { H3 } from "@common/typography/heading";
import type { ChartConfig } from "@ui/chart";
import { ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@ui/chart";
import { useId } from "react";
import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts";

/**
 * A single row of data passed to Recharts. The "date" key is the x-axis label;
 * all other keys (e.g. "endpoint-0") are numeric stacked bar heights.
 * Kept as a local alias to avoid importing the shared type into a client component.
 */
type ChartDatum = Readonly<Record<string, string | number>>;

/**
 * One bar series. `endpoint` is the raw source value used as a stable React key;
 * `key` is the Recharts dataKey and also the CSS variable suffix (--color-<key>).
 */
type ChartSeries = Readonly<{
	endpoint: string;
	key: string;
}>;

type UsageChartProps = Readonly<{
	/** Chart heading rendered above the figure as an H3. */
	title: string;
	/** Accessible description — rendered in a sr-only figcaption, announced by screen readers. */
	description: string;
	chartData: ChartDatum[];
	/** shadcn ChartConfig — drives CSS variable injection (--color-<key>) and tooltip labels. */
	chartConfig: ChartConfig;
	chartSeries: ChartSeries[];
	/** Number of distinct series; used in the sr-only accessible description. */
	endpointCount: number;
	/**
	 * CSS aspect-ratio for the chart container. Applied via inline style (not a
	 * Tailwind class) so any numeric value works at runtime without needing to
	 * appear as a static string at build time. Defaults to 1.618 (golden ratio).
	 */
	aspectRatio?: number;
}>;

export default function UsageChart({
	title,
	description,
	chartData,
	chartConfig,
	chartSeries,
	endpointCount,
	aspectRatio = 1.618,
}: UsageChartProps) {
	// Two IDs wired to aria-labelledby / aria-describedby on the ChartContainer
	// so screen readers can announce the chart title and description.
	const chartTitleId = useId();
	const chartDescriptionId = useId();

	return (
		<>
			<H3 id={chartTitleId} wrapProse>
				{title}
			</H3>
			<figure>
				{/*
				 * ChartContainer handles:
				 *   1. Injecting --color-<key> CSS variables from chartConfig via ChartStyle.
				 *   2. Wrapping children in a Recharts ResponsiveContainer.
				 * aspectRatio is applied via inline style — see the prop JSDoc above.
				 */}
				<ChartContainer
					className="w-full max-w-300"
					style={{ aspectRatio }}
					config={chartConfig}
					aria-describedby={chartDescriptionId}
					aria-labelledby={chartTitleId}
					role="img"
				>
					{/* stackId groups all Bar elements into a single stacked column per x-axis bucket. */}
					<BarChart data={chartData} responsive>
						<ChartTooltip content={<ChartTooltipContent />} />
						<XAxis dataKey="date" tick={{ fontSize: 12 }} />
						<YAxis tick={{ fontSize: 12 }} />
						{chartSeries.map(({ endpoint, key }) => (
							<Bar key={endpoint} dataKey={key} stackId="endpoint" fill={`var(--color-${key})`} />
						))}
						<Legend content={<ChartLegendContent />} />
					</BarChart>
				</ChartContainer>
				{/* Visually hidden — read by screen readers as the chart's accessible description. */}
				<figcaption id={chartDescriptionId} className="sr-only">
					{description}
					{endpointCount > 0 ? ` Showing ${endpointCount} endpoint series.` : " No endpoint data is available."}
				</figcaption>
			</figure>
		</>
	);
}
