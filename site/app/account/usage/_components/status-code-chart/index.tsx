"use client";

import { H3 } from "@common/typography/heading";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@ui/chart";
import { useId } from "react";
import { Pie, PieChart } from "recharts";
import type { StatusCodeChartData } from "./helpers";

type StatusCodeChartProps = Readonly<
	StatusCodeChartData & {
		/**
		 * CSS aspect-ratio applied via inline style. Defaults to "1.618".
		 * See UsageChart for the full explanation of why inline style is used
		 * instead of a dynamic Tailwind class.
		 */
		aspect?: string;
	}
>;

export default function StatusCodeChart({
	pieData,
	chartConfig,
	totalRequests,
	aspect = "1.618",
}: StatusCodeChartProps) {
	const chartTitleId = useId();
	const chartDescriptionId = useId();

	return (
		<>
			<H3 id={chartTitleId} wrapProse>
				7-Day Status Codes
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
					<PieChart>
						{/*
						 * hideLabel suppresses the default label above the tooltip which would
						 * show the dataKey name ("value") rather than anything meaningful.
						 * The sector name (status code) is shown as the tooltip item label instead.
						 */}
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						{/*
						 * nameKey="name" tells Recharts which field in pieData is the sector label.
						 * dataKey="value" is the numeric field used to size each sector.
						 * fill is read directly from each pieData item — no Cell components needed.
						 */}
						<Pie data={pieData} dataKey="value" nameKey="name" />
						{/*
						 * nameKey="value" on ChartLegendContent is the key within the Recharts
						 * legend payload item whose value is the sector name string (e.g. "200").
						 * ChartLegendContent passes that string to getPayloadConfigFromPayload,
						 * which looks it up in chartConfig to get the display label. Without this
						 * nameKey the legend items would be blank.
						 */}
						<ChartLegend content={<ChartLegendContent nameKey="value" />} />
					</PieChart>
				</ChartContainer>
				<figcaption id={chartDescriptionId} className="sr-only">
					Distribution of HTTP status codes across all endpoints over the last 7 days.
					{totalRequests > 0 ? ` ${totalRequests.toLocaleString()} total requests.` : " No request data is available."}
				</figcaption>
			</figure>
		</>
	);
}
