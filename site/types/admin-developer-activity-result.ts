type AdminDeveloperActivityResult = Readonly<{
	/** The calendar date this row represents (local midnight, parsed from the `date` column). */
	date: Date;
	/** The developer's UUID. */
	developerId: string;
}>;

export default AdminDeveloperActivityResult;
