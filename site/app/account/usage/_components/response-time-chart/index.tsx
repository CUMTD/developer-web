"use client";

import { H3 } from "@common/typography/heading";
import type { ChartConfig } from "@ui/chart";
import { ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@ui/chart";
import { useId } from "react";
import { Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import type { ResponseTimeChartSeries } from "./helpers";

/**
 * Local alias — allows null values so days with no traffic produce a gap in the
 * line rather than a misleading 0. See helpers.ts for the full explanation.
 */
type ResponseTimeChartDatum = Readonly<Record<string, string | number | null>>;

type ResponseTimeChartProps = Readonly<{
	chartData: ResponseTimeChartDatum[];
	/** shadcn ChartConfig — drives --color-<key> CSS variable injection. */
	chartConfig: ChartConfig;
	chartSeries: ResponseTimeChartSeries[];
	/** Number of distinct endpoint series; used in the sr-only description. */
	endpointCount: number;
	/**
	 * CSS aspect-ratio value applied via inline style. Any numeric/string value
	 * works at runtime. Defaults to "1.618" (golden ratio).
	 */
	aspect?: string;
}>;

export default function ResponseTimeChart({
	chartData,
	chartConfig,
	chartSeries,
	endpointCount,
	aspect = "1.618",
}: ResponseTimeChartProps) {
	const chartTitleId = useId();
	const chartDescriptionId = useId();

	return (
		<>
			<H3 id={chartTitleId} wrapProse>
				7-Day Mean Response Time
			</H3>
			<figure>
				<ChartContainer
					className="w-full"
					style={{ aspectRatio: aspect }}
					config={chartConfig}
					aria-describedby={chartDescriptionId}
					aria-labelledby={chartTitleId}
					role="img"
				>
					<LineChart data={chartData}>
						<ChartTooltip content={<ChartTooltipContent />} />
						<XAxis dataKey="date" tick={{ fontSize: 12 }} />
						{/* unit adds " ms" suffix to y-axis tick labels and tooltip values. */}
						<YAxis tick={{ fontSize: 12 }} unit=" ms" />
						{chartSeries.map(({ endpoint, key }) => (
							/*
							 * dot={{ r: 2 }}: small dots at each data point ensure a series with
							 * only a single day of data is still visible (a line with one endpoint
							 * has zero length and would otherwise be invisible).
							 *
							 * connectNulls: draw through days where this endpoint had no traffic
							 * (null values) so the line stays continuous rather than breaking into
							 * disconnected segments.
							 */
							<Line key={endpoint} dataKey={key} stroke={`var(--color-${key})`} dot={{ r: 2 }} connectNulls />
						))}
						<Legend content={<ChartLegendContent />} />
					</LineChart>
				</ChartContainer>
				<figcaption id={chartDescriptionId} className="sr-only">
					Average API response time in milliseconds over the last 7 days, grouped by endpoint.
					{endpointCount > 0 ? ` Showing ${endpointCount} endpoint series.` : " No endpoint data is available."}
				</figcaption>
			</figure>
		</>
	);
}
