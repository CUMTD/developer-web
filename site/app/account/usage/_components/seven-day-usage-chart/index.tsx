"use client";

import { H3 } from "@common/typography/heading";
import type { ChartConfig } from "@ui/chart";
import { ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@ui/chart";
import { useId } from "react";
import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts";

type ChartDatum = Readonly<Record<string, string | number>>;

type ChartSeries = Readonly<{
	endpoint: string;
	key: string;
}>;

type SevenDayUsageChartProps = Readonly<{
	chartData: ChartDatum[];
	chartConfig: ChartConfig;
	chartSeries: ChartSeries[];
	endpointCount: number;
}>;

export default function SevenDayUsageChart({
	chartData,
	chartConfig,
	chartSeries,
	endpointCount,
}: SevenDayUsageChartProps) {
	const chartTitleId = useId();
	const chartDescriptionId = useId();

	return (
		<>
			<H3 id={chartTitleId} wrapProse>
				Last 7 Days
			</H3>
			<figure>
				<ChartContainer
					className="aspect-[1.618] w-full max-w-150"
					config={chartConfig}
					aria-describedby={chartDescriptionId}
					aria-labelledby={chartTitleId}
					role="img"
				>
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
				<figcaption id={chartDescriptionId} className="sr-only">
					API requests in the last 7 days, grouped by day and endpoint.
					{endpointCount > 0 ? ` Showing ${endpointCount} endpoint series.` : " No endpoint data is available."}
				</figcaption>
			</figure>
		</>
	);
}
