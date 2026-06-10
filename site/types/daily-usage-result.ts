type DailyUsageResult = Readonly<{
	utcDate: Date;
	utcHour: number;
	localDate: Date;
	localHour: number;
	apiKey: string;
	endpoint: string;
	statusCode: number;
	requestCount: number;
	averageResponseTimeMs: number;
}>;

export default DailyUsageResult;
