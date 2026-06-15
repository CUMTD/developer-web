type AdminRequestStatsResult = Readonly<{
	/** The calendar date this row represents (local midnight, parsed from the `date` column). */
	date: Date;
	/** HTTP status code (e.g. 200, 404, 500). */
	statusCode: number;
	/** Total request count for this date + status code combination. */
	requestCount: number;
}>;

export default AdminRequestStatsResult;
