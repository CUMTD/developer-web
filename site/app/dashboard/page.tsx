import { H1 } from "@common/typography/heading";
import { getAdminDeveloperActivity } from "@server/actions/dashboard/get-admin-developer-activity";
import { getAdminRequestStats } from "@server/actions/dashboard/get-admin-request-stats";
import type { Metadata } from "next";
import buildActiveDevelopersChartData from "./_components/active-developers-chart/helpers";
import buildDailyRequestsChartData from "./_components/daily-requests-chart/helpers";
import DashboardBarChart from "./_components/dashboard-bar-chart";
import DashboardLineChart from "./_components/dashboard-line-chart";
import buildErrorResponsesChartData from "./_components/error-responses-chart/helpers";
import { buildStatusCodeChartData } from "./_components/status-code-breakdown-chart/helpers";

export const metadata: Metadata = {
	title: "Admin Dashboard",
	description: "Platform-wide API usage statistics for administrators.",
	alternates: { canonical: "/dashboard" },
	robots: { index: false, follow: false },
};

export default async function DashboardPage() {
	const [activityRows, requestRows] = await Promise.all([getAdminDeveloperActivity(), getAdminRequestStats()]);

	const activeDevelopersData = buildActiveDevelopersChartData(activityRows);
	const dailyRequestsData = buildDailyRequestsChartData(requestRows);
	const statusCodeData = buildStatusCodeChartData(requestRows);
	const errorResponsesData = buildErrorResponsesChartData(requestRows);

	return (
		<>
			<H1 wrapProse>Admin Dashboard</H1>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div>
					<DashboardLineChart
						title="Daily Active Developers"
						description="Number of distinct developers who made at least one API request per day over the last 30 days."
						chartData={activeDevelopersData.chartData}
						chartConfig={activeDevelopersData.chartConfig}
						chartSeries={activeDevelopersData.chartSeries}
						seriesCount={activeDevelopersData.seriesCount}
					/>
				</div>
				<div>
					<DashboardLineChart
						title="Total Daily Requests"
						description="Total API requests across all developers and endpoints per day over the last 30 days."
						chartData={dailyRequestsData.chartData}
						chartConfig={dailyRequestsData.chartConfig}
						chartSeries={dailyRequestsData.chartSeries}
						seriesCount={dailyRequestsData.seriesCount}
					/>
				</div>
				{/* Full-width — many status code series benefit from the extra horizontal space. */}
				<div>
					<DashboardBarChart
						title="Daily Requests by Status Code"
						description="API requests per day over the last 30 days, broken down by HTTP status code."
						chartData={statusCodeData.chartData}
						chartConfig={statusCodeData.chartConfig}
						chartSeries={statusCodeData.chartSeries}
						seriesCount={statusCodeData.seriesCount}
					/>
				</div>
				<div>
					<DashboardBarChart
						title="Error Responses"
						description="Non-200 API responses per day over the last 30 days, grouped by HTTP status code."
						chartData={errorResponsesData.chartData}
						chartConfig={errorResponsesData.chartConfig}
						chartSeries={errorResponsesData.chartSeries}
						seriesCount={errorResponsesData.seriesCount}
					/>
				</div>
			</div>
		</>
	);
}
