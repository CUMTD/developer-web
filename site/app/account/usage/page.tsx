import { H2 } from "@common/typography/heading";
import { getDailyUsage } from "@server/actions/account/get-daily-usage";
import { createClient } from "@server/supabase/server";
import type { Metadata } from "next";
import { unauthorized } from "next/navigation";
import buildApiKeyUsageChartData from "./_components/api-key-usage-chart/helpers";
import ResponseTimeChart from "./_components/response-time-chart";
import buildResponseTimeChartData from "./_components/response-time-chart/helpers";
import StatusCodeChart from "./_components/status-code-chart";
import buildStatusCodeChartData from "./_components/status-code-chart/helpers";
import UsageChart from "./_components/usage-chart";
import buildSevenDayData from "./_components/usage-chart/build-seven-day-data";
import buildTwentyFourHourData from "./_components/usage-chart/build-twenty-four-hour-data";

export const metadata: Metadata = {
	title: "API Usage",
	description: "View your API usage statistics.",
	alternates: { canonical: "/account/usage" },
	robots: { index: false, follow: false },
};

/**
 * /account/usage — API usage dashboard.
 *
 * DATA FLOW
 * ---------
 * All charts share a single getDailyUsage() call which returns every row from
 * request_log_aggregate for the authenticated user. Rows are then filtered
 * client-side into two time windows:
 *
 *   • last24HoursUsage — last 24 hours (24-hour bar chart)
 *   • last7DaysUsage   — last 7 days   (all remaining charts)
 *
 * `now` is captured once so both filters are evaluated at the same instant.
 *
 * CHART INVENTORY
 * ---------------
 * 1. Last 24 Hours      — stacked bar, one series per endpoint, hourly buckets
 * 2. Last 7 Days        — stacked bar, one series per endpoint, daily buckets
 * 3. 7-Day Mean Response Time — line chart, one line per endpoint, daily buckets,
 *                         weighted-average ms; null for days with no traffic
 * 4. 7-Day Status Codes — pie chart, one slice per HTTP status code, all endpoints combined
 * 5. 7-Day API Key Usage — stacked bar, one series per API key (labels obfuscated)
 *
 * LAYOUT
 * ------
 * Charts 1–4 sit in a 2×2 responsive grid (single column on mobile).
 * Chart 5 spans both columns on desktop (md:col-span-2).
 *
 * ADDING A NEW CHART
 * ------------------
 * 1. Create _components/<name>/helpers.ts — accepts DailyUsageResult[], returns chart data.
 * 2. Create _components/<name>/index.tsx  — or reuse UsageChart for stacked bar charts.
 * 3. Filter/reuse the appropriate time-window array below.
 * 4. Drop the component into the grid div.
 * 5. If your chart needs more than 5 series, extend CHART_COLORS in usage-chart/types.ts.
 */

export default async function UsagePage() {
	const supabase = await createClient();
	const { data: authData } = await supabase.auth.getClaims();

	if (authData === null) {
		unauthorized();
	}

	// Single fetch for all charts — avoids N+1 round trips to Supabase.
	const dailyUsage = await getDailyUsage();

	// Capture `now` once so all time-window comparisons are evaluated at the same instant.
	const now = Date.now();

	// 24-hour window: used only by the hourly bar chart.
	const last24HoursUsage = dailyUsage.filter(({ utcDate }) => utcDate.getTime() >= now - 24 * 60 * 60 * 1000);
	const { chartData, chartConfig, chartSeries, endpointCount } = buildTwentyFourHourData(last24HoursUsage);

	// 7-day window: shared by all remaining charts to avoid re-filtering.
	const last7DaysUsage = dailyUsage.filter(({ utcDate }) => utcDate.getTime() >= now - 7 * 24 * 60 * 60 * 1000);
	const sevenDayChartData = buildSevenDayData(last7DaysUsage);
	const responseTimeChartData = buildResponseTimeChartData(last7DaysUsage);
	const statusCodeChartData = buildStatusCodeChartData(last7DaysUsage);
	const apiKeyChartData = buildApiKeyUsageChartData(last7DaysUsage);

	return (
		<>
			<H2 wrapProse>API Usage</H2>
			{/*
			 * 2-column responsive grid. Charts that should span the full width
			 * use md:col-span-2. Single column on mobile for all items.
			 */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* Full-width — 24 hourly buckets benefit from the extra horizontal space. */}
				<div className="md:col-span-2">
					<UsageChart
						title="Last 24 Hours"
						aspectRatio={30 / 9}
						description="API requests in the last 24 hours, grouped by hour and endpoint."
						chartData={chartData}
						chartConfig={chartConfig}
						chartSeries={chartSeries}
						endpointCount={endpointCount}
					/>
				</div>
				<div>
					<UsageChart
						title="Last 7 Days"
						description="API requests in the last 7 days, grouped by day and endpoint."
						chartData={sevenDayChartData.chartData}
						chartConfig={sevenDayChartData.chartConfig}
						chartSeries={sevenDayChartData.chartSeries}
						endpointCount={sevenDayChartData.endpointCount}
					/>
				</div>
				<div>
					<ResponseTimeChart
						chartData={responseTimeChartData.chartData}
						chartConfig={responseTimeChartData.chartConfig}
						chartSeries={responseTimeChartData.chartSeries}
						endpointCount={responseTimeChartData.endpointCount}
					/>
				</div>
				<div>
					<StatusCodeChart
						pieData={statusCodeChartData.pieData}
						chartConfig={statusCodeChartData.chartConfig}
						totalRequests={statusCodeChartData.totalRequests}
					/>
				</div>
				<div>
					<UsageChart
						title="7-Day API Key Usage"
						description="API requests in the last 7 days, grouped by day and API key."
						chartData={apiKeyChartData.chartData}
						chartConfig={apiKeyChartData.chartConfig}
						chartSeries={apiKeyChartData.chartSeries}
						endpointCount={apiKeyChartData.endpointCount}
					/>
				</div>
			</div>
		</>
	);
}
