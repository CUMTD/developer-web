"use client";

import { H2 } from "@common/typography/heading";
import type { ChartConfig } from "@ui/chart";
import { ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@ui/chart";
import { useId } from "react";
import { Legend, Line, LineChart, XAxis, YAxis } from "recharts";

type ChartDatum = Readonly<Record<string, string | number>>;

type ChartSeries = Readonly<{
	label: string;
	key: string;
}>;

type DashboardLineChartProps = Readonly<{
	/** Chart heading rendered above the figure as an H3. */
	title: string;
	/** Accessible description rendered in a sr-only figcaption. */
	description: string;
	chartData: ChartDatum[];
	chartConfig: ChartConfig;
	chartSeries: ChartSeries[];
	/** Number of distinct series; used in the sr-only description. */
	seriesCount: number;
	/**
	 * CSS aspect-ratio applied via inline style. Defaults to 1.618 (golden ratio).
	 * Any numeric value works at runtime without needing a static Tailwind class.
	 */
	aspectRatio?: number;
}>;

/**
 * Generic single- or multi-series line chart for the admin dashboard.
 * Follows the same structure as ResponseTimeChart in account/usage.
 */
export default function DashboardLineChart({
	title,
	description,
	chartData,
	chartConfig,
	chartSeries,
	seriesCount,
	aspectRatio = 1.618,
}: DashboardLineChartProps) {
	const chartTitleId = useId();
	const chartDescriptionId = useId();

	return (
		<>
			<H2 id={chartTitleId} wrapProse>
				{title}
			</H2>
			<figure>
				<ChartContainer
					className="w-full max-w-300"
					style={{ aspectRatio }}
					config={chartConfig}
					aria-describedby={chartDescriptionId}
					aria-labelledby={chartTitleId}
					role="img"
				>
					<LineChart data={chartData}>
						<ChartTooltip content={<ChartTooltipContent />} />
						<XAxis dataKey="date" tick={{ fontSize: 12 }} />
						<YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
						{chartSeries.map(({ label, key }) => (
							<Line key={label} dataKey={key} stroke={`var(--color-${key})`} dot={{ r: 2 }} />
						))}
						<Legend content={<ChartLegendContent />} />
					</LineChart>
				</ChartContainer>
				<figcaption id={chartDescriptionId} className="sr-only">
					{description}
					{seriesCount > 1 ? ` Showing ${seriesCount} series.` : seriesCount === 0 ? " No data is available." : ""}
				</figcaption>
			</figure>
		</>
	);
}
